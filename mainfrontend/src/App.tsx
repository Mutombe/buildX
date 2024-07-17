import Properties from "./components/buildings/buildings";
import MainNavBar from "./components/navbar/nav";
import Login from "./components/authentication/login";
import Logout from "./components/authentication/logout";
import Signup from "./components/authentication/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <MainNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="properties" element={<Properties />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
