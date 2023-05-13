import React, { useState, useContext } from "react";
import firebase from "../firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
  const { currentUser } = useContext(AuthContext);

  const loginFormStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };
  if (!currentUser) {
    document.addEventListener("click", (e) => {
      const loginForm = document.querySelector(".login-container");
      const loginFormHeader = document.querySelector("#login-form-header");
      const loginButton = document.querySelector("#login-button");

      if (
        (loginFormHeader && e.target === loginFormHeader) ||
        (loginButton && loginButton.contains(e.target))
      ) {
        if (loginForm) {
          loginForm.style.display = "block";
        }
      } else if (loginForm && !loginForm.contains(e.target)) {
        loginForm.style.display = "none";
      }
    });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Logged in successfully");
      document.querySelector(".login-container").style.display = "none";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id="login-form-header" className="login-out-logo">
      <div id="login-button">
        <FontAwesomeIcon icon="fa-solid fa-user-graduate" size="2xl" />
      </div>
      <div className="login-container">
        <form
          className="login-form"
          style={loginFormStyle}
          onSubmit={handleSubmit}
        >
          <label className="login-form-input">
            Username:
            <input
              type="email"
              value={email}
              name="username"
              style={{ marginLeft: "1em" }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="login-form-input">
            Password:
            <input
              type="password"
              value={password}
              name="password"
              style={{ marginLeft: "1em" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <input type="submit" value="Login" id="submit-login" />
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}