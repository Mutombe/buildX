import MainNavBar from "./components/navbar/nav";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import Dashboard from "./components/dashboard/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeAlert from "./components/main-page/mainpage";
import PropertyList from "./components/properties/listProperties";
import AddPro from "./components/properties/form";
import UnitList from "./components/units/list_units";
import "./App.css";


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
            <Route path="properties" element={<PropertyList />} />
            <Route
              path="/properties/:propertyId/units"
              element={<UnitList />}
            />
            <Route path="/postProperty" element={<AddPro />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
