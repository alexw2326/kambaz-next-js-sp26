/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import * as client from "../../../../client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuestionEditor from "./[questionId]/page";

export default function QuizQuestionsEditor() {
    const { cid, qid } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const router = useRouter();
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [newQuestionIds, setNewQuestionIds] = useState<string[]>([]);
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
        setNewQuestionIds([...newQuestionIds, created._id]);
    }
    const deleteQuestion = async (questionId: string) => {
        await client.deleteQuestion(questionId, cid as string, qid as string);
        setQuestions(questions.filter((q: any) => q._id !== questionId));
    };
    const backDetails = () => {
        router.push(`/courses/${cid}/quizzes/${qid}/editor?tab=details`);
    }
    const handleCancel = async () => {
        await Promise.all(newQuestionIds.map((id) => 
            client.deleteQuestion(id, cid as string, qid as string)
        ));
        setQuestions(questions.filter((q: any) => !newQuestionIds.includes(q._id)));
        setNewQuestionIds([]);
        backDetails()
    };
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
                    <ListGroupItem key={question._id} className="d-flex align-items-center justify-content-between">
                        <div>
                            <h5 className="mb-1">{question.questionText}</h5>
                            <small>{question.questionType}</small>
                        </div>
                        <div className="d-flex gap-2">
                            <FaPencil className="text-primary" onClick={() => setEditingQuestion(question)} />
                            <FaTrash className="text-danger" onClick={() => deleteQuestion(question._id)}  />
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <Button size="lg" className="float-end m-2" onClick={handleCancel}>
                Cancel
            </Button>
            <Button variant="danger" size="lg" className="float-end m-2">
                Save
            </Button>
        </div>
    );
}