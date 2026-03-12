import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import AssignmentEditor from "./AssignmentEditor";
import { useState } from "react";
export default function AssignmentControls(
  { setAssignmentName, setDescription, setPoints, setDue, setAvailability, addAssignment}:
  { setDescription: (title: string) => void;
    setPoints: (title: string) => void; 
    setDue: (title: string) => void; 
    setAvailability: (title: string) => void; 
    setAssignmentName: (title: string) => void; 
    addAssignment: () => void }
) {
  const [show, setShow] = useState(false);
  const handleClose =() => setShow(false);
  const handleShow = () => setShow(true);
 return (
   <div id="wd-assignment-controls" className="text-nowrap d-flex align-items-center mb-3">
      <InputGroup className="w-50">
        <InputGroupText>
          <CiSearch />
        </InputGroupText>
        <FormControl className="w-50" type="text" placeholder="Search for Assignments" />
      </InputGroup>
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn" onClick={handleShow}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
      <AssignmentEditor show={show} handleClose={handleClose} dialogTitle="Add Assignment"
            setAssignmentName={setAssignmentName} setDescription={setDescription}
            setPoints={setPoints} setDue={setDue} setAvailability={setAvailability}
            saveAssignment={addAssignment} />
   </div>
);}
