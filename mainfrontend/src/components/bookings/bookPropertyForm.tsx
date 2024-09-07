import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails, setBookingData } from '../store/bookingSlice';

const BookSelectDate = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const details = useSelector((state) => state.booking.details);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingType, setBookingType] = useState(type);

  useEffect(() => {
    dispatch(fetchDetails({ id, type }));
  }, [id, type, dispatch]);

  const calculateTotalPrice = (pricePerMonth, startDate, endDate, type) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(startDate);
    const daysBooked = (end - start) / (1000 * 60 * 60 * 24);
    if (type === 'specified') {
      return (pricePerMonth / 30) * daysBooked;
    }
    return pricePerMonth;
  };

  const handleProceed = () => {
    const bookingData = {
      startDate,
      endDate: bookingType === 'specified' ? endDate : null,
      bookingType,
      price: calculateTotalPrice(details.price_per_month, startDate, endDate, bookingType),
    };
    dispatch(setBookingData(bookingData));
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    history.push('/booking-confirmation');
  };

  return (
    <div>
      <h1>Select Dates for Booking</h1>
      {/* Date pickers and other UI elements */}
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default BookSelectDate;
