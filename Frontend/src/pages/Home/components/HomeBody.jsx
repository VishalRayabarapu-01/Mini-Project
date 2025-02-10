import React from "react";
import { useState } from "react";
import axios from "axios";

export default function HomeBody() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [breed, setBreed] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData
      );
      if (response.data) {
        console.log(response.data);
        setImage(response.data.image);
        setBreed(response.data.breed);
        setFile(null);
      } else {
        alert("Something went wrong !!!");
      }
    } catch (error) {
      alert("Something  went wrong !!!");
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!file) {
      alert("Please select a file to upload!");
    } else {
      await uploadImage();
    }
    setLoading(false);
  };

  return (
    <div
      className="container mt-5 mb-5 mx-auto"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="text-light">
        <h2 className="header mb-5 text-center">
          --- Identify your dog-breed ---
        </h2>
        <div className="upload mb-5 text-center">
          <label htmlFor="formFile" className="form-label">
            Upload your dog image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              handleSubmit();
            }}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {image && breed && (
          <div className="upload mt-5 mb-5">
            <img
              src={image}
              class="img-thumbnail"
              alt="Dog Image"
              style={{ width: "500px", height: "500px" }}
            />
            {/* to maintain exact aspect ratio of the image remove height property in above styles */}
            <h2 className="mt-3 text-center"> Dog-Breed: {breed}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
