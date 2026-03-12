import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import AssignmentDelete from "./AssignmentDelete";
import { useState } from "react";
export default function LessonControlButtons(
  { assignmentId, deleteAssignments, editAssignments }: { 
    assignmentId: string; 
    deleteAssignments: (assignmentId: string) => void;
    editAssignments: (assignmentId: string) => void }
) {
  const [show, setShow] = useState(false);
  const handleClose =() => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="float-end">
      <FaPencil onClick={() => editAssignments(assignmentId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={handleShow}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <AssignmentDelete show={show} handleClose={handleClose} dialogTitle="Delete Assignment" 
        deleteAssignment={() => deleteAssignments(assignmentId)} />
    </div> );}