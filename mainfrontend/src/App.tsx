import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavBar from "./components/navbar/nav";
import WelcomeAlert from "./components/main-page/mainpage";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import Dashboard from "./components/dashboard/dashboard";
import PropertyList from "./components/properties/propertyList";
import AddPro from "./components/properties/propertAddingForm";
import UnitList from "./components/units/unitList";
import BookingProcess from "./components/bookings/stepper";
import NotFoundPage from "./components/NoPage/noPage";
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';
import { createTheme as createMuiTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const joyTheme = extendJoyTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
        },
      },
    },
  },
});

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

const mergedTheme = {
  ...muiTheme,
  ...joyTheme,
};


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={""}>
        
        <div className="app-container">
        <CssBaseline />
        <MainNavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<WelcomeAlert />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={null} />
            <Route path="signup" element={<Signup />} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="/property/:propertyId/units" element={<UnitList />} />
            <Route path="/postProperty" element={<AddPro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/approve-booking" element={null} />
            <Route path="/deny-booking" element={null} />
            <Route path="/book/:type/:id" element={<BookingProcess />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;