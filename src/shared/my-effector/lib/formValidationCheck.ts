import { IFormField, TStore, TValidObject } from "../interfaces";

export function formValidationCheck<TObject extends TValidObject>(
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
