"use client"
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import QuizContextMenu from "./QuizContextMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import RedCheck from "./RedCheck";
export default function QuizControlButton(
  { quizId, deleteQuizzes, isPublished }: {
    quizId: string; 
    deleteQuizzes: (quizId: string) => void;
    isPublished: boolean;
  }
) {
    const [context, setContext] = useState(false);
    const [show, setShow] = useState(false);
    const handleContext = () => setContext(true);
    const handleCloseContext = () => setContext(false);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    return (
        <div className="float-end">
            {isPublished ? <GreenCheckmark /> : <RedCheck />}
            {adminPermission && (
                <IoEllipsisVertical className="fs-4" onClick={() => { handleContext(); setShow(true); }} />
            )}
            {show && (
                <QuizContextMenu show={context} handleClose={handleCloseContext} quizId={quizId} quizDelete={deleteQuizzes} isPublished={isPublished} />
            )}
        </div> 
    );
}