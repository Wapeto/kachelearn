import React, { useContext } from "react";
import NewFileUpload from "./NewFileUpload";
import { AuthContext } from "../contexts/AuthContext";
import FileList from "./FileList";

export default function UploadPortfolio({ classx }) {
  const { currentUser } = useContext(AuthContext);

  document.title = `${classx} Portfolio`;

  return (
    <div className="component-container">
      <h1>{classx} Portfolio</h1>
        {currentUser ? (
          <FileList folderPath={`Students-Uploads/${classx}/Portfolio`} />
        ) : (
          <NewFileUpload filetype="Portfolio" classx={classx} />
        )}
    </div>
  );
}
