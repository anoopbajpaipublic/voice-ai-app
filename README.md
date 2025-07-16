AI-powered React app with voice-based navigation and form submission using OpenAI and the Web Speech API.

# 🎙️ Voice AI App

This is a React-based AI assistant that allows users to navigate pages, fill forms, and submit them — all using **voice commands**. It uses the **Web Speech API** for voice input and integrates with **OpenAI** to interpret natural language commands.

---

## ✨ Features

-  Voice-driven page navigation (e.g., "Go to contact page")
-  Voice form filling (e.g., "Set name to John Doe")
-  Voice-based form submission (e.g., "Submit the form")
-  OpenAI-powered command understanding
-  Built with React + React Router

---

##  How It Works

- The app listens to voice input using the browser's **SpeechRecognition**.
- It sends the transcript to OpenAI for intent detection.
- Based on OpenAI's response, the app:
  - Navigates to a page
  - Fills a form field
  - Submits the form

---

##  Tech Stack

- React + TypeScript
- React Router
- OpenAI (GPT) for command parsing
- Web Speech API (SpeechRecognition)

---

## 🚀 Setup Instructions

### 1. Clone and install dependencies

bash
git clone <your-repo-url> voice-ai-app
cd voice-ai-app
npm install

2. Add OpenAI API Key
Create a .env.local file in the root:

.env.local
 
REACT_APP_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxx
Make sure you have access to OpenAI’s GPT model for command interpretation.

3. Start the app
bash

npm start

Open http://localhost:3000 in your browser.

🧪 Example Voice Commands
Command Example	Action
"Go to contact page"	Navigates to contact screen
"Set name to Jane Doe"	Fills name field
"My email is jane@example.com"	Fills email field
"Set phone to 1234567890"	Fills phone field
"Submit the form"	Triggers form submission


⚠️ Requirements
Chrome or Edge browser (for Web Speech API)

Microphone access

HTTPS or localhost for mic permissions


📂 Project Structure (Simplified)

voice-ai-app/
├── src/

│   ├── context/VoiceContext.tsx  # Main voice handling logic

│   ├── services/aiService.ts     # OpenAI integration

│   └── components/...

├── .env.local

├── package.json

└── README.md

🛠 Available Scripts
bash

npm start      # Run the app locally
npm run build  # Production build
npm test       # Run tests

📖 License
MIT license.

