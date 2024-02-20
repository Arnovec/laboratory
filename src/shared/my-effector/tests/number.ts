import { fork, allSettled } from "effector";
import { TValidationSchema, createForm } from "@shared/my-effector";
import { it } from "vitest";

interface INumberForm {
  requiredField: number | undefined;
  nonRequiredField: number;
}

const numberSchema: TValidationSchema<INumberForm> = {
  requiredField: {
    isNotEmpty: { message: "Не может быть пустым" },
    min: { value: 5, message: "Не меньше 5" },
    max: { value: 21, message: "Не больше 21" },
    match: {
      check: (value) => {
        if (value % 2 == 0) {
          return true;
        }

        return false;
      },
      message: "Значение должно быть четным",
    },
  },
  nonRequiredField: {},
};

const {
  $store,
  $form,
  $isFormValid,
  fieldUpdated,
  initialValueSet,
  dataReset,
  fieldValueDataReset,
  forcedErrorsSet,
} = createForm(numberSchema);

export const numberTest = () => {
  it("Проверка полей типа number", async ({ expect }) => {
    const scope = fork();

    // Проверка инициализации
    const firstStoreState = scope.getState($store);
    const firstFormState = scope.getState($form);
    const firstIsFormValidState = scope.getState($isFormValid);
    expect(firstFormState.requiredField).toBe(undefined);
    expect(firstFormState.nonRequiredField).toBe(undefined);
    expect(firstIsFormValidState).toBe(false);
    expect(firstStoreState.requiredField.validation.isValid).toBe(false);
    expect(firstStoreState.requiredField.touched).toBe(false);
    expect(firstStoreState.requiredField.validation.message).toBe(
      "Не может быть пустым"
    );
    expect(firstStoreState.nonRequiredField.validation.isValid).toBe(true);
    expect(firstStoreState.nonRequiredField.touched).toBe(false);
    expect(firstStoreState.nonRequiredField.validation.message).toBe("");

    // Проверка обновлений значений(min)
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: 0 },
    });
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "nonRequiredField", value: 15 },
    });

    const afterUpdateStoreState = scope.getState($store);
    const afterUpdateFormState = scope.getState($form);
    const afterUpdateFormValidState = scope.getState($isFormValid);
    expect(afterUpdateFormState.requiredField).toBe(0);
    expect(afterUpdateFormState.nonRequiredField).toBe(15);
    expect(afterUpdateFormValidState).toBe(false);
    expect(afterUpdateStoreState.requiredField.validation.isValid).toBe(false);
    expect(afterUpdateStoreState.requiredField.touched).toBe(true);
    expect(afterUpdateStoreState.requiredField.validation.message).toBe(
      "Не меньше 5"
    );
    expect(afterUpdateStoreState.nonRequiredField.validation.isValid).toBe(
      true
    );
    expect(afterUpdateStoreState.nonRequiredField.touched).toBe(true);
    expect(afterUpdateStoreState.nonRequiredField.validation.message).toBe("");

    // Проверка обновлений значений(max)
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: 30 },
    });

    const checkMaxStoreState = scope.getState($store);
    const checkMaxFormState = scope.getState($form);
    const checkMaxFormValidState = scope.getState($isFormValid);
    expect(checkMaxFormState.requiredField).toBe(30);
    expect(checkMaxFormValidState).toBe(false);
    expect(checkMaxStoreState.requiredField.validation.message).toBe(
      "Не больше 21"
    );

    // Проверка обновлений значений(match)
    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: 17 },
    });

    const checkOddStoreState = scope.getState($store);
    const checkOddFormState = scope.getState($form);
    const checkOddFormValidState = scope.getState($isFormValid);
    expect(checkOddFormState.requiredField).toBe(17);
    expect(checkOddFormValidState).toBe(false);
    expect(checkOddStoreState.requiredField.validation.message).toBe(
      "Значение должно быть четным"
    );

    // Проверка полного обновления значений
    await allSettled(initialValueSet, {
      scope,
      params: { requiredField: 16, nonRequiredField: 519 },
    });

    const afterInitialValueSetStoreState = scope.getState($store);
    const afterInitialValueSetFormState = scope.getState($form);
    const afterInitialValueSetFormValidState = scope.getState($isFormValid);
    expect(afterInitialValueSetFormState.requiredField).toBe(16);
    expect(afterInitialValueSetFormState.nonRequiredField).toBe(519);
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
      "Не может быть пустым"
    );

    await allSettled(fieldUpdated, {
      scope,
      params: { key: "requiredField", value: 54 },
    });

    // Проверка ресета значений
    await allSettled(dataReset, {
      scope,
    });

    const dataResetStoreState = scope.getState($store);
    const dataResetFormState = scope.getState($form);
    const dataResetIsFormValidState = scope.getState($isFormValid);
    expect(dataResetFormState.requiredField).toBe(undefined);
    expect(dataResetFormState.nonRequiredField).toBe(undefined);
    expect(dataResetIsFormValidState).toBe(false);
    expect(dataResetStoreState.requiredField.validation.isValid).toBe(false);
    expect(dataResetStoreState.requiredField.touched).toBe(false);
    expect(dataResetStoreState.requiredField.validation.message).toBe(
      "Не может быть пустым"
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
    expect(forcedErrorFormState.nonRequiredField).toBe(undefined);
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
