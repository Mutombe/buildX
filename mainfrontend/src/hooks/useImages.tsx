import { useState } from "react";

const useImages = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const resetImages = () => {
    setImages([]);
  };

  return { images, handleImageChange, resetImages };
};

export default useImages;
