import React, { useContext } from "react";
import Login from "./Login";
import firebase from "../firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackPageButton from "./BackPageButton";

export default function Header() {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      // You can show a success message or redirect the user here !
      console.log("Signed out successfully");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <header>
        <nav>
          <ul className="header-container">
            <li className="header-logo">
              <a href="/home">
                <div id="home-button">
                  <FontAwesomeIcon
                    icon="fa-solid fa-house"
                    size="2xl"
                    color="#F3DE8A"
                  />
                </div>
              </a>
            </li>
            <li>
              <div className="backpage-holder">{<BackPageButton />}</div>
            </li>
            <li>
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  id="logout-button"
                  className="login-out-logo"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-arrow-right-from-bracket"
                    size="2xl"
                  />
                </button>
              ) : (
                <Login />
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
