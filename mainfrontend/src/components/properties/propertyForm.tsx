import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/propertySlice";
import { createProperty } from "../../redux/propertySlice";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UnitForm from "../units/unitForm";

const PropertyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get category state
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [propertyData, setPropertyData] = useState({
    name: "",
    category: "",
    location: "",
    images: [],
  });

  //const [units, setUnits] = useState([]);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [isAddingAnother, setIsAddingAnother] = useState(false);
  const [propertyCount, setPropertyCount] = useState(1);
  const [unitCount, setUnitCount] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isAddingAnother) {
      // Reset form fields when adding another property
      // Save the already added property and label how many have been added
      setPropertyData({
        name: "",
        category: "",
        location: "",
        images: [],
      });
      //Increment the number of units added and display it
      //setUnits([]);
      setShowUnitModal(false);
    }
  }, [isAddingAnother]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleImageChange = (e: any) => {
    setPropertyData({ ...propertyData, images: e.target.files });
  };

  const handleUnitChange = (unitData: any) => {
    setUnitCount(unitCount + 1);
    //setUnits(unitData);
  };

  //Submitting data through redux state management -> createProperty API function -> the backend
  //const handleSubmit = async (saveAndAddAnother = false) => {
    //const response = await dispatch(createProperty({ ...propertyData, units }));

    //if (response?.payload?.id) {
      //if (saveAndAddAnother) {
        //setIsAddingAnother(true);
        //setPropertyCount(propertyCount + 1);
      //} else {
        //navigate("/dashboard");
      //}
    //}
  //};

  const handleSubmit = async (saveAndAddAnother = false) => {
    const response = await dispatch(createProperty({ ...propertyData}));

    if (response?.payload?.id) {
      if (saveAndAddAnother) {
        setIsAddingAnother(true);
        setPropertyCount(propertyCount + 1);
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleAddUnitsClick = () => {
    // Only show the unit modal if the category supports units
    if (["House", "Commercial", "Shop"].includes(propertyData.category)) {
      setShowUnitModal(true);
    } else {
      handleSubmit(false);
    }
  };

  const handleModalClose = () => {
    setShowUnitModal(false);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Add New Property</h3>
      <h2>Adding Property {propertyCount}</h2>
      <Form.Group>
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={propertyData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={propertyData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={propertyData.location}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
        />
      </Form.Group>

      <Button onClick={() => handleSubmit(false)}>Save</Button>
      <Button onClick={() => handleSubmit(true)}>Save & Add Another</Button>
      <Button onClick={handleAddUnitsClick}>Add Units</Button>

      <Modal show={showUnitModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Units</Modal.Title>
          <Modal.Title>Adding Unit {unitCount}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitForm onUnitChange={handleUnitChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(false);
              handleModalClose();
            }}
          >
            Save & Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(true);
              handleModalClose();
            }}
          >
            Save & Add Another Property
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyForm;
