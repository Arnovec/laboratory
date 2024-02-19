import { ReactElement } from "react";
import { Form } from "antd";
import { IFormField } from "../interfaces/index";

interface IProps<TValue> {
  field: IFormField<TValue>;
  label: string;
  requiredField?: boolean;
  children: ReactElement;
}

export function MyFormItem<TValue>({
  field,
  label,
  requiredField = false,
  children,
}: IProps<TValue>) {
  // const isTouched = form.isFieldTouched(fieldKey);
  // console.log("isTouched ", isTouched);
  const itemStatus = !field.validation.isValid ? "error" : undefined;
  const message = itemStatus && field?.validation.message;

  return (
    <Form.Item
      label={label}
      validateStatus={itemStatus}
      help={message}
      required={requiredField}
    >
      {children}
    </Form.Item>
  );
}
