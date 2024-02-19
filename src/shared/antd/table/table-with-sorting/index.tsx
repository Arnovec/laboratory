import { Table } from "antd";
import { A, columns } from "./config";
import { useState } from "react";

const data1: A[] = [
  {
    id: 1,
    name: "bbb",
  },
  {
    id: 2,
    name: "aaa",
  },
  {
    id: 3,
    name: "eee",
  },
  {
    id: 4,
    name: "ddd",
  },
  {
    id: 5,
    name: "ccc",
  },
];
const data2: A[] = [
  {
    id: 2,
    name: "ggg",
  },
  {
    id: 1,
    name: "fff",
  },
  {
    id: 5,
    name: "jjj",
  },
  {
    id: 4,
    name: "iii",
  },
  {
    id: 3,
    name: "hhh",
  },
];

export function TableWithSorting() {
  const [data, setData] = useState(data1);
  const [flag, setFlag] = useState(true);

  return (
    <Table
      onChange={(...args) => {
        console.log(args[2])
        if (flag) {
          setData(data2);
          setFlag(false);
        } else {
          setData(data1);
          setFlag(true);
        }
      }}
      rowKey={"id"}
      dataSource={data}
      columns={columns}
    />
  );
}
