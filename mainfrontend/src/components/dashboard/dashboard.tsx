import Box from "@mui/material/Box";
import RestoreIcon from "@mui/icons-material/Restore";
import TimelineIcon from "@mui/icons-material/Timeline";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  approveBooking,
  denyBooking,
  manageBookings,
} from "../../redux/bookingSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import "./dashboard.css";
import { PropertyTable } from "./propertyTable";

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



export function CheckboxList() {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemIcon>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemButton>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Booking ${value + 1}`} />
            <ListItemText id={labelId} primary={`Booking ${value + 1}`} />
            <ListItemText id={labelId} primary={`Booking ${value + 1}`} />
            <ListItemText id={labelId} primary={`Booking ${value + 1}`} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default function BookingsList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const { allBookings, loading } = useSelector((state) => state.bookings);

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

  return (
    <>
      <br></br>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Properties"
            {...a11yProps(0)}
            icon={<HomeIcon color="primary" />}
          />
          <Tab
            label="Booking Requests"
            {...a11yProps(1)}
            icon={<TimelineIcon color="primary" />}
          />
          <Tab
            label="History"
            {...a11yProps(2)}
            icon={<RestoreIcon color="primary" />}
          />
        </Tabs>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <Chip label="My Properties" size="small" />
          <br />
          <PropertyTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Chip label="Bookings" size="small" />
        <br />
          <CheckboxList />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Chip label="Booking History" size="small" />
          <br />
          <table>
            <tr>
              <td>3741255</td>
              <td>Jones, Martha</td>
              <td>Computer Science</td>
              <td>240</td>
            </tr>
            <tr>
              <td>3971244</td>
              <td>Nim, Victor</td>
              <td>Russian Literature</td>
              <td>220</td>
            </tr>
            <tr>
              <td>4100332</td>
              <td>Petrov, Alexandra</td>
              <td>Astrophysics</td>
              <td>260</td>
            </tr>
          </table>
        </TabPanel>
      </Box>
    </>
  );
}
