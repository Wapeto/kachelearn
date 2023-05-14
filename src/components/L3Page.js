import React from "react";
import { useNavigate } from "react-router-dom";

export default function L3Page() {
  const navigate = useNavigate();

  const handleUploadBiblio = () => {
    navigate("/L3/upld-biblio");
  };

  const handleVocab = () => {
    navigate("/L3/vocab");
  };

  const handleGrammar = () => {
    navigate("/L3/grammar");
  };

  const handleYoutube = () => {
    navigate("/L3/ytb");
  };

  document.title = "L3 Page";

  return (
    <div className="component-container">
      <h1>L3 Page</h1>

      <div className="choices-container">
        <h2>Uploads</h2>
        <div className="student-uploads-container">
          <div
            id="upload-bilbio-button"
            className="button"
            onClick={handleUploadBiblio}
          >
            <h3>Bibliography</h3>
          </div>
        </div>
      </div>

      <div className="choices-container teacher">
        <h2>Ressources</h2>
        <div className="teacher-ressources-container">
          <div id="vocab-button" className="button" onClick={handleVocab}>
            <h3>Vocabulary</h3>
          </div>
          <div id="gramm-button" className="button" onClick={handleGrammar}>
            <h3>Grammar</h3>
          </div>
          <div id="ytb-button" className="button" onClick={handleYoutube}>
            <h3>Youtube</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
