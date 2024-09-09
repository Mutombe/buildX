import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingDetails } from '../../redux/bookingSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchDetails } from '../../redux/bookingSlice';

const BookingSelectDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingType, setBookingType] = useState('unspecified');
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const details = useSelector((state) => state.bookings.details);

  useEffect(() => {
    dispatch(fetchDetails({ id, type }));
  }, [id, type, dispatch]);

  const calculateTotalPrice = (pricePerMonth, startDate, endDate, bookingType) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(startDate);
    const daysBooked = (end - start) / (1000 * 60 * 60 * 24);
    if (bookingType === 'specified') {
      return (pricePerMonth / 30) * daysBooked;
    }
    return pricePerMonth;
  };

  const handleProceed = () => {
    const bookingData = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: bookingType === 'specified' ? endDate.toISOString().split('T')[0] : null,
      bookingType,
      total_price: calculateTotalPrice(details.price_per_month, startDate, endDate, bookingType),
    };
    dispatch(setBookingDetails(bookingData));
    localStorage.setItem('bookingDetails', JSON.stringify(bookingData));
    navigate('/booking-confirmation');
  };

  return (
    <Box>
      <Typography variant="h5">Select Booking Dates</Typography>

      <Box mt={2}>
        {/* Checkbox for specifying rental period */}
        <FormControlLabel
          control={
            <Checkbox
              checked={bookingType === 'specified'}
              onChange={(e) => setBookingType(e.target.checked ? 'specified' : 'unspecified')}
            />
          }
          label="Specify rental period"
        />
      </Box>

      <Box mt={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoContainer>
        </LocalizationProvider>

        {/* Show End Date picker if 'specified' is selected */}
        {bookingType === 'specified' && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      </Box>

      <Box mt={2}>
        <Button variant="contained" onClick={handleProceed}>
          Proceed to Confirmation
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSelectDate;
