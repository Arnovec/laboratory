import { Button, ButtonProps } from "antd";
import { Store } from "effector";
import { useUnit } from "effector-react";

interface IProps {
  $isValid: Store<boolean>;
  buttonProps?: ButtonProps;
  text: string;
}

export function MySubmitButton({ $isValid, text, buttonProps }: IProps) {
  const { isValid } = useUnit({ isValid: $isValid });
  console.log("button", isValid);

  return (
    <Button {...buttonProps} disabled={!isValid}>
      {text}
    </Button>
  );
}
