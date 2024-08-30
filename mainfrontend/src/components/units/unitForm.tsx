import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUnit } from "../../redux/unitSlice";

const UnitForm = ({ propertyId }) => {
  //const { propertyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [unitCount, setUnitCount] = useState(1);

  const [unitData, setUnitData] = useState({
    name: "",
    kitchen: false,
    bathroom: false,
    toilet: false,
    water: false,
    solar: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUnitData({
      ...unitData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setUnitData({ ...unitData, images: e.target.files });
  };

  const handleAddUnit = async () => {
    setUnitCount(unitCount + 1);
    await dispatch(addUnit({ ...unitData, property_id: propertyId }));
    navigate("/dashboard");
  };

  const handleSaveAndAddAnother = async () => {
    await dispatch(addUnit({ ...unitData, property_id: propertyId }));
    setUnitCount(unitCount + 1);
    setUnitData({
      name: "",
      kitchen: false,
      bathroom: false,
      toilet: false,
      water: false,
      solar: false,
      images: [],
    });
  };

  return (
    <div>
      <Form.Group controlId="unitName">
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
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="water"
            label="Water"
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            name="solar"
            label="Solar"
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
      <Button
        variant="primary"
        onClick={() => {
          handleAddUnit();
        }}
      >
        Save & Close
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          handleSaveAndAddAnother();
        }}
      >
        Save & Add Another Unit
      </Button>
    </div>
  );
};

export default UnitForm;
