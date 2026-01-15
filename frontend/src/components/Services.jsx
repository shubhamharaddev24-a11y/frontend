import { Container, Row, Col, Card } from "react-bootstrap";

const Services = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our Services</h2>

      <Row className="g-4">
        <Col md={3}>
          <Card body className="text-center shadow-sm">
            Wedding Photography
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="text-center shadow-sm">
            Printing & Xerox
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="text-center shadow-sm">
            DTP & Designing
          </Card>
        </Col>
        <Col md={3}>
          <Card body className="text-center shadow-sm">
            Cyber Services (Soon)
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
