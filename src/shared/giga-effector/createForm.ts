import { createFormBaseApi } from "./createFormBaseApi";
import { TAllowedTypes } from "./interfaces";
import { getIsValid } from "./lib/utils";
import {
  type TRuleByType,
} from "./Rule";

export function createForm<Template extends Record<string, TAllowedTypes>>(
  template: Template,
  validationSchema?: Partial<Record<keyof Template, TRuleByType>>
) {
  const baseApi = createFormBaseApi(template);

  function validate(key: keyof Template, value: TAllowedTypes) {
    const rules = validationSchema?.[key]?.value;

    let validation = getIsValid();
    if (rules) {
      for (const nextRule of rules) {
        validation = nextRule(value);
      }
    }

    return validation;
  }

  const $validationResults = baseApi.$form.map((form) => {
    return Object.entries(form).reduce((prev, [key, value]) => {
      prev[key as keyof Template] = validate(key, value);

      return prev;
    }, {} as Record<keyof Template, { isValid: boolean; messages: string[] }>);
  });

  const $isFormValid = $validationResults.map((results) => {
    return Object.values(results).every(({ isValid }) => isValid);
  });

  return {
    ...baseApi,
    $validationResults,
    $isFormValid,
  };
}
