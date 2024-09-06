import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import "./nav.css";
import { useSelector } from "react-redux";
import Logout from "../authentication/logout";
import { Fab, Link, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExitToApp from "@mui/icons-material/ExitToApp";

function MainNavBar() {
  const token = useSelector((state: any) => state.auth.token);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <h1 id="brand">homer</h1>
      <ul>
        <Link href="/postProperty">
          <Fab size="small" color="primary" aria-label="add">
            <Tooltip title="Add Property" placement="top-start">
              <AddIcon />
            </Tooltip>
          </Fab>
        </Link>
        <Link href="/property" underline="none">
          {" "}
          Properties
        </Link>

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
              </Button>
              {"   "}
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
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link href="/dashboard" underline="none">
                    Dashboard
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Logout />
                  <ExitToApp />
                </MenuItem>
              </Menu>
            </li>
            <li></li>
          </>
        ) : (
          <>
            <li></li> <li></li>
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
              <MenuItem onClick={handleClose}>
                <Link href="/login" underline="none">
                  Login
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="signup" underline="none">
                  Signup
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}
      </ul>
    </nav>
  );
}

export default MainNavBar;
