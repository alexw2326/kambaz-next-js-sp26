"use client"
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButton from "./AssignmentControlButton";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentHeaderButton from "./AssignmentHeaderButton";
import { MdAssignment } from "react-icons/md"
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter (
    (assignment) => assignment.course === cid
  );
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-assignment p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS <AssignmentHeaderButton />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.map((assignment) => (
              <ListGroupItem key={assignment._id} className="wd-assignment p-3 ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-4" />
                  <MdAssignment className="me-2 fs-4" />
                  <div style={{ maxWidth: "65%" }}>
                    <div>
                      <Link
                        href={`/courses/${cid}/assignments/${assignment._id}`}
                        className="wd-assignment-link text-decoration-none text-dark"
                      >
                        {assignment.title}
                      </Link>
                    </div>
                  </div>
                  <div className="ms-auto d-flex">
                    <AssignmentControlButton />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}
