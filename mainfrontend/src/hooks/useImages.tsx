import { useState } from "react";

const useImages = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const resetImages = () => {
    setImages([]);
  };

  return { images, handleImageChange, resetImages, removeImage };
};

export default useImages;
