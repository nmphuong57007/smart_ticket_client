import FormForgotPassword from "./form-forgot-password";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordContainer() {
  return (
    <div className="w-full max-w-md p-4">
      <Card className="shadow-2xl border-border/50 backdrop-blur-md bg-card/95">
        <CardContent className="p-8">
          <FormForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
}
