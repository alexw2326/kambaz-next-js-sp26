/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { Button, FormControl } from "react-bootstrap";

export default function QuizPreview({ quiz, time }: { quiz: any; time: string }) {
    const { cid, qid } = useParams();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<any[]>([]);
    const [question, setQuestion] = useState<any>();
    const [index, setIndex] = useState(0);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    const [submission, setSubmission] = useState<any>();
    const handleNext = () => {
        setIndex(index+1)
    }
    const handlePrevious = () => {
        setIndex(index-1)
    }
    const handleSubmit = () => {
        
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
                            <input type="radio" id="true-option" name="true-false" />
                            <label htmlFor="true-option">True</label> <br />
                            <input type="radio" id="false-option" name="true-false" />
                            <label htmlFor="false-option">False</label>
                        </div>
                    )}
                    {question.questionType === "MULTIPLE CHOICE" && (
                        <div className="p-2">
                            {question.options.map((option: any, i: number) => (
                                <div key={i}>
                                    <input type="radio" id={`mcq-option-${i}`} name="mcq" />
                                    <label htmlFor={`mcq-option-${i}`}>{option.text}</label> <br />
                                </div>
                            ))}
                        </div>
                    )}
                    {question.questionType === "FILL BLANK" && (
                        <div className="p-2">
                            <FormControl as="textarea" placeholder="Enter answer here" />
                        </div>
                    )}
                </div>
                <div className="d-flex gap-2 justify-content-end w-75 p-3">
                    {!isFirst && (
                        <Button onClick={handlePrevious}>Previous</Button>
                    )}
                    {isLast ? (
                        <Button variant="success" onClick={handleSubmit}>
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