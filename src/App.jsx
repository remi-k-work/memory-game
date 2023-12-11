// react
import { useReducer } from "react";

// components
import SingleCard from "./components/SingleCard";

// game store
import { CHOOSE_CARD, NEW_GAME, CHANGE_DIFFICULTY } from "./js/gameActions";
import gameReducer from "./js/gameReducer";
import { initialState } from "./js/gameState";
import { fetchAndSave } from "./js/cardImages";

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const { cards, difficulty, turns, choiceOne, choiceTwo, areDisabled, isPleaseWait } = gameState;

  // Handle a card choice
  function handleCardChoice(card) {
    dispatch({ type: CHOOSE_CARD, payload: { card, dispatch } });
  }

  // Handle a new game click
  function handleNewGameClick(ev) {
    dispatch({ type: NEW_GAME, payload: { dispatch } });
  }

  // Handle difficulty change
  function handleDifficultyChange(ev) {
    const newDifficulty = Number(ev.target.value);
    dispatch({ type: CHANGE_DIFFICULTY, payload: { newDifficulty, dispatch } });
  }

  // *** TEST ***
  //testPixabay();
  // fetchAndSave();
  // *** TEST ***

  return (
    <>
      {isPleaseWait && (
        <dialog open>
          <p>Please wait...</p>
          <form method="dialog">
            <button>OK</button>
          </form>
        </dialog>
      )}
      <header>
        <label>
          Difficulty:
          <select name="difficulty" value={difficulty} onChange={handleDifficultyChange}>
            <option value={1}>Easy (4x3)</option>
            <option value={2}>Medium (6x5)</option>
            <option value={3}>Hard (8x7)</option>
          </select>
        </label>
      </header>
      <main>
        <button type="button" onClick={handleNewGameClick}>
          New Game
        </button>
        <div className={difficulty === 1 ? "card-grid card-grid--4x3" : difficulty === 2 ? "card-grid card-grid--6x5" : "card-grid card-grid--8x7"}>
          {cards.map((card) => {
            return (
              <SingleCard
                key={card.id}
                card={card}
                onCardChoice={handleCardChoice}
                difficulty={difficulty}
                isFlipped={card.id === choiceOne?.id || card.id === choiceTwo?.id || card.matched}
                isDisabled={areDisabled}
              />
            );
          })}
        </div>
        <p>Turns: {turns}</p>
      </main>
    </>
  );
}

export default App;
