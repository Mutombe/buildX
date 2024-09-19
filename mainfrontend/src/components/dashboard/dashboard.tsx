import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  manageBookings,
  approveBooking,
  denyBooking,
} from "../../redux/bookingSlice";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Skeleton,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { Home, Apartment } from "@mui/icons-material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
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
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { properties, loading: propertiesLoading } = useSelector(
    (state) => state.properties
  );

  const { units, loading: unitsLoading } = useSelector((state) => state.units);


  const { allBookings, loading: bookingsLoading } = useSelector(
    (state) => state.bookings
  );
  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchUnits());
    dispatch(manageBookings());
  }, []);

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

  console.log("All bookings", allBookings);
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
    if (booking.unit && units) {
      const booked_unit = units.find((unit) => unit.id === booking.unit);
      if (booked_unit && properties) {
        const related_property = properties.find(
          (property) => property.id === booked_unit.unit_property
        );
        console.log(
          "booked unit related property owner",
          related_property ? related_property.owner : "None"
        );
        return related_property
          ? related_property.owner === user.username
          : false;
      }
    }
    if (booking.property && properties) {
      const booked_property = properties.find(
        (property) => property.id === booking.property
      );
      console.log("booked property owner", booked_property.owner);
      return booked_property
        ? booked_property.owner.username === user.username
        : false;
    }
    return false;
  };

  const isBookingOutgoing = (booking) => {
    return booking.customer === user.username;
  };

  const pendingBookings = allBookings.filter(
    (booking) =>
      booking.status === "Pending" &&
      (isBookingIncoming(booking) || isBookingOutgoing(booking))
  );

  const bookingHistory = allBookings.filter(
    (booking) => booking.status !== "Pending"
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingsLoading ? (
                  <>
                    {[...Array(3)].map((_, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  pendingBookings.map((booking) => {
                    const isIncoming = isBookingIncoming(booking);
                    const isOutgoing = isBookingOutgoing(booking);
                    return (
                      <TableRow key={booking.id}>
                        <TableCell>
                          {isIncoming ? (
                            <>
                              <Tooltip
                                title="Incoming Booking Requests"
                                placement="top-end"
                              >
                                <Chip
                                  icon={<SouthWestIcon />}
                                  label="Incoming"
                                />
                              </Tooltip>
                            </>
                          ) : (
                            isOutgoing && (
                              <>
                                <Tooltip
                                  title="Outgoing Booking Requests"
                                  placement="top-end"
                                >
                                  <Chip
                                    icon={<NorthEastIcon />}
                                    label="Outgoing"
                                  />
                                </Tooltip>
                              </>
                            )
                          )}
                        </TableCell>
                        <TableCell>{getBookingType(booking)}</TableCell>
                        <TableCell>{getCategory(booking)}</TableCell>
                        <TableCell>{getLocation(booking)}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        {isIncoming && (
                          <>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleApprove(booking.id)}
                              >
                                Approve
                              </Button>
                            </TableCell>

                            <TableCell>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeny(booking.id)}
                              >
                                Deny
                              </Button>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })
                )}
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
                  <TableCell>Request</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingsLoading ? (
                  <>
                    {[...Array(3)].map((_, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  bookingHistory.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        {isBookingIncoming(booking) ? (
                          <Tooltip
                            title="Incoming Booking Requests"
                            placement="top-end"
                          >
                            <Chip icon={<SouthWestIcon />} label="Incoming" />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title="Outgoing Booking Requests"
                            placement="top-end"
                          >
                            <Chip icon={<NorthEastIcon />} label="Outgoing" />
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell>{getBookingType(booking)}</TableCell>
                      <TableCell>{getCategory(booking)}</TableCell>
                      <TableCell>{getLocation(booking)}</TableCell>
                      <TableCell>{booking.customer}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        <IconButton aria-label="delete">
                          <Tooltip title="Delete" placement="top-start">
                            <DeleteRoundedIcon color="error" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
