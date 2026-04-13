/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "react-bootstrap";
export default function QuizDetailsEditor({ handleClose, createQuiz}:
    { handleClose: () => void; createQuiz: (quiz: any) => void; }
) {
    const { cid, qid } = useParams();
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
    });
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
            <input type="number" value={quiz.points} onChange={(e) => setQuiz({ ...quiz, points: parseInt(e.target.value) })} /> <br /> <br />
            <label>Shuffle Answers</label>
            <input type="checkbox" checked={quiz.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} /> <br /> <br />
            <label>Time limit</label>
            <input type="number" value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })} /> <br /> <br />
            <label>Multiple attempts</label>
            <input type="checkbox" checked={quiz.multipleAttempts} onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} /> <br /> <br />
            <label>Show correct answers</label>
            <input type="checkbox" checked={quiz.showCorrectAnswers} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })} /> <br /> <br />
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
            <Button className="m-2" onClick={() => { createQuiz(quiz); handleClose(); }}>Save</Button>
            <Button className="m-2" onClick={() => { createQuiz(quiz); handleClose(); }}>Save and Publish</Button>
            <Button className="m-2" variant="secondary" onClick={handleClose}>Cancel</Button>
        </div>
    );
}