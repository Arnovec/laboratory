import { Rule, createForm } from "@shared/giga-effector";

export interface IMyForm {
  name: string;
  age: number;
}

const initValue = {
  name: "Андрей",
  age: 50,
};

export const { $form, $validationResults, valueChanged } = createForm(initValue, {
  name: Rule().string().min(10, "По длиннее"),
  age: Rule().number().min(54, "Не пожилой"),
});
