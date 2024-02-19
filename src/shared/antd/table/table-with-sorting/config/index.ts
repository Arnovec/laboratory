import { ColumnsType } from "antd/es/table";

export interface A {
  id: number;
  name: string;
}

export const columns: ColumnsType<Readonly<A>> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
];
