/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import * as client from "../../../../client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionEditor from "./[questionId]/page";

export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const addQuestion = async () => {
        const newQuestion = {
            title: "New Question",
            questionText: "New Question",
            questionType: "MULTIPLE CHOICE",
            points: 0,
            options: [],
            correctAnswers: [],
        };
        const created = await client.createQuestion(newQuestion, cid as string, qid as string);
        setQuestions([...questions, created]);
    }
    const deleteQuestion = async (questionId: string) => {
        await client.deleteQuestion(questionId, cid as string, qid as string);
        setQuestions(questions.filter((q: any) => q._id !== questionId));
    };
    const editQuestion = (question: any) => {
        setEditingQuestion(question);
    }
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!qid || qid === "new") return;
            const data = await client.showAllQuestions(cid as string, qid as string);
            setQuestions(data);
        };
        fetchQuestions();
    }, [qid]);
    if (editingQuestion) {
        return <QuestionEditor question={editingQuestion} onClose={() => setEditingQuestion(null)} 
            onSave={(updated: any) => { setQuestions(questions.map((q: any) => q._id === updated._id ? updated : q)); 
            setEditingQuestion(null); }} />
    }
    return (
        <div>
            <Button variant="secondary" size="lg" className="float-end m-2" onClick={addQuestion}>
                <FaPlus /> New Question
            </Button>
            <ListGroup id="wd-questions-list" className="rounded-0">
                {questions.map((question: any) => (
                    <ListGroupItem key={question._id} className="d-flex align-items-center">
                        <div>
                            <h5 className="mb-1">{question.questionText}</h5>
                            <small>{question.questionType}</small>
                        </div>
                        <div className="float-end">
                            <FaPencil onClick={() => editQuestion(question)} />
                            <FaTrash onClick={() => deleteQuestion(question._id)}  />
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <Button size="lg" className="float-end m-2">
                Cancel
            </Button>
            <Button variant="danger" size="lg" className="float-end m-2">
                Save
            </Button>
        </div>
    );
}