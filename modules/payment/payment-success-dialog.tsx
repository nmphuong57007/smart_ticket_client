import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

interface PaymentSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieTitle: string;
  cinema: string;
  showtime: string;
  seats: string[];
  total: number;
}

export function PaymentSuccessDialog({
  open,
  onOpenChange,
  movieTitle,
  cinema,
  showtime,
  seats,
  total,
}: PaymentSuccessDialogProps) {
  const totalText = total.toLocaleString("vi-VN") + "đ";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>

          <DialogTitle className="text-xl text-center">
            Đặt vé thành công!
          </DialogTitle>

          <DialogDescription className="text-center">
            Cảm ơn bạn đã sử dụng dịch vụ của CinemaApp.
            <br />
            Vé điện tử đã được gửi đến email của bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 rounded-md border p-4 text-sm">
          <div className="flex justify-between">
            <span>Phim:</span>
            <span className="font-medium">{movieTitle}</span>
          </div>
          <div className="flex justify-between">
            <span>Rạp:</span>
            <span className="font-medium">{cinema}</span>
          </div>
          <div className="flex justify-between">
            <span>Suất chiếu:</span>
            <span className="font-medium">{showtime}</span>
          </div>
          <div className="flex justify-between">
            <span>Ghế:</span>
            <span className="font-medium">{seats.join(", ")}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Tổng tiền:</span>
            <span>{totalText}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {/* <Button className="flex-1">Xem vé điện tử</Button> */}
          <Button
            // variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Về trang chủ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
