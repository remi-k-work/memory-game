// react
import { createContext, useContext, useEffect, useReducer } from "react";

// game store
import gameReducer from "./gameReducer";
import { initialState } from "./gameState";

// game context
export const GameStateContext = createContext(null);
export const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Is there any pending asynchronous work? We are unable to execute it directly from a reducer
    if (gameState.asyncFunc) {
      // We are also not supposed to dispatch additional actions from a reducer
      gameState.asyncFunc();
    }
  }, [gameState]);

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
