import { IFormField, TStore } from "../interfaces";

export function formValidationCheck<TObject extends object>(
  store: TStore<TObject>
): boolean {
  for (const key in store) {
    if (Object.prototype.hasOwnProperty.call(store, key)) {
      const storeElement: IFormField<unknown> = store[key];

      if (!storeElement.validation.isValid) {
        return false;
      }
    }
  }

  return true;
}
