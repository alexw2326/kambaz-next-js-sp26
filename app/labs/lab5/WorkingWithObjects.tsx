"use client"
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [title, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [score, setAssignmentScore] = useState("0");
  const [completed, setAssignmentCompleted] = useState(false);
  const [name, setModule] = useState({
    id: 19, name: "Assignment 5",
    description: "Working with node and rest APIs",
    course: "Web Development",
  });
  const [description, setModuleDescription] = useState({
    id: 19, name: "Assignment 5",
    description: "Working with node and rest APIs",
    course: "Web Development",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`
  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${title.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={title.title} onChange={(e) =>
          setAssignment({ ...title, title: e.target.value })}/>
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${score}`}>
        Update Score </a>
      <FormControl className="w-75" id="wd-assignment-score" type="number"
        defaultValue={score} onChange={(e) =>
          setAssignmentScore(e.target.value)}/>
      <a id="wd-update-assignment-completed"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/completed/${completed}`}>
        Update Completed </a>
      <input className="w-75" id="wd-assignment-completed"
        type="checkbox"
        defaultChecked={completed} 
        onChange={(e) => setAssignmentCompleted(e.target.checked)} />
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${name.name}`}>
        Update Name </a>
      <FormControl className="w-75" id="wd-module-name"
        defaultValue={name.name} onChange={(e) =>
          setModule({ ...name, name: e.target.value })}/>
      <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${description.description}`}>
        Update Module Description </a>
      <FormControl className="w-75" id="wd-module-description"
        defaultValue={description.description} onChange={(e) =>
          setModuleDescription({ ...description, description: e.target.value })}/>
      <hr />
    </div>
);}
