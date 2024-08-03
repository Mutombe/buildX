// nav.tsx
//import { useContext } from "react";
import MainButton from "../button/button";
import handleLogout from "../authentication/logout";
//import { AuthContext } from "../authentication/authContext";
import "./nav.css";
import { useSelector } from "react-redux";
import Logout from "../authentication/logout";

function MainNavBar() {
  const  token = useSelector((state: any) => state.auth.token)

  return (
    <nav className="navbar">
      <h1>homer</h1>
      <ul>
        <li>homer</li>
        <li><a href="/properties">Properties</a></li>
        {token ? (
          <li>
            <Logout />
          </li>
        ) : (
          <>
            <li>
              <a href="/login">Login</a>
            </li>{" "}
            <li>SignUp</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MainNavBar;
