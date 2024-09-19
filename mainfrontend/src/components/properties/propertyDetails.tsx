import { Button, Typography, Box } from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import './drawer.css'

const PropertyDetails = ({ property, onBackClick }) => {
  return (
    <Box className="property-details">
      <Button onClick={onBackClick} variant="outlined" sx={{ mb: 2 }}>Back</Button>
      <Typography variant="h4" gutterBottom>{property.name}</Typography>
      <Typography variant="body1" gutterBottom>
        <FmdGoodOutlinedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        {property.location}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        <strong>{property.category}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Booked <strong>{property.booked_count}</strong> times
      </Typography>
      {/* Add more details here */}
    </Box>
  );
};

export default PropertyDetails;