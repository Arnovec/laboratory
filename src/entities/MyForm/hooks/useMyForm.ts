import { useUnit } from "effector-react";
import { $form, $store, $isFormValid } from "../model";

export function useMyForm() {
  const model = useUnit({
    form: $form,
    store: $store,
    isFormValid: $isFormValid,
  });

  return model;
}
