import { Container, Row, Col, Card } from "react-bootstrap";

const ServiceHighlights = () => {
  return (
    <Container className="my-5">
      <Row className="g-4 text-center">
        <Col md={4}>
          <Card body className="shadow-sm">
            📸 Photo Studio
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="shadow-sm">
            💌 Wedding Cards
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="shadow-sm">
            🖨️ Xerox & DTP
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceHighlights;
