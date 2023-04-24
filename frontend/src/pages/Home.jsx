import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("image", selectedImage);

    // try {
    //   const res = await axios.post("/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(res.data);
    // } catch (err) {
    //   console.error(err);
    // }

    axios
      .post("/predict",selectedImage)
      .then((data) => console.log(data.data))
      .catch((err) => console.error(err.message));
  };
  return (
    <div className="flex flex-col  items-center p-20 h-screen bg-gray-100">
      <h1 className="font-bold text-3xl tracking-widest">
        Intelligent Image Classifier
      </h1>

      <div className=" p-5 shadow-md mt-10 border-2 bg-white">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageInputChange}
        />
      </div>
      {selectedImage && (
        <img src={selectedImage} width="200" height="200" alt="jkbd" className="mt-10" />
      )}

      <button
        className="p-2 min-w-[200px] bg-amber-600 mt-10 rounded-md hover:bg-amber-900 text-white"
        onClick={handleClick}
      >
        Predict
      </button>
    </div>
  );
};

export default Home;
