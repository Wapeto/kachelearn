import React, { useState, useEffect, useRef } from "react";
import firebase from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileUpload = ({ filetype, classx }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const textFilesTypes = ["application/pdf", "application/msword"];
  const imageFilesTypes = ["image/png", "image/jpeg", "image/jpg"];

  const energyWave = useRef(null);
  const fileInputRef = useRef(null);
  const alertMessage = useRef(null);

  const updateEnergyWaveClass = () => {
    if (!energyWave.current) return;

    if (file) {
      if (handleFileReq(file)) {
        energyWave.current.className = "energy-wave-green";
      } else {
        energyWave.current.className = "energy-wave-red";
      }
    } else {
      energyWave.current.className = "energy-wave-default";
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const updateFileImage = () => {
    const fileImage = document.querySelector(".file-choice-btn");
    if (!file) {
      fileImage.className = "file-choice-btn default-file";
      if (fileImage.querySelector("p")) {
        fileImage.removeChild(fileImage.querySelector("p"));
      }
      if (fileImage.querySelector("div")) {
        fileImage.removeChild(fileImage.querySelector("div"));
      }
    } else {
      fileImage.className = "file-choice-btn selected-file";
      const fileTitle = document.createElement("p");
      fileTitle.className = "file-title";
      fileTitle.innerHTML =
        file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
      fileImage.appendChild(fileTitle);

      const closeBtn = document.createElement("div");
      closeBtn.className = "close-btn";
      closeBtn.addEventListener("click", () => {
        setFile(null);
        clearFileInput();
      });
      fileImage.appendChild(closeBtn);
    }
  };

  const handleFileInput = () => {
    document.getElementById("file-input").click();
  };

  useEffect(() => {
    updateEnergyWaveClass();
    updateFileImage();
    console.log("Current file: ", file);

    // eslint-disable-next-line
  }, [file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  function displayErrorMessage(message) {
    alertMessage.current.innerHTML = message;
    alertMessage.current.className = "show";

    setTimeout(() => {
      alertMessage.current.className = "hidden";
    }, 3000);
  }

  const handleFileReq = (file) => {
    const size = file.size * 0.000001;
    const type = file.type;

    if (size > 10) {
      alert("File size is too large. Max size is 10MB.");
      return false;
    } else if (filetype === "Portfolio" && !textFilesTypes.includes(type)) {
      // alert("File type is not supported. Supported types are: pdf, doc, docx.");
      displayErrorMessage("File type is not supported. Supported types are: pdf, doc, docx.");
      return false;
    } else if (filetype === "Image" && !imageFilesTypes.includes(type)) {
      alert("File type is not supported. Supported types are: png, jpeg, jpg.");
      return false;
    }
    return true;
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
      alert("Please enter your full name.");
      return false;
    }
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
        alert("Please enter your student email.");
        return false;
      }
    } else {
      alert("Please enter a valid email.");
      return false;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector(
      ".upld-input input[type=text]"
    ).value;
    const emailInput = document.querySelector(
      ".upld-input input[type=email]"
    ).value;

    if (!file) {
      alert("Please select a file to upload.");
      return;
    } else {
      if (
        !handleFileReq(file) ||
        !handleName(nameInput) ||
        !handleEmail(emailInput)
      ) {
        return;
      }
    }

    console.log("Final name and email: ", nameInput, emailInput.toLowerCase());
    const storageRef = firebase.storage().ref();
    const folderPath = "Students-Uploads/" + classx + "/" + filetype + "/";
    const fileRef = storageRef.child(
      `${folderPath}/${filetype} of ${nameInput} [${emailInput.toLowerCase()}]`
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
        alert("File uploaded successfully!");
        setFile(null);
        setUploadProgress(0);
      }
    );
  };

  return (
    <div id="file-upld">
      <div className="text-input-container">
        <input type="text" id="info-input"/>
      </div>
      <div className="filechoice-container">
        <input
          type="file"
          id="file-input"
          ref={fileInputRef}
          hidden
          onChange={handleFileChange}
        />
        <div className="file-choice-btn" onClick={handleFileInput}></div>
      </div>
      <div id="energy-wave" ref={energyWave}></div>
      <div className="upld-form">
        <input type="text" placeholder="Full name" />
        <input type="email" placeholder="Student email" />
        <button onClick={(e) => handleUpload(e)} className="upld-button">
          <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
        </button>
        {uploadProgress > 0 && (
          <p>Upload progress: {Math.round(uploadProgress)}%</p>
        )}
      </div>
      <div id="alert-message" className="hidden" ref={alertMessage}></div>
    </div>
  );
};

export default FileUpload;
 