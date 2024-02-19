import { Input, InputProps } from "antd";
import { IFieldUpdatedProps, IFormField, TStore } from "../interfaces/index";
import { Event, Store } from "effector";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<TObject extends object> {
  $store: Store<TStore<TObject>>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;
  label: string;
  requiredField?: boolean;
  inputProps?: InputProps;
}

export function MyInput<TObject extends object>({
  $store,
  fieldKey,
  fieldUpdated,
  label,
  requiredField = false,
  inputProps = undefined,
}: IProps<TObject>) {
  console.log("field string");

  const field: IFormField<string> = useStoreMap({
    store: $store,
    keys: [fieldKey],
    fn: (store): IFormField<string> => {
      return store[fieldKey] as IFormField<string>;
    },
  });

  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedField: IFieldUpdatedProps<TObject, string> = {
      key: fieldKey,
      value: event.target.value,
    };

    fieldUpdated(updatedField);
  }

  return (
    <MyFormItem field={field} label={label} requiredField={requiredField}>
      <Input
        {...inputProps}
        value={field.value}
        onChange={handleInputChanged}
      />
    </MyFormItem>
  );
}
