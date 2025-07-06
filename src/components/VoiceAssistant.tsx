import { useEffect } from "react";
import { useVoice } from "../context/VoiceContext";

const VoiceAssistant = () => {
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening,
    feedback
  } = useVoice();

  useEffect(() => {
    if (!isListening) {
      startListening();
    }
    const interval = setInterval(() => {
      if (!isListening) {
        startListening();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px',
      position: 'relative',
      maxWidth: '500px',
      margin: '0 auto 30px'
    }}>
      <div style={{
        fontSize: '18px',
        padding: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#555'
      }}>
        {feedback || "Listening..."}
      </div>
    </div>
  );
};

export default VoiceAssistant;
