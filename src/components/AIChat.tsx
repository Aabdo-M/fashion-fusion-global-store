
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChatMessage } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { SendHorizontal, Bot, User } from "lucide-react";

export function AIChat() {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "مرحبًا! كيف يمكنني مساعدتك اليوم؟ | Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  // ملاحظة: هذه محاكاة للدردشة - في تطبيق حقيقي، سيتم توصيلها بـ ChatGPT أو Gemini API
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // محاكاة استجابة الذكاء الاصطناعي بعد تأخير قصير
    setTimeout(() => {
      const aiResponses = [
        "يمكنني مساعدتك في العثور على المنتجات المناسبة لك. هل تبحث عن شيء محدد؟ | I can help you find products that suit you. Are you looking for something specific?",
        "نعم، لدينا تشكيلة واسعة من المنتجات الجديدة. هل ترغب في معرفة المزيد؟ | Yes, we have a wide range of new products. Would you like to know more?",
        "يمكنك الدفع باستخدام بطاقات الائتمان، أو الدفع عند الاستلام، أو عبر التحويل المصرفي. | You can pay using credit cards, cash on delivery, or bank transfer.",
        "نعم، نقدم خدمة التوصيل لجميع المناطق. يستغرق التوصيل 2-5 أيام عمل. | Yes, we offer delivery service to all areas. Delivery takes 2-5 business days.",
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          {t('chatWithUs')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === "ai" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form
          className="flex w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder={t('askQuestion')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizontal className="h-5 w-5" />
            <span className="sr-only">{t('send')}</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
