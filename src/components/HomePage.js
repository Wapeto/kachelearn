import React, { useEffect }  from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default function HomePage() {

  const navigate = useNavigate();
  const location = useLocation();

  document.title = "Home";

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }}, [location, navigate]);


  const ClickedModule = (module) => {
    navigate(`/${module}`);
  };


// TODO: add a background images to the modules

  return (
    <div className="home-page">
      <div className="modules-container container">
        <div
          className="L1-container container module"
          style={{
            backgroundImage: `url(${"https://images.unsplash.com/photo-1455540904194-fc101941273a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZW5nbGlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=200&q=30"})`,
            backgroundSize: "cover",
          }}
          onClick={() => ClickedModule("L1")}
        >
          <h1>L1</h1>
        </div>
        <div
          className="L2-container container module"
          style={{
            backgroundImage: `url(${"https://images.unsplash.com/photo-1543109740-4bdb38fda756?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=60"})`,
            backgroundSize: "cover",
          }}
          onClick={() => ClickedModule("L2")}
        >
          <h1>L2</h1>
        </div>
        <div
          className="L3-container container module"
          style={{
            backgroundImage: `url(${"https://images.unsplash.com/photo-1603989872628-7880d83bb581?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=40"})`,
            backgroundSize: "cover",
          }}
          onClick={() => ClickedModule("L3")}
        >
          <h1>L3</h1>
        </div>
      </div>
    </div>
  );
}
