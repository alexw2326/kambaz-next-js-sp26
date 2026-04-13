/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as client from "../../client";
import { Button, FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizContextMenu from "./QuizContextMenu";
import { useParams } from "next/navigation";
import QuizEditor from "./QuizEditor";
export default function QuizzesControls({ fetchQuizzes, onCreateQuiz, setQuizzes, handleShow, }: {
    fetchQuizzes: () => void;
    onCreateQuiz: (quiz: any) => void;
    setQuizzes: (quizzes: any) => void;
    handleShow: () => void;
}) {
    const { cid } = useParams();
    const [show, setShow] = useState(false);
    const [context, setContext] = useState(false);
    const [name, setName] = useState("");
    const handleClose = () => setShow(false);
    const handleContext = () => setContext(true);
    const handleCloseContext = () => setContext(false);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    const filterQuizzesByName = async (new_name: string) => {
        setName(new_name);
        if (new_name) {
          const quizzes = await client.findQuizByName(name, cid as string);
          setQuizzes(quizzes);
        } else {
          fetchQuizzes();
        }
    };
    return (
        <div id="wd-quizzes-controls" className="text-nowrap">
            {adminPermission && (
                <span>
                    <IoEllipsisVertical className="fs-4 mt-2 float-end" onClick={handleContext} />
                    <Button variant="danger" size="lg" className="float-end" id="wd-add-quiz-btn" onClick={handleShow}>
                        <FaPlus /> Quiz
                    </Button>
                </span>
            )}
            <FormControl onChange={(e) => filterQuizzesByName(e.target.value)} placeholder="Search quizzes" className="float-start me-2 w-50 fs-5" />
            {show && (
                <div> <br /> <br /> <br />
                    <QuizEditor handleClose={handleClose} createQuiz={onCreateQuiz} />
                    <QuizContextMenu show={context} handleClose={handleCloseContext} />
                </div>
            )}
        </div>
    );
}
