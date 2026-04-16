/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { RootState } from "@/app/(kambaz)/store";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import QuizPreview from "./submissions/page";
import { useEffect, useState } from "react";
import * as client from "../../../client";
export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const router = useRouter();
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    const [show, setShow] = useState(false);
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [startTime, setStartTime] = useState<string>("");
    const handleStart = () => {
        setStartTime(new Date().toLocaleTimeString());
        setShow(true);
    }
    const onTogglePublish = async (published: boolean) => {
        await client.setQuizPublished(qid as string, cid as string, published);
        setQuiz(quiz._id === qid ? { ...quiz, isPublished: published } : quiz);
    };
    useEffect(() => {
        if (cid && qid) {
            client.getQuiz(qid as string, cid as string)
                .then(setQuiz)
                .finally(() => setLoading(false));
        }
    }, [qid, cid]);
    if (loading) return <div>Loading...</div>;
    if (!quiz) return <div>Quiz not found</div>;
    const handleEdit = () => {
        router.push(`/courses/${cid}/quizzes/${qid}/editor`);
    }
    return (
        <div>
            {show ? (
                <QuizPreview quiz={quiz} time={startTime} />
             ) : (
                <div>
                    {adminPermission? (
                        <div>
                            <Button variant="secondary" size="lg" className="float-end m-2" id="wd-edit-quiz-btn" onClick={handleEdit}>
                                <FaPencil /> Edit
                            </Button>
                            <Button variant="secondary" size="lg" className="float-end m-2" id="wd-preview-quiz-btn" onClick={handleStart}>
                                Preview
                            </Button>
                            <h1>{quiz.title}</h1>
                            <h6><b>Quiz Type </b>{quiz.quizType}</h6>
                            <h6><b>Points </b>{quiz.points}</h6>
                            <h6><b>Assignment Group </b>{quiz.assignmentGroup}</h6>
                            <h6><b>Shuffle Answers </b>{quiz.shuffleAnswers ? "Yes" : "No"}</h6>
                            <h6><b>Time Limit </b>{quiz.timeLimit} minutes</h6>
                            <h6><b>Multiple Attempts </b>{quiz.multipleAttempts ? "Yes" : "No"}</h6>
                            <h6><b>How many attempts </b>{quiz.numAttemptsAllowed}</h6>
                            <h6><b>Show Correct Answers </b>{quiz.showCorrectAnswers ? "Always" : "Never"}</h6>
                            <h6><b>Access code </b>{quiz.accessCode ? quiz.accessCode : ""}</h6>
                            <h6><b>One Question at a Time </b>{quiz.oneQuestionAtATime ? "Yes" : "No"}</h6>
                            <h6><b>Webcam required </b>{quiz.webcamRequired ? "Yes" : "No"}</h6>
                            <h6><b>Lock Questions After Answering </b>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</h6>
                            <h6><b>Due date </b>{new Date(quiz.dueDate).toLocaleString()}</h6>
                            <h6><b>Available date </b>{new Date(quiz.availableDate).toLocaleString()}</h6>
                            <h6><b>Until date </b>{new Date(quiz.untilDate).toLocaleString()}</h6>
                            <br />
                            {quiz.isPublished ? (
                                <Button variant="warning" className="me-2 mb-1" onClick={() => { onTogglePublish(false)}}>
                                    Unpublish
                                </Button>
                            ) : (
                                <Button variant="success" className="me-2 mb-1" onClick={() => { onTogglePublish(true)}}>
                                    Publish
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Button variant="secondary" size="lg" id="wd-start-quiz-btn" onClick={handleStart}>
                                Start Quiz
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}