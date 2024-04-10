import { GigaForm } from "@entities/GigaForm";
import { Card } from "antd";

export function GigaFormContent() {
  return (
    <Card style={{ width: 500 }}>
      <GigaForm />
    </Card>
  );
}
