// component css styles
import styles from "./SingleCard.module.css";

// other libraries
import cn from "classnames";

export default function SingleCard({ card, onCardChoice, difficulty = 1, isFlipped = false, isDisabled = false }) {
  function handleClick(ev) {
    if (!isDisabled) {
      onCardChoice(card);
    }
  }

  return (
    <figure className={isFlipped ? cn(styles["card"], styles["card--flipped"]) : styles["card"]}>
      <small>
        <sub>{card.image?.size > 0 ? card.image.size : card.src}</sub>
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
        src={card.image?.size > 0 ? URL.createObjectURL(card.image) : card.src}
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
        onClick={handleClick}
      />
    </figure>
  );
}
