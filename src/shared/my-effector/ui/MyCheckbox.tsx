import { Checkbox, CheckboxProps } from "antd";
import { IFieldUpdatedProps, IFormField, TStore } from "../interfaces/index";
import { Event, Store } from "effector";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<TObject extends object> {
  $store: Store<TStore<TObject>>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  label: string;
  requiredField?: boolean;
  checkboxProps?: CheckboxProps;
}

export function MyCheckbox<TObject extends object>({
  $store,
  fieldKey,
  fieldUpdated,
  label,
  requiredField,
  checkboxProps = undefined,
}: IProps<TObject>) {
  console.log("field boolean");
  const field: IFormField<boolean> = useStoreMap({
    store: $store,
    keys: [fieldKey],
    fn: (store): IFormField<boolean> => {
      return store[fieldKey] as IFormField<boolean>;
    },
  });

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
