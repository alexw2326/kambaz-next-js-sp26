export default function QuizContextMenu({ show, handleClose }: { show: boolean; handleClose: () => void }) {
    return (
        <div>
            <h3>Edit</h3>
            <h3>Delete</h3>
            <h3>Publish/Unpublish</h3>
        </div>
    );
}