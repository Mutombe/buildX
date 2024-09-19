import { useState } from 'react';
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CloseIcon from '@mui/icons-material/Close';
import "./properties.css";
import { useNavigate } from "react-router-dom";
import ImagePreviewModal from "../image-preview/imagePreview";
import DrawerUnitList from './drawerUnitList';
import SubscriptionButton from './propertySubscription';
import { togglePinProperty } from '../../redux/propertySlice';
import { useDispatch } from 'react-redux';

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePinToggle = () => {
    dispatch(togglePinProperty(property.id));
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 300, p: 3 }}
      role="presentation"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{property.name}</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography variant="body1" gutterBottom>
          <FmdGoodOutlinedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          {property.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>{property.category}</strong>
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

  return (<>
    <Card style={{ width: "18rem", boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} className="mb-3">
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
                style={{ cursor: 'pointer' }}
              >
                <img 
                  className="d-block w-100" 
                  src={image.file} 
                  alt={image.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <Typography variant="caption" sx={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' }}>
                    {image.name}
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
          <Typography variant="h6" gutterBottom>
            {property.name.length > 20 ? `${property.name.substr(0, 20)}...` : property.name}
          </Typography>
          <SubscriptionButton property_id={property.id}/>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <FmdGoodOutlinedIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
            {property.location}
          </Typography>
          {property.has_units ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/property/${property.id}/units`)}
              fullWidth
              sx={{ mt: 1 }}
            >
              View Units
            </Button>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Booked <strong>{property.booked_count}</strong> times · <strong>{property.category}</strong>
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(`/book/properties/${property.id}/`)}
                fullWidth
                sx={{ mt: 1 }}
              >
                Book Property
              </Button>
            </>
          )}
          <Button
            variant="text"
            size="small"
            startIcon={<ExpandMoreIcon />}
            onClick={toggleDrawer(true)}
            fullWidth
            sx={{ mt: 1 }}
          >
            Details
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Typography variant="body2" color="text.secondary">
          {property.pinned ? 'Pinned' : 'Not Pinned'}
        </Typography>
        <IconButton onClick={handlePinToggle} color={property.pinned ? 'primary' : 'default'}>
          {property.pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
        </IconButton>
      </Box>
      </Card.Body>
      
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
    </Card>
    </>
  );
};

export default PropertyCard;