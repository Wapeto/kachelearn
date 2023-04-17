import React, { useContext } from "react";
import FileUpload from "./FileUpload";
import { AuthContext } from "../contexts/AuthContext";
import FileList from "./FileList";

export default function UploadPortfolio({ classx }) {
  const { currentUser } = useContext(AuthContext);

  document.title = `${classx} Portfolio`;

  return (
    <div className="component-container">
      <h1>{classx} Portfolio</h1>

      <div className="container" id="upld-info-container">
        {currentUser ? (
          <FileList folderPath={`Students-Uploads/${classx}/Portfolio`} />
        ) : (
          <FileUpload filetype={"Portfolio"} classx={classx} />
        )}
      </div>
    </div>
  );
}
