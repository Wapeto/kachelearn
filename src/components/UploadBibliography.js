import React, {useContext} from "react";
import NewFileUpload from "./NewFileUpload";
import FileList from "./FileList";
import { AuthContext } from "../contexts/AuthContext";
import BackPageButton from "./BackPageButton";


export default function UploadBibliography({ classx }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="component-container">
      <BackPageButton />
      <h1 className="too-big">{classx} Bibliography</h1>

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
