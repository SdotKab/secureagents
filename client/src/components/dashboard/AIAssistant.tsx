'use client';

import { useState } from 'react';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const aiMessage: Message = { sender: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I had trouble generating a response.' },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-600">💡 AI Security Assistant</h2>
      <div className="space-y-2 h-64 overflow-y-auto border p-3 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'} 
                  style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '10px' }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-500 text-sm">Thinking...</div>}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about your risk, vulnerabilities, suggestions..."
          className="flex-1 border px-3 py-2 rounded-l"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5 inline" />
        </button>
      </div>
    </div>
  );
}
