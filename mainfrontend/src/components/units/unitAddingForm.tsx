import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUnit } from "../../redux/unitSlice";
import useForm from "../../hooks/useForm";
import useImages from "../../hooks/useImages";
import { Badge, Button, Stack } from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";

const UnitForm = ({ propertyId }) => {
  const initialUnitData = {
    name: "",
    price_per_month: "",
    kitchen: true,
    bathroom: false,
    toilet: false,
    water: false,
    solar: false,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unitCount, setUnitCount] = useState(1);

  const {
    values: unitData,
    handleChange,
    resetForm: resetUnitForm,
  } = useForm(initialUnitData);

  const { images, handleImageChange, resetImages, removeImage } = useImages();

  const handleAddUnit = async (
    e: React.FormEvent,
    saveAndAddAnother = false
  ) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(unitData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((image, i) => {
      formData.append(`images[${i}]file`, image.file);
    });

    console.log("Unit form data", formData.getAll("images"));

    await dispatch(addUnit({ property_id: propertyId, formData }));

    if (saveAndAddAnother) {
      setUnitCount(unitCount + 1);
      resetUnitForm();
      resetImages();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Form.Group controlId="unitName">
        <strong>
          Adding Unit
          <span>
            <Badge badgeContent={unitCount} color="primary">
              <ExtensionIcon />
            </Badge>
          </span>
        </strong>
        <br></br>
        <br></br>
        <Form.Label>Unit Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={unitData.name}
          onChange={handleChange}
          required
          placeholder="2 rooms, Office 4(Second Floor)"
        />
        <Form.Label>Price Per Month</Form.Label>
        <Form.Control
          type="number"
          name="price_per_month"
          value={unitData.price_per_month}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            name="kitchen"
            label="Kitchen"
            required
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="bathroom"
            label="Bathroom"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Form.Check
            type="checkbox"
            name="toilet"
            label="Toilet"
            required
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="water"
            label="Water"
            required
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="solar"
            label="Solar"
            required
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Form.Group controlId="unitImages">
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
        />
      </Form.Group>
      <br />
      <div className="image-previews">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image.preview} alt={`preview-${index}`} />
            <button type="button" onClick={() => removeImage(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <br></br>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={(e) => {
            handleAddUnit(e, false);
          }}
        >
          Save & Close
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            handleAddUnit(e, true);
          }}
        >
          Save & Add Another Unit
        </Button>
      </Stack>
    </div>
  );
};

export default UnitForm;
