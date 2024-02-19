import { Todo } from "@shared/api/jsonplaceholder/interfaces";
import { createEvent, createEffect, createStore } from "effector";

type Store = {
  todos: Todo[];
  newTodo: string;
};

const addTodoToList = (todos: Todo[], newTodo: string) => [
  ...todos,
  {
    userId: 0,
    id: Date.now(),
    title: newTodo,
    completed: false,
  },
];

export const setNewTodo = createEvent<string>();
export const addTodo = createEvent();
export const load = createEffect(async (url: string) => {
  const req = await fetch(url);
  return req.json();
});

export const $store = createStore<Store>({
  todos: [],
  newTodo: "",
})
  .on(load.doneData, (state, todos) => ({
    ...state,
    todos,
  }))
  .on(setNewTodo, (state, newTodo) => ({
    ...state,
    newTodo,
  }))
  .on(addTodo, (state) => ({
    todos: addTodoToList(state.todos, state.newTodo),
    newTodo: "",
  }));
