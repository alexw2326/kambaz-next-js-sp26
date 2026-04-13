/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { RootState } from "@/app/(kambaz)/store";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const router = useRouter();
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    const { quizzes } = useSelector(
        (state: RootState) => state.quizzesReducer
    );
    const quiz = quizzes.find(
        (quiz: any) => quiz._id === String(qid)
    );
    if (!quiz) return <div>Quiz not found</div>;
    const handleEdit = () => {
        router.push(`/courses/${cid}/quizzes/${qid}/editor`);
    }
    return (
        <div>
            {adminPermission? (
                <div>
                    <Button variant="secondary" size="lg" className="float-end m-2" id="wd-edit-quiz-btn" onClick={handleEdit}>
                        <FaPencil /> Edit
                    </Button>
                    <Button variant="secondary" size="lg" className="float-end m-2" id="wd-preview-quiz-btn">
                        Preview
                    </Button>
                    <h1>{quiz.title}</h1>
                    <h6><b>Quiz Type </b>{quiz.quizType}</h6>
                    <h6><b>Points </b>{quiz.points}</h6>
                    <h6><b>Assignment Group </b>{quiz.assignmentGroup}</h6>
                    <h6><b>Shuffle Answers </b>{quiz.shuffleAnswers ? "Yes" : "No"}</h6>
                    <h6><b>Time Limit </b>{quiz.timeLimit} minutes</h6>
                    <h6><b>Multiple Attempts </b>{quiz.multipleAttempts ? "Yes" : "No"}</h6>
                    <h6><b>How many attempts </b>{quiz.howManyAttempts}</h6>
                    <h6><b>View Responses </b>{quiz.showCorrectAnswers ? "Always" : "Never"}</h6>
                    <h6><b>Access code </b>{quiz.accessCode ? quiz.accessCode : ""}</h6>
                    <h6><b>One Question at a Time </b>{quiz.oneQuestionAtATime ? "Yes" : "No"}</h6>
                    <h6><b>Webcam required </b>{quiz.webcamRequired ? "Yes" : "No"}</h6>
                    <h6><b>Lock Questions After Answering </b>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</h6>
                    <h6><b>Due date </b>{new Date(quiz.dueDate).toLocaleString()}</h6>
                    <h6><b>Available date </b>{new Date(quiz.availableFrom).toLocaleString()}</h6>
                    <h6><b>Until date </b>{new Date(quiz.untilDate).toLocaleString()}</h6>
                    <br />
                </div>
            ) : (
                <div>
                    <Button variant="secondary" size="lg" className="float-end" id="wd-start-quiz-btn">
                        Start Quiz
                    </Button>
                </div>
            )}
        </div>
    );
}