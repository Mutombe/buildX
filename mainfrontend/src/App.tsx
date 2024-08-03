import Properties from "./components/properties/listProperties";
import MainNavBar from "./components/navbar/nav";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeAlert from "./components/main-page/mainpage";
//import handleLogout from "./components/authentication/logout";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
          <MainNavBar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomeAlert />} />
              <Route path="properties" element={<Properties />} />
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
