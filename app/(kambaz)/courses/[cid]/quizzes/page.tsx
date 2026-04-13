/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as client from "../../client";
import QuizzesControls from "./QuizzesControls";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import QuizEditor from "./QuizEditor";
export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const [show, setShow] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [saving, setSaving] = useState(false);
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
    await client.deleteQuiz(cid as string, quizId);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };
  const onUpdateQuiz = async (quiz: any) => {
    if (saving) return;
    setSaving(true);
    await client.updateQuiz(cid as string, quiz);
    const newQuizzes = quizzes.map((q: any) => q._id === quiz._id ? quiz : q );
    dispatch(setQuizzes(newQuizzes));
    setSaving(false);
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
  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div className="wd-quizzes">
      {show ? (
        <QuizEditor handleClose={() => setShow(false)} createQuiz={onCreateQuiz} />
      ) : (
        <div>
          <QuizzesControls fetchQuizzes={fetchQuizzes} onCreateQuiz={onCreateQuiz} setQuizzes={setQuizzes} handleShow={() => setShow(true)} /> <br /> <br /> <br />
          <ListGroup id="wd-quizzes" className="rounded-0">
            {quizzes.map((quiz: any) => (
              <ListGroupItem key={quiz._id}>
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  {!quiz.editing && quiz.name}
                  {quiz.editing ? (
                    <FormControl className="w-50 d-inline-block"
                      value={editingName}
                      onChange={(e) => {
                        setEditingName(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdateQuiz({ ...quiz, name: editingName, editing: false });
                        }
                      }} />
                  ) : (
                    <Link href={`/courses/${cid}/quizzes/${quiz._id}`}
                          className="wd-assignment-link text-decoration-none text-dark">
                      {quiz.title} <br />
                      <span className="small text-muted">
                        <strong> {checkAvailability(quiz)} | Due </strong> {quiz.dueDate} at 12:00 am |
                        {quiz.points} pts
                        {quiz.questions ? ` | ${quiz.questions.length} Questions` : ""}
                        {currentUserRole === "STUDENT" && quiz.score !== undefined ? ` | Score: ${quiz.score}` : ""}
                        </span>
                    </Link>
                  )}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
}