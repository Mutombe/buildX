import Box from "@mui/material/Box";
import RestoreIcon from "@mui/icons-material/Restore";
import TimelineIcon from "@mui/icons-material/Timeline";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ReactNode, SyntheticEvent, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteProperty } from "../../redux/propertySlice";
import { approveBooking, denyBooking, manageBookings } from "../../redux/bookingSlice";

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const userProperties = useSelector((state) => state.properties.userProperties);
  const { allBookings, loading } = useSelector(state => state.bookings);

  console.log("User's Properties", userProperties)

  useEffect(() => {
    dispatch(manageBookings());
  }, [dispatch]);

  const handleApprove = (bookingId) => {
    dispatch(approveBooking(bookingId));
  };

  const handleDisapprove = (bookingId) => {
    dispatch(denyBooking(bookingId));
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  return (
    <>
      <br></br>
      <Box sx={{ maxWidth: { xs: 320, sm: 580 }, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Properties" {...a11yProps(0)} icon={<HomeIcon color="primary" />} />
          <Tab label="Analytics" {...a11yProps(1)} icon={<TimelineIcon color="primary" />} />
          <Tab
            label="History"
            {...a11yProps(2)}
            icon={<RestoreIcon color="primary"/>}
          />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <small>My Properties</small>
          <Typography variant="h6" gutterBottom>
            All my properties
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <small>Bookings</small>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <small>Booking History</small>
        </TabPanel>
      </Box>
    </>
  );
}
