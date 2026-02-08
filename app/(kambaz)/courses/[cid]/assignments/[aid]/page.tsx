import { FormControl, FormLabel, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormCheck, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignments</FormLabel>
      <FormControl className="w-100 mb-2" value="A1" />
      <FormControl 
        as="textarea"
        rows={8}
        className="w-100" 
        id="wd-description" 
        value={`The assignment is available online 
        Submit a link to the landing page of your Web application running on Netlify. 
        The landing page should include the following: 
        • Your full name and section
        • Links to each of the lab assignments
        • Link to the Kanbas application
        • Links to all relevant source code repositories
        The Kanbas application should include a link to navigate back to the landing page.`} />
      <br />
      <Row xs={1} md={5} className="g-4">
          <FormLabel column sm={2}> Points </FormLabel>
          <Col className="wd-assignment-stats" style={{ width: "300px" }}>
            <FormControl type="number" value="100" />
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
      <FormControl type="date" className="w-50 mb-2" value="2024-05-13" />
      <FormLabel>Available from</FormLabel>
      <FormControl type="date" className="w-50 mb-2" value="2024-05-06" />
      <FormLabel>Until</FormLabel>
      <FormControl type="date" className="w-50 mb-2" value="2024-05-20" />
      <Button className="m-2 btn-secondary" type="button">Cancel</Button>
      <Button className="m-2 btn-danger" type="button">Save</Button>
    </div>
);}
