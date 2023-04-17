import React, { useState, useEffect } from "react";
import firebase from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// TODO: add a search bar to filter the files

const FileList = ({ folderPath }) => {
  const [files, setFiles] = useState([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

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

  const handleTrashClick = (index) => {
    setConfirmDeleteIndex(index);
  };

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
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

  return (
    <div
      style={{
        overflowY: "scroll",
        maxHeight: "200px",
        padding: "10px",
        borderRadius: "6px",
      }}
      className="scrollable-div"
    >
      {files.length === 0 && <div>No files found.</div>}
      {files.map((file, index) => (
        <div key={index} className="file-container">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="file-link"
          >
            {file.name}
          </a>
          {confirmDeleteIndex === index ? (
            <>
              <FontAwesomeIcon
                icon="fa-solid fa-check"
                style={{ cursor: "pointer", marginRight: "5px", color: "green"}}
                onClick={() => deleteFile(file.url)}
                className="deletion-icon"
              />
              <FontAwesomeIcon
                icon="fa-solid fa-times"
                style={{ cursor: "pointer", marginRight: "5px", color: "red" }}
                onClick={cancelDelete}
                className="deletion-icon"
              />
            </>
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-trash"
              style={{ cursor: "pointer", marginRight: "5vw" }}
              onClick={() => handleTrashClick(index)}
              className="deletion-icon"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileList;
