/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface Todo {
  id?: string;
  title: string;
}

interface State {
  todos: Todo[];
  todo: Todo;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { title: "Learn Mongo" },
};

const todosReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { ...action.payload, id: new Date().getTime().toString() },
        ],
        todo: { title: "" },
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        todo: { title: "" },
      };
    case "SET_TODO":
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};

interface TodosContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useList must be used within TodosProvider");
  }
  return context;
};