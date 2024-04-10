import { Input, InputProps } from "antd";
import { IFieldUpdatedProps, TStore, TValidObject } from "../interfaces";
import { Event, Store } from "effector";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<TObject extends TValidObject> {
  $store: Store<TStore<TObject>>;
  fieldKey: keyof TObject;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;
  label: string;
  requiredField?: boolean;
  inputProps?: InputProps;
}

export function MyInput<TObject extends TValidObject>({
  $store,
  fieldKey,
  fieldUpdated,
  label,
  requiredField = false,
  inputProps = undefined,
}: IProps<TObject>) {
  const field = useStoreMap({
    store: $store,
    keys: [fieldKey],
    fn: (store) => {
      return store[fieldKey];
    },
  });

  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedField = {
      key: fieldKey,
      value: event.target.value as TObject[keyof TObject],
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
