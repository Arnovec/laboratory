import { ReactElement } from "react";
import { Form } from "antd";
import { IValidateResult } from "../interfaces";

interface IProps {
  validation: IValidateResult;
  label: string;
  requiredField?: boolean;
  children: ReactElement;
}

export function MyFormItem({
  validation,
  label,
  requiredField = false,
  children,
}: IProps) {
  const itemStatus = !validation.isValid ? "error" : undefined;
  const message = itemStatus && validation.message;

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
