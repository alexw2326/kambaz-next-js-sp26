/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as client from "../../client";
import QuizzesControls from "./QuizzesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import QuizEditor from "./[qid]/editor/page";
import { FaRocket } from "react-icons/fa6";
import QuizControlButton from "./QuizControlButton";
export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const currentUserRole = currentUser?.role;
  const fetchQuizzes = async () => {
    const quizzes = await client.showAllQuizzes(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  const onCreateQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(quiz, cid as string);
    dispatch(setQuizzes([...quizzes, newQuiz]));
  };
  const onRemoveQuizzes = async (quizId: string) => {
    await client.deleteQuiz(quizId, cid as string);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };
  const checkAvailability = (quiz: any) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const untilDate = new Date(quiz.untilDate);
    if (now < availableFrom) {
      return "Not available until " + availableFrom.toLocaleDateString();
    }
    if (now > untilDate) {
      return "Closed";
    }
    return "Available";
  };
  const onTogglePublish = async (quizId: string, published: boolean) => {
    await client.setQuizPublished(quizId, cid as string, published);
    dispatch(setQuizzes(quizzes.map((q: any) => 
      q._id === quizId ? { ...q, isPublished: published } : q
    )));
  };
  const formatDate = (date: string) => {
    return date ? date.split("T")[0] : "";
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div className="wd-quizzes">
      {show ? (
        <QuizEditor handleClose={() => setShow(false)} createQuiz={onCreateQuiz} />
      ) : (
        <div>
          <QuizzesControls fetchQuizzes={fetchQuizzes} onCreateQuiz={onCreateQuiz} 
            setQuizzes={(quizzes: any) => dispatch(setQuizzes(quizzes))} handleShow={() => setShow(true)} />
          <br /> <br /> <br />
          <ListGroup id="wd-quizzes" className="rounded-0">
            <div className="wd-title p-3 ps-2 bg-secondary w-auto">
              <BsGripVertical className="me-2 fs-3 w-auto" />QUIZZES
            </div>
            {quizzes.map((quiz: any) => (
              <ListGroupItem key={quiz._id}>
                <div className="relative">
                  <br />
                  <div>
                    <FaRocket className="me-2" />
                    <Link href={`/courses/${cid}/quizzes/${quiz._id}`}
                          className="text-decoration-none text-dark fw-bold">
                      {quiz.title}
                    </Link>
                  </div>
                  <div className="small text-muted">
                    <strong>{checkAvailability(quiz)}</strong> | <strong>Due</strong> {formatDate(quiz.dueDate)} at 12:00 am |
                    {quiz.points} pts
                    {quiz.questions ? ` | ${quiz.questions.length} Questions` : ""}
                    {currentUserRole === "STUDENT" && quiz.score !== undefined ? ` | Score: ${quiz.score}` : ""}
                  </div>
                  <div className="absolute top-0 right-0">
                    <QuizControlButton quizId={quiz._id}
                      deleteQuizzes={onRemoveQuizzes}
                      isPublished={quiz.isPublished}
                      onTogglePublish={onTogglePublish} />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}