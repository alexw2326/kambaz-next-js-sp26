"use client"
import { useState } from "react";
import Link from "next/link";
import * as db from "../database";
import { v4 as uuidv4 } from "uuid";
import { CardImg, CardTitle, CardText, Button, Row, Col, Card, CardBody } from "react-bootstrap";
export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const course: any = {
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  };
  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse ]);
  };
  return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    <h5>New Course
      <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse} > Add </button>
    </h5><hr />
   <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
   <div id="wd-dashboard-courses">
    <Row xs={1} md={5} className="g-4">
     {courses.map((course) => (
     // eslint-disable-next-line react/jsx-key
     <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
       <Link href={`/courses/${course._id}/home`}
        className="wd-dashboard-course-link text-decoration-none text-dark" >
        <CardImg src="/images/reactjs.webp" variant="top" width="100%" height={160} />
        <CardBody className="card-body">
         <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
          {course.name} </CardTitle>
         <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
          {course.description} </CardText>
         <Button variant="primary"> Go </Button>
        </CardBody>
       </Link>
      </Card>
     </Col>
    ))}
   </Row>
  </div>
 </div>);}
