
import React from 'react';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to TinyLlama Chat</h1>
      <ChatContainer />
      <p className="mt-6 text-sm text-muted-foreground text-center max-w-md">
        This chat application connects to a Python backend running TinyLlama. 
        Make sure your backend is running on http://localhost:5050.
      </p>
    </div>
  );
};

export default Index;
