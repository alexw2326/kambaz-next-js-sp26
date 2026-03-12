/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, FormControl, Button, FormLabel } from "react-bootstrap";
export default function AssignmentEditor({ show, handleClose, dialogTitle, setDescription, setAssignmentName, 
    setPoints, setDue, setAvailability, saveAssignment, assignment,}: {
 show: boolean; handleClose: () => void; dialogTitle: string;
  setDescription: (description: string) => void;
  setAssignmentName: (name: string) => void;
  setPoints: (name: string) => void;
  setDue: (name: string) => void;
  setAvailability: (name: string) => void;
  saveAssignment: () => void;
  assignment?: any }) {
 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <FormControl
     onChange={(e) => { setAssignmentName(e.target.value); }}
     defaultValue={assignment?.title || "New Assignment"} /> <br />
     <FormControl
     onChange={(e) => { setDescription(e.target.value); }}
     defaultValue={assignment?.description || "New Assignment Description"}
     as="textarea" rows={3}/>
     Points
     <FormControl
        onChange={(e) => { setPoints(e.target.value); }}
        defaultValue={assignment?.points || "100"} />
    Assign <br />
    <FormLabel>Due</FormLabel>
     <FormControl
        onChange={(e) => { setDue(e.target.value); }}
        type="date"
        defaultValue={assignment?.dueDate} /> <br />
    <FormLabel>Available From</FormLabel>
     <FormControl
        onChange={(e) => { setAvailability(e.target.value); }}
        defaultValue={assignment?.availableFrom}
        type="date" />
    <FormLabel>Until</FormLabel>
     <FormControl
        onChange={(e) => { setDue(e.target.value); }}
        defaultValue={assignment?.dueDate}
        type="date" />
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => {
      saveAssignment();
      handleClose();
     }} > Save </Button>
   </Modal.Footer>
  </Modal>
);}
