import { SelectProps, Select } from "antd";
import { IFieldUpdatedProps, IFormField, TStore, TValidObject } from "../interfaces/index";
import { Event, Store } from "effector";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<TObject extends TValidObject> {
  $store: Store<TStore<TObject>>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  options: { label: string; value: string }[];
  label: string;
  requiredField?: boolean;
  selectProps?: SelectProps;
}

export function MySelect<TObject extends TValidObject>({
  $store,
  fieldKey,
  fieldUpdated,
  options,
  label,
  requiredField = false,
  selectProps = undefined,
}: IProps<TObject>) {
  console.log("field Select");
  const field: IFormField<string> = useStoreMap({
    store: $store,
    keys: [fieldKey],
    fn: (store): IFormField<string> => {
      return store[fieldKey] as IFormField<string>;
    },
  });

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
