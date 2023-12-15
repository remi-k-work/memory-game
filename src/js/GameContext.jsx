// react
import { createContext, useContext, useEffect, useReducer } from "react";

// game store
import gameReducer from "./gameReducer";
import { initialState, loadState, saveState } from "./gameState";
import { loadGameState } from "./gameActions";

// game context
export const GameStateContext = createContext(null);
export const GameDispatchContext = createContext(null);

export function GameProvider({ children }) {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Load the game state and send it as an action to the reducer
    let ignore = false;
    loadState().then((gameState) => {
      if (!ignore) {
        gameDispatch(loadGameState(gameState));
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // Is there any pending asynchronous work? We are unable to execute it directly from a reducer
    if (gameState.asyncFunc) {
      // We are also not supposed to dispatch additional actions from a reducer
      gameState.asyncFunc();
    }
  }, [gameState.asyncFunc]);

  useEffect(() => {
    // Save the game state to the local storage
    saveState(gameState);
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
