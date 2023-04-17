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

      <div className="container choices-container">
        <h2>Uploads</h2>
        <div className="choices-subcontainer">
          <div
            id="upload-bilbio-button"
            className="upload-choice-button"
            onClick={handleUploadBiblio}
          >
            <h3>Bilbiography</h3>
          </div>
        </div>
      </div>

      <div className="container choices-container">
        <h2>Ressources</h2>
        <div className="choices-subcontainer">
        <div
            id="vocab-button"
            className="open-ressource-button"
            onClick={handleVocab}
          >
            <h3>Vocabulary</h3>
          </div>
          <div
            id="gramm-button"
            className="open-ressource-button"
            onClick={handleGrammar}
          >
            <h3>Grammar</h3>
          </div>
          <div
            id="gramm-button"
            className="open-ressource-button"
            onClick={handleYoutube}
          >
            <h3>Youtube</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
