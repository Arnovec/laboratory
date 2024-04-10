import { TStore, TValidObject, TValidationSchema } from "../interfaces";
import { validateSchema } from "./validateSchema";

export function initialSetValidate<TObject extends TValidObject>(
  schema: TValidationSchema<TObject>,
  payload: TObject
): TStore<TObject> {
  const initialMicrostateEntries = Object.keys(schema).map((key) => {
    return [
      key,
      validateSchema(schema[key as keyof TObject], payload[key as keyof TObject]),
    ];
  });

  const initialMicrostate = Object.fromEntries(initialMicrostateEntries);

  return initialMicrostate;
}
