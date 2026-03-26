/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignments: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
    },
    updateAssignments: (state, { payload: assignments }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignments._id ? assignments : a
      ) as any;
    },
    setAssignments: (state, { payload: assignments }) => {
      state.assignments = assignments;
    },
  },
});
export const { addAssignment, deleteAssignments, updateAssignments, setAssignments } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;