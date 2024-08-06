import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import "./nav.css";
import { useSelector } from "react-redux";
import Logout from "../authentication/logout";

function MainNavBar() {
  const token = useSelector((state: any) => state.auth.token);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <h1>homer</h1>
      <ul>
        <li>homer</li>
        <li>
          <a href="/properties">Properties</a>
        </li>
        {token ? (
          <>
            <li>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar src="/broken-image.jpg" />
              </Button>{" "}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}><Logout /></MenuItem>
              </Menu>
            </li>
            <li>
              
            </li>
          </>
        ) : (
          <>
            <li>
              
            </li>{" "}
              <li></li>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar src="/broken-image.jpg" />
              </Button>{" "}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}><a href="/login">Login</a></MenuItem>
                <MenuItem onClick={handleClose}>SignUp</MenuItem>
              </Menu>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MainNavBar;
