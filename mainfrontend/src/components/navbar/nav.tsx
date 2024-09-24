import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Tooltip, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Home, PlusCircle, LogOut, User, Settings } from 'lucide-react';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#1976d2', // Default primary color
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const NavItems = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const NavLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const MainNavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="fixed" sx={{}}>
      <StyledToolbar>
        <NavLink href="/" underline="none">
          <Typography variant="h6" component="div">
            homer
          </Typography>
        </NavLink>
        <NavItems>
          <NavLink href="/property" underline="none">
            <Home size={20} />
            Properties
          </NavLink>
          <Tooltip title="Add Property">
            <IconButton color="inherit" component={Link} href="/postProperty">
              <PlusCircle size={20} />
            </IconButton>
          </Tooltip>
          {token ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src="/broken-image.jpg" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} href="/profile">
                  <User size={16} style={{ marginRight: '0.5rem' }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} href="/account">
                  <Settings size={16} style={{ marginRight: '0.5rem' }} />
                  My Account
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} href="/dashboard">
                  <Home size={16} style={{ marginRight: '0.5rem' }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/signup">
                Signup
              </Button>
            </>
          )}
        </NavItems>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default MainNavBar;