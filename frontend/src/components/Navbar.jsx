import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#">Sharma Digital Studio</Navbar.Brand>

        <Nav className="ms-auto gap-2">
          <Button variant="warning" href="tel:9876543210">
            Call Now
          </Button>
          <Button
            variant="success"
            href="https://wa.me/919876543210"
            target="_blank"
          >
            WhatsApp
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
