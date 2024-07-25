import { logout } from "../../utils/api";
import { useContext, useState } from "react";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";



const handleLogout = async (event: any) => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate();

    try {
      event.preventDefault();
      const response = await logout();
      localStorage.removeItem('user');
      if (response.status === 200) {
        setIsAuthenticated(false)
        navigate("/")
        console.log(response);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

export default handleLogout;
