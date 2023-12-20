"use client";

import { FC } from "react";
import { useBrowserTextToSpeech } from "../hooks/useBrowserTTS";
import { useAudioContext } from "../context/AudioContext";

type AudioControlsProps = {
  id: number;
  text: string;
};

export const AudioControls: FC<AudioControlsProps> = ({ id, text }) => {
  const { speak, isSpeaking, pause, resume, stop, isPaused } =
    useBrowserTextToSpeech();
  const { currentPlayingId, setCurrentPlayingId } = useAudioContext();

  const handlePlay = () => {
    setCurrentPlayingId(id);
    speak(text);
  };

  return (
    <div>
      {id === currentPlayingId && isSpeaking ? (
        <div>
          {isPaused ? (
            <button onClick={resume}>Resume</button>
          ) : (
            <button onClick={pause}>Pause</button>
          )}

          <button onClick={stop}>Stop</button>
        </div>
      ) : (
        <div>
          <button onClick={handlePlay}>Play</button>
        </div>
      )}
      {/* <p>Is Speaking : {`${isSpeaking}`}</p> */}
    </div>
  );
};
