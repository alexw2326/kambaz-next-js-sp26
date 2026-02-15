"use client"
import { FormControl, FormLabel, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormCheck, Button, ListGroupItem } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const { cid } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid
  );
  if (!assignment) return <div>Assignment not found</div>;
  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignments</FormLabel>
      <ListGroupItem className="wd-assignment p-3 ps-1">
        <div className="d-flex align-items-center">
          <div style={{ maxWidth: "65%" }}>
            <FormControl className="w-100 mb-2" value={`${assignment.title}`} />
          </div>
        </div>
      </ListGroupItem>
      <FormControl 
        as="textarea"
        rows={8}
        className="w-100" 
        id="wd-description" 
        value={`${assignment.description}`} />
      <br />
      <Row xs={1} md={5} className="g-4">
          <FormLabel column sm={2}> Points </FormLabel>
          <Col className="wd-assignment-stats" style={{ width: "300px" }}>
            <FormControl type="number" value={`${assignment.points}`} />
          </Col>
      </Row>
      <Dropdown className="me-2 p-1">
        <FormLabel column sm={2}> Assignment Group </FormLabel>
        <DropdownToggle variant="secondary" size="lg" id="wd-assignment-assignments">
          Assignments
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-assignment-assignments">
            Assignments
          </DropdownItem>
          <DropdownItem id="wd-assignment-quizzes">
            Quizzes
          </DropdownItem>
          <DropdownItem id="wd-assignment-projects">
            Projects
          </DropdownItem>
          <DropdownItem id="wd-assignment-exams">
            Exams
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="me-2 p-1">
        <FormLabel column sm={2}> Display Grade As </FormLabel>
        <DropdownToggle variant="secondary" size="lg" id="wd-assignment-percentage">
          Percentage
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-assignment-percentage">
            Percentage
          </DropdownItem>
          <DropdownItem id="wd-assignment-number">
            Number
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown className="me-2 p-1">
        <FormLabel column sm={2}> Submission Type </FormLabel>
        <DropdownToggle variant="secondary" size="lg" id="wd-assignment-online">
          Online
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-assignment-online">
            Online
          </DropdownItem>
          <DropdownItem id="wd-assignment-paper">
            Paper
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <FormLabel>Online Entry Options</FormLabel>
      <FormCheck type="checkbox" defaultChecked={false} label="Text Entry"/>
      <FormCheck type="checkbox" defaultChecked={false} label="Website URL"/>
      <FormCheck type="checkbox" defaultChecked={false} label="Media Recordings"/>
      <FormCheck type="checkbox" defaultChecked={false} label="Student Annotations"/>
      <FormCheck type="checkbox" defaultChecked={false} label="File Uploads"/>
      <FormLabel>Assign to:</FormLabel>
      <FormControl className="w-50 mb-2" value="Everyone" />
      <FormLabel>Due</FormLabel>
      <FormControl type="date" className="w-50 mb-2" value={`${assignment.dueDate}`} />
      <FormLabel>Available from</FormLabel>
      <FormControl type="date" className="w-50 mb-2" value={`${assignment.availableFrom}`} />
      <FormLabel>Until</FormLabel>
      <FormControl type="date" className="w-50 mb-2" value={`${assignment.dueDate}`} />
      <Link href={`/courses/${cid}/assignments/`}>
        <Button className="m-2 btn-secondary" type="button">Cancel</Button>
      </Link>
      <Link href={`/courses/${cid}/assignments/`}>
        <Button className="m-2 btn-danger" type="button">Save</Button>
      </Link>
    </div>
);}
