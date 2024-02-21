import { Store, createEvent, createStore } from "effector";
import {
  IFieldUpdatedProps,
  IForcedError,
  IFormField,
  TStore,
  TValidationSchema,
} from "./interfaces";
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
  const forcedErrorsSet = createEvent<IForcedError<TObject>[]>();
  const initialValueSet = createEvent<TObject>();
  const fieldUpdated = createEvent<IFieldUpdatedProps<TObject>>();

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
    .on(forcedErrorsSet, (state, payload) => {
      const withErrorFields: Partial<
        Record<keyof TObject, IFormField<unknown>>
      > = {};

      payload.forEach((elem) => {
        withErrorFields[elem.fieldName] = {
          value: state[elem.fieldName].value,
          touched: true,
          validation: {
            isValid: false,
            message: elem.message,
          },
        };
      });

      return {
        ...state,
        ...withErrorFields,
      };
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
    fieldUpdated,
    initialValueSet,
    forcedErrorsSet,
    fieldValueDataReset,
    dataReset,
  };
}
