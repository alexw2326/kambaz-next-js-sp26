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
    const [questions, setQuestions] = useState<any[]>([]);
    const [index, setIndex] = useState(0);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const currentUserRole = currentUser?.role;
    const adminPermission = currentUserRole === "FACULTY" || currentUserRole === "ADMIN";
    const handleNext = () => {

    }
    const handlePrevious = () => {
        
    }
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!qid || qid === "new") return;
            const data = await client.showAllQuestions(cid as string, qid as string);
            setQuestions(data);
        };
        fetchQuestions();
    }, [qid]);
    return (
        <div>
            <h1>{quiz?.title}</h1>
            <h3>Started: {time}</h3>
            <h1>Quiz Instructions</h1>
            {questions.map((question: any) => (
                <div key={question._id}>
                    <div className="wd-title p-3 ps-2 bg-secondary w-75 border border-dark border-2 d-flex justify-content-between">
                        <h5 className="float-start">Question {index+1}</h5>
                        <h5 className="float-end pb-6">Points {question.points}</h5>
                    </div>
                    <div className="p-3 wd-questions border border-dark border-2 w-75">
                        {question.questionText}
                        {question.questionType === "TRUE FALSE" ? (
                            <div className="p-2">
                                <input type="radio" id="true-option" name="true-false" />
                                <label htmlFor="true-option">True</label> <br />
                                <input type="radio" id="false-option" name="true-false" />
                                <label htmlFor="false-option">False</label>
                            </div>
                        ) : question.questionType === "MULTIPLE CHOICE" ? (
                            <div className="p-2">
                                {question.options.map((option: any) => {
                                    <div>
                                        <input type="radio" id="mcq-option" name="mcq" />
                                        <label htmlFor="mcq-option">{option.text}</label> <br />
                                    </div>
                                })}
                            </div>
                        ) : question.questionType === "FILL BLANK" ? (
                            <div className="p-2">
                                <FormControl as={"textarea"} placeholder="Enter answer here" />
                            </div>
                        ) : null}
                    </div>
                    <div className="float-end w-25 p-3">
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                        {index > 1 && (
                            <Button onClick={handlePrevious}>
                                Previous
                            </Button>
                        )}
                    </div>   
                </div>    
            ))}
        </div>
    )
}