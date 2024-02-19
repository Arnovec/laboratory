import { Checkbox, CheckboxProps } from "antd";
import { IFieldUpdatedProps, IFormField } from "../interfaces/index";
import { Event } from "effector";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { MyFormItem } from "./MyFormItem";

interface IProps<TObject> {
  field: IFormField<boolean>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  label: string;
  requiredField?: boolean;
  checkboxProps?: CheckboxProps;
}

export function MyCheckbox<TObject>({
  field,
  fieldKey,
  fieldUpdated,
  label,
  requiredField,
  checkboxProps = undefined,
}: IProps<TObject>) {
  function handleCheckboxChanged(event: CheckboxChangeEvent) {
    const updatedField: IFieldUpdatedProps<TObject> = {
      key: fieldKey,
      value: event.target.checked,
    };

    fieldUpdated(updatedField);
  }

  return (
    <MyFormItem field={field} label={label} requiredField={requiredField}>
      <Checkbox
        {...checkboxProps}
        checked={field.value}
        onChange={handleCheckboxChanged}
      />
    </MyFormItem>
  );
}
