/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Tab, Tabs } from "react-bootstrap";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "../questions/QuizQuestionsEditor";
import * as client from "../../../../client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RedCheck from "../../RedCheck";
import GreenCheckmark from "../../GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
export default function QuizEditor({handleClose, createQuiz}:
    { handleClose: () => void; createQuiz: (quiz: any) => void; }
) {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);
    const getQuizId = async () => {
        return await client.getQuiz(qid as string, cid as string);
    };
    useEffect(() => {
        if (qid && qid !== "new") {
            getQuizId().then((data) => setQuiz(data));
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
                <h6 className="float-end p-2">Points {quiz?.points || 0}</h6>
            </div>
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
        </div>
    );
}