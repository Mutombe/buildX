import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUnit } from "../../redux/unitSlice";
import useForm from "../../hooks/useForm";
import useImages from "../../hooks/useImages";
import { Button, Stack } from "@mui/material";

const UnitForm = ({ propertyId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unitCount, setUnitCount] = useState(1);

  const initialUnitData = {
    name: "",
    kitchen: false,
    bathroom: false,
    toilet: false,
    water: false,
    solar: false,
  };

  const {
    values: unitData,
    handleChange,
    resetForm: resetUnitForm,
  } = useForm(initialUnitData);
  const { images, handleImageChange, resetImages, removeImage } = useImages();

  const handleAddUnit = async () => {
    setUnitCount(unitCount + 1);
    await dispatch(addUnit({ property_id: propertyId, ...unitData, images }));
    navigate("/dashboard");
  };

  const handleSaveAndAddAnother = async () => {
    await dispatch(addUnit({ ...unitData, property_id: propertyId }));
    setUnitCount(unitCount + 1);
    resetUnitForm();
    resetImages();
  };

  return (
    <div>
      <Form.Group controlId="unitName">
        <h4>
          Adding Unit <strong>{unitCount}</strong>
        </h4>
        <Form.Label>Unit Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={unitData.name}
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

      {/*<div className="image-previews">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image.preview} alt={`preview-${index}`} />
            <button type="button" onClick={() => removeImage(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>*/}
      <br></br>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() => {
            handleAddUnit();
          }}
        >
          Save & Close
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSaveAndAddAnother();
          }}
        >
          Save & Add Another Unit
        </Button>
      </Stack>
    </div>
  );
};

export default UnitForm;
