import { fork, allSettled } from "effector";
import { TValidationSchema, createForm } from "@shared/my-effector";
import { it } from "vitest";

interface IStringForm {
  requiredField: string;
  nonRequiredField: string;
}

const emptyMessage = "Не может быть пустым";
const minLengthMessage = "Не меньше 3 символов";
const maxLengthMessage = "Не больше 7 символов";
const matchErrorMessage = "Запрещено qwerty";

const stringSchema: TValidationSchema<IStringForm> = {
  requiredField: {
    isNotEmpty: { message: emptyMessage },
    min: { value: 3, message: minLengthMessage },
    max: { value: 7, message: maxLengthMessage },
    match: {
      check: (value) => {
        if (value === "qwerty") {
          return false;
        }

        return true;
      },
      message: matchErrorMessage,
    },
  },
  nonRequiredField: {
    value: "",
  },
};

const {
  $form,
  $isFormValid,
  $store,
  dataReset,
  fieldUpdated,
  fieldValueDataReset,
  forcedErrorsSet,
  initialValueSet,
} = createForm(stringSchema);

export const stringTest = () => {
  it("Проверка полей типа string", async ({ expect }) => {
    const scope = fork();

    // Проверка инициализации
    const firstStoreState = scope.getState($store);
    const firstFormState = scope.getState($form);
    const firstIsFormValidState = scope.getState($isFormValid);
    expect(firstFormState.requiredField).toBe(undefined);
    expect(firstFormState.nonRequiredField).toBe("");
    expect(firstIsFormValidState).toBe(false);
    expect(firstStoreState.requiredField.validation.isValid).toBe(false);
    expect(firstStoreState.requiredField.touched).toBe(false);
    expect(firstStoreState.requiredField.validation.message).toBe(emptyMessage);
    expect(firstStoreState.nonRequiredField.validation.isValid).toBe(true);
    expect(firstStoreState.nonRequiredField.touched).toBe(false);
    expect(firstStoreState.nonRequiredField.validation.message).toBe("");

    // Проверка обновлений значений(min)
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: "qw" },
    });
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "nonRequiredField", value: "message" },
    });

    const afterUpdateStoreState = scope.getState($store);
    const afterUpdateFormState = scope.getState($form);
    const afterUpdateFormValidState = scope.getState($isFormValid);
    expect(afterUpdateFormState.requiredField).toBe("qw");
    expect(afterUpdateFormState.nonRequiredField).toBe("message");
    expect(afterUpdateFormValidState).toBe(false);
    expect(afterUpdateStoreState.requiredField.validation.isValid).toBe(false);
    expect(afterUpdateStoreState.requiredField.touched).toBe(true);
    expect(afterUpdateStoreState.requiredField.validation.message).toBe(
      minLengthMessage
    );
    expect(afterUpdateStoreState.nonRequiredField.validation.isValid).toBe(
      true
    );
    expect(afterUpdateStoreState.nonRequiredField.touched).toBe(true);
    expect(afterUpdateStoreState.nonRequiredField.validation.message).toBe("");

    // Проверка обновлений значений(max)
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: "d;kmmqpkwdmpowqdpmoqwdpom" },
    });

    const checkMaxStoreState = scope.getState($store);
    const checkMaxFormState = scope.getState($form);
    const checkMaxFormValidState = scope.getState($isFormValid);
    expect(checkMaxFormState.requiredField).toBe("d;kmmqpkwdmpowqdpmoqwdpom");
    expect(checkMaxFormValidState).toBe(false);
    expect(checkMaxStoreState.requiredField.validation.message).toBe(
      maxLengthMessage
    );

    // Проверка обновлений значений(match)
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: "qwerty" },
    });

    const checkOddStoreState = scope.getState($store);
    const checkOddFormState = scope.getState($form);
    const checkOddFormValidState = scope.getState($isFormValid);
    expect(checkOddFormState.requiredField).toBe("qwerty");
    expect(checkOddFormValidState).toBe(false);
    expect(checkOddStoreState.requiredField.validation.message).toBe(
      matchErrorMessage
    );

    // Проверка полного обновления значений
    await allSettled(initialValueSet, {
      scope,
      params: { requiredField: "zxcvbn", nonRequiredField: "qwe" },
    });

    const afterInitialValueSetStoreState = scope.getState($store);
    const afterInitialValueSetFormState = scope.getState($form);
    const afterInitialValueSetFormValidState = scope.getState($isFormValid);
    expect(afterInitialValueSetFormState.requiredField).toBe("zxcvbn");
    expect(afterInitialValueSetFormState.nonRequiredField).toBe("qwe");
    expect(afterInitialValueSetFormValidState).toBe(true);
    expect(
      afterInitialValueSetStoreState.requiredField.validation.isValid
    ).toBe(true);
    expect(afterInitialValueSetStoreState.requiredField.touched).toBe(true);
    expect(
      afterInitialValueSetStoreState.requiredField.validation.message
    ).toBe("");
    expect(
      afterInitialValueSetStoreState.nonRequiredField.validation.isValid
    ).toBe(true);
    expect(afterInitialValueSetStoreState.nonRequiredField.touched).toBe(true);
    expect(
      afterInitialValueSetStoreState.nonRequiredField.validation.message
    ).toBe("");

    // Проверка ресета поля
    await allSettled(fieldValueDataReset, {
      scope,
      params: "requiredField",
    });

    const fieldResetStoreState = scope.getState($store);
    const fieldResetFormState = scope.getState($form);
    const fieldResetIsFormValidState = scope.getState($isFormValid);
    expect(fieldResetFormState.requiredField).toBe(undefined);
    expect(fieldResetIsFormValidState).toBe(false);
    expect(fieldResetStoreState.requiredField.validation.isValid).toBe(false);
    expect(fieldResetStoreState.requiredField.touched).toBe(false);
    expect(fieldResetStoreState.requiredField.validation.message).toBe(
      emptyMessage
    );

    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: "54" },
    });

    // Проверка ресета значений
    await allSettled(dataReset, {
      scope,
    });

    const dataResetStoreState = scope.getState($store);
    const dataResetFormState = scope.getState($form);
    const dataResetIsFormValidState = scope.getState($isFormValid);
    expect(dataResetFormState.requiredField).toBe(undefined);
    expect(dataResetFormState.nonRequiredField).toBe("");
    expect(dataResetIsFormValidState).toBe(false);
    expect(dataResetStoreState.requiredField.validation.isValid).toBe(false);
    expect(dataResetStoreState.requiredField.touched).toBe(false);
    expect(dataResetStoreState.requiredField.validation.message).toBe(
     emptyMessage
    );
    expect(dataResetStoreState.nonRequiredField.validation.isValid).toBe(true);
    expect(dataResetStoreState.nonRequiredField.touched).toBe(false);
    expect(dataResetStoreState.nonRequiredField.validation.message).toBe("");

    // Проверка принудительной ошибки
    await allSettled(forcedErrorsSet, {
      scope,
      params: [
        { fieldName: "nonRequiredField", message: "Не подходящее значение" },
      ],
    });

    const forcedErrorStoreState = scope.getState($store);
    const forcedErrorFormState = scope.getState($form);
    const forcedErrorIsFormValidState = scope.getState($isFormValid);
    expect(forcedErrorFormState.nonRequiredField).toBe('');
    expect(forcedErrorIsFormValidState).toBe(false);
    expect(forcedErrorStoreState.nonRequiredField.validation.isValid).toBe(
      false
    );
    expect(forcedErrorStoreState.nonRequiredField.touched).toBe(true);
    expect(forcedErrorStoreState.nonRequiredField.validation.message).toBe(
      "Не подходящее значение"
    );
  });
};
