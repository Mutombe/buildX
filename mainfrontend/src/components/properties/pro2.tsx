import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProperty } from "../../redux/propertySlice";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchCategories } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import UnitForm from "../units/unitForm";

const PropertyUploadForm = () => {
  const [propertyId, setPropertyId] = useState(0);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [propertyCount, setPropertyCount] = useState(1);
  const [unitCount, setUnitCount] = useState(1);
  const [unitAdding, setUnitAdding] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState();
  const [images, setImages] = useState<File[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.properties);
  console.log("Property Upload", user.id);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setImages([...e.target.files]);
  };

  const handleModalClose = () => {
    setShowUnitModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Creating FormData to send files along with property data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("category", category);
    console.log("Property Category", category);
    images.forEach((image, i) => {
      formData.append(`images[${i}]file`, image);
    });

    //if (["House", "Commercial", "Shop"].includes(category)) {
    // setShowUnitModal(true);
    // setUnitAdding(true);
    //}

    const result = await dispatch(uploadProperty(formData)).unwrap();
    
    console.log("Uploaded Property ID", result.id);
    if (result.id) {
      setPropertyCount(propertyCount + 1);
      setPropertyId(result.id);
      console.log("Uploaded Property ID.. dash", propertyId);
      navigate("/dashboard");
    }
    //navigate("/dashboard");
    //console.log(formData);
    //console.log("Uploading the Property", error);
  };

  const handleSaveAndAddAnother = async () => {
    await dispatch(uploadProperty(propertyData)).unwrap();
    setPropertyData({
      name: "",
      category: "",
      location: "",
      images: [],
    });
  };

  useEffect(() => {
    if (["House", "Commercial", "Shop"].includes(category)) {
      setUnitAdding(true);
    }
  }, [category, setUnitAdding]);

  const handleAddUnitsClick = () => {
    setShowUnitModal(true);
  };

  const handleUnitChange = (unitData: any) => {
    setUnitCount(unitCount + 1);
    //setUnits(unitData);
  };

  //const handleAddProperty = async () => {
  //const result = await dispatch(addProperty(propertyData)).unwrap();
  //setPropertyId(result.id);

  //if (propertyData.category === "supports_units") {
  //setShowModal(true);
  //} else {
  //navigate("/dashboard");
  //}
  //};

  return (
    <>
      <div>
        <Form.Group>
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
          />
        </Form.Group>
        <hr></hr>
      </div>

      <Button onClick={handleSubmit}>
        {loading ? "Uploading..." : "Upload Property"}
      </Button>

      <Button onClick={() => handleSaveAndAddAnother}>
        {loading ? "Uploading..." : "Save & Add Another"}
      </Button>
      {unitAdding && (
        <Button onClick={() => handleAddUnitsClick()}>Add Unit</Button>
      )}

      <Modal show={showUnitModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Adding Unit <strong>{unitCount}</strong></Modal.Title>
          <UnitForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyUploadForm;
