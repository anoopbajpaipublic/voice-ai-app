import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { interpretVoiceCommand } from "../services/aiService";

interface FormData {
  name: string;
  email: string;
    phone: string;
  message: string;
}

interface VoiceContextType {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  feedback: string;
  formData: FormData;
  setFormField: (field: keyof FormData, value: string) => void;
  submitForm: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" ,  phone: "",
  message: "", });
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback("Speech recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript.trim().toLowerCase();
      setTranscript(text);
      setFeedback(`Heard: "${text}"`);
      await handleCommand(text);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const setFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFeedback(`${field} set to ${value}`);
  };

  const submitForm = () => {
    setFeedback("Form submitted!");
    console.log("Submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleCommand = async (text: string) => {
    try {
      const result = await interpretVoiceCommand(text);

      switch (result.action) {
        case "navigate":
          if (result.route) navigate(result.route);
          break;
        case "fill_form":
          if (result.field && result.value) {
            setFormField(result.field as keyof FormData, result.value);
          }
          break;
        case "submit_form":
          submitForm();
          break;
        default:
          setFeedback("Did not understand that.");
      }
    } catch (e) {
      setFeedback("Error interpreting command.");
      console.error("Command handler error:", e);
    }
  };

  return (
    <VoiceContext.Provider value={{
      transcript,
      isListening,
      startListening,
      stopListening,
      feedback,
      formData,
      setFormField,
      submitForm
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) throw new Error("useVoice must be used within VoiceProvider");
  return context;
};
