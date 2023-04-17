import React, { useContext } from "react";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
import { AuthContext } from "../contexts/AuthContext";

export default function UploadPortfolio({ classx }) {
  const { currentUser } = useContext(AuthContext);

  document.title = `${classx} Portfolio`;
  return (
    <div className="component-container">
      <h1>{classx} Objectives</h1>

      <div className="container" id="upld-info-container">
        {currentUser ? (
          <FileList folderPath={`Students-Uploads/${classx}/Objectives`} />
        ) : (
          <FileUpload filetype={"Objectives"} classx={classx} />
        )}
      </div>
    </div>
  );
}
