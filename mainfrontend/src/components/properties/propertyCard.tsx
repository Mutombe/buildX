import { Button, Skeleton } from "@mui/material";
import { Card, Carousel } from "react-bootstrap";
import "./properties.css";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "../image-preview/imagePreview";
import { useState } from "react";

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();
  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-2">
        <Card.Body>
          {property.has_images ? (
            <Carousel fade>
              {property.images.map((image, index) => (
                <Carousel.Item key={image.id} onClick={() => { setCurrentIndex(index); handleShow(); }}>
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
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>{property.location}</small>{" "}
          {property.has_units ? (
            ""
          ) : (
            <small>
              Booked<strong> {property.booked_count}</strong> times{" "}
            </small>
          )}
          <span>
            {property.has_units ? (
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => navigate(`/properties/${property.id}/units`)}
              >
                View Units
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => navigate(`/properties/${property.id}/book`)}
              >
                Book Property
              </Button>
            )}
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
    </>
  );
};

export default PropertyCard;
