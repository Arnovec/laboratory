import { MyForm } from "@entities/MyForm/ui/MyForm";
import { Card } from "antd";

export function MyFormContent() {
  return (
    <Card style={{ width: 500 }}>
      <MyForm />
    </Card>
  );
}
