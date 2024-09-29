import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUnit } from "../../redux/unitSlice";
import useImages from "../../hooks/useImages";

interface EditUnitModalProps {
  open: boolean;
  onClose: () => void;
  unit: any;
}

const EditUnitModal: React.FC<EditUnitModalProps> = ({ open, onClose, unit }) => {
  const dispatch = useDispatch();
  const { images, setImages, handleImageChange, removeImage, resetImages } = useImages();

  // Form state initialization based on passed unit data
  const [formData, setFormData] = useState({
    name: "",
    kitchen: false,
    bathroom: false,
    toilet: false,
    water: false,
    solar: false,
    price_per_month: "",
  });

  useEffect(() => {
    if (unit) {
      setFormData({
        name: unit.name || "",
        kitchen: unit.kitchen || false,
        bathroom: unit.bathroom || false,
        toilet: unit.toilet || false,
        water: unit.water || false,
        solar: unit.solar || false,
        price_per_month: unit.price_per_month || "",
      });
      
      // Set unit images with preview URLs
      const unitImagesWithPreview = unit.images.map((image) => ({
        file: image, // Assuming 'image' is the file object; if it's a URL, adjust as necessary
        preview: image, // If 'image' is a URL, keep it as is; otherwise, create a URL using URL.createObjectURL()
      }));
      setImages(unitImagesWithPreview); // Set unit images with previews
    }
  }, [unit, setImages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSave = () => {
    const updatedUnitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      updatedUnitData.append(key, value.toString());
    });

    images.forEach((image) => {
      updatedUnitData.append("images", image.file);
    });

    dispatch(updateUnit({ id: unit.id, unitData: updatedUnitData }));
    resetImages();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Unit</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Unit Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {/* Checkbox Fields */}
          {["kitchen", "bathroom", "toilet", "water", "solar"].map((field) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={field}
                  checked={formData[field]}
                  onChange={handleCheckboxChange}
                />
              }
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              key={field}
            />
          ))}

          <TextField
            label="Price per Month"
            name="price_per_month"
            type="number"
            value={formData.price_per_month}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {/* Image Handling */}
          <Typography variant="h6">Current Images</Typography>
          <Stack spacing={1}>
            {images.map((image, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                <img src={image.preview} alt={`unit-img-${index}`} width={80} />
                <IconButton onClick={() => removeImage(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          <Typography variant="h6">Add New Images</Typography>
          <Button variant="outlined" component="label">
            Upload Images
            <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUnitModal;
