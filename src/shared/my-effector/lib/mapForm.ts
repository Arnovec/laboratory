import { TStore } from "../interfaces";

export function mapForm<TObject extends object>(
  store: TStore<TObject>
): TObject {
  const reduceForm: Partial<TObject> = {};

  for (const key in store) {
    reduceForm[key] = store[key].value;
  }

  return reduceForm as TObject;
}
