import FormRegister from "./form-register";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterContainer() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <FormRegister />
        </CardContent>
      </Card>
    </div>
  );
}
