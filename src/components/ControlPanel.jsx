// component css styles
import styles from "./ControlPanel.module.css";

// game store
import { NEW_GAME, CHANGE_DIFFICULTY, CHANGE_COLLECTION } from "../js/gameActions";

// game context
import { useGameState, useGameDispatch } from "../js/GameContext";

export default function ControlPanel() {
  const { difficulty, collection, turns } = useGameState();
  const gameDispatch = useGameDispatch();

  // Handle a new game click
  function handleNewGameClick(ev) {
    gameDispatch({ type: NEW_GAME, payload: { gameDispatch } });
  }

  // Handle difficulty change
  function handleDifficultyChange(ev) {
    const newDifficulty = Number(ev.target.value);
    gameDispatch({ type: CHANGE_DIFFICULTY, payload: { newDifficulty, gameDispatch } });
  }

  // Handle collection change
  function handleCollectionChange(ev) {
    const newCollection = ev.target.value;
    gameDispatch({ type: CHANGE_COLLECTION, payload: { newCollection, gameDispatch } });
  }

  return (
    <section className={styles["control-panel"]}>
      <span>Turns: {turns}</span>
      <label>
        Difficulty:&nbsp;
        <select name="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value={1}>Easy (4x3)</option>
          <option value={2}>Medium (6x5)</option>
          <option value={3}>Hard (8x7)</option>
        </select>
      </label>
      <label>
        Collection:&nbsp;
        <select name="collection" value={collection} onChange={handleCollectionChange}>
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
