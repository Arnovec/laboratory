import { Button, Form, Space, Typography } from "antd";
import { useMyForm } from "../hooks/useMyForm";
import { cars, fieldUpdated, initialValueSet } from "../model";
import {
  MyInput,
  MyInputNumber,
  MyCheckbox,
  MySelect,
} from "@shared/my-effector";

export function MyForm() {
  const { store, isFormValid } = useMyForm();

  return (
    <Form>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Title>MyForm</Typography.Title>
        <MyInput
          label="Имя"
          field={store.name}
          fieldUpdated={fieldUpdated}
          fieldKey="name"
        />
        <MyInputNumber
          label="Возраст"
          field={store.age}
          fieldUpdated={fieldUpdated}
          fieldKey="age"
        />
        <MyCheckbox
          label="Любит выпить"
          field={store.isLikeAlcohol}
          fieldUpdated={fieldUpdated}
          fieldKey="isLikeAlcohol"
        />
        <MySelect
          label="Машина"
          options={cars}
          field={store.car}
          fieldUpdated={fieldUpdated}
          fieldKey="car"
          selectProps={{
            allowClear: true,
          }}
        />
        <Button disabled={!isFormValid}>Отправить</Button>
        <Button
          onClick={() => {
            initialValueSet({
              name: "",
              age: 123,
              car: undefined,
              isLikeAlcohol: true,
            });
          }}
        >
          Изменить
        </Button>
      </Space>
    </Form>
  );
}
