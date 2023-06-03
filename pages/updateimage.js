import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";
import { auth } from "../configurations/firebase";
import swal from "sweetalert";
import styles from "../styles/Login.module.css";

const UpdateImagePage = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  // Function to handle file selection
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle saving the updated image
  const handleSave = async () => {
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      await updateProfile(auth.currentUser, { photoURL: imageURL });
      await swal("Success!", "Your profile image has been updated!", "success");
      await router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Image</h1>

      <img
        className={`${styles.info} ${styles.roundImage}`}
        src={auth?.currentUser?.photoURL}
        alt="User Image"
      />

      <label htmlFor="fileInput">Select your new image to upload</label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileSelect}
        ref={fileInputRef}
      />

      <button className={styles.btn} onClick={handleSave}>Save</button>
    </div>
  );
};

export default UpdateImagePage;
