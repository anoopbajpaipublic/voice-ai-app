import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VoiceProvider } from "./context/VoiceContext";
import VoiceAssistant from "./components/VoiceAssistant";
import VoiceForm from "./components/VoiceForm";
import NavTabs from "./components/NavTabs";

import Home from "./screens/Home";
import Products from "./screens/Products";
import Contact from "./screens/Contact";

function App() {
  return (
    <Router>
      <VoiceProvider>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <h1 style={{ textAlign: 'center' }}>Voice-Controlled App</h1>

          <NavTabs />
          <VoiceAssistant />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<><Contact /><VoiceForm /></>} />
          </Routes>

          <div style={{
            marginTop: '40px',
            textAlign: 'center',
            color: '#666',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            <p>Built with ❤️ by Anoop Bajpai</p>
            <p>Powered by OpenAI</p>
   
          </div>
        </div>
      </VoiceProvider>
    </Router>
  );
}

export default App;
