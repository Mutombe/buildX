import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const UnitForm = ({ onUnitChange }) => {
  const [unitData, setUnitData] = useState({
    name: '',
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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setUnitData({ ...unitData, images: e.target.files });
  };

  const handleAddUnit = () => {
    onUnitChange(unitData);
    setUnitData({
      name: '',
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
          <Form.Check type="checkbox" name="kitchen" label="Kitchen" onChange={handleChange} />
          <Form.Check type="checkbox" name="bathroom" label="Bathroom" onChange={handleChange} />
        </Col>
        <Col>
          <Form.Check type="checkbox" name="toilet" label="Toilet" onChange={handleChange} />
          <Form.Check type="checkbox" name="water" label="Water" onChange={handleChange} />
          <Form.Check type="checkbox" name="solar" label="Solar" onChange={handleChange} />
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
      <Button onClick={handleAddUnit}>Add Unit</Button>
    </div>
  );
};

export default UnitForm;


