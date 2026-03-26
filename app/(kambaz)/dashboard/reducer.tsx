/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as any,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      state.enrollments.push(payload);
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === payload.user && e.course === payload.course)
      );
    },
    showEnroll: (state, { payload }) => {
      state.enrollments = Array.isArray(payload) ? payload : payload.enrollments ?? [];
    }
  },
});

export const { enroll, unenroll, showEnroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;