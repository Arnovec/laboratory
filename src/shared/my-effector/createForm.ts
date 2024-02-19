import { Store, createEvent, createStore } from "effector";
import { IFieldUpdatedProps, TStore, TValidationSchema } from "./interfaces";
import { validateSchema } from "./lib/validateSchema";
import { initialSchemaValidate } from "./lib/initialSchemaValidate";
import { mapForm } from "./lib/mapForm";
import { formValidationCheck } from "./lib/formValidationCheck";
import { initialSetValidate } from "./lib/initialSetValidate";

export function createForm<TObject extends object>(
  schema: TValidationSchema<TObject>
) {
  const dataReset = createEvent();
  const fieldValueDataReset = createEvent<keyof TObject>();
  const fieldUpdated =
    createEvent<IFieldUpdatedProps<TObject, TObject[keyof TObject]>>();
  const initialValueSet = createEvent<TObject>();

  const initialStore = initialSchemaValidate(schema);

  const $store = createStore<TStore<TObject>>(initialStore)
    .on(fieldUpdated, (state, payload) => {
      const updatedFieldData = validateSchema(
        schema[payload.key],
        payload.value
      );

      return {
        ...state,
        [payload.key]: updatedFieldData,
      };
    })
    .on(initialValueSet, (_, payload) => {
      return initialSetValidate(schema, payload);
    })
    .on(fieldValueDataReset, (state, key) => {
      return {
        ...state,
        [key]: initialStore[key],
      };
    })
    .reset(dataReset);

  const $form: Store<TObject> = $store.map(mapForm);
  const $isFormValid = $store.map(formValidationCheck);

  return {
    $store,
    $form,
    $isFormValid,
    initialValueSet,
    fieldUpdated,
    dataReset,
  };
}
