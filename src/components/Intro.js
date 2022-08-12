import { Col, Container, Row, Button } from "react-bootstrap"

const Intro = () => {
  return (
    <div className="intro">
      <Container className="text-white text-center">
        <Row>
          <Col>
            <div className="title">Let's Play</div>
            <div className="title">Get Your Favorite Pokemon</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Intro
