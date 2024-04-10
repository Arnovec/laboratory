import { Input, InputProps } from "antd";
import { IValidateResult, TAllowedTypes } from "../interfaces";
import { Event, Store } from "effector";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<Template extends Record<string, TAllowedTypes>> {
  $store: Store<Template>;
  $validation: Store<Record<keyof Template, IValidateResult>>;
  fieldKey: keyof Template;
  fieldUpdated: Event<{ key: keyof Template; value: Template[keyof Template] }>;
  label: string;
  requiredField?: boolean;
  inputProps?: InputProps;
}

export function MyInput<Template extends Record<string, TAllowedTypes>>({
  $store,
  $validation,
  fieldKey,
  fieldUpdated,
  label,
  requiredField = false,
  inputProps = undefined,
}: IProps<Template>) {
  const field = useStoreMap({
    store: $store,
    keys: [fieldKey],
    fn: (store) => {
      return store[fieldKey];
    },
  });
  const validation = useStoreMap({
    store: $validation,
    keys: [fieldKey],
    fn: (validation) => {
      return validation[fieldKey];
    },
  });

  function handleInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedField = {
      key: fieldKey,
      value: event.target.value as Template[keyof Template],
    };

    fieldUpdated(updatedField);
  }

  return (
    <MyFormItem validation={validation} label={label} requiredField={requiredField}>
      <Input
        {...inputProps}
        value={field}
        onChange={handleInputChanged}
      />
    </MyFormItem>
  );
}
