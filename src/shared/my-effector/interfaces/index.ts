export type TValidValueTypes = string | number | boolean | undefined | null;

export type TValidObject = Record<string, TValidValueTypes>;

export interface IFormField<TValue> {
  value?: TValue;
  touched: boolean;
  validation: IValidation;
}

export interface IValidation {
  isValid: boolean;
  message: string;
}

export interface ISchema<TValue> {
  isNotEmpty: { message: string };
  min: { value: number; message: string };
  max: { value: number; message: string };
  match: { check: (value: NonNullable<TValue>) => boolean; message: string };
  value: TValue;
}

export type TValidationSchema<TObject extends TValidObject> = Record<
  keyof TObject,
  Partial<ISchema<TObject[keyof TObject]>>
>;

export type TStore<TObject extends TValidObject> = {
  [Key in keyof TObject]: IFormField<TObject[Key]>;
};

export interface IFieldUpdatedProps<TObject> {
  key: keyof TObject;
  value: TObject[keyof TObject];
}

export interface IForcedError<TObject> {
  fieldName: keyof TObject;
  message: string;
}
