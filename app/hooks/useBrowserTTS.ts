import { useCallback, useEffect, useState } from "react";

export const useBrowserTextToSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const voices = speechSynthesis.getVoices();
    setVoices(voices);
    setVoice(voices.find((voice) => voice.lang === "en-US") ?? null);
  }, []);

  useEffect(() => {
    const onVoicesChanged = () => {
      const voices = speechSynthesis.getVoices();
      setVoices(voices);
      setVoice(voices.find((voice) => voice.lang === "en-US") ?? null);
    };

    speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!voice) {
        return;
      }

      stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.voice = voice;
      utterance.onend = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    },
    [voice]
  );

  const pause = useCallback(() => {
    speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPaused(false);
    setIsSpeaking(false);
  }, []);

  return { voices, voice, speak, isSpeaking, pause, resume, stop, isPaused };
};
