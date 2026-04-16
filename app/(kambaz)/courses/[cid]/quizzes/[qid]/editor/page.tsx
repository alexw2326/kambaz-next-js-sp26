/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Tab, Tabs } from "react-bootstrap";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "../questions/page";
import * as client from "../../../../client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RedCheck from "../../RedCheck";
import GreenCheckmark from "../../GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
export default function QuizEditor({handleClose}:
    { handleClose: () => void; }
) {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "details");
    const router = useRouter();
    const getQuizId = async () => {
        return await client.getQuiz(qid as string, cid as string);
    };
    const questionPoints = () => {
        let points = 0;
        questions.map((q: any) => (points += q.points));
        return points;
    }
    const refreshQuestions = async () => {
        const data = await client.showAllQuestions(cid as string, qid as string);
        setQuestions(data);
    };
    useEffect(() => {
        if (qid && qid !== "new") {
            getQuizId().then((data) => setQuiz(data));
            client.showAllQuestions(cid as string, qid as string).then(setQuestions);
        }
    }, [qid]);
    useEffect(() => {
        const tab = searchParams.get("tab") || "details";
        setActiveTab(tab);
    }, [searchParams]);
    useEffect(() => {
        if (qid && qid !== "new") {
            getQuizId().then((data) => setQuiz(data));
            client.showAllQuestions(cid as string, qid as string).then(setQuestions);
        } else if (qid === "new") {
            const createDraftQuiz = async () => {
                const draft = await client.createQuiz({
                    title: "Quiz",
                    description: "",
                    isPublished: false,
                }, cid as string);
                setQuiz(draft);
                router.replace(`/courses/${cid}/quizzes/${draft._id}/editor?tab=details`);
            };
            createDraftQuiz();
        }
    }, [qid]);
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
                        <QuizDetailsEditor handleClose={handleClose} />
                    </Tab>
                    <Tab eventKey="questions" title="Questions">
                        <QuizQuestionsEditor onQuestionsChange={refreshQuestions} />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}