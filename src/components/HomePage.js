import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  document.title = "Home";

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  const ClickedModule = (module) => {
    navigate(`/${module}`);
  };

  // TODO: add a background images to the modules

  return (
    <div className="home-page">
      <div className="modules-container">
        <div className="module" onClick={() => ClickedModule("L1")}>
          <h2>L1</h2>
        </div>
        <div className="module" onClick={() => ClickedModule("L2")}>
          <h2>L2</h2>
        </div>
        <div className="module" onClick={() => ClickedModule("L3")}>
          <h2>L3</h2>
        </div>
      </div>
    </div>
  );
}