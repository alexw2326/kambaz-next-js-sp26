"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodo() {
 const { todos, todo, addTodo, updateTodo, deleteTodo, setTodo } =
    useTodoStore();
 return (
   <div className="m-2">
     <h1 className="text-3xl font-semibold leading-10 text-black">
       Zustand Todos
     </h1>
     <ListGroup>
        <ListGroupItem>
            <Button onClick={() => addTodo(todo)} id="wd-add-todo-click">Add</Button>
            <Button onClick={() => updateTodo(todo)} id="wd-update-todo-click">Update</Button>
            <FormControl
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </ListGroupItem>
        {todos.map((t) => (
            <ListGroupItem key={(t.id!)}>
                <Button onClick={() => deleteTodo(t.id!)} id="wd-delete-todo-click">
                    Delete
                </Button>
                <Button onClick={() => setTodo(t)} id="wd-set-todo-click">
                    Edit
                </Button>
                {t.title}
            </ListGroupItem>
        ))}
     </ListGroup>
     <hr />
   </div>
 );
}
