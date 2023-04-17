import React, { useState } from "react";
import firebase from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileUpload = ({ filetype, classx }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);


  const textFilesTypes = ["application/pdf", "application/msword"];
  const imageFilesTypes = ["image/png", "image/jpeg", "image/jpg"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileReq = (file) => {
    const size = file.size * 0.000001;
    const type = file.type;

    if (size > 10) {
      alert("File size is too large. Max size is 10MB.");
      return false;
    } else if (filetype === "Portfolio" && !textFilesTypes.includes(type)) {
      alert("File type is not supported. Supported types are: pdf, doc, docx.");
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
    <form className="upld-form">
      <div className="upld-form-group">
        <label className="upld-input">
          Full name :
          <input type="text" placeholder="Name"/>
        </label>
        <label className="upld-input">
          Student email :
          <input type="email" placeholder="Email"/>
        </label>
        <label id="file-upld">
          Upload {filetype} :
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="choose-file-input"
            />
            <button onClick={(e) => handleUpload(e)} className="upld-button">
              <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" />
            </button>
            {uploadProgress > 0 && (
              <p>Upload progress: {Math.round(uploadProgress)}%</p>
            )}
          </div>
        </label>
      </div>
    </form>
  );
};

export default FileUpload;
