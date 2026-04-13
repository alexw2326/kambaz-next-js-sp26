/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Tab, Tabs } from "react-bootstrap";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
export default function QuizEditor({handleClose, createQuiz}:
    { handleClose: () => void; createQuiz: (quiz: any) => void; }
) {
    return (
        <div>
            <Tabs defaultActiveKey="details" className="mb-3">
                <Tab eventKey="details" title="Details">
                    <QuizDetailsEditor handleClose={handleClose} createQuiz={createQuiz} />
                </Tab>
                <Tab eventKey="questions" title="Questions">
                    <QuizQuestionsEditor />
                </Tab>
            </Tabs>
        </div>
    );
}