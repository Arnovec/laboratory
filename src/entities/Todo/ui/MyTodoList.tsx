import { TodoElement } from "@entities/Todo";
import { Button, Input, Space } from "antd";
import { useStore } from "effector-react";
import { $store, addTodo, setNewTodo, load } from "../../../app/effector/store";
import { useEffect } from "react";

export function MyTodoList() {
  const store = useStore($store);

  useEffect(() => {
    load("https://jsonplaceholder.typicode.com/todos");
  }, []);

  return (
    <>
      <Space direction="vertical">
        <Space direction="horizontal">
          <Input
            value={store.newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <Button onClick={() => addTodo()}>Добавить</Button>
        </Space>
        {store.todos.map((elem, index) => (
          <TodoElement key={index} {...elem} />
        ))}
      </Space>
    </>
  );
}
