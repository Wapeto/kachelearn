import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BackPageButton() {
  const location = useLocation();
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const parent = location.pathname.split("/")[1];
    if (
      (parent === "L1" || parent === "L2" || parent === "L3") &&
      location.pathname !== `/${parent}`
    ) {
      setDisplay(`${parent} Page`);
    } else {
      setDisplay("none");
    }
  }, [location]);

  const handleBackPage = () => {
    window.history.back();
  };

  return display === "none" ? null : (
    <div className="backpage-button" onClick={handleBackPage}>
      <FontAwesomeIcon
        icon="fa-solid fa-angles-left"
        style={{ margin: "0 1em 0 0" }}
      />
      {display}
    </div>
  );
}
