import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CheckPayment = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("success");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    console.log(params.toString());

    const checkPaymentStatus = async () => {
      try {
        const { data } = await axios.get(
            `http://localhost:8000/api/payment/vnpay/return?${params.toString()}`
            );

        console.log(data);
        if (data.RspCode == "00") {
          setStatus("success");
          setTitle("Thanh toán thành công");
          setMessage(
            "Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xử lý thành công."
          );
          setOrderCode(data.Order || "N/A");
          localStorage.setItem("paymentUrl", "");
        } else {
          setStatus("error");
          setTitle("Thanh toán thất bại");
          setMessage(
            "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
          );
          setOrderCode(data.Order || "N/A");
          const paymentUrl = localStorage.getItem("paymentUrl");
          if (!paymentUrl) return;
          setPaymentUrl(paymentUrl);
        }
      } catch (error) {
        console.error("Error checking payment:", error);
        setStatus("error");
        setTitle("Lỗi hệ thống");
        setMessage("Đã có lỗi xảy ra khi kiểm tra trạng thái thanh toán.");
      }
    };
    checkPaymentStatus();
  });
  const handleRetryPayment = () => {
    if (!paymentUrl) return;
    window.location.href = paymentUrl;
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div
          className={`${
            status === "success" ? "bg-green-500" : "bg-red-500"
          } py-6 px-8`}
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="shrink-0">
              {status === "success" ? (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-white/90 mt-1">
                {status === "success"
                  ? "Giao dịch hoàn tất"
                  : "Vui lòng thử lại"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-8 px-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-lg leading-relaxed">{message}</p>

            {orderCode && (
              <div className="mt-4 inline-block bg-gray-100 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-500">Mã đơn hàng: </span>
                <span className="text-sm font-mono font-bold text-gray-800">
                  {orderCode}
                </span>
              </div>
            )}
            {paymentUrl && (
              <button
                onClick={handleRetryPayment}
                className={`mt-2 w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform bg-blue-500 hover:bg-blue-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg`}
              >
                Thanh toán lại ngay
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 py-4 px-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Cần hỗ trợ? Liên hệ chúng tôi:
            </p>
            <div className="flex justify-center space-x-6 mt-2">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm text-blue-500 font-medium">
                  1900 1234
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm text-blue-500 font-medium">
                  support@company.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPayment;