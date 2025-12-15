// frontend/src/components/AIChat.jsx
import { useState } from 'react';
import axios from 'axios';
import { API } from '../utils/api';
import VoiceButton from './VoiceButton';

{/* AFTER ANSWER DISPLAY */}
{answer && <VoiceButton text={answer} />}

export default function AIChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const ask = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post(`${API}/ai/chat`,
      { question, language: 'English' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAnswer(res.data.answer);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold">AI Vedic Maths Teacher</h2>
      <textarea className="w-full border p-2 mt-3"
        placeholder="Ask your doubt..."
        onChange={e => setQuestion(e.target.value)} />
      <button onClick={ask}
        className="bg-black text-white px-4 py-2 mt-3 rounded">
        Ask AI
      </button>
      <p className="mt-4 text-gray-700">{answer}</p>
    </div>
  );
}
