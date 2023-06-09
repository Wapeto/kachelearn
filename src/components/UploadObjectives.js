import React, { useContext } from "react";
import NewFileUpload from "./NewFileUpload";
import FileList from "./FileList";
import { AuthContext } from "../contexts/AuthContext";
import BackPageButton from "./BackPageButton";

export default function UploadPortfolio({ classx }) {
  const { currentUser } = useContext(AuthContext);

  document.title = `${classx} Portfolio`;
  return (
    <div className="component-container">
      <BackPageButton />
      <h1>{classx} Objectives</h1>

      <div className="container" id="upld-info-container">
        {currentUser ? (
          <FileList folderPath={`Students-Uploads/${classx}/Objectives`} />
        ) : (
          <NewFileUpload filetype={"Objectives"} classx={classx} />
        )}
      </div>
    </div>
  );
}
