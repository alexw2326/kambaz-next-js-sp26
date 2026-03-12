import { Modal,  Button } from "react-bootstrap";
export default function AssignmentDelete({ show, handleClose, dialogTitle, deleteAssignment}: {
 show: boolean; handleClose: () => void; dialogTitle: string;
 deleteAssignment: () => void; }) {
 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Body>
    Are you sure you want to delete?
   </Modal.Body>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => {
      deleteAssignment();
      handleClose();
     }} > Yes </Button>
   </Modal.Footer>
  </Modal>
);}
