import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { updateProperty } from "../../redux/propertySlice";
import useImages from "../../hooks/useImages";
import { fetchCategories } from "../../redux/categorySlice";

interface EditPropertyModalProps {
  open: boolean;
  onClose: () => void;
  property: any;
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  open,
  onClose,
  property,
}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: any) => state.categories);
  const { loading, error } = useSelector((state: any) => state.properties);
  const { images, handleImageChange, removeImage, resetImages } = useImages();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    price_per_month: "",
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || "",
        category: property.category || "",
        location: property.location || "",
        price_per_month: property.price || "",
      });
    }
    dispatch(fetchCategories());
  }, [property, dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const propertyData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      propertyData.append(key, value);
    });

    images.forEach((image) => {
      propertyData.append("images", image.file);
    });

    dispatch(updateProperty({ id: property.id, propertyData }));
    resetImages();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Property</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          label="Property Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          placeholder={property.name}
        />
        <TextField
          label="Category"
          name="Category"
          value={formData.category}
          onChange={handleCategoryChange}
          fullWidth
          margin="normal"
          placeholder={property.category}
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          {categories.map((category: any) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          placeholder={property.location}
        />
        <TextField
          label="Price Per Month"
          name="price"
          value={formData.price_per_month}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
          placeholder={property.price_per_month}
        />

        {/* Image upload section */}
        <hr></hr>
        <div>
          <>
            <label>Images</label>
          </>
          <br />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
          />
          <div className="image-previews">
            {images.map((image, index) => (
              <div key={index} className="image-preview">
                <img
                  src={image.preview}
                  alt={`preview-${index}`}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <button type="button" onClick={() => removeImage(index)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPropertyModal;
