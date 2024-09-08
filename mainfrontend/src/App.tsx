import MainNavBar from "./components/navbar/nav";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import Dashboard from "./components/dashboard/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeAlert from "./components/main-page/mainpage";
import PropertyList from "./components/properties/listProperties";
//import ManageBookings from "./components/bookings/manageBookings";
//import BookingStatus from "./components/bookings/bookingStatus";
import AddPro from "./components/properties/form";
import UnitList from "./components/units/list_units";
import "./App.css";
import BookingConfirmation from "./components/bookings/bookingConfirmation";
import BookingSelectDate from "./components/bookings/bookPropertyForm";
//import ProtectedRoute from "./utils/protectedRoute";

function App() {
  return (
    <>
      <div className="container">
        <MainNavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeAlert />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" />
            <Route path="signup" element={<Signup />} />
            <Route path="property" element={<PropertyList />} />
            <Route path="/property/:propertyId/units" element={<UnitList />} />
            <Route path="/postProperty" element={<AddPro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/approve-booking" element={""} />
            <Route path="/deny-booking" element={""} />
            <Route path="/book/:type/:id" element={<BookingSelectDate />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
