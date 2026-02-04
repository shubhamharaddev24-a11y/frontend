import { Container, Row, Col, Button } from "react-bootstrap";

const VisitUs = () => {
  return (
    <Container fluid className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h2>Visit Our Store</h2>
            <p>📍 Your City Location</p>
            <p>📞 9876543210</p>
            <p>🕘 Mon – Sat: 9 AM – 3 PM</p>
            <Button variant="warning">Get Directions</Button>
          </Col>
          <Col md={6}>
            <img
              src="https://via.placeholder.com/500"
              alt="Shop"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default VisitUs;
