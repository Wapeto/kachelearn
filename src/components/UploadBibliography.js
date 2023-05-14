import React, {useContext} from "react";
import FileUpload from "./FileUpload";
import NewFileUpload from "./NewFileUpload";
import FileList from "./FileList";
import { AuthContext } from "../contexts/AuthContext";


export default function UploadBibliography({ classx }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="component-container">
      <h1>{classx} Bibliography</h1>

      <div className="container" id="upld-info-container">
        {currentUser ? (
          <FileList folderPath={`Students-Uploads/${classx}/Bibliography`} />
        ) : (
          <NewFileUpload filetype={"Bibliography"} classx={classx} />
        )}
      </div>
    </div>
  );
}
