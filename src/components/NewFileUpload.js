import React, { useEffect, useRef, useState } from "react";
import firebase from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewFileUpload = ({ filetype, classx }) => {
  const inputRef = useRef(null);
  const fileUpload = useRef(null);
  const fileChoice = useRef(null);
  const fileInputRef = useRef(null);
  const fileChange = useRef(null);
  const errorContainerRef = useRef(null);
  const [showCredentials, setShowCredentials] = useState(true);
  const [showFileChoice, setShowFileChoice] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(1);
  useEffect(() => {
    // console.log("Step: ", step);
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
      setShowFileChoice(false);
      setShowFile(true);
    }
  }, [file, filetype, classx, email, name]);

  const showErrorMessage = (message) => {
    errorContainerRef.current.innerHTML = message;
    errorContainerRef.current.className = "show";

    setTimeout(() => {
      errorContainerRef.current.className = "hidden";
    }, 3000);
  };

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
        showErrorMessage("Please enter a valid student email");
        setStep(step - 1);
      }
    } else {
      console.log("Invalid email");
      showErrorMessage("Please enter a valid student email");
      setStep(step - 1);
    }
  };

  const getName = () => {
    if (inputRef.current.value) {
      if (handleName(inputRef.current.value)) {
        setName(inputRef.current.value);
        console.log("Valid name: ", inputRef.current.value);
      } else {
        console.log("Invalid name");
        showErrorMessage("Please enter a valid name");
        setStep(step - 1);
      }
    } else {
      console.log("Invalid name");
      showErrorMessage("Please enter a valid name");
      setStep(step - 1);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileInput = () => {
    document.getElementById("file-input").click();
  };

  const handleFileUpload = () => {
    setShowFile(false);
    setShowProgress(true);
    const storageRef = firebase.storage().ref();
    const folderPath = "Students-Uploads/" + classx + "/" + filetype + "/";
    const fileRef = storageRef.child(
      `${folderPath}/${filetype} of ${name} [${email.toLowerCase()}]`
    );
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        setFile(null);
        setUploadProgress("Done");
      }
    );
  };

  const NextStep = () => {
    setStep(step + 1);
  };

  return (
    <div id="file-upld">
      <div id="info-input-container">
        {showCredentials && (
          <div className="credential-container">
            <input ref={inputRef} type="text" id="info-input" title="Click to write"/>
            <button id="next-button" onClick={NextStep} title="Next">
              <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
            </button>
          </div>
        )}
        {showFileChoice && (
          <div className="file-choice-container">
            <div id="file-choice" ref={fileChoice} onClick={handleFileInput}>
              Choose a file
            </div>
            <input
              type="file"
              id="file-input"
              ref={fileInputRef}
              hidden
              onChange={handleFileChange}
            />
          </div>
        )}
        {showFile && (
          <div className="file-container">
            <div className="file-image"></div>
            <p>{file.name}</p>
            <span className="buttons">
              <button
                id="change-file-btn"
                ref={fileChange}
                onClick={handleFileInput}
              >
                Change File
              </button>
              <button
                id="upload-file-btn"
                ref={fileUpload}
                onClick={handleFileUpload}
              >
                Upload File
              </button>
              <input
                type="file"
                id="file-input"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
              />
            </span>
          </div>
        )}
        {showProgress && (
          <div className="progress-container">
            {uploadProgress === 0 && <p>Uploading file, please wait...</p>}
            {uploadProgress > 0 && (
              <p>Upload progress: {Math.round(uploadProgress)}%</p>
            )}
            {uploadProgress === "Done" && <p>File uploaded successfully !</p>}
          </div>
        )}
      </div>
      <div id="error-container" className="hidden" ref={errorContainerRef}>
        <p id="error-message">Error</p>
      </div>
    </div>
  );
};

export default NewFileUpload;
