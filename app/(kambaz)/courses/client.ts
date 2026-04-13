/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNEMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
const QUIZ_API = `quizzes`;
export const findQuizByName = async (name: string, courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/${QUIZ_API}?name=${name}`);
  return response.data;
};
export const showAllQuizzes = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/${QUIZ_API}`);
  return data;
}
export const createQuiz = async (quiz: any, courseId: string) => {  
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/${QUIZ_API}`, quiz);
  return data;
}
export const deleteQuiz = async (quizId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/${QUIZ_API}/${quizId}`);
  return data;
}
export const updateQuiz = async (quiz: any, courseId: string) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/${QUIZ_API}/${quiz._id}`, quiz);
  return data;
}
export const showAllQuestions = async (courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/${QUIZ_API}/${quizId}/questions`);
  return data;
}
export const createQuestion = async (question: any, courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/${QUIZ_API}/${quizId}/questions`, question);
  return data;
}
export const deleteQuestion = async (questionId: string, courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/${QUIZ_API}/${quizId}/questions/${questionId}`);
  return data;
}
export const updateQuestion = async (question: any, courseId: string, quizId: string) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/${QUIZ_API}/${quizId}/questions/${question._id}`, question);
  return data;
}
export const showAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
}
export const fetchAssignmentsByCourse = async () => {
  const { data } = await axiosWithCredentials.get(ASSIGNEMENTS_API);
  return data;
};
export const createAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.post(`${ASSIGNEMENTS_API}`, assignment);
  return data;
};
export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNEMENTS_API}/${assignment._id}`, assignment);
  return data;
};
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNEMENTS_API}/${assignmentId}`);
  return response.data;
};
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return response.data;
};
export const findModulesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null;
    }
    throw err;
  }
};
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
export const findMyCourses = async () => {
  try {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null;
    }
    throw err;
  }
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};
export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
