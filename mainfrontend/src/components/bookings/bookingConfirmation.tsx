import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { bookProperty, bookUnit } from "../../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookingConfirmation = ({ handleBack, handleReset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  const { startDate, endDate, bookingType, propertyId, unitId, total_price } =
    bookingDetails;

  const handleConfirm = async () => {
    setIsLoading(true);
    setError("");

    const bookingData = {
      start_date: startDate,
      end_date: endDate,
      booking_type: bookingType,
      total_price: total_price,
      unit: unitId || null,
      property: propertyId || null,
    };

    try {
      if (unitId) {
        await dispatch(bookUnit(bookingData)).unwrap();
      } else if (propertyId) {
        await dispatch(bookProperty(bookingData)).unwrap();
      }

      localStorage.removeItem("bookingDetails");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to confirm booking. Please try again.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        handleReset();
      }, 2000);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Confirm Your Booking
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography>
          <strong>Booking Type:</strong> {bookingType}
        </Typography>
        <Typography>
          <strong>Start Date:</strong> {dayjs(startDate).format("MMMM D, YYYY")}
        </Typography>
        {bookingType === "Specified" && (
          <Typography>
            <strong>End Date:</strong> {dayjs(endDate).format("MMMM D, YYYY")}
          </Typography>
        )}
        <Typography>
          <strong>Total Price:</strong> ${total_price}
        </Typography>
      </Box>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={handleBack} disabled={isLoading}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Confirm Booking"}
        </Button>
      </Box>
    </Box>
  );
};

export default BookingConfirmation;
