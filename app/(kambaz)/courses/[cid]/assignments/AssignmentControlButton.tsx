import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import AssignmentDelete from "./AssignmentDelete";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
export default function LessonControlButtons(
  { assignmentId, deleteAssignments, editAssignments }: { 
    assignmentId: string; 
    deleteAssignments: (assignmentId: string) => void;
    editAssignments: (assignmentId: string) => void }
) {
  const [show, setShow] = useState(false);
  const handleClose =() => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const currentUserRole = currentUser?.role;
  const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
  return (
    <div className="float-end">
      {adminPermission && (
        <span>
          <FaPencil onClick={(e) => { e.stopPropagation(); editAssignments(assignmentId)}} className="text-primary me-3" />
          <FaTrash className="text-danger me-2 mb-1" onClick={(e) => {e.stopPropagation(); handleShow();}}/>
        </span>
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <AssignmentDelete show={show} handleClose={handleClose} dialogTitle="Delete Assignment" 
        deleteAssignment={() => deleteAssignments(assignmentId)} />
    </div> );}