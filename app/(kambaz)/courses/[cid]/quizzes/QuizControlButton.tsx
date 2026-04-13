import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
export default function QuizControlButton(
  { quizId, deleteQuizzes }: {
    quizId: string; 
    deleteQuizzes: (quizId: string) => void;
  }
) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const currentUserRole = currentUser?.role;
  const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
  return (
    <div className="float-end">
      {adminPermission && (
        <span>
          <FaTrash className="text-danger me-2 mb-1" onClick={(e) => {e.stopPropagation(); deleteQuizzes(quizId);}}/>
        </span>
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> 
);}