import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProperty } from "../../redux/propertySlice";
import { Form, Modal } from "react-bootstrap";
import { fetchCategories } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useImages from "../../hooks/useImages";
import UnitForm from "../units/unitForm";
import { Alert, Button, Stack } from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Badge from "@mui/material/Badge";
import "../css/imagePreview.css";

const PropertyUploadForm = () => {
  const initialPropertyData = { name: "", location: "", category: "" };
  const [propertyId, setPropertyId] = useState(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [propertyCount, setPropertyCount] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    values: propertyData,
    handleChange,
    resetForm,
  } = useForm(initialPropertyData);
  const { images, handleImageChange, resetImages, removeImage } = useImages();

  const { categories } = useSelector((state) => state.categories);
  const { loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const supportsUnits = (category) =>
    ["House", "Commercial", "Shop"].includes(category);

  const handleModalClose = () => {
    setShowUnitModal(false);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    saveAndAddAnother = false,
    saveAndAddUnit = false
  ) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((image, i) => {
      formData.append(`images[${i}]file`, image);
    });
    

    try {
      const result = await dispatch(uploadProperty(formData)).unwrap();
      console.log("Property result", result)
      if (result.id) {
        setPropertyId(result.id);
        localStorage.setItem("propertyId", result.id);
        if (saveAndAddAnother) {
          setPropertyCount(propertyCount + 1);
          resetForm();
          resetImages();
          console.log("Property ID", propertyId);
        } else if (saveAndAddUnit) {
          setShowUnitModal(true);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Failed to upload property:", error);
    }
  };

  useEffect(() => {
    console.log("Updated Property ID:", localStorage.getItem("propertyId"));
    setPropertyId(localStorage.getItem("propertyId"));
    console.log("Property ID", propertyId);
  }, [localStorage]);

  return (
    <>
      <div>
        <br></br>
        <strong>
          Uploading Property
          <Badge badgeContent={propertyCount} color="primary">
            <AddHomeIcon />
          </Badge>
        </strong>
        <br></br>
        <br></br>
        {error && <Alert>{error}</Alert>}
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
        <br></br>
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
      </div>
      <br></br>
      <Stack direction="row" spacing={1}>
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="contained"
          size="small"
        >
          {loading ? "Uploading..." : "Save"}
        </Button>

        <Button
          onClick={(e) => handleSubmit(e, true, false)}
          variant="contained"
          size="small"
        >
          {loading ? "Uploading..." : "Save & Add Another"}
        </Button>

        {supportsUnits(propertyData.category) && (
          <Button
            onClick={(e) => handleSubmit(e, false, true)}
            variant="contained"
            size="small"
          >
            Save & Add Unit
          </Button>
        )}
      </Stack>

      <Modal show={showUnitModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title></Modal.Title>
          <UnitForm propertyId={localStorage.getItem("propertyId")} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyUploadForm;
