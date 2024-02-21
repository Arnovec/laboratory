import { TStore, TValidationSchema } from "../interfaces";
import { validateSchema } from "./validateSchema";

export function initialSchemaValidate<TObject extends object>(
  schema: TValidationSchema<TObject>
): TStore<TObject> {
  const initialMicrostateEntries = Object
    .keys(schema)
    .map((key) => {
      return [
        key,
        validateSchema(
          schema[key as keyof TObject],
          schema[key as keyof TObject]?.value,
          false
        ),
      ];
  });

  const initialMicrostate = Object.fromEntries(initialMicrostateEntries);

  return initialMicrostate;
}
