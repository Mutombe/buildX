import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MainNavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <small>
              {" "}
              <strong>homer</strong>{" "}
            </small>
          </Navbar.Brand>
          <span></span>
          <span></span>
          <Nav className="me-auto">
            <Nav.Link href="#home">Homes</Nav.Link>
            <Nav.Link href="#features">Properties</Nav.Link>
            <Nav.Link href="#pricing">Spaces</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default MainNavBar;