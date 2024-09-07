import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../redux/bookingSlice';
import { Button, Form, Checkbox, TextField } from '@mui/material';

const BookingPropertyForm = ({ unitId }) => {
  const [isSpecifiedPeriod, setIsSpecifiedPeriod] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      unit: unitId,
      start_date: startDate,
      end_date: isSpecifiedPeriod ? endDate : null,
    };
    dispatch(createBooking(bookingData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Checkbox
        checked={isSpecifiedPeriod}
        onChange={() => setIsSpecifiedPeriod(!isSpecifiedPeriod)}
        label="Booking for a specified period"
      />
      {isSpecifiedPeriod && (
        <>
          <TextField
            label="From"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="To"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </>
      )}
      <Button type="submit">Proceed</Button>
    </Form>
  );
};

export default BookingPropertyForm;
