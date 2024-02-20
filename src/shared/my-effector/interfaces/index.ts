export interface IValidation {
  isValid: boolean;
  message: string;
}

export interface IFormField<TValue> {
  value: TValue | undefined;
  touched: boolean;
  validation: IValidation;
}

export interface ISchema<TValue> {
  isNotEmpty: { message: string };
  min: { value: number; message: string };
  max: { value: number; message: string };
  match: { check: (value: NonNullable<TValue>) => boolean; message: string };
  value: TValue;
}

export type TValidationSchema<TObject extends object> = Record<
  keyof TObject,
  Partial<ISchema<TObject[keyof TObject]>>
>;

export type TStore<TObject extends object> = {
  [Key in keyof TObject]: IFormField<TObject[Key]>;
};

export interface IFieldUpdatedProps<
  TObject,
  TValue extends TObject[keyof TObject]
> {
  key: keyof TObject;
  value: TValue;
}

export interface IForcedError<TObject> {
  fieldName: keyof TObject;
  message: string;
}
