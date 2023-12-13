import { fetchAndSave } from "./cardImages";
import { CHOOSE_CARD, NEW_GAME, CHANGE_DIFFICULTY, CHANGE_COLLECTION, REFRESH_VIEW, refreshView } from "./gameActions";
import { beginNewTurn, doWeHaveaPair, isThereaMatch, resetChoices, shuffleCards, wasSameCardClicked2x } from "./gameState";

export default function gameReducer(state, action) {
  switch (action.type) {
    case CHOOSE_CARD: {
      // Destructure the payload
      const { card, gameDispatch } = action.payload;

      // Never mutate the state directly; work on a clone instead
      const stateClone = structuredClone(state);

      // We require two choices in order to compare cards, establish, and save either the first or second one
      stateClone.choiceOne ? (stateClone.choiceTwo = card) : (stateClone.choiceOne = card);

      // Make sure that the same card was not clicked twice - you cannot pair card with itself
      if (wasSameCardClicked2x(stateClone)) {
        // Reset choices only, but do not consider it a new turn
        resetChoices(stateClone);

        // Now, replace the old state with a new one
        return stateClone;
      }

      // Do we have a pair selected?
      if (doWeHaveaPair(stateClone)) {
        // Because the user has already selected a pair, other cards should be disabled
        stateClone.areDisabled = true;

        // Compare two selected cards to check whether there is a match
        if (isThereaMatch(stateClone)) {
          // Yes, we have a match; mark those two cards as "matched"
          stateClone.cards = stateClone.cards.map((card) => {
            if (card.src === stateClone.choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });

          // This turn has ended since two selections were made; begin a new turn
          beginNewTurn(stateClone);
        } else {
          // This turn has ended since two selections were made; begin a new turn
          setTimeout(() => {
            beginNewTurn(stateClone);
            gameDispatch(refreshView());
          }, 1000);
        }
      }

      // Now, replace the old state with a new one
      return stateClone;
    }

    case NEW_GAME: {
      // Destructure the payload
      const { gameDispatch } = action.payload;

      // Never mutate the state directly; work on a clone instead
      const stateClone = structuredClone(state);

      // shuffleCards returns a promise; run it asynchronously and refresh the view when it is finished
      stateClone.isPleaseWait = true;
      shuffleCards(stateClone).then(() => {
        stateClone.isPleaseWait = false;
        return gameDispatch(refreshView());
      });

      // Now, replace the old state with a new one
      return stateClone;
    }

    case CHANGE_DIFFICULTY: {
      // Destructure the payload
      const { newDifficulty, gameDispatch } = action.payload;

      // Never mutate the state directly; work on a clone instead
      const stateClone = structuredClone(state);

      stateClone.difficulty = newDifficulty;

      // shuffleCards returns a promise; run it asynchronously and refresh the view when it is finished
      stateClone.isPleaseWait = true;
      shuffleCards(stateClone).then(() => {
        stateClone.isPleaseWait = false;
        return gameDispatch(refreshView());
      });

      // Now, replace the old state with a new one
      return stateClone;
    }

    case CHANGE_COLLECTION: {
      // Destructure the payload
      const { newCollection, gameDispatch } = action.payload;

      // Never mutate the state directly; work on a clone instead
      const stateClone = structuredClone(state);

      stateClone.collection = newCollection;

      // Run both fetchAndSave and shuffleCards asynchronously and chain their promises together
      stateClone.isPleaseWait = true;
      fetchAndSave(stateClone.collection)
        .then(() => {
          return shuffleCards(stateClone);
        })
        .then(() => {
          stateClone.isPleaseWait = false;
          return gameDispatch(refreshView());
        });

      // Now, replace the old state with a new one
      return stateClone;
    }

    case REFRESH_VIEW: {
      // Never mutate the state directly; work on a clone instead
      const stateClone = structuredClone(state);

      // Now, replace the old state with a new one
      return stateClone;
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}
