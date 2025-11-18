import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface PaymentMethodProps {
  total: number;
  onPaymentSuccess?: () => void;
}

export default function PaymentMethod({
  total,
  onPaymentSuccess,
}: PaymentMethodProps) {
  const totalText = `${total.toLocaleString("vi-VN")}đ`;

  const handleClickPay = () => {
    onPaymentSuccess?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn phương thức thanh toán</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">Thẻ Tín dụng/Ghi nợ</TabsTrigger>
            <TabsTrigger value="ewallet">Ví Điện tử</TabsTrigger>
            <TabsTrigger value="bank">Internet Banking</TabsTrigger>
          </TabsList>

          {/* Thẻ tín dụng / ghi nợ */}
          <TabsContent value="card" className="space-y-4">
            <div className="space-y-2">
              <Label>Số thẻ</Label>
              <Input placeholder="0000 0000 0000 0000" />
            </div>

            <div className="space-y-2">
              <Label>Tên trên thẻ</Label>
              <Input placeholder="NGUYEN VAN A" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Ngày hết hạn</Label>
                <Input placeholder="MM/YY" />
              </div>

              <div className="space-y-2">
                <Label>Mã CVV</Label>
                <Input placeholder="***" type="password" />
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-3 w-3 rounded-full border" />
              Giao dịch của bạn được bảo mật và mã hóa.
            </div>

            <Button className="w-full" onClick={handleClickPay}>
              Thanh Toán {totalText}
            </Button>
          </TabsContent>

          {/* Các tab khác bạn có thể xử lý sau */}
          <TabsContent value="ewallet">
            <p className="text-sm text-muted-foreground">
              Ví điện tử sẽ được hỗ trợ sau.
            </p>
          </TabsContent>

          <TabsContent value="bank">
            <p className="text-sm text-muted-foreground">
              Internet Banking sẽ được hỗ trợ sau.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
