import Link from "next/link";
import { CardImg, CardTitle, CardText, Button, Row, Col, Card, CardBody } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/full-stack.jpg"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Full Stack Software Developer</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/4700" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/networks.jpg"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4700 Network Fundamentals</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Network Fundamentals for Computer Science</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/3800" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/computation.png"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3800 Theory</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Theory of Computation</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/2810" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/data-models.jpg"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2810 Math</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Mathematics of Data Models</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/4530" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/swe.avif"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4530 SWE</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Fundamentals of Software Engineering</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/5200" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/database.avif"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5200 Databases</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Database Management Systems</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href="/courses/2550" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/cyber-security.jpg"  width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CY2550 Cybersecurity</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height:"100px" }}>Foundations of Cybersecurity</CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
);}
