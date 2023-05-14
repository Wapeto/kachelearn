import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import FileList from "./FileList";
import TeacherUpload from "./TeacherUpload";
import BackPageButton from "./BackPageButton";

export default function VocabularyPage({classx}) {
  const { currentUser } = useContext(AuthContext);

  document.title = `${classx} Vocabulary`;

  if (typeof classx === "object") {
    classx = classx.classx;
  }
  return (
    <div className="component-container">
      <BackPageButton />
      <h1 className="too-big">Vocabulary Page</h1>

      <div className="container" id="upld-info-container">
        {!currentUser ? (
          <FileList folderPath={`Teacher-Uploads/${classx}/Vocabulary`} />
        ) : (
          <TeacherUpload filetype={"Vocabulary"} classx={classx} />
        )}
      </div>
    </div>
  );
}
