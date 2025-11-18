import FormRegister from "./form-register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterContainer() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chào mừng bạn</CardTitle>
        <CardDescription>
          Tạo tài khoản để bắt đầu trải nghiệm của bạn
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormRegister />
      </CardContent>
    </Card>
  );
}
