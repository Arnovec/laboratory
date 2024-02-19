// import { useDispatch, useSelector } from "react-redux";
// import { IRootState } from "./store";
// import { addCountAction, removeCountAction } from "./store/countReducer";
import { useFetchAllToDosQuery } from "@shared/api/jsonplaceholder";
import { TodoElement } from "@entities/Todo";

export function TodoList() {
  const { data } = useFetchAllToDosQuery();
  // const dispatch = useDispatch();
  // const count = useSelector((state: IRootState) => state.count.value);

  // function addCount() {
  //     dispatch(addCountAction(Number(prompt("Сколько"))));
  // }

  // function removeCount() {
  //     dispatch(removeCountAction(Number(prompt("Сколько"))));
  // }

  return (
    <div>
      {data?.map((elem, index) => (
        <TodoElement key={index} {...elem} />
      ))}
    </div>
  );
}
