import { Container, Button } from "react-bootstrap";

const Hero = () => {
  return (
    <div
      className="bg-dark text-white text-center d-flex align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <Container>
        <h1 className="display-4 fw-bold">Capture. Print. Create.</h1>
        <p className="lead">
          One Stop Solution for Photography, Printing & Digital Services
        </p>
        <Button variant="warning" size="lg">
          Contact Us
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
