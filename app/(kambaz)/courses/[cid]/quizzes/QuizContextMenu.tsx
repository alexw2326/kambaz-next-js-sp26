"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button, Modal } from "react-bootstrap";
export default function QuizContextMenu({ show, handleClose, quizId, quizDelete, isPublished, onTogglePublish }: 
    { show: boolean; handleClose: () => void; quizId: string; quizDelete: (quizId: string) => void; isPublished: boolean; onTogglePublish: (quizId: string, published: boolean) => void; }) {
    const { cid } = useParams();
    const router = useRouter();
    const handleEdit = () => {
        router.push(`/courses/${cid}/quizzes/${quizId}/editor`);
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Quiz Context</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" className="me-2 mb-1" onClick={(e) => {e.stopPropagation(); handleEdit();}}>
                    Edit
                </Button>
                <Button variant="danger" className="me-2 mb-1" onClick={(e) => {e.stopPropagation(); quizDelete(quizId);}}>
                    Delete
                </Button>
                {isPublished ? (
                    <Button variant="warning" className="me-2 mb-1" onClick={() => { onTogglePublish(quizId, false); handleClose();}}>
                        Unpublish
                    </Button>
                ) : (
                    <Button variant="success" className="me-2 mb-1" onClick={() => { onTogglePublish(quizId, true ); handleClose();}}>
                        Publish
                    </Button>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Cancel </Button>
            </Modal.Footer>
        </Modal>
    );
}