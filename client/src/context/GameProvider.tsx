import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Player, SquareType } from "../types";
import { usePlayerContext } from "./PlayerProvider";

interface GameContextType {
  squares: SquareType[];
  setSquares: Dispatch<SetStateAction<SquareType[]>>;
  currentPlayerIndex: number;
  setCurrentPlayerIndex: Dispatch<SetStateAction<number>>;
  winner: Player | null;
  setWinner: Dispatch<SetStateAction<Player | null>>;
  isTie: boolean;
  setIsTie: Dispatch<SetStateAction<boolean>>;
  handleReset: () => void;
  totalGames: number;
  incrementTotalGames: () => void;
  gridSize: number;
  setGridSize: (size: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { players, setPlayers } = usePlayerContext();

  const [gridSize, setGridSize] = useState<number>(3);
  const [squares, setSquares] = useState<SquareType[]>(
    Array(gridSize * gridSize).fill(null)
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [totalGames, setTotalGames] = useState<number>(0);

  const handleReset = () => {
    setSquares(Array(gridSize * gridSize).fill(null));
    setWinner(null);
    setIsTie(false);
    setCurrentPlayerIndex((prevIndex) =>
      winner ? prevIndex : (prevIndex + 1) % 2
    );
  };

  const incrementTotalGames = () => {
    setTotalGames(totalGames + 1);
  };

  const updateGridSize = (size: number) => {
    setGridSize((s) => size);
    setSquares(Array(size * size).fill(null));
    setWinner(null);
    setIsTie(false);
    setCurrentPlayerIndex(0);
  };

  return (
    <GameContext.Provider
      value={{
        squares,
        setSquares,
        currentPlayerIndex,
        setCurrentPlayerIndex,
        winner,
        setWinner,
        isTie,
        setIsTie,
        handleReset,
        totalGames,
        incrementTotalGames,
        gridSize,
        setGridSize: updateGridSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
