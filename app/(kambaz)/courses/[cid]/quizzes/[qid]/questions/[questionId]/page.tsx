/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, FormControl, FormLabel, Button } from "react-bootstrap"
import { FaPlus, FaTrash } from "react-icons/fa6";
import * as client from "../../../../../client";

export default function QuestionEditor({ question, onClose, onSave }: 
        { question: any; onClose: () => void; onSave: (updated: any) => void; }) {
    const [title, setQuestionTitle] = useState(question?.title || "");
    const [questionType, setQuestionType] = useState(question?.questionType || "MULTIPLE CHOICE");
    const [points, setPoints] = useState(question?.points || 0);
    const [questionText, setQuestionText] = useState(question?.questionText || "");
    const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer ?? true);
    const [options, setOptions] = useState<{text: string, isCorrect: boolean}[]>(question?.options || []);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>(question?.correctAnswers || []);
    const addPotentialAnswer = () => {
        if (questionType === "MULTIPLE CHOICE") {
            setOptions([...options, {text: "", isCorrect: false}]);
        } else if (questionType === "FILL BLANK") {
            setCorrectAnswers([...correctAnswers, ""]);
        }
    };
    const deleteOption = (index: number) => {
        if (questionType === "MULTIPLE CHOICE") {
            setOptions(options.filter((_, i) => i !== index));
        } else if (questionType === "FILL BLANK") {
            setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
        }
    }
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
                <DropdownToggle variant="secondary" id="wd-questions-types" value={"MULTIPLE CHOICE"}>
                    {questionType === "MULTIPLE CHOICE" && "MULTIPLE CHOICE"}
                    {questionType === "TRUE FALSE" && "TRUE FALSE"}
                    {questionType === "FILL BLANK" && "FILL BLANK"}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="wd-questions-multiple-choice" onClick={() => setQuestionType("MULTIPLE CHOICE")}>
                        Multiple Choice
                    </DropdownItem>
                    <DropdownItem id="wd-questions-true-false" onClick={() => setQuestionType("TRUE FALSE")}>
                        True or False
                    </DropdownItem>
                    <DropdownItem id="wd-questions-fill-blank" onClick={() => setQuestionType("FILL BLANK")}>
                        Fill in the Blank
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <h3>Question</h3>
            <FormControl value={questionText} as="textarea" rows={3} placeholder="Enter question text here" onChange={(e) => setQuestionText(e.target.value)} />
            <h3>Pts</h3>
            <FormControl type="number" min={0} value={points} 
                onChange={(e) => setPoints(Number(e.target.value) || 0)} className="mb-2 w-25" />
            <h3>Answers</h3>
            {questionType === "TRUE FALSE" ? (
                <div>
                    <label>True</label>
                    <input type="radio" name={`correct-${question._id}`} checked={correctAnswer === true}
                            onChange={() => {
                                { setCorrectAnswer(true);}
                            }} className="ms-2" />
                    <label>False</label>
                    <input type="radio" name={`correct-${question._id}`} checked={correctAnswer === false}
                            onChange={() => {
                                { setCorrectAnswer(false);}
                            }} className="ms-2" />
                </div>
            ) : questionType === "MULTIPLE CHOICE" ? (
                <div>
                    <FormLabel>Options</FormLabel>
                    {options.map((option: {text: string, isCorrect: boolean}, index: number) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                            <FormLabel>Possible Answer</FormLabel>
                            <FormControl placeholder={`Option ${index + 1}`} value={option.text} className="w-50"
                                onChange={(e) => {
                                    const updated = [...options];
                                    updated[index] = { ...updated[index], text: e.target.value };
                                    setOptions(updated);
                                }} />
                            <input type="radio" name={`correct-${question._id}`} checked={option.isCorrect} 
                                onChange={() => {
                                    const updated = options.map((o, i) => ({ ...o, isCorrect: i === index }));
                                    setOptions(updated)
                                }} className="ms-2" />
                            <label className="ms-1">Correct</label>
                            <FaTrash onClick={() => deleteOption(index)}/>
                        </div>
                    ))}
                </div>
            ) : questionType === "FILL BLANK" ? (
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
                            <FaTrash onClick={() => deleteOption(index)}/>
                        </div>
                    ))}
                </div>
            ) : null}
            {questionType !== "TRUE FALSE" && (
                <Button className="m-2" onClick={addPotentialAnswer}><FaPlus /> Add Another Answer</Button>
            )}
            <Button variant="secondary" className="m-2" onClick={onClose}>Cancel</Button>
            <Button variant="danger" className="m-2" onClick={updateQuestion}>Save</Button>
        </div>
    );
}