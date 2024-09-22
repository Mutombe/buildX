import MainNavBar from "./components/navbar/nav";
import Footer from "./components/footer/footer";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import Dashboard from "./components/dashboard/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeAlert from "./components/main-page/mainpage";
import PropertyList from "./components/properties/propertyList";
import AddPro from "./components/properties/propertAddingForm";
import UnitList from "./components/units/unitList";
import "./App.css";
import BookingConfirmation from "./components/bookings/bookingConfirmation";
import BookingSelectDate from "./components/bookings/universalBookForm";

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
              <Route
                path="/property/:propertyId/units"
                element={<UnitList />}
              />
              <Route path="/postProperty" element={<AddPro />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/approve-booking" element={""} />
              <Route path="/deny-booking" element={""} />
              <Route path="/book/:type/:id" element={<BookingSelectDate />} />
              <Route
                path="/booking-confirmation"
                element={<BookingConfirmation />}
              />
            </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
