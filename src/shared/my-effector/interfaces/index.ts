export interface IValidation {
  isValid: boolean;
  message: string;
}

export interface IFormField<TValue> {
  value: TValue;
  validation: IValidation;
}

export interface ISchema<TValue> {
  isNotEmpty: { message: string };
  min: { value: number; message: string };
  max: { value: number; message: string };
  match: (value: string | number) => boolean;
  value: TValue;
}

export type TValidationSchema<TObject extends object> = Record<
  keyof TObject,
  Partial<ISchema<TObject[keyof TObject]>>
>;

export type TStore<TObject extends object> = {
  [Key in keyof TObject]: IFormField<TObject[Key]>;
};

export interface IFieldUpdatedProps<TObject, TValue = string | number | boolean | undefined> {
  key: keyof TObject;
  value: TValue;
}
