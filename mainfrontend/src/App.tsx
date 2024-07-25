import Properties from "./components/properties/properties";
import MainNavBar from "./components/navbar/nav";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomeAlert from "./components/main-page/mainpage";
import { AuthProvider } from "./components/authentication/authContext";
import handleLogout from "./components/authentication/logout";

function App() {
  return (
    <>
      <AuthProvider>
        <MainNavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomeAlert />} />
            <Route path="properties" element={<Properties />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" action={handleLogout} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
