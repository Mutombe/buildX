import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalDialog,
  TextField,
  Checkbox,
  Button,
  Typography,
  Stack,
  IconButton,
} from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUnit } from "../../redux/unitSlice";
import useImages from "../../hooks/useImages";
import useForm from "../../hooks/useForm";

interface EditUnitModalProps {
  open: boolean;
  onClose: () => void;
  unit: any;
}

const EditUnitModal: React.FC<EditUnitModalProps> = ({
  open,
  onClose,
  unit,
}) => {
  //const { loading, error } = useSelector((state) => state.unit);

  const { images, setImages, handleImageChange, removeImage, resetImages } = useImages();
  const dispatch = useDispatch();
  const [initialUnitData, setInitialUnitData] = useState ({
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
      setInitialUnitData({
        name: unit.name || "",
        kitchen: unit.kitchen || false,
        bathroom: unit.bathroom || false,
        toilet: unit.toilet || false,
        water: unit.water || false,
        solar: unit.solar || false,
        price_per_month: unit.price_per_month || '',
      });
      setImages([...unit.images]);
    }
  }, [unit]);

  const {
    values: unitData,
    handleChange,
    resetForm,
  } = useForm(initialUnitData);

  const handleSave = () => {
    const unitData = new FormData();
    Object.entries(initialUnitData).forEach(([key, value]) => {
      unitData.append(key, value);
    });

    // Add new images to formData
    images.forEach((image) => {
      unitData.append("images", image.file);
    });
    dispatch(updateUnit({ id: unitId, unitData: unitData }));
    resetForm();
    resetImages();
    onClose();
  };

  // Render modal form
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <Stack spacing={2}>
          <Typography level="h5">Edit Unit</Typography>
          <TextField
            name="name"
            label="Unit Name"
            value={initialUnitData.name}
            onChange={handleChange}
          />
          <Checkbox
            name="kitchen"
            checked={initialUnitData.kitchen}
            onChange={handleChange}
          >
            Kitchen
          </Checkbox>
          <Checkbox
            name="bathroom"
            checked={initialUnitData.bathroom}
            onChange={handleChange}
          >
            Bathroom
          </Checkbox>
          <Checkbox
            name="toilet"
            checked={initialUnitData.toilet}
            onChange={handleChange}
          >
            Toilet
          </Checkbox>
          <Checkbox
            name="water"
            checked={initialUnitData.water}
            onChange={handleChange}
          >
            Water
          </Checkbox>
          <Checkbox
            name="solar"
            checked={initialUnitData.solar}
            onChange={handleChange}
          >
            Solar
          </Checkbox>
          <TextField
            name="price_per_month"
            label="Price per Month"
            type="number"
            value={initialUnitData.price_per_month}
            onChange={handleChange}
          />

          {/* Display current images */}
          <Typography level="h6">Current Images</Typography>
          <Stack spacing={1}>
            {images.map((image, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                <img src={image.file} alt={`unit-img-${index}`} width={80} />
                <IconButton onClick={() => removeImage(index)} color="danger">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          {/* Upload new images */}
          <Typography level="h6">Add New Images</Typography>
          <Button
            variant="outlined"
            component="label"
            startDecorator={<ImageIcon />}
          >
            Upload Images
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default EditUnitModal;
