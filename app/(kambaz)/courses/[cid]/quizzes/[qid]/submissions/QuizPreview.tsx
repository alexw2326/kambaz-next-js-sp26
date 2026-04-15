/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../../client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { Button, FormControl } from "react-bootstrap";

export default function QuizPreview({ quiz, time }: { quiz: any; time: string }) {
    const { cid, qid } = useParams();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<any[]>([]);
    const [question, setQuestion] = useState<any>();
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const [attemptNumber, setAttemptNumber] = useState(1);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    const [answers, setAnswers] = useState<any[]>([]);
    const [submissions, setSubmissions] = useState<any>();
    const handleNext = () => {
        setIndex(index+1)
    }
    const handlePrevious = () => {
        setIndex(index-1)
    }
    const calculateScore = () => {
        let score = 0;
        answers.forEach((a: any) => {
            if (a.isCorrect) {
                const question = questions.find((q: any) => q._id === a.questionId);
                if (question) score += question.points;
            }
        });
        return score;
    }
    const handleCreateSubmission = async () => {
        const newSubmission = {
            quizId: qid,
            userId: currentUser?._id,
            answers: answers,
            score: calculateScore(),
            attemptNumber: attemptNumber,
            submittedAt: new Date(),
        };
        const created = await client.createSubmission(newSubmission, cid as string, qid as string, currentUser?._id as string);
        setSubmissions(created);
        if (!adminPermission) {
            setAttemptNumber(attemptNumber+1);
        }
        router.push(`/courses/${cid}/quizzes/${qid}/submissions/${submissions._id}`);
    }
    const handleAnswers = (value: string) => {
        const answer = {
            questionId: question._id,
            selectedAnswer: value,
            isCorrect: handleCorrectness(value),
        };
        setAnswers(prev => {
            const filtered = prev.filter(a => a.questionId !== question._id);
            return [...filtered, answer];
        });
    }
    const handleCorrectness = (value: string) => {
        if (question.questionType === "TRUE FALSE") {
            return question.correctAnswer.toString().toLowerCase() === value;
        } else if (question.questionType === "MULTIPLE CHOICE") {
            const match = question.options.find((a: any) => a.text.toLowerCase() === value);
            return match?.isCorrect ?? false;
        } else if (question.questionType === "FILL BLANK") {
            return question.correctAnswers.some((a: any) => a.toLowerCase() === value.toLowerCase());
        } else {
            return false;
        }
    }
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!qid || qid === "new") return;
            const data = await client.showAllQuestions(cid as string, qid as string);
            setQuestions(data);
            setLoading(false);
        };
        fetchQuestions();
    }, [qid]);
    useEffect(() => {
        if (questions.length > 0) {
            setQuestion(questions[index]);
        }
    }, [questions, index]);
    const isLast = index === questions.length - 1;
    const isFirst = index === 0;
    if (loading) return <div>Loading questions...</div>;
    if (!question) return <div>No questions found.</div>;
    return (
        <div>
            <h1>{quiz?.title}</h1>
            <h3>Started: {time}</h3>
            <h1>Quiz Instructions</h1>
            <div key={question._id}>
                <div className="wd-title p-3 ps-2 bg-secondary w-75 border border-dark border-2 d-flex justify-content-between">
                    <h5 className="float-start">Question {index + 1}</h5>
                    <h5 className="float-end pb-6">Points {question.points}</h5>
                </div>
                <div className="p-3 wd-questions border border-dark border-2 w-75">
                    {question.questionText}
                    {question.questionType === "TRUE FALSE" && (
                        <div className="p-2">
                            <input type="radio" id="true-option" name="true-false"
                                checked={answers.find(a => a.questionId === question._id)?.selectedAnswer === "true"}
                                onChange={(e) => e.target.checked && handleAnswers("true")} />
                            <label htmlFor="true-option">True</label> <br />
                            <input type="radio" id="false-option" name="true-false"
                                checked={answers.find(a => a.questionId === question._id)?.selectedAnswer === "false"}
                                onChange={(e) => e.target.checked && handleAnswers("false")} />
                            <label htmlFor="false-option">False</label>
                        </div>
                    )}
                    {question.questionType === "MULTIPLE CHOICE" && (
                        <div className="p-2">
                            {question.options.map((option: any, i: number) => (
                                <div key={i}>
                                    <input type="radio" id={`mcq-option-${i}`} name="mcq" value={option.text}
                                        checked={answers.find(a => a.questionId === question._id)?.selectedAnswer === option.text}
                                        onChange={(e) => e.target.checked && handleAnswers(e.target.value.toString())} />
                                    <label htmlFor={`mcq-option-${i}`}>{option.text}</label> <br />
                                </div>
                            ))}
                        </div>
                    )}
                    {question.questionType === "FILL BLANK" && (
                        <div className="p-2">
                            <FormControl as="textarea" placeholder="Enter answer here"
                                value={answers.find(a => a.questionId === question._id)?.selectedAnswer || ""}
                                onChange={(e) => e.target.value && handleAnswers(e.target.value)} />
                        </div>
                    )}
                </div>
                <div className="d-flex gap-2 justify-content-end w-75 p-3">
                    {!isFirst && (
                        <Button onClick={handlePrevious}>Previous</Button>
                    )}
                    {isLast ? (
                        <Button variant="success" onClick={handleCreateSubmission}>
                            Submit Quiz
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>Next</Button>
                    )}
                </div>
            </div>
        </div>
    );
}