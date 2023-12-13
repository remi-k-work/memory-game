// component css styles
import styles from "./SingleCard.module.css";

// other libraries
import cn from "classnames";

// game store
import { chooseCard } from "../js/gameActions";

// game context
import { useGameState, useGameDispatch } from "../js/GameContext";

export default function SingleCard({ card }) {
  const { id, src, matched, image } = card;
  const { difficulty, choiceOne, choiceTwo, areDisabled } = useGameState();
  const gameDispatch = useGameDispatch();

  // Handle a card click
  function handleCardClick(ev) {
    if (!areDisabled) {
      gameDispatch(chooseCard(card, gameDispatch));
    }
  }

  return (
    <figure className={id === choiceOne?.id || id === choiceTwo?.id || matched ? cn(styles["card"], styles["card--flipped"]) : styles["card"]}>
      <small>
        <sub>{image?.size > 0 ? image.size : src}</sub>
        <br />
        <sub>{difficulty}</sub>
      </small>

      <img
        className={
          difficulty === 1
            ? cn(styles["card__front"], styles["card__front--4x3"])
            : difficulty === 2
            ? cn(styles["card__front"], styles["card__front--6x5"])
            : cn(styles["card__front"], styles["card__front--8x7"])
        }
        src={image?.size > 0 ? URL.createObjectURL(image) : src}
        width={200}
        height={200}
        alt="card front"
      />
      <img
        className={
          difficulty === 1
            ? cn(styles["card__back"], styles["card__back--4x3"])
            : difficulty === 2
            ? cn(styles["card__back"], styles["card__back--6x5"])
            : cn(styles["card__back"], styles["card__back--8x7"])
        }
        src="/img/cover.png"
        width={200}
        height={200}
        alt="card back"
        onClick={handleCardClick}
      />
    </figure>
  );
}
