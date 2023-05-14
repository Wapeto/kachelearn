import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import firebase from "../firebaseConfig";
import RenderYoutubeSections from "./RenderYoutubeSections";
import BackPageButton from "./BackPageButton";

export default function YoutubePage({classx}) {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [docId, setDocId] = useState(null);

  document.title = `${classx} Youtube`;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const getTextFromFirebase = useCallback(async () => {
    const db = firebase.firestore();
    const textRef = db.collection(classx);

    try {
      const snapshot = await textRef
        .orderBy("createdAt", "desc")
        .limit(1)
        .get();
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setText(doc.data().content);
        setDocId(doc.id);
      } else {
        console.log("No documents found");
      }
    } catch (error) {
      console.error("Error getting text from Firestore:", error);
      alert("An error occurred while fetching the text.");
    }
  }, [classx]);

  const saveTextToFirebase = async () => {
    const db = firebase.firestore();
    const textRef = db.collection(classx);

    try {
      await textRef.add({
        content: text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      alert("Text saved successfully!");
    } catch (error) {
      console.error("Error saving text to Firestore:", error);
      alert("An error occurred while saving the text.");
    }
  };

  const updateTextInFirebase = async () => {
    const db = firebase.firestore();
  
    if (docId) {
      const textRef = db.collection(classx).doc(docId);
  
      try {
        await textRef.update({
          content: text,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert("Text updated successfully!");
      } catch (error) {
        console.error("Error updating text in Firestore:", error);
        alert("An error occurred while updating the text.");
      }
    } else {
      saveTextToFirebase();
    }
  };
  

  useEffect(() => {
    getTextFromFirebase();
  }, [getTextFromFirebase]);

  return (
    <div className="component-container">
      <BackPageButton />
      <h1>Youtube Page</h1>
      {currentUser ? (
        <div className="container ytb-input-container">
          <button id="ytb-input-btn" onClick={updateTextInFirebase}>Save Format</button>
          <textarea id="ytb-inputformat" value={text} onChange={handleChange}/>
        </div>
      ) : (
        <div>
          {<RenderYoutubeSections textInpt={text}/>}
        </div>
      )}
    </div>
  );
}
