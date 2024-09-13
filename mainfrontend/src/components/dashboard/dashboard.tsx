import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manageBookings, approveBooking, denyBooking } from '../../redux/bookingSlice';
import { Tabs, Tab, Box, Typography, List, ListItem, IconButton, Button } from '@mui/material';
import { ArrowUpward, ArrowDownward, Home, Apartment } from '@mui/icons-material';
import { PropertyTable } from './propertyTable';
import { fetchProperties } from '../../redux/propertySlice';
import { fetchUnits } from '../../redux/unitSlice';

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const { allBookings, loading } = useSelector(state => state.bookings); // Grab all bookings
  const { properties } = useSelector(state => state.properties);
  const { units } = useSelector(state => state.units);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(manageBookings());
    dispatch(fetchProperties());
    dispatch(fetchUnits()); 
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApprove = (bookingId) => {
    dispatch(approveBooking(bookingId));
  };

  const handleDeny = (bookingId) => {
    dispatch(denyBooking(bookingId));
  };

  const getBookingDetails = (booking) => {
    if (booking.unit && units) { 
      const booked_unit = units.find(unit => unit.id === booking.unit);
  
      if (booked_unit && properties) {
        const related_property = properties.find(property => property.id === booked_unit.unit_property);
        return related_property
          ? `Unit: ${booked_unit.name},  Location: ${related_property.location},  ${related_property.owner}, ${booking.status}`
          : 'Loading unit and property details...';
      }
    }
  
    if (booking.property && properties) { 
      const booked_property = properties.find(property => property.id === booking.property);
      return booked_property 
        ? `Property: ${booked_property.name},  Location: ${booked_property.location},  ${booked_property.owner}, ${booking.status}` 
        : 'Loading property details...';
    }
  
    return 'Unknown Booking';
  };
  
  

  // Filter bookings based on their type (incoming/outgoing, property/unit, status)
  const pendingBookings = allBookings.filter(booking => booking.status === 'pending');
  const bookingHistory = allBookings.filter(booking => booking.status !== 'pending');

  const renderBookingIcon = (booking) => {
    if (booking.unit) {
      return <Apartment />; // Unit icon
    }
    if (booking.property) {
      return <Home />; // Property icon
    }
    return null;
  };

  const renderBookingArrowIcon = (booking, isIncoming) => {
    return isIncoming ? <ArrowDownward /> : <ArrowUpward />;
  };

  const renderActionButtons = (booking, isIncoming) => {
    if (isIncoming && booking.status === 'pending') {
      return (
        <Box>
          <Button variant="contained" color="success" onClick={() => handleApprove(booking.id)}>
            Approve
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDeny(booking.id)} sx={{ ml: 2 }}>
            Deny
          </Button>
        </Box>
      );
    }
    return null;
  };

  const isBookingIncoming = (booking) => {
    return booking.property?.owner === user.username || booking.unit?.unit_property?.owner === user.username;
  };

  console.log(user.username)

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
        <Tab label="My Properties" />
        <Tab label="Booking Requests" />
        <Tab label="Booking History" />
      </Tabs>

      {value === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">My Properties</Typography>
          <PropertyTable />
        </Box>
      )}

      {value === 1 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Booking Requests</Typography>
          <List>
            {pendingBookings.map(booking => {
              const isIncoming = isBookingIncoming(booking); // Check if incoming
              return (
                <ListItem key={booking.id}>
                  {/* Booking Arrow */}
                  {renderBookingArrowIcon(booking, isIncoming)}

                  {/* Booking Type Icon */}
                  {renderBookingIcon(booking)}

                  {/* Booking Information */}
                  <Typography sx={{ ml: 1 }}>
                  {getBookingDetails(booking)}
                  </Typography>

                  {/* Approve/Deny Buttons for Incoming Bookings */}
                  {renderActionButtons(booking, isIncoming)}
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}

      {value === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Booking History</Typography>
          <List>
            {bookingHistory.map(booking => (
              <ListItem key={booking.id}>
                {/* Booking Arrow */}
                {renderBookingArrowIcon(booking, isBookingIncoming(booking))}

                {/* Booking Type Icon */}
                {renderBookingIcon(booking)}

                {/* Booking Information */}
                <Typography sx={{ ml: 1 }}>
                {getBookingDetails(booking)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
