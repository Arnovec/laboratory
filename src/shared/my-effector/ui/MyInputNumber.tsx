import { InputNumber, InputNumberProps } from "antd";
import { IFieldUpdatedProps, IFormField, TStore } from "../interfaces/index";
import { Event, Store } from "effector";
import { valueType } from "antd/es/statistic/utils";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<TObject extends object> {
  $store: Store<TStore<TObject>>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  label: string;
  requiredField?: boolean;
  inputNumberProps?: InputNumberProps;
}

export function MyInputNumber<TObject extends object>(props: IProps<TObject>) {
  const {
    $store,
    fieldKey,
    fieldUpdated,
    label,
    requiredField = false,
    inputNumberProps = undefined,
  } = props;
  console.log("field number");
  const field: IFormField<valueType | null> = useStoreMap({
    store: $store,
    keys: [fieldKey],
    fn: (store): IFormField<valueType | null> => {
      return store[fieldKey] as IFormField<valueType | null>;
    },
  });

  function handleInputNumberChanged(inputValue: valueType | null) {
    const value = inputValue === null ? undefined : inputValue;
    const updatedField: IFieldUpdatedProps<TObject> = {
      key: fieldKey,
      value: value,
    };

    fieldUpdated(updatedField);
  }

  return (
    <MyFormItem field={field} label={label} requiredField={requiredField}>
      <InputNumber
        {...inputNumberProps}
        value={field.value}
        onChange={handleInputNumberChanged}
      />
    </MyFormItem>
  );
}
