import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AudioContextType {
  currentPlayingId: number | undefined;
  setCurrentPlayingId: Dispatch<SetStateAction<number | undefined>>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AudioProvider: FC<Props> = ({ children }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState<number>();

  return (
    <AudioContext.Provider
      value={{
        currentPlayingId,
        setCurrentPlayingId,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context;
};
