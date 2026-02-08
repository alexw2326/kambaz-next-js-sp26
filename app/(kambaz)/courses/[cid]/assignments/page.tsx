import AssignmentControls from "./AssignmentControls";
import AssignmentControlButton from "./AssignmentControlButton";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentHeaderButton from "./AssignmentHeaderButton";
import { MdAssignment } from "react-icons/md"
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-assignment p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS <AssignmentHeaderButton />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" /> 
                <MdAssignment className="me-2 fs-4" /> 
                <div style={{ maxWidth: "65%" }}>
                  <div>
                    <Link href="/courses/1234/assignments/123"
                      className="wd-assignment-link text-decoration-none text-dark">
                      A1
                    </Link>
                  </div>
                  <div className="small text-muted">
                    <span className="text-danger">Multiple Modules</span>
                    {" | "}
                    <strong>Not available until</strong> May 10 at 12:00am
                    {" | "}
                    <strong>Due</strong> May 14 at 11:59pm
                    {" | "}
                    100 pts
                  </div>
                </div>
              <div className="ms-auto d-flex">
                <AssignmentControlButton />
              </div>
            </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" /> 
                <MdAssignment className="me-2 fs-4" /> 
                <div style={{ maxWidth: "65%" }}>
                  <div>
                    <Link href="/courses/1234/assignments/123"
                      className="wd-assignment-link text-decoration-none text-dark">
                      A2
                    </Link>
                  </div>
                    <div className="small text-muted">
                      <span className="text-danger">Multiple Modules</span>
                      {" | "}
                      <strong>Not available until</strong> May 15 at 12:00am
                      {" | "}
                      <strong>Due</strong> May 19 at 11:59pm
                      {" | "}
                      100 pts
                    </div>
                  </div>
                <div className="ms-auto d-flex">
                  <AssignmentControlButton />
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" /> 
                <MdAssignment className="me-2 fs-4" /> 
                <div style={{ maxWidth: "65%" }}>
                  <div>
                    <Link href="/courses/1234/assignments/123"
                      className="wd-assignment-link text-decoration-none text-dark">
                      A3
                    </Link>
                  </div>
                    <div className="small text-muted">
                      <span className="text-danger">Multiple Modules</span>
                      {" | "}
                      <strong>Not available until</strong> May 20 at 12:00am
                      {" | "}
                      <strong>Due</strong> May 27 at 11:59pm
                      {" | "}
                      100 pts
                    </div>
                  </div>
                <div className="ms-auto d-flex">
                  <AssignmentControlButton />
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}
