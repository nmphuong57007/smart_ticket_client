import FormLogin from "./form-login";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginContainer() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
}
