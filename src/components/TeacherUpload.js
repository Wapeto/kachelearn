import React, { useState } from "react";
import firebase from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileList from "./FileList";

const TeacherUpload = ({ filetype, classx }) => {


  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (typeof classx === "object") {
    classx = classx.classx;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileReq = (file) => {
    const size = file.size * 0.000001;
    if (size > 10) {
      alert("File size is too large. Max size is 10MB.");
      return false;
    }
    return true;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const nameInput = document.querySelector(".upld-input input[type=text]");

    if (!file || !handleFileReq(file)) {
      alert("Can't upload this :(");
      return;
    }

    const storageRef = firebase.storage().ref();
    const folderPath = "Teacher-Uploads/" + classx + "/" + filetype + "/";
    const fileRef = storageRef.child(
      `${folderPath}/${nameInput.value ? nameInput.value : file.name}`
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
        nameInput.value = "";
        setUploadProgress(0);
        alert("File uploaded successfully!");
      }
    );
  };

  return (
    <div id="teacher-uploads">
      <form className="upld-form">
        <div className="upld-form-group">
          <p>Upload to {filetype} for {classx} :</p>
          <label className="upld-input">
            File name :
            <input type="text" placeholder="(Leave blank for default)" />
          </label>
          <div id="teacher-file-upld">
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
        </div>
      </form>
      <div className="current-files">
        <h3>Current files : </h3>
        <FileList folderPath={`Teacher-Uploads/${classx}/${filetype}`} />
      </div>
    </div>
  );
};

export default TeacherUpload;
