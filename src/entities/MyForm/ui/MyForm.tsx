import { Button, Form, Space, Typography } from "antd";
import {
  $isFormValid,
  $store,
  cars,
  dataReset,
  fieldUpdated,
  fieldValueDataReset,
  forcedErrorsSet,
  initialValueSet,
} from "../model";
import {
  MyInput,
  MyInputNumber,
  MyCheckbox,
  MySelect,
  MySubmitButton,
} from "@shared/my-effector";

export function MyForm() {
  return (
    <Form>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Title>MyForm</Typography.Title>
        <MyInput
          label="Имя"
          $store={$store}
          fieldUpdated={fieldUpdated}
          fieldKey="name"
          requiredField
        />
        <MyInputNumber
          label="Возраст"
          $store={$store}
          fieldUpdated={fieldUpdated}
          fieldKey="age"
          requiredField
        />
        <MyCheckbox
          label="Любит выпить"
          $store={$store}
          fieldUpdated={fieldUpdated}
          fieldKey="isLikeAlcohol"
          requiredField
        />
        <MySelect
          label="Машина"
          options={cars}
          $store={$store}
          fieldUpdated={fieldUpdated}
          fieldKey="car"
          selectProps={{
            allowClear: true,
          }}
        />
        <MySubmitButton $isValid={$isFormValid} text="Отправить" />
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
        <Button
          onClick={() => {
            forcedErrorsSet([
              {
                fieldName: "name",
                message: "Проверка принудительной ошибки",
              },
            ]);
          }}
        >
          Ошибки
        </Button>
        <Button
          onClick={() => {
            fieldValueDataReset("isLikeAlcohol");
          }}
        >
          Сбросить поле алкоголь
        </Button>
        <Button
          onClick={() => {
            dataReset();
          }}
        >
          Сбросить форму
        </Button>
      </Space>
    </Form>
  );
}
