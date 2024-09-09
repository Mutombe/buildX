import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { bookProperty, bookUnit } from '../../redux/bookingSlice';

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
  const { startDate, endDate, bookingType, propertyId, unitId } = bookingDetails;

  // Convert startDate and endDate strings to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = endDate ? new Date(endDate) : null;

  const handleConfirm = () => {
    if (unitId) {
      dispatch(bookUnit(unitId));
    } else if (propertyId) {
      dispatch(bookProperty(propertyId));
    }
    // Clear local storage
    localStorage.removeItem('bookingDetails');
  };

  return (
    <Box>
      <Typography variant="h5">Confirm Your Booking</Typography>
      <Box mt={2}>
        <Typography>Booking Type: {bookingType}</Typography>
        <Typography>Start Date: {startDateObj?.toDateString()}</Typography>
        {bookingType === 'specified' && <Typography>End Date: {endDateObj?.toDateString()}</Typography>}
        {/* Add more details as needed */}
      </Box>
      <Box mt={2}>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm Booking
        </Button>
      </Box>
    </Box>
  );
};

export default BookingConfirmation;
