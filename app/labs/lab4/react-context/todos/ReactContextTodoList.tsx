"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useList } from "./todosContext";

export default function TodoList() {
  const { state, dispatch } = useList();
  const { todos, todo } = state;
  return (
    <div id="wd-todo-list-context">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <Button
            onClick={() =>
              dispatch({ type: "ADD_TODO", payload: todo })
            }
            id="wd-add-todo-click">
            Add
          </Button>
          <Button
            onClick={() =>
              dispatch({ type: "UPDATE_TODO", payload: todo })
            }
            id="wd-update-todo-click">
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) =>
              dispatch({
                type: "SET_TODO",
                payload: { ...todo, title: e.target.value },
              })
            }
          />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: t.id })
              }
              id="wd-delete-todo-click">
              Delete
            </Button>
            <Button
              onClick={() =>
                dispatch({ type: "SET_TODO", payload: t })
              }
              id="wd-set-todo-click">
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