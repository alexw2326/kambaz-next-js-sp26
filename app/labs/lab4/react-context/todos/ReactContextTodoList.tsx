"use client";
import { useList } from "./todosContext";

export default function TodosContext() {
 const { count, increment, decrement } = useList()!;


 return (
   <div id="wd-counter-context">
     <h2>Counter Context</h2>
     <h3>{count}</h3>
     <button onClick={increment} id="wd-counter-context-increment-click">
       Increment
     </button>
     <button onClick={decrement} id="wd-counter-context-decrement-click">
       Decrement
     </button>
     <hr />
   </div>
 );
}
