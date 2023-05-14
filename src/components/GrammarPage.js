import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import FileList from "./FileList";
import TeacherUpload from "./TeacherUpload";
import BackPageButton from "./BackPageButton";

export default function GrammarPage({classx}) {
  const { currentUser } = useContext(AuthContext);

  if (typeof classx === "object") {
    classx = classx.classx;
  }

  document.title = `${classx} Grammar`;
  return (
    <div className="component-container">
      <BackPageButton />
      <h1 className="too-big">Grammar Page</h1>

      <div className="container" id="upld-info-container">
        {!currentUser ? (
          <FileList folderPath={`Teacher-Uploads/${classx}/Grammar`} />
        ) : (
          <TeacherUpload filetype={"Grammar"} classx={classx} />
        )}
      </div>
    </div>
  );
}
