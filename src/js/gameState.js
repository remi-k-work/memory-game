// card images
import { getCardImages } from "./cardImages";

// other libraries
import localforage from "localforage";

// The initial fallback game state
export const initialState = {
  cards: [],
  difficulty: 1,
  collection: "default",
  turns: 0,
  choiceOne: null,
  choiceTwo: null,
  areDisabled: false,
  isPleaseWait: false,
  asyncFunc: null,
};

// Verify that the loaded data is consistent and of the correct version (schema-wise)
function isDataOK(data) {
  return (
    "cards" in data &&
    "difficulty" in data &&
    "collection" in data &&
    "turns" in data &&
    "choiceOne" in data &&
    "choiceTwo" in data &&
    "areDisabled" in data &&
    "isPleaseWait" in data &&
    "asyncFunc" in data
  );
}

// Load the game state from local storage or use the initial fallback state
export async function loadState() {
  let gameState = (await localforage.getItem("gameState")) ?? initialState;

  // Use the initial fallback state if the data is corrupted in any way
  if (!isDataOK(gameState)) {
    gameState = initialState;
  }

  return gameState;
}

// Save the game state to the local storage
export async function saveState(gameState) {
  await localforage.setItem("gameState", gameState);
}

// Shuffle cards
export async function shuffleCards(stateClone) {
  // Increase the number of cards per card to two (original plus matching)
  let shuffledCards;
  const cardImages = await getCardImages(stateClone.difficulty);
  shuffledCards = [...cardImages, ...cardImages];

  stateClone.cards = shuffledCards
    .sort(() => {
      // Randomize the array's element order, resulting in a shuffled array
      return Math.random() - 0.5;
    })
    .map((card) => {
      // Add a unique ID to each card
      return { id: crypto.randomUUID(), ...card };
    });

  stateClone.turns = 0;
  resetChoices(stateClone);
}

// Was the same card clicked twice?
export function wasSameCardClicked2x(stateClone) {
  if (doWeHaveaPair(stateClone)) {
    const { choiceOne, choiceTwo } = stateClone;
    return choiceOne.id === choiceTwo.id;
  } else {
    return false;
  }
}

// Do we have a pair selected?
export function doWeHaveaPair(stateClone) {
  const { choiceOne, choiceTwo } = stateClone;
  return choiceOne && choiceTwo;
}

// Is there a match? We compare the "src" property in particular
export function isThereaMatch(stateClone) {
  const { choiceOne, choiceTwo } = stateClone;
  return choiceOne.src === choiceTwo.src;
}

// Reset choices only, but do not consider it a new turn
export function resetChoices(stateClone) {
  stateClone.choiceOne = stateClone.choiceTwo = null;

  // Enable other cards because the user can now make a new selection
  stateClone.areDisabled = false;
}

// Reset the choices and increase the turn
export function beginNewTurn(stateClone) {
  stateClone.choiceOne = stateClone.choiceTwo = null;
  stateClone.turns++;

  // Enable other cards because the user can now make a new selection
  stateClone.areDisabled = false;
}
