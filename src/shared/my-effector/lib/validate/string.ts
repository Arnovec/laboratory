import { ISchema, IFormField } from "../../../my-effector";

export function stringValidation(
  schema: Partial<ISchema<string>>,
  value: string,
  touched: boolean
): IFormField<string> | void {
  if (schema.isNotEmpty && value === "") {
    return {
      value,
      touched,
      validation: {
        isValid: false,
        message: schema.isNotEmpty.message,
      },
    };
  }

  if (schema.min && value.length < schema.min.value) {
    return {
      value,
      touched,
      validation: {
        isValid: false,
        message: schema.min.message,
      },
    };
  }

  if (schema.max && value.length > schema.max.value) {
    return {
      value,
      touched,
      validation: {
        isValid: false,
        message: schema.max.message,
      },
    };
  }

  if (schema.match) {
    const isMatched = schema.match.check(value);

    if (!isMatched) {
      return {
        value,
        touched,
        validation: {
          isValid: false,
          message: schema.match.message,
        },
      };
    }
  }

  return;
}
