import { Button, Form, Space, Typography } from "antd";
import {
  $isFormValid,
  $store,
  cars,
  fieldUpdated,
  initialValueSet,
} from "../model";
import {
  MyInput,
  MyInputNumber,
  MyCheckbox,
  MySelect,
  IFormField,
  MySubmitButton,
} from "@shared/my-effector";

export function MyForm() {

  return (
    <Form>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Title>MyForm</Typography.Title>
        <MyInput
          label="Имя"
          // field={store.name}
          $store={$store}
          fieldUpdated={fieldUpdated}
          fieldKey="name"
        />
        <MyInputNumber
          label="Возраст"
          // field={store.age}
          $store={$store}
          fieldUpdated={fieldUpdated}
          fieldKey="age"
        />
        {/* <MyCheckbox
          label="Любит выпить"
          field={store.isLikeAlcohol}
          fieldUpdated={fieldUpdated}
          fieldKey="isLikeAlcohol"
          requiredField
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
        /> */}
        {/* <Button disabled={!isFormValid}>Отправить</Button> */}
        <MySubmitButton $isValid={$isFormValid} text="Отправить" />
        {/* <Button
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
        </Button> */}
      </Space>
    </Form>
  );
}
