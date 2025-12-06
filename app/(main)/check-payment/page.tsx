"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CheckPayment = () => {
  const params = useSearchParams();

  const [status, setStatus] = useState("success");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    const rsp = params.get("RspCode");
    const order = params.get("Order");
    const msg = params.get("Message");

    if (rsp === "00") {
      setStatus("success");
      setTitle("Thanh toán thành công");
      setMessage("Cảm ơn bạn đã thanh toán thành công.");
      setOrderCode(order ?? "");
    } else {
      setStatus("error");
      setTitle("Thanh toán thất bại");
      setMessage(msg ?? "Đã có lỗi xảy ra trong quá trình thanh toán.");
      setOrderCode(order ?? "");
    }
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className={`${status === "success" ? "bg-green-500" : "bg-red-500"} py-6 px-8`}>
          <h1 className="text-2xl font-bold text-white text-center">{title}</h1>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-700">{message}</p>
          <p>Kiểm tra thông tin vé đã đặt tại Đơn vé đã đặt</p>

          {orderCode && (
            <div className="mt-4 p-2 bg-gray-100 rounded-lg">
              <span className="font-semibold">Mã đơn hàng:</span> {orderCode}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckPayment;
