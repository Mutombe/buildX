import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProperty } from "../../redux/propertySlice";
import { Form, Modal } from "react-bootstrap";
import { fetchCategories } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useImages from "../../hooks/useImages";
import UnitForm from "../units/unitAddingForm";
import { Alert, Button, Stack, CircularProgress } from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Badge from "@mui/material/Badge";
import "../css/imagePreview.css";

const PropertyUploadForm = () => {
  const initialPropertyData = { name: "", location: "", category: "", price_per_month: "" };
  const [propertyId, setPropertyId] = useState(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [propertyCount, setPropertyCount] = useState(1);
  const [formErrors, setFormErrors] = useState({});

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

  const validateForm = () => {
    const errors = {};
    if (!propertyData.name) errors.name = "Property name is required";
    if (!propertyData.category) errors.category = "Category is required";
    if (!propertyData.location) errors.location = "Location is required";
    if (!propertyData.price_per_month) errors.price_per_month = "Price is required";
    if (images.length === 0) errors.images = "At least one image is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e, saveAndAddAnother = false, saveAndAddUnit = false) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((image, i) => {
      formData.append(`images[${i}]file`, image.file);
    });

    try {
      const result = await dispatch(uploadProperty(formData)).unwrap();
      if (result.id) {
        setPropertyId(result.id);
        localStorage.setItem("propertId", result.id);
        if (saveAndAddAnother) {
          setPropertyCount(propertyCount + 1);
          resetForm();
          resetImages();
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
    setPropertyId(localStorage.getItem("propertyId"));
  }, []);

  return (
    <div className="property-upload-form" style={{ marginTop: "70px" }}>
      <h2>
        Uploading Property
        <Badge badgeContent={propertyCount} color="primary">
          <AddHomeIcon />
        </Badge>
      </h2>
      {error && <Alert severity="error">{error}</Alert>}
      <Form onSubmit={(e) => handleSubmit(e)} noValidate>
        <Form.Group>
          <Form.Label htmlFor="name">Property Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            value={propertyData.name}
            onChange={handleChange}
            required
            placeholder="4 People Tent, 33 Street, Willovale Avenue"
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category">Category</Form.Label>
          <Form.Control
            id="category"
            as="select"
            name="category"
            value={propertyData.category}
            onChange={handleChange}
            required
            isInvalid={!!formErrors.category}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formErrors.category}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="location">Location</Form.Label>
          <Form.Control
            id="location"
            type="text"
            name="location"
            value={propertyData.location}
            onChange={handleChange}
            required
            placeholder="Harare CBD, Masvingo CBD"
            isInvalid={!!formErrors.location}
          />
          <Form.Control.Feedback type="invalid">{formErrors.location}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="price_per_month">Price Per Month</Form.Label>
          <Form.Control
            id="price_per_month"
            type="number"
            name="price_per_month"
            value={propertyData.price_per_month}
            onChange={handleChange}
            required
            placeholder="Don't fill If not Applicable"
            isInvalid={!!formErrors.price_per_month}
          />
          <Form.Control.Feedback type="invalid">{formErrors.price_per_month}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="images">Images</Form.Label>
          <Form.Control
            id="images"
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            isInvalid={!!formErrors.images}
          />
          <Form.Control.Feedback type="invalid">{formErrors.images}</Form.Control.Feedback>
        </Form.Group>
        <div className="image-previews">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image.preview} alt={`preview-${index}`} />
              <button type="button" onClick={() => removeImage(index)} aria-label={`Remove image ${index + 1}`}>
                &times;
              </button>
            </div>
          ))}
        </div>
        <Stack direction="row" spacing={1} className="mt-3">
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, true, false)}
            variant="contained"
            size="small"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save & Add Another"}
          </Button>
          {supportsUnits(propertyData.category) && (
            <Button
              onClick={(e) => handleSubmit(e, false, true)}
              variant="contained"
              size="small"
              disabled={loading}
            >
              Save & Add Unit
            </Button>
          )}
        </Stack>
      </Form>
      <Modal show={showUnitModal} onHide={handleModalClose} style={{marginTop: "70px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitForm property={localStorage.getItem("propertyId")} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyUploadForm;