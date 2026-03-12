/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButton from "./AssignmentControlButton";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentHeaderButton from "./AssignmentHeaderButton";
import { MdAssignment } from "react-icons/md"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { addAssignment, updateAssignments, deleteAssignments } from "./reducer";
import AssignmentEditor from "./AssignmentEditor";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [assignmentDue, setAssignmentDue] = useState("");
  const [assignmentAvailability, setAssignmentAvailiability] = useState("");
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const [showEditor, setShowEditor] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const dispatch = useDispatch();
  return (
    <div id="wd-assignments">
      <AssignmentControls setAssignmentName={setAssignmentName}
              setDescription={setDescription} setPoints={setPoints}
              setDue={setAssignmentDue} setAvailability={setAssignmentAvailiability}
              addAssignment={() => {
                dispatch(addAssignment({ 
                  title: assignmentName, 
                  course: cid,
                  description: description,
                  points: points,
                  dueDate: assignmentDue,
                  availableFrom: assignmentAvailability, }));
                setAssignmentName("");
                setDescription("");
                setPoints("");
                setAssignmentDue("");
                setAssignmentAvailiability("");
              }} /> <br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-assignment p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS <AssignmentHeaderButton />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem key={assignment._id} className="wd-assignment p-3 ps-1">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-4" />
                    <MdAssignment className="me-2 fs-4" />
                    <div style={{ maxWidth: "65%" }}>
                      {assignment.editing ? (
                        <FormControl className="w-50 d-inline-block"
                          onChange={(e) =>
                            dispatch(updateAssignments({ ...assignment, title: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(updateAssignments({ ...assignment, editing: false }));
                            }
                          }}
                          defaultValue={assignment.title} />
                      ) : (
                        <Link
                          href={`/courses/${cid}/assignments/${assignment._id}`}
                          className="wd-assignment-link text-decoration-none text-dark"
                        >
                          {assignment.title} <br />
                          <span className="small text-muted">
                            <span className="text-danger">Multiple Modules</span> | 
                            <strong> Not available until </strong> {assignment.availableFrom} at 12:00 am | 
                            <strong> Due </strong> {assignment.dueDate} at 11:59 pm | 
                            {assignment.points} pts
                          </span>
                        </Link>
                      )}
                    </div>
                    <div className="ms-auto d-flex">
                      <AssignmentControlButton assignmentId={assignment._id}
                          deleteAssignments={(assignmentId) => dispatch(deleteAssignments(assignmentId))}
                          editAssignments={(assignmentId) => {
                            const assignment = assignments.find((a) => a._id === assignmentId);
                            setEditingAssignment(assignment)
                            setShowEditor(true)}} />
                    </div>
                  </div>
                </ListGroupItem>
              ))
            }
            <AssignmentEditor
              show={showEditor}
              handleClose={() => setShowEditor(false)}
              dialogTitle="Edit Assignment"
              setAssignmentName={setAssignmentName}
              setDescription={setDescription}
              setPoints={setPoints}
              setDue={setAssignmentDue}
              setAvailability={setAssignmentAvailiability}
              saveAssignment={() =>
                dispatch(updateAssignments({
                  ...editingAssignment,
                  title: assignmentName,
                  description,
                  points,
                  dueDate: assignmentDue,
                  availableFrom: assignmentAvailability
                }))
              }
              assignment={editingAssignment}
            />
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}
