import { TStore, TValidObject } from "../interfaces";

export function mapForm<TObject extends TValidObject>(
  store: TStore<TObject>
): TObject {
  const reduceForm: Partial<TObject> = {};

  for (const key in store) {
    reduceForm[key] = store[key].value;
  }

  return reduceForm as TObject;
}
