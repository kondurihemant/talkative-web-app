
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex items-start max-w-[80%]">
        {!isUser && (
          <div className="mr-2 flex-shrink-0 bg-primary/10 rounded-full p-2">
            <Bot className="h-5 w-5 text-primary" />
          </div>
        )}
        
        <div
          className={cn(
            "py-3 px-4 rounded-2xl",
            isUser 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted/50 text-foreground"
          )}
        >
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message}</p>
        </div>
        
        {isUser && (
          <div className="ml-2 flex-shrink-0 bg-primary rounded-full p-2">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
