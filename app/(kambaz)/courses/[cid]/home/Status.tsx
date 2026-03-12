"use client"
import { MdDoNotDisturbAlt, MdAnalytics } from "react-icons/md";
import { FaCheckCircle, FaHome, FaStream } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { GrAnnounce } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const currentUserRole = currentUser?.role;
  const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      {adminPermission && (
        <span>
          <h2>Course Status</h2>
          <div className="d-flex">
            <div className="w-50 pe-1">
              <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
                <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </Button> </div>
            <div className="w-50">
              <Button variant="success" size="lg" className="w-100">
                <FaCheckCircle className="me-2 fs-5" /> Publish </Button> </div>
          </div>
          <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
            <BiImport className="me-2 fs-5" /> Import Existing Content </Button>
          <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
            <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </Button>
          <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
            <FaHome className="me-2 fs-5" /> Choose Home Page </Button>
          <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
            <GrAnnounce className="me-2 fs-5" /> New Announcement </Button>
          <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
            <MdAnalytics className="me-2 fs-5" /> New Analytic </Button>
        </span>
      )}
      <br />
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <FaStream className="me-2 fs-5" /> View Course Stream </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoMdNotifications className="me-2 fs-5" /> View Course Notifications </Button>
    </div> );}