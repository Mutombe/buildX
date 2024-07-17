import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import { useContext } from 'react';
//import { AuthContext } from '../authentication/authContext';

function MainNavBar() {
  //const { isAuthenticated, logout} = useContext(AuthContext)


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <small>
              {" "}
              <strong>homer</strong>{" "}
            </small>
          </Navbar.Brand>
          <span></span>
          <span></span>
          <Nav className="me-auto">
            <Nav.Link href="#home">Homes</Nav.Link>
            <Nav.Link href="/properties">Properties</Nav.Link>
            <Nav.Link href="#pricing">Spaces</Nav.Link>
          </Nav>
        </Container>

          <>
          <Container>
          <Nav className="me-auto">
            <Nav.Link href="/signup">SignIn</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          </Container>
          </>
      </Navbar>
      <br />
    </>
  );
}

export default MainNavBar;