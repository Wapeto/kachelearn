import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";


const FileList = ({ folderPath }) => {
  const { currentUser } = useContext(AuthContext);

  const [files, setFiles] = useState([]);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: "0px",
    y: "0px",
    file: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const fetchFiles = async (folderPath) => {
    const storageRef = firebase.storage().ref();
    const folderRef = storageRef.child(folderPath);
    const files = [];

    try {
      const fileList = await folderRef.listAll();
      for (const itemRef of fileList.items) {
        const fileUrl = await itemRef.getDownloadURL();
        files.push({ name: itemRef.name, url: fileUrl });
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
    return files;
  };

  const deleteFile = (fileURL) => {
    const storage = firebase.storage();
    const gsReference = storage.refFromURL(fileURL);

    gsReference
      .delete()
      .then(() => {
        console.log("File deleted successfully");
        const fetchAndSetFiles = async () => {
          const fetchedFiles = await fetchFiles(folderPath);
          setFiles(fetchedFiles);
        };
        fetchAndSetFiles();
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };

  useEffect(() => {
    const fetchAndSetFiles = async () => {
      const fetchedFiles = await fetchFiles(folderPath);
      setFiles(fetchedFiles);
    };
    fetchAndSetFiles();
  }, [folderPath]);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContextMenu = (event, file) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: `${event.pageX}px`,
      y: `${event.pageY}px`,
      file,
    });
    document.addEventListener("click", closeContextMenu);
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: "0px", y: "0px", file: null });
    document.removeEventListener("click", closeContextMenu);
  };

  return (
    <div className="file-list">
      <input
        type="text"
        placeholder="Search for a file..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "310px",
          borderRadius: "6px",
        }}
        className="scrollable-div"
      >
        {files.length === 0 && <div>No files found.</div>}
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <div
              key={index}
              className="file-container"
              onClick={() => window.open(file.url, "_blank")}
              onContextMenu={(e) => handleContextMenu(e, file)}
            >
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
                onClick={(e) => e.stopPropagation()}
              >
                {file.name}
              </a>
            </div>
          ))
        ) : (
          <div>No files matching the search terms.</div>
        )}
        {contextMenu.visible && currentUser &&(
            <div
              style={{
                top: contextMenu.y,
                left: contextMenu.x,
                zIndex: 1000,
              }}
              id="context-menu"
            >
              <p
                className="button"
                onClick={() => window.open(contextMenu.file.url, "_blank")}
              >
                Open
              </p>
              <p
                className="button"
                onClick={() => deleteFile(contextMenu.file.url)}
              >
                Delete
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default FileList;
