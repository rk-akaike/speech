import { useState, useEffect, useCallback, useMemo } from "react";

export const useBrowserSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const browserSupportsSpeechRecognition = "webkitSpeechRecognition" in window;

  const recognition = useMemo(() => {
    if (browserSupportsSpeechRecognition) {
      const speechRecognition = window.webkitSpeechRecognition;
      return new speechRecognition();
    }
    return null;
  }, []);

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      // recognition.lang = "hi-IN";

      recognition.onstart = () => {
        console.log("Started listening");
        setIsListening(true);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
        console.error(event);
      };

      recognition.onend = () => {
        console.log("Stopped listening");
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];

        if (result.isFinal) {
          setTranscript(result[0].transcript);
        }
      };

      return () => {
        recognition.abort();
      };
    } else {
      console.log("This browser does not support speech recognition");
    }
  }, [recognition]);

  const listen = useCallback(() => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      console.log("This browser does not support speech recognition");
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    } else {
      console.log("This browser does not support speech recognition");
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    resetTranscript,
    listen,
    stopListening,
    browserSupportsSpeechRecognition,
  };
};
