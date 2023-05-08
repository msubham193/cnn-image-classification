import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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
      .post("/predict", selectedImage)
      .then((data) => {
        setPrediction(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  };
  return (
    <div className="flex flex-col w-screen  items-center p-20 h-screen bg-gray-100 text-center ">
      <h1 className="font-bold text-lg w-full bg-slate-800  sm:text-4xl tracking-widest bg-gradient-to-r  from-yellow-600 to-red-600 bg-clip-text text-transparent">
        Intelligent Image Classifier
      </h1>

      <div className=" p-5 shadow-md mt-10 border-2 bg-white w-56 sm:w-full text-sm ">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageInputChange}
        />
      </div>
      {selectedImage && (
        <img
          src={selectedImage}
          width="200"
          height="200"
          alt="jkbd"
          className="mt-10"
        />
      )}

      <button
        className="p-2 min-w-[200px] bg-amber-600 mt-10 rounded-md hover:bg-amber-900 text-white "
        onClick={handleClick}
      >
        Predict
      </button>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          Predicting....
        </div>
      ) : (
        <div className="mt-10 text-4xl font-bold">
          {prediction.length > 0 ? prediction : ""}
        </div>
      )}
    </div>
  );
};

export default Home;
