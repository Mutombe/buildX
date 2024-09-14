import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { bookProperty, bookUnit } from "../../redux/bookingSlice";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  const { startDate, endDate, bookingType, propertyId, unitId, total_price } =
    bookingDetails;
  let result: any = [];
  // Convert startDate and endDate strings to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = endDate ? new Date(endDate) : null;

  const handleConfirm = () => {
    const bookingData = {
      start_date: startDate,
      end_date: endDate,
      booking_type: bookingType,
      total_price: total_price,
      unit: unitId || null,
      property: propertyId || null,
    };

    if (unitId) {
      const booking = dispatch(bookUnit(bookingData)).unwrap();
      result.push(booking);
      console.log("Booking Result", result);
    } else if (propertyId) {
      const booking = dispatch(bookProperty(bookingData)).unwrap();
      result.push(booking);
      console.log("Booking Result", result);
    }
    // Clear local storage
    localStorage.removeItem("bookingDetails");
    if (result) {
      navigate("/dashboard");
    }
    //navigate('/dashboard');
  };

  return (
    <Box>
      <Typography variant="h5">Confirm Your Booking</Typography>
      <Box mt={2}>
        <Typography>Booking Type: {bookingType}</Typography>
        <Typography>Start Date: {startDateObj?.toDateString()}</Typography>
        {bookingType === "Specified" && (
          <Typography>End Date: {endDateObj?.toDateString()}</Typography>
        )}
        <Typography>${total_price}</Typography>
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
