import { TValidationSchema, createForm } from "@shared/my-effector";

export interface IMyForm {
  name: string;
  age: number;
  // isLikeAlcohol: boolean;
  // car: string | undefined;
}

export const cars = [
  { value: "KAMAZ", label: "Камаз" },
  { value: "FERARI", label: "Ферари" },
  { value: "DEVYATKA", label: "Девятка" },
];

const mySchema: TValidationSchema<IMyForm> = {
  name: {
    isNotEmpty: { message: "Не может быть пустым" },
    min: { value: 3, message: "Не короче 3-ёх символов" },
    value: "Андрей",
    match: {
      check: (name) => {
        if (name === "Андрей") {
          return false;
        }

        return true;
      },
      message: "Андрей - слишком крутое имя",
    },
  },
  age: {
    isNotEmpty: { message: "Не может быть пустым" },
    min: { value: 0, message: "Не может быть отрицательным" },
    value: 5,
  },
  // isLikeAlcohol: {
  //   isNotEmpty: { message: "Не может быть пустым" },
  //   value: false,
  // },
  // car: {
  //   value: "KAMAZ",
  // },
};

export const { $store, $form, fieldUpdated, initialValueSet, $isFormValid } =
  createForm(mySchema);

$isFormValid.watch(console.log);
