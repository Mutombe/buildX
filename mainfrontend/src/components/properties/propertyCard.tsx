import React, { useState } from 'react';
import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Skeleton,
  Typography,
  Drawer,
  Box,
  Divider,
} from "@mui/material";
import { Card, Carousel } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CloseIcon from '@mui/icons-material/Close';
import "./properties.css";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "../image-preview/imagePreview";
import Accordion from "@mui/material/Accordion";

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button onClick={toggleDrawer(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </Button>
      <Box sx={{ p: 2, pt: 5 }}>
        <Typography variant="body2">
          <strong>{property.category}</strong>
        </Typography>
        <Divider />
        <Typography variant="h6" gutterBottom>
          {property.name}
        </Typography>
        <Typography variant="body1" paragraph>
          <FmdGoodOutlinedIcon /> {property.location}
        </Typography>
        <Typography variant="body2">
          Booked <strong>{property.booked_count}</strong> times
        </Typography>
        {/* Add more property details here */}
      </Box>
    </Box>
  );

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-2">
        <Card.Body>
          {property.has_images ? (
            <Carousel fade>
              {property.images.map((image, index) => (
                <Carousel.Item
                  key={image.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    handleShow();
                  }}
                >
                  <img className="card-img" src={image.file} alt={image.name} />
                  <Carousel.Caption>{image.name}</Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          )}
          <Card.Title>{property.name.substr(0, 20)}...</Card.Title>
        </Card.Body>
        <Card.Footer>
          <small>{property.location}</small>{" "}
          <span>
            {property.has_units ? (
              <Button
                variant="outlined"
                className="ms-2"
                onClick={() => navigate(`/property/${property.id}/units`)}
              >
                View Units
              </Button>
            ) : (
              <>
                <small>
                  Booked<strong> {property.booked_count}</strong> times{" "}
                </small>
                <small>
                  <><br /></>
                  <strong> {property.category}</strong>
                </small>
                <Button
                  variant="outlined"
                  className="ms-2"
                  onClick={() => navigate(`/book/properties/${property.id}/`)}
                >
                  Book Property
                </Button>
              </>
            )}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                onClick={toggleDrawer(true)}
              >
                <Typography>Details</Typography>
              </AccordionSummary>
            </Accordion>
          </span>
        </Card.Footer>
      </Card>
      <ImagePreviewModal
        show={showModal}
        onHide={handleClose}
        images={property.images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default PropertyCard;