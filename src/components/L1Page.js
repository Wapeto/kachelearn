import React from "react";
import { useNavigate } from "react-router-dom";

export default function L1Page() {
  const navigate = useNavigate();

  const handleUploadPortfolio = () => {
    navigate("/L1/upld-port");
  };

  const handleUploadObjectives = () => {
    navigate("/L1/upld-obj");
  };

  const handleVocab = () => {
    navigate("/L1/vocab");
  };

  const handleGrammar = () => {
    navigate("/L1/grammar");
  };

  const handleYoutube = () => {
    navigate("/L1/ytb");
  };

  document.title = "L1 Page";

  return (
    <div className="component-container">
      <h1>L1 Page</h1>

      <div className="container choices-container">
        <h2>Uploads</h2>
        <div className="choices-subcontainer">
          <div
            id="upload-portfolio-button"
            className="upload-choice-button"
            onClick={handleUploadPortfolio}
          >
            <h3>Portfolio</h3>
          </div>
          <div
            id="upload-objectives-button"
            className="upload-choice-button"
            onClick={handleUploadObjectives}
          >
            <h3>Objectives</h3>
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
