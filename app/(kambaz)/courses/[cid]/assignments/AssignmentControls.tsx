import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
export default function AssignmentControls() {
 return (
   <div id="wd-assignment-controls" className="text-nowrap d-flex align-items-center mb-3">
      <InputGroup className="w-50">
        <InputGroupText>
          <CiSearch />
        </InputGroupText>
        <FormControl className="w-50" type="text" placeholder="Search for Assignments" />
      </InputGroup>
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
   </div>
);}
