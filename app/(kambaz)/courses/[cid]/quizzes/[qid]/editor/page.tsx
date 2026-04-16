/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Tab, Tabs } from "react-bootstrap";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "../questions/page";
import * as client from "../../../../client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RedCheck from "../../RedCheck";
import GreenCheckmark from "../../GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
export default function QuizEditor({handleClose, createQuiz}:
    { handleClose: () => void; createQuiz: (quiz: any) => void; }
) {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "details");
    const getQuizId = async () => {
        return await client.getQuiz(qid as string, cid as string);
    };
    const questionPoints = () => {
        let points = 0;
        questions.map((q: any) => (points += q.points));
        return points;
    }
    useEffect(() => {
        if (qid && qid !== "new") {
            getQuizId().then((data) => setQuiz(data));
            client.showAllQuestions(cid as string, qid as string).then(setQuestions);
        }
    }, [qid]);
    useEffect(() => {
        const tab = searchParams.get("tab") || "details";
        setActiveTab(tab);
    }, [searchParams])
    return (
        <div>
            <div className="p-2">
                <IoEllipsisVertical className="fs-4 float-end mt-2" />
                {quiz?.isPublished ? 
                    <div>
                        <h6 className="float-end p-2">Published</h6>
                        <div className="float-end p-1">
                            <GreenCheckmark />
                        </div>
                    </div>
                    :
                    <div>
                        <h6 className="float-end p-2">Not Published</h6>
                        <div className="float-end p-1">
                            <RedCheck />
                        </div>
                    </div>
                    }
                <h6 className="float-end p-2">Points {questionPoints() || 0}</h6>
            </div>
            <div>
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")} className="mb-3">
                    <Tab eventKey="details" title="Details">
                        <QuizDetailsEditor handleClose={handleClose} createQuiz={createQuiz} />
                    </Tab>
                    <Tab eventKey="questions" title="Questions">
                        <QuizQuestionsEditor />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}