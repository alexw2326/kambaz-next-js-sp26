/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { enroll, unenroll, showEnroll } from "./reducer";
import { RootState } from "../store";
import * as client from "../courses/client";
import Link from "next/link";
import { CardImg, CardTitle, CardText, Button, Row, Col, Card, CardBody, FormControl } from "react-bootstrap";
export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments = [] } = useSelector((state: RootState) => state.enrollmentReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const enrollInCourse = async (courseId: any) => {
    await client.enrollCourse(courseId);
    dispatch(enroll({ user: currentUser?._id, course: courseId }));
  }
  const unenrollInCourse = async (courseId: any) => {
    await client.unenrollCourse(courseId);
    dispatch(unenroll({ user: currentUser?._id, course: courseId }));
  }
  const showAllEnrolled = async () => {
    const enrollments = await client.showAllEnrollments();
    dispatch(showEnroll(enrollments));
  }
  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };
  const onDeleteCourse = async (courseId: string) => {
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};
  useEffect(() => {
    const initialize = async () => {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
      await showAllEnrolled();
    };
    initialize();
  }, [currentUser]);
  const [showEnrolled, setShowEnrolled] = useState(true);
  const currentUserRole = currentUser?.role;
  const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      { adminPermission ? (
        <span>
          <h5>New Course
            <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={onAddNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                onClick={onUpdateCourse} id="wd-update-course-click">
              Update </button>
          </h5><br />
          <FormControl value={course.name} className="mb-2"  
            onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
          <FormControl value={course.description} as="textarea" rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value }) } /> <br />
          </span>
        ): true }
        <button className="btn btn-primary float-end me-2"
              onClick={() => setShowEnrolled(!showEnrolled)} id="wd-enrollments-course-click">
          Enrollments </button> <br /> <br />
        <hr />
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4">
            {courses
              .filter((course) =>
                !showEnrolled ||
                enrollments.some(
                  (e: any) => e.user === currentUser?._id && e.course === course._id
                )
              )
              .map((course) => {
                const isEnrolled = enrollments.some(
                  (e: any) => e.user === currentUser?._id && e.course === course._id
                );
              return (
                <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <Link href={`/courses/${course._id}/home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark">
                      <CardImg src="/images/reactjs.webp" variant="top" width="100%" height={160} />
                      <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}> {course.description} </CardText>
                        <Button variant="primary">Go</Button>
                        { adminPermission ? (
                          <span>
                            <Button onClick={(event) => { event.preventDefault(); onDeleteCourse(course._id) }} 
                              className="btn btn-danger float-end" id="wd-delete-course-click"> Delete </Button>
                            <Button id="wd-edit-course-click" onClick={(event) => { event.preventDefault(); setCourse(course); }} 
                              className="btn btn-warning me-2 float-end"> Edit </Button>
                          </span>
                        ) : true }
                        {isEnrolled ? (
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              unenrollInCourse(course._id);
                            }}>
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={(e) => {
                              e.preventDefault();
                              enrollInCourse(course._id);
                            }}>
                            Enroll
                          </Button>
                        )}
                      </CardBody>
                    </Link>
                  </Card>
                </Col>
                )
              })
            }
          </Row>
        </div>
    </div>
  )}