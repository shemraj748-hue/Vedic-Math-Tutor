import axios from 'axios';
import { API } from '../utils/api';

export default function VoiceButton({ text }) {
  const speak = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`${API}/voice/speak`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-IN';
    window.speechSynthesis.speak(speech);
  };

  return (
    <button
      onClick={speak}
      className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
      🔊 Listen Explanation
    </button>
  );
}
