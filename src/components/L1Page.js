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

      <div className="choices-container">
        <h2>Uploads</h2>
        <div className="student-uploads-container">
          <div
            id="upload-portfolio-button"
            className="button"
            onClick={handleUploadPortfolio}
          >
            <h3>Portfolio</h3>
          </div>
          <div
            id="upload-objectives-button"
            className="button"
            onClick={handleUploadObjectives}
          >
            <h3>Objectives</h3>
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
