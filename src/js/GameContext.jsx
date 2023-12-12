// react
import { createContext, useContext, useReducer } from "react";

// game store
import gameReducer from "./gameReducer";
import { initialState } from "./gameState";

// game context
export const GameStateContext = createContext(null);
export const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={gameDispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
