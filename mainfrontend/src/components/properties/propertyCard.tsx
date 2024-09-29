import { useState } from "react";
import {
  Button,
  Skeleton,
  Typography,
  Drawer,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Card, Carousel } from "react-bootstrap";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CloseIcon from "@mui/icons-material/Close";
import "./css/properties.css";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "../image-preview/imagePreview";
import DrawerUnitList from "./drawerUnitList";
import SubscriptionButton from "./propertySubscription";
import { togglePinProperty } from "../../redux/propertySlice";
import { useDispatch } from "react-redux";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Chip } from "@mui/joy";
import { Info } from "@mui/icons-material";
import { Boxes, MapPin } from "lucide-react";

const PropertyCard = ({ property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePinToggle = () => {
    dispatch(togglePinProperty(property.id));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 300, p: 3 }} role="presentation" >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">{property.name}</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography variant="body1" gutterBottom>
          <FmdGoodOutlinedIcon
            sx={{ mr: 1, verticalAlign: "middle" }}
            style={{ color: "#6c757d" }}
          />
          {property.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Chip variant="soft" color="primary">
            {property.category}
          </Chip>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Booked <strong>{property.booked_count}</strong> times
        </Typography>
      </Box>
      <Divider />
      <Box my={2}>
        <DrawerUnitList property={property} />
      </Box>
    </Box>
  );

  return (
    <>
      <Card
        style={{ width: "18rem", boxShadow: "#79afff 0px 4px 8px" }}
        className="mb-3"
      >
        <Card.Body style={{ padding: 0 }}>
          {property.has_images ? (
            <Carousel fade interval={null} indicators={false}>
              {property.images.map((image, index) => (
                <Carousel.Item
                  key={image.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    handleShow();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="d-block w-100"
                    src={image.file}
                    alt={image.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Carousel.Caption>
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {image.name ? image.name : "View"}
                    </Typography>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              animation="wave"
            />
          )}
          <Box p={2}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              noWrap
              style={{ display: "flex" }}
            >
              {property.name.length > 20
                ? `${property.name.substr(0, 20)}...`
                : property.name}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  style={{ display: "flex" }}
                >
                  <MapPin />
                  {property.location}
                </Typography>
              </Box>
              <Box>
                <SubscriptionButton property_id={property.id} />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={1}
              mt={1}
              sx={{ width: "100%" }}
            >
              {property.has_units ? (
                <>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: "20px" }}
                    onClick={() => navigate(`/property/${property.id}/units`)}
                    fullWidth
                    startIcon={<Boxes size={15}/>}
                  >
                    View Units
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleDrawer(true)}
                    fullWidth
                    sx={{ borderRadius: "20px" }}
                    startIcon={<Info />}
                  >
                    Details
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    sx={{ borderRadius: "20px" }}
                    size="small"
                    onClick={() => navigate(`/book/properties/${property.id}/`)}
                    fullWidth
                  >
                    Book Property
                  </Button>
                  <Typography
                    sx={{ marginTop: "5px" }}
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    <Chip variant="soft" color="primary">
                      {property.category}
                    </Chip>
                    <strong></strong>
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={1}
          >
            <Typography
              sx={{ marginLeft: "10px" }}
              variant="body2"
              color="text.secondary"
            >
              <Chip
                variant={property.pinned ? "solid" : "soft"}
                color={property.pinned ? "primary" : "neutral"}
              >
                {property.pinned ? "Pinned" : "Not Pinned"}
              </Chip>
            </Typography>
            <IconButton
              onClick={handlePinToggle}
              color={property.pinned ? "primary" : "default"}
            >
              {property.pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
            </IconButton>
          </Box>
        </Card.Body>

        <ImagePreviewModal
          show={show}
          onHide={handleClose}
          images={property.images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}        
        />
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      </Card>
    </>
  );
};

export default PropertyCard;
