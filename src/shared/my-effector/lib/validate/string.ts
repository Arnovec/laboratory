import { ISchema, IFormField } from "../../../my-effector";

export function stringValidation(
  schema: Partial<ISchema<string>>,
  value: string
): IFormField<string> | void {
  if (schema.isNotEmpty && value === "") {
    return {
      value,
      validation: {
        isValid: false,
        message: schema.isNotEmpty.message,
      },
    };
  }

  if (schema.min && value.length < schema.min.value) {
    return {
      value,
      validation: {
        isValid: false,
        message: schema.min.message,
      },
    };
  }

  if (schema.max && value.length > schema.max.value) {
    return {
      value,
      validation: {
        isValid: false,
        message: schema.max.message,
      },
    };
  }

  if (schema.match && !schema?.match(value)) {
    return {
      value,
      validation: {
        isValid: false,
        message: "Не пройдена валидация",
      },
    };
  }

  return;
}