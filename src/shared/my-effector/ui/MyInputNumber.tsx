import { FormInstance, InputNumber, InputNumberProps } from "antd";
import { IFieldUpdatedProps, IFormField, TStore } from "../interfaces/index";
import { Event, Store } from "effector";
import { valueType } from "antd/es/statistic/utils";
import { MyFormItem } from "./MyFormItem";
import { useStoreMap } from "effector-react";

interface IProps<TObject extends object> {
  // $store: Store<TStore<TObject>>;
  field: IFormField<valueType | null>;
  fieldKey: keyof TObject & string;
  fieldUpdated: Event<IFieldUpdatedProps<TObject>>;

  label: string;
  requiredField?: boolean;
  inputNumberProps?: InputNumberProps;
}

export function MyInputNumber<TObject extends object>({
  // $store,
  field,
  fieldKey,
  fieldUpdated,
  label,
  requiredField = false,
  inputNumberProps = undefined,
}: IProps<TObject>) {
  // const field: IFormField<valueType | null> = useStoreMap({
  //   store: $store,
  //   keys: [fieldKey],
  //   fn: (store, [fieldKey]): IFormField<valueType | null> => {
  //     return store[fieldKey] as IFormField<valueType | null>;
  //   },
  // });
  console.log("field number", field.value);

  function handleInputNumberChanged(inputValue: valueType | null) {
    const value = inputValue === null ? undefined : inputValue;
    const updatedField: IFieldUpdatedProps<TObject> = {
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
      <InputNumber
        {...inputNumberProps}
        value={field.value}
        onChange={handleInputNumberChanged}
      />
    </MyFormItem>
  );
}
