"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý ảo của SmartTicket. Tôi có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("giá") || input.includes("vé")) {
      return "Giá vé phim tại SmartTicket dao động từ 45.000đ - 120.000đ tùy theo suất chiếu và loại ghế. Bạn muốn biết giá vé cho phim nào?";
    }
    if (input.includes("rạp") || input.includes("địa chỉ")) {
      return "SmartTicket có hệ thống rạp tại: Indochina Plaza, Phạm Ngọc Thạch, Smart City, Hai Bà Trưng. Bạn muốn biết thông tin rạp nào?";
    }
    if (input.includes("đặt vé") || input.includes("booking")) {
      return "Để đặt vé, bạn vui lòng chọn phim muốn xem, sau đó chọn rạp, suất chiếu và ghế ngồi. Bạn cần hỗ trợ đặt vé không?";
    }
    if (input.includes("thanh toán") || input.includes("payment")) {
      return "SmartTicket hỗ trợ thanh toán qua: Thẻ ATM, Visa/Master, Ví điện tử (MoMo, ZaloPay), VNPay. Bạn có thắc mắc gì về thanh toán không?";
    }
    if (input.includes("phim") || input.includes("movie")) {
      return "Hiện tại chúng tôi đang có nhiều phim hot đang chiếu. Bạn có thể xem danh sách phim tại mục 'Phim' trên menu. Bạn thích thể loại phim nào?";
    }
    if (input.includes("khuyến mãi") || input.includes("giảm giá")) {
      return "SmartTicket thường xuyên có chương trình khuyến mãi vào thứ 3 và thứ 4 hàng tuần. Đăng ký tài khoản để nhận thông báo khuyến mãi mới nhất!";
    }

    return "Cảm ơn bạn đã liên hệ! Để được hỗ trợ tốt hơn, bạn có thể hỏi tôi về: giá vé, địa chỉ rạp, đặt vé, thanh toán, hoặc thông tin phim. Hoặc liên hệ hotline: 1900 636807.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 w-[380px] h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">SmartTicket Bot</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Trợ lý ảo của bạn
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Chat Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-40 transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </>
  );
}
