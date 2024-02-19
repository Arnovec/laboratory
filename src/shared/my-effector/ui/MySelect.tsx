import { SelectProps, Select } from "antd";
import { IFieldUpdatedProps, IFormField } from "../interfaces/index";
import { Event } from "effector";
import { MyFormItem } from "./MyFormItem";

interface IProps<TObject> {
  field: IFormField<string | undefined>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  options: { label: string; value: string }[];
  label: string;
  requiredField?: boolean;
  selectProps?: SelectProps;
}

export function MySelect<TObject>({
  field,
  fieldKey,
  fieldUpdated,
  options,
  label,
  requiredField = false,
  selectProps = undefined,
}: IProps<TObject>) {
  function handleSelectChanged(value: any) {
    const updatedField: IFieldUpdatedProps<TObject, string> = {
      key: fieldKey,
      value: value,
    };

    fieldUpdated(updatedField);
  }

  return (
    <MyFormItem
      field={field}
      label={label}
      requiredField={requiredField}
    >
      <Select
        {...selectProps}
        options={options}
        value={field.value}
        onChange={handleSelectChanged}
      />
    </MyFormItem>
  );
}
