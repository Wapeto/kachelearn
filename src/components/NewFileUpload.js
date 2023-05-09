import React, { useEffect, useRef, useState } from "react";
import firebase from "../firebaseConfig";

const NewFileUpload = ({ filetype, classx }) => {
  const inputRef = useRef(null);
  const fileUpload = useRef(null);
  const fileChoice = useRef(null);
  const fileInputRef = useRef(null);
  const [showCredentials, setShowCredentials] = useState(true);
  const [showFileChoice, setShowFileChoice] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(3);

  useEffect(() => {
    console.log("Triggered");
    console.log("Step: ", step);

    switch (step) {
      case 1:
        if (inputRef.current) {
          inputRef.current.placeholder = "Enter your student email";
        }
        break;
      case 2:
        getEmail();
        inputRef.current.placeholder = "Enter your full name";
        inputRef.current.value = "";
        break;
      case 3:
        getName();
        setShowCredentials(false);
        setShowFileChoice(true);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (file) {
      console.log("File: ", file);
      console.log("Filetype: ", filetype);
      console.log("Class: ", classx);
      console.log("Email: ", email);
      console.log("Name: ", name);
    }
  }, [file, filetype, classx, email, name]);

  const handleEmail = (email) => {
    if (
      email !== null &&
      email.trim().length > 0 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      if (email.includes("@etu.unistra.fr")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleName = (name) => {
    if (
      name !== null &&
      name.trim().length > 0 &&
      name.split(" ").length > 1 &&
      name.split(" ").length < 5
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getEmail = () => {
    if (inputRef.current.value) {
      if (handleEmail(inputRef.current.value)) {
        setEmail(inputRef.current.value);
        console.log("Valid email");
      } else {
        console.log("Invalid email");
        setStep(step - 1);
      }
    }
  };

  const getName = () => {
    if (inputRef.current.value) {
      if (handleName(inputRef.current.value)) {
        setName(inputRef.current.value);
        console.log("Valid name: ", inputRef.current.value);
      } else {
        console.log("Invalid name");
        setStep(step - 1);
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileInput = () => {
    document.getElementById("file-input").click();
  };

  const NextStep = () => {
    setStep(step + 1);
  };

  return (
    <div id="file-upld">
      <div id="info-input-container">
        {showCredentials && (
          <div className="credential-container">
            <input ref={inputRef} type="text" id="info-input" />
            <button id="next-button" onClick={NextStep}>
              {" "}
              {">"}{" "}
            </button>
          </div>
        )}
        {showFileChoice && (
          <div className="file-choice-container">
            <div id="file-choice" ref={fileChoice} onClick={handleFileInput}>
              <p>Choose a file</p>
            </div>
            <input
              type="file"
              id="file-input"
              ref={fileInputRef}
              hidden
              onChange={handleFileChange}
            />
            {/* <button id="upload-file-btn" ref={fileUpload}></button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFileUpload;
