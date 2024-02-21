'use client';

import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickerBtn() {
        imageInput.current.click();
    }

    function handleImageChange(e) {
      const file = e.target.files[0];
      console.log(file);

      if (!file) {
        setPickedImage(null);
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result) // = generated URL
      }
      fileReader.readAsDataURL(file);
    }
  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill/>}
        </div>
        <input
        className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button onClick={handlePickerBtn} className={styles.button} type="button">
            Pick an Image
        </button>
      </div>
    </div>
  );
}
