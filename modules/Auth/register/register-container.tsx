import FormRegister from "./form-register";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterContainer() {
  return (
    <div className="w-full max-w-2xl p-4">
      <Card className="shadow-2xl border-border/50 backdrop-blur-md bg-card/95">
        <CardContent className="p-8">
          <FormRegister />
        </CardContent>
      </Card>
    </div>
  );
}
