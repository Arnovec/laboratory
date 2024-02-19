import { Todo } from "@shared/api/jsonplaceholder/interfaces";
import { Space } from "antd";

type Props = Todo;

export function TodoElement({ title, completed }: Props) {
  return (
    <Space direction="horizontal">
      <input type="checkbox" checked={completed} />
      <p>{title}</p>
    </Space>
  );
}
