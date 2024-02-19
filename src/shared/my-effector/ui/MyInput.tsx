import { Input, InputProps } from "antd";
import { IFieldUpdatedProps, IFormField } from "../interfaces/index";
import { Event } from "effector";
import { MyFormItem } from "./MyFormItem";

interface IProps<TObject> {
  field: IFormField<string>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  label: string;
  requiredField?: boolean;
  inputProps?: InputProps;
}

export function MyInput<TObject>({
  field,
  fieldKey,
  fieldUpdated,
  label,
  requiredField = false,
  inputProps = undefined,
}: IProps<TObject>) {
  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedField: IFieldUpdatedProps<TObject, string> = {
      key: fieldKey,
      value: event.target.value,
    };

    fieldUpdated(updatedField);
  }

  return (
    <MyFormItem
      field={field}
      label={label}
      requiredField={requiredField}
    >
      <Input
        {...inputProps}
        value={field.value}
        onChange={handleInputChanged}
      />
    </MyFormItem>
  );
}
