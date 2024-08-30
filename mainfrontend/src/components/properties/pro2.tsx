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
  const [images, setImages] = useState<File[]>([]);

  const [propertyData, setPropertyData] = useState({
    name: "",
    location: "",
    category: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.properties);
  console.log("Property Upload", user.id);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const supportsUnits = (category) =>
    ["House", "Commercial", "Shop"].includes(category);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleFileChange = (e, setter) => {
    setter([...e.target.files]);
  };

  const handleModalClose = () => {
    setShowUnitModal(false);
  };

  const handleSubmit = async (e: React.FormEvent, saveAndAddAnother = false) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((image, i) => {
      formData.append(`images[${i}]file`, image);
    });

    const result = await dispatch(uploadProperty(formData)).unwrap();

    console.log("Uploaded Property ID", result.id);
    if (result.id) {
      setPropertyCount(propertyCount + 1);
      setPropertyId(result.id);
      if (saveAndAddAnother) {
        setPropertyData({ name: "", location: "", category: "" });
        setImages([]);
      } else {
        navigate("/dashboard");
       }
      console.log("Uploaded Property ID.. dash", propertyId); 
    }
  };


  return (
    <>
      <div>
        <strong>Uploading property {propertyCount}</strong>
        <Form.Group>
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={propertyData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={propertyData.category}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={(e) => handleFileChange(e, setImages)}
          />
        </Form.Group>
        <hr></hr>
      </div>

      <Button onClick={(e) => handleSubmit(e)}>
        {loading ? "Uploading..." : "Upload Property"}
      </Button>

      <Button onClick={(e) => handleSubmit(e, true)}>
        {loading ? "Uploading..." : "Save & Add Another"}
      </Button>

      {supportsUnits(propertyData.category) && (
        <Button onClick={() => setShowUnitModal(true)}>Add Unit</Button>
      )}

      <Modal show={showUnitModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>
            Adding Unit <strong>{unitCount}</strong>
          </Modal.Title>
          <UnitForm propertyId={propertyId} />
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
