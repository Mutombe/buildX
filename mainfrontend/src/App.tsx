import MainNavBar from "./components/navbar/nav";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeAlert from "./components/main-page/mainpage";
//import handleLogout from "./components/authentication/logout";
import PropertyList from "./components/properties/listProperties";
import "./App.css";
import UnitList from "./components/units/list_units";

function App() {
  return (
    <>
      <div className="container">
        <MainNavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeAlert />} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="/properties/:propertyId/units" element={<UnitList />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
