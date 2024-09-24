import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetails, fetchDetails } from "../../redux/bookingSlice";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const SelectDate = ({ handleNext }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingType, setBookingType] = useState("Unspecified");
  const [error, setError] = useState("");
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const details = useSelector((state) => state.bookings.details);

  useEffect(() => {
    dispatch(fetchDetails({ id, type }));
  }, [id, type, dispatch]);

  const calculateTotalPrice = (pricePerMonth, start, end, bType) => {
    if (!start) return 0;
    const startDate = dayjs(start);
    const endDate =
      bType === "Specified" ? dayjs(end) : startDate.add(1, "month");
    const daysBooked = endDate.diff(startDate, "day");
    const total = (pricePerMonth / 30) * daysBooked;
    return Math.floor(total * 100) / 100;
  };

  const handleProceed = () => {
    if (!startDate) {
      setError("Please select a start date");
      return;
    }
    if (bookingType === "Specified" && !endDate) {
      setError("Please select an end date");
      return;
    }
    if (bookingType === "Specified" && endDate.isBefore(startDate)) {
      setError("End date must be after start date");
      return;
    }

    const bookingData = {
      unitId: type === "unit" ? id : null,
      propertyId: type === "properties" ? id : null,
      startDate: startDate.toISOString().split("T")[0],
      endDate:
        bookingType === "Specified"
          ? endDate.toISOString().split("T")[0]
          : null,
      bookingType,
      total_price: calculateTotalPrice(
        details.price_per_month,
        startDate,
        endDate,
        bookingType
      ),
    };
    dispatch(setBookingDetails(bookingData));
    localStorage.setItem("bookingDetails", JSON.stringify(bookingData));
    handleNext();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Select Booking Dates
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={bookingType === "Specified"}
            onChange={(e) =>
              setBookingType(e.target.checked ? "Specified" : "Unspecified")
            }
          />
        }
        label="Specify rental period"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            setError("");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{ mt: 2, paddingBottom: "10px" }}
            />
          )}
        />
        <hr />
        {bookingType === "Specified" && (
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              setError("");
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ mt: 2 }} />
            )}
          />
        )}
      </LocalizationProvider>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Total Price: $
          {calculateTotalPrice(
            details.price_per_month,
            startDate,
            endDate,
            bookingType
          )}
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={handleProceed}
        fullWidth
        sx={{ mt: 2 }}
      >
        Proceed to Confirmation
      </Button>
    </Box>
  );
};

export default SelectDate;
