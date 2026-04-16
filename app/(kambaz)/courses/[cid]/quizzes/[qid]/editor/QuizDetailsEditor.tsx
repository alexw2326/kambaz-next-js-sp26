/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
export default function QuizDetailsEditor({ handleClose, createQuiz}:
    { handleClose?: () => void; createQuiz?: (quiz: any) => void; }
) {
    const { cid, qid } = useParams();
    const router = useRouter();
    const isEditing = qid && qid !== "new";
    const [timeLimit, setTimeLimit] = useState(false);
    const [quiz, setQuiz] = useState({
        title: "Quiz 1",
        description: "",
        assignedTo: "EVERYONE",
        quizType: "GRADED QUIZ",
        points: 0,
        assignmentGroup: "QUIZZES",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        numAttemptsAllowed: 1,
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestions: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        questions: [],
        isPublished: false,
    });
    const close = () => {
        if (handleClose) {
            handleClose();
        } else {
            router.push(`/courses/${cid}/quizzes`);
        }
    };
    const handleSave = async () => {
        if (isEditing) {
            const existingQuiz = await client.getQuiz(qid as string, cid as string);
            await client.updateQuiz({ 
                ...quiz, 
                questions: existingQuiz.questions
            }, cid as string);
        } else {
            createQuiz?.(quiz);
        }
        close();
    };
    const handleSaveAndPublish = async () => {
        const existingQuiz = await client.getQuiz(qid as string, cid as string);
        const publishedQuiz = { ...quiz, isPublished: true, questions: existingQuiz.questions };
        if (isEditing) {
            await client.updateQuiz(publishedQuiz, cid as string);
        } else {
            createQuiz?.(publishedQuiz);
        }
        close();
    };
    const formatDate = (date: string) => {
        return date ? date.split("T")[0] : "";
    };
    useEffect(() => {
        if (isEditing) {
            const fetchQuiz = async () => {
                const existingQuiz = await client.getQuiz(qid as string, cid as string);
                setQuiz({
                    ...existingQuiz,
                    dueDate: formatDate(existingQuiz.dueDate),
                    availableDate: formatDate(existingQuiz.availableDate),
                    untilDate: formatDate(existingQuiz.untilDate),
                });
            };
            fetchQuiz();
        }
    }, [qid]);
    return (
        <div>
            <label>Title</label>
            <input value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} /> <br /> <br />
            <label>Description</label>
            <textarea value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} /> <br /> <br />
            <label>Assigned to</label>
            <select value={quiz.assignedTo} onChange={(e) => setQuiz({ ...quiz, assignedTo: e.target.value })}>
                <option value="EVERYONE">Everyone</option>
            </select> <br /> <br />
            <label>Quiz type</label>
            <select value={quiz.quizType} onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                <option value="GRADED QUIZ">Graded Quiz</option>
                <option value="PRACTICE QUIZ">Practice Quiz</option>
                <option value="GRADED SURVEY">Graded Survey</option>
                <option value="UNGRADED SURVEY">Ungraded Survey</option>
            </select> <br /> <br />
            <label>Points</label>
            <input type="number" min={0} value={quiz.points} onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) || 0})} /> <br /> <br />
            <label>Assignment Group</label>
            <select value={quiz.assignmentGroup} onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
            </select> <br /> <br />
            <label>Shuffle Answers</label>
            <input type="checkbox" checked={quiz.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} /> <br /> <br />
            <label>Time limit</label>
            <input type="checkbox" checked={timeLimit} onChange={() => setTimeLimit(!timeLimit)} /> <br /> <br />
            {timeLimit && <div><input type="number" min={1} value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0})} /> <br /> <br /> </div> }
            <label>Multiple attempts</label>
            <input type="checkbox" checked={quiz.multipleAttempts} onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} /> <br /> <br />
            {quiz.multipleAttempts && (
                <div>
                    <label>Number of Attempts Allowed</label>
                    <input type="number" min={2} value={quiz.numAttemptsAllowed} onChange={(e) => setQuiz({ ...quiz, numAttemptsAllowed: e.target.valueAsNumber || 2})} /> <br /> <br />
                </div>
            )}
            <label>Show correct answers</label>
            <input type="checkbox" checked={quiz.showCorrectAnswers} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked})} /> <br /> <br />
            <label>Access code</label>
            <input value={quiz.accessCode} onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} /> <br /> <br />
            <label>One question at a time</label>
            <input type="checkbox" checked={quiz.oneQuestionAtATime} onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} /> <br /> <br />
            <label>Webcam required</label>
            <input type="checkbox" checked={quiz.webcamRequired} onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} /> <br /> <br />
            <label>Lock questions after answering</label>
            <input type="checkbox" checked={quiz.lockQuestions} onChange={(e) => setQuiz({ ...quiz, lockQuestions: e.target.checked })} /> <br /> <br />
            <label>Due Date</label>
            <input type="date" value={quiz.dueDate} onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} /> <br /> <br />
            <label>Available From</label>
            <input type="date" value={quiz.availableDate} onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })} /> <br /> <br />
            <label>Until</label>
            <input type="date" value={quiz.untilDate} onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })} /> <br /> <br />
            <label>Published</label>
            <input type="checkbox" checked={quiz.isPublished} onChange={(e) => setQuiz({ ...quiz, isPublished: e.target.checked })} /> <br /> <br />
            <Button className="m-2" onClick={handleSave}>Save</Button>
            <Button className="m-2" onClick={handleSaveAndPublish}>Save and Publish</Button>
            <Button className="m-2" variant="secondary" onClick={close}>Cancel</Button>
        </div>
    );
}