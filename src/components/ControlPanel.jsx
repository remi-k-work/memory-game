// component css styles
import styles from "./ControlPanel.module.css";

// game store
import { newGame, changeDifficulty, changeCollection } from "../js/gameActions";

// game context
import { useGameState, useGameDispatch } from "../js/GameContext";

export default function ControlPanel() {
  const { difficulty, collection, turns } = useGameState();
  const gameDispatch = useGameDispatch();

  // Handle a new game click
  function handleNewGameClick(ev) {
    gameDispatch(newGame(gameDispatch));
  }

  // Handle difficulty change
  function handleDifficultyChange(ev) {
    const newDifficulty = Number(ev.target.value);
    gameDispatch(changeDifficulty(newDifficulty, gameDispatch));
  }

  // Handle collection change
  function handleCollectionChange(ev) {
    const newCollection = ev.target.value;
    gameDispatch(changeCollection(newCollection, gameDispatch));
  }

  return (
    <section className={styles["control-panel"]}>
      <span className={styles["control-panel__turns"]}>Turns: {turns}</span>
      <label>
        <small>Difficulty</small>
        <select name="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value={1}>Easy</option>
          <option value={2}>Medium</option>
          <option value={3}>Hard</option>
        </select>
      </label>
      <label>
        <small>Collection</small>
        <select name="collection" value={collection} onChange={handleCollectionChange}>
          <option value={"default"}>Default</option>
          <option value={"backgrounds"}>Backgrounds</option>
          <option value={"fashion"}>Fashion</option>
          <option value={"nature"}>Nature</option>
          <option value={"science"}>Science</option>
          <option value={"education"}>Education</option>
          <option value={"feelings"}>Feelings</option>
          <option value={"health"}>Health</option>
          <option value={"people"}>People</option>
          <option value={"religion"}>Religion</option>
          <option value={"places"}>Places</option>
          <option value={"animals"}>Animals</option>
          <option value={"industry"}>Industry</option>
          <option value={"computer"}>Computer</option>
          <option value={"food"}>Food</option>
          <option value={"sports"}>Sports</option>
          <option value={"transportation"}>Transportation</option>
          <option value={"travel"}>Travel</option>
          <option value={"buildings"}>Buildings</option>
          <option value={"business"}>Business</option>
          <option value={"music"}>Music</option>
        </select>
      </label>
      <button type="button" onClick={handleNewGameClick}>
        New Game
      </button>
    </section>
  );
}
