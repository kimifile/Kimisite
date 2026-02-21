import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  options?: string[];
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI assistant. I can help you find the perfect accommodation or create a listing. What would you like to do?',
      options: ['Find a place', 'List my property', 'Get recommendations'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: Message;
      
      switch (option) {
        case 'Find a place':
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'Great! Let me help you find accommodation. What type are you looking for?',
            options: ['Student Hostel', 'Shortlet', 'Apartment', 'Shared Room'],
          };
          break;
        case 'List my property':
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'I\'ll help you create a listing! What type of property do you want to list?',
            options: ['Hostel Room', 'Shortlet Apartment', 'Full Apartment', 'Shared Space'],
          };
          break;
        case 'Get recommendations':
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'Based on popular searches, here are some great options:',
            options: ['Student hostels near UNILAG', 'Shortlets in Lekki', 'Affordable rooms in Yaba'],
          };
          break;
        case 'Student Hostel':
        case 'Hostel Room':
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'Perfect! Which area or school are you looking near?',
            options: ['UNILAG/Akoka', 'YabaTech', 'UniAbuja', 'Any location'],
          };
          break;
        case 'Shortlet':
        case 'Shortlet Apartment':
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'Great choice! How many nights are you planning to stay?',
            options: ['1-3 nights', '1 week', '2-4 weeks', '1+ months'],
          };
          break;
        default:
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'I understand! I\'ll help you with that. Would you like to see available options now?',
            options: ['Show me listings', 'Refine search', 'Talk to an agent'],
          };
      }
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const generateAIResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('budget') || lowerInput.includes('price') || lowerInput.includes('₦')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'I can help you find options within your budget. What\'s your price range?',
        options: ['Under ₦100K/year', '₦100K-300K/year', '₦300K-500K/year', 'Flexible'],
      };
    }
    
    if (lowerInput.includes('location') || lowerInput.includes('area') || lowerInput.includes('near')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Which area are you interested in?',
        options: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'],
      };
    }
    
    if (lowerInput.includes('student') || lowerInput.includes('school') || lowerInput.includes('campus')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'I\'ll find student-friendly accommodations for you! Which school are you attending?',
        options: ['UNILAG', 'YabaTech', 'UniAbuja', 'Other'],
      };
    }
    
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Thanks for that information! I\'m searching for the best matches. Would you like to see what I found?',
      options: ['Show listings', 'Add more filters', 'Save this search'],
    };
  };

  return (
    <>
      {/* AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="ai-button"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">AI Assistant</h3>
                  <p className="text-xs text-slate-500">Powered by StayHub AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'ai'
                        ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                        : 'bg-slate-200'
                    }`}
                  >
                    {message.type === 'ai' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block p-3 rounded-2xl text-sm ${
                        message.type === 'ai'
                          ? 'bg-slate-100 text-slate-800 rounded-tl-sm'
                          : 'bg-[#0077ff] text-white rounded-tr-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.options && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-[#0077ff] hover:text-[#0077ff] transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border-slate-200"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#0077ff] hover:bg-[#0066dd] rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
