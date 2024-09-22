import { useState } from "react";

const useImages = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedImages = selectedFiles.map((file) => ({
      file,
      // Create image preview
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...updatedImages]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const resetImages = () => {
    setImages([]);
  };

  return { images, setImages, handleImageChange, removeImage, resetImages };
};

export default useImages;
