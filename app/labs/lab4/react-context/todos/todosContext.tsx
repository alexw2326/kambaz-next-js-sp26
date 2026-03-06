"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context state
interface TodosContextState {
 count: number;
 increment: () => void;
 decrement: () => void;
}

// Create the context
const TodosContext = createContext<TodosContextState | undefined>(
 undefined,
);

// Create the provider component
export const TodosProvider = ({ children }: { children: ReactNode }) => {
 const [count, setCount] = useState(0);

 const increment = () => setCount((prev) => prev + 1);
 const decrement = () => setCount((prev) => prev - 1);

 const value: TodosContextState = {
   count,
   increment,
   decrement,
 };

 return (
   <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
 );
};

export const useList = () => {
 const context = useContext(TodosContext);
 return context;
};
