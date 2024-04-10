import { createFormBaseApi } from "./createFormBaseApi";
import { IValidateResult, TAllowedTypes } from "./interfaces";
import {
  isFuncForNumber,
  isFuncForString,
  isNumber,
  isString,
} from "./lib/type";
import { getIsValid } from "./lib/utils";
import { type TRuleByType } from "./Rule";

export function createForm<Template extends Record<string, TAllowedTypes>>(
  template: Template,
  validationSchema?: Partial<Record<keyof Template, TRuleByType>>
) {
  const baseApi = createFormBaseApi(template);

  function validate(key: keyof Template, value: TAllowedTypes) {
    const validate = validationSchema?.[key]?.validate;

    if (validate) {
      if (isString(value) && isFuncForString(validate)) {
        return validate(value);
      }

      if (isNumber(value) && isFuncForNumber(validate)) {
        return validate(value);
      }
    }

    // TODO: тут не всегда валидно. Надо перепридумать
    return getIsValid();
  }

  const $validationResults = baseApi.$form.map((form) => {
    return Object.entries(form).reduce((prev, [key, value]) => {
      prev[key as keyof Template] = validate(key, value);

      return prev;
    }, {} as Record<keyof Template, IValidateResult>);
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
