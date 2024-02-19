import { TStore } from "../interfaces";

export function mapForm<TObject extends object>(
  store: TStore<TObject>
): TObject {
  const reduceForm: Partial<TObject> = {};

  for (const key in store) {
    if (Object.prototype.hasOwnProperty.call(store, key)) {
      const storeElement: TObject[keyof TObject] = store[key].value;

      //@ts-ignore
      reduceForm[key] = storeElement;
    }
  }

  return reduceForm as TObject;
}
