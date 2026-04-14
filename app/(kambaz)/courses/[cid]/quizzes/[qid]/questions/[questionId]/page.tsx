/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, FormControl, FormLabel, Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa6";
import * as client from "../../../../../client";

export default function QuestionEditor({ question, onClose, onSave }: 
        { question: any; onClose: () => void; onSave: (updated: any) => void; }) {
    const [title, setQuestionTitle] = useState(question?.title || "");
    const [questionType, setQuestionType] = useState(question?.questionType || "multiple-choice");
    const [points, setPoints] = useState(question?.points || 0);
    const [questionText, setQuestionText] = useState(question?.questionText || "");
    const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || "true");
    const [options, setOptions] = useState<string[]>(question?.options || []);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>(question?.correctAnswers || []);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
        question?.correctAnswer ? question.options?.indexOf(question.correctAnswer) : null
    );
    const addPotentialAnswer = () => {
        if (questionType === "multiple-choice") {
            setOptions([...options, ""]);
        } else if (questionType === "fill-blank") {
            setCorrectAnswers([...correctAnswers, ""]);
        }
    };
    const updateQuestion = async () => {
        const updated = {
            ...question,
            title,
            questionType,
            points,
            questionText,
            correctAnswer,
            options,
            correctAnswers
        };
        await client.updateQuestion(updated, question.courseId, question.quizId);
        onSave(updated);
    };
    if (!question) return null;
    return (
        <div>
            <h1>Question Editor</h1>
            <h3>Title input</h3>
            <FormControl value={title} placeholder="Enter question title here" className="mb-2" onChange={(e) => setQuestionTitle(e.target.value)} />
            <Dropdown className="me-2 p-1">
                <FormLabel column sm={2}> Question Type </FormLabel>
                <DropdownToggle variant="secondary" id="wd-questions-types">
                    {questionType === "multiple-choice" && "MULTIPLE CHOICE"}
                    {questionType === "true-false" && "TRUE FALSE"}
                    {questionType === "fill-blank" && "FILL BLANK"}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="wd-questions-multiple-choice" onClick={() => setQuestionType("multiple-choice")}>
                        Multiple Choice
                    </DropdownItem>
                    <DropdownItem id="wd-questions-true-false" onClick={() => setQuestionType("true-false")}>
                        True or False
                    </DropdownItem>
                    <DropdownItem id="wd-questions-fill-blank" onClick={() => setQuestionType("fill-blank")}>
                        Fill in the Blank
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <h3>Question</h3>
            <FormControl value={questionText} as="textarea" rows={3} placeholder="Enter question text here" onChange={(e) => setQuestionText(e.target.value)} />
            <h3>Pts</h3>
            <FormControl type="number" value={points} 
                onChange={(e) => setPoints(Number(e.target.value))} className="mb-2 w-25" />
            <h3>Answers</h3>
            {questionType === "true-false" ? (
                <div>
                    <FormLabel>Correct Answer</FormLabel>
                    <FormControl value={correctAnswer} as="select" className="w-50" onChange={(e) => setCorrectAnswer(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </FormControl>
                </div>
            ) : questionType === "multiple-choice" ? (
                <div>
                    <FormLabel>Options</FormLabel>
                    {options.map((option: string, index: number) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <FormLabel>Possible Answer</FormLabel>
                            <FormControl placeholder={`Option ${index + 1}`} value={option} className="w-50"
                                onChange={(e) => {
                                    const updated = [...options];
                                    updated[index] = e.target.value;
                                    setOptions(updated);
                                }} />
                            <input type="radio" name={`correct-${question._id}`} checked={correctAnswerIndex === index} onChange={() => setCorrectAnswerIndex(index)} className="ms-2" />
                            <label className="ms-1">Correct</label>
                        </div>
                    ))}
                </div>
            ) : questionType === "fill-blank" ? (
                <div>
                    <FormLabel>Possible Answers</FormLabel>
                    {correctAnswers.map((answer: string, index: number) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <FormLabel>Possible Answer</FormLabel>
                            <FormControl
                                placeholder={`Answer ${index + 1}`} value={answer} className="w-50"
                                onChange={(e) => {
                                    const updated = [...correctAnswers];
                                    updated[index] = e.target.value;
                                    setCorrectAnswers(updated);
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <Button className="m-2" onClick={addPotentialAnswer}><FaPlus /> Add Another Answer</Button>
            <Button variant="secondary" className="m-2" onClick={onClose}>Cancel</Button>
            <Button variant="danger" className="m-2" onClick={updateQuestion}>Save</Button>
        </div>
    );
}