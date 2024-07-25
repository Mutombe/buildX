// nav.tsx
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MainButton from '../button/button';
import handleLogout from '../authentication/logout';
import { AuthContext } from '../authentication/authContext';

function MainNavBar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="dark" fixed="top" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <small>
              {' '}
              <strong>homer</strong>{' '}
            </small>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Homes</Nav.Link>
            <Nav.Link href="/properties">Properties</Nav.Link>
            <Nav.Link href="#pricing">Spaces</Nav.Link>
          </Nav>
        </Container>

        <Container>
          <Nav className="justify-content-end">
            {isAuthenticated ? (
              <>
                <Nav.Link href="#">Profile</Nav.Link>
                <Nav.Link href="/logout">
                  <MainButton variant="" onClick={handleLogout} text="Logout" />
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}

export default MainNavBar;
