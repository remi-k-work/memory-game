// Action types
export const CHOOSE_CARD = "CHOOSE_CARD";
export const NEW_GAME = "NEW_GAME";
export const CHANGE_DIFFICULTY = "CHANGE_DIFFICULTY";
export const CHANGE_COLLECTION = "CHANGE_COLLECTION";
export const REFRESH_VIEW = "REFRESH_VIEW";
export const LOAD_GAME_STATE = "LOAD_GAME_STATE";

// Action creators always return the correct action with the correct type and payload (which aids in bug prevention)
export function chooseCard(card, gameDispatch) {
  return { type: CHOOSE_CARD, payload: { card, gameDispatch } };
}

export function newGame(gameDispatch) {
  return { type: NEW_GAME, payload: { gameDispatch } };
}

export function changeDifficulty(newDifficulty, gameDispatch) {
  return { type: CHANGE_DIFFICULTY, payload: { newDifficulty, gameDispatch } };
}

export function changeCollection(newCollection, gameDispatch) {
  return { type: CHANGE_COLLECTION, payload: { newCollection, gameDispatch } };
}

export function refreshView() {
  return { type: REFRESH_VIEW };
}

export function loadGameState(gameState) {
  return { type: LOAD_GAME_STATE, payload: { gameState } };
}
