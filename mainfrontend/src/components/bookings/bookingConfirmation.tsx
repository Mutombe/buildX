import { Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { bookProperty, bookUnit } from '../../redux/bookingSlice';

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
  const { startDate, endDate, bookingType, propertyId, unitId, total_price } = bookingDetails;

  // Convert startDate and endDate strings to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = endDate ? new Date(endDate) : null;

  const handleConfirm = () => {
    const bookingData = {
      start_date: startDate,
      end_date: endDate,
      booking_type: bookingType,
      total_price: total_price,
      unitId: unitId || null,
      propertyId: propertyId || null
    };

    if (unitId) {
      dispatch(bookUnit(bookingData));
    } else if (propertyId) {
      dispatch(bookProperty(bookingData));
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
