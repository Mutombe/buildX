import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  manageBookings,
  approveBooking,
  denyBooking,
} from "../../redux/bookingSlice";
import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Home,
  Apartment,
} from "@mui/icons-material";
import { PropertyTable } from "./propertyTable";
import { fetchProperties } from "../../redux/propertySlice";
import { fetchUnits } from "../../redux/unitSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { allBookings, loading } = useSelector((state) => state.bookings);
  const { properties } = useSelector((state) => state.properties);
  const { units } = useSelector((state) => state.units);
  const { user } = useSelector((state) => state.auth);

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

  const getBookingType = (booking) => {
    if (booking.unit) {
      return (
        <>
          <Apartment sx={{ verticalAlign: "middle" }} /> Unit
        </>
      );
    }
    if (booking.property) {
      return (
        <>
          <Home sx={{ verticalAlign: "middle" }} /> Property
        </>
      );
    }
    return "Unknown Type";
  };

  const getCategory = (booking) => {
    if (booking.unit && units) {
      const booked_unit = units.find((unit) => unit.id === booking.unit);
      if (booked_unit && properties) {
        const related_property = properties.find(
          (property) => property.id === booked_unit.unit_property
        );
        return related_property.category || "Unknown Category";
      }
    }
    if (booking.property && properties) {
      const booked_property = properties.find(
        (property) => property.id === booking.property
      );
      if (booked_property) {
        return booked_property.category || "Unknown Category";
      }
    }
    return "Unknown Category";
  };

  const getLocation = (booking) => {
    if (booking.unit && units) {
      const booked_unit = units.find((unit) => unit.id === booking.unit);
      if (booked_unit && properties) {
        const related_property = properties.find(
          (property) => property.id === booked_unit.unit_property
        );
        return related_property
          ? related_property.location
          : "Unknown Location";
      }
    }
    if (booking.property && properties) {
      const booked_property = properties.find(
        (property) => property.id === booking.property
      );
      return booked_property ? booked_property.location : "Unknown Location";
    }
    return "Unknown Location";
  };

  const isBookingIncoming = (booking) => {
    return (
      booking.property?.owner === user.username ||
      booking.unit?.unit_property?.owner === user.username
    );
  };

  const pendingBookings = allBookings.filter(
    (booking) => booking.status === "pending"
  );
  const bookingHistory = allBookings.filter(
    (booking) => booking.status !== "pending"
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
        <Tab label="Properties" />
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

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="booking requests table">
              <TableHead>
                <TableRow>
                  <TableCell>Request</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingBookings.map((booking) => {
                  const isIncoming = isBookingIncoming(booking);
                  return (
                    <TableRow key={booking.id}>
                      <TableCell>
                        {isIncoming ? <ArrowDownward /> : <ArrowUpward />}
                      </TableCell>
                      <TableCell>{getBookingType(booking)}</TableCell>
                      <TableCell>{getCategory(booking)}</TableCell>
                      <TableCell>{getLocation(booking)}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        {isIncoming && (
                          <Box>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleApprove(booking.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDeny(booking.id)}
                              sx={{ ml: 2 }}
                            >
                              Deny
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {value === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Booking History</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="booking history table">
              <TableHead>
                <TableRow>
                  <TableCell>Booking Arrow</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingHistory.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {isBookingIncoming(booking) ? (
                        <ArrowDownward />
                      ) : (
                        <ArrowUpward />
                      )}
                    </TableCell>
                    <TableCell>{getBookingType(booking)}</TableCell>
                    <TableCell>{getCategory(booking)}</TableCell>
                    <TableCell>{getLocation(booking)}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
