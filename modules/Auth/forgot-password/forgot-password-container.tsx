import FormForgotPassword from "./form-forgot-password";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordContainer() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <FormForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
}
