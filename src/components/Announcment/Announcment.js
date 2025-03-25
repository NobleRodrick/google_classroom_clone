import React, { useState, useEffect } from "react";
import db, { storage } from "../../lib/firebase";
import { Avatar, Button } from "@mui/material";
import "./style.css";

const Announcement = ({ classData }) => {
  const [announcement, setAnnouncement] = useState([]);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]); // Set the selected file to state
    }
  };

  // Handle posting the announcement
  const handlePost = async () => {
    if (!file || !text) {
      console.error("File or text is missing.");
      return;
    }

    setIsUploading(true); // Set uploading state

    try {
      // Upload the file to Firebase Storage
      const fileRef = storage.ref().child("announcement_images/" + file.name);
      await fileRef.put(file); // Upload the file

      // Get the download URL for the uploaded file
      const fileURL = await fileRef.getDownloadURL();

      // Save the announcement to Firestore
      await db.collection("announcements").doc("classes").collection(classData.id).add({
        sender: "Instructor", // Change this to the sender's name
        text: text,
        imageUrl: fileURL,
        timestamp: new Date(),
      });

      setIsUploading(false); // Reset uploading state
      setText(""); // Reset the text field
      setFile(null); // Reset the file state
    } catch (error) {
      console.error("Error uploading the announcement:", error);
      setIsUploading(false); // Reset uploading state on error
    }
  };

  // Fetch announcements when classData changes
  useEffect(() => {
    if (classData) {
      const unsubscribe = db
        .collection("announcements")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snapshot) => {
          setAnnouncement(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);

  return (
    <div>
      {/* File input for selecting an image */}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        disabled={isUploading}
      />
      <br />

      {/* Text input for the announcement message */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your announcement text"
        disabled={isUploading}
      />
      <br />

      {/* Post button */}
      <Button
        onClick={handlePost}
        disabled={isUploading || !file || !text}
      >
        {isUploading ? "Uploading..." : "Post Announcement"}
      </Button>

      {/* Display the list of announcements */}
      {announcement.map((item, index) => (
        <div className="amt" key={index}>
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
            <img className="amt__img" src={item.imageUrl} alt={item.text} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;

