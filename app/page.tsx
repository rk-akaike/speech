"use client";

import { useState } from "react";
import { INITIAL_MESSAGES } from "./constants";
import { useBrowserSpeechRecognition } from "./hooks/useBrowserSTT";
import { MessageType } from "./types";
import { AudioControls } from "./components/AudioControls";
import { AudioProvider } from "./context/AudioContext";

const Dictaphone = () => {
  const {
    isListening,
    transcript,
    resetTranscript,
    listen,
    stopListening,
    browserSupportsSpeechRecognition,
  } = useBrowserSpeechRecognition();

  const [messages, setMessages] = useState<MessageType[]>(INITIAL_MESSAGES);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <AudioProvider>
      <main>
        <div className="flex flex-col items-start space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex ${
                message.type === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              <div className={`message ${message.type}`}>
                <p>{message.text}</p>
                <AudioControls id={message.id} text={message.text} />
              </div>
            </div>
          ))}
        </div>
        <footer>
          <p>Microphone: {isListening ? "on" : "off"}</p>
          <button onClick={listen}>Start</button>
          <button onClick={stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </footer>
      </main>
    </AudioProvider>
  );
};
export default Dictaphone;
