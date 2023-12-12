// component css styles
import styles from "./CardGrid.module.css";

// other libraries
import cn from "classnames";

// components
import SingleCard from "./SingleCard";

// game context
import { useGameState } from "../js/GameContext";

export default function CardGrid() {
  const { cards, difficulty } = useGameState();

  return (
    <div
      className={
        difficulty === 1
          ? cn(styles["card-grid"], styles["card-grid--4x3"])
          : difficulty === 2
          ? cn(styles["card-grid"], styles["card-grid--6x5"])
          : cn(styles["card-grid"], styles["card-grid--8x7"])
      }
    >
      {cards.map((card) => {
        return <SingleCard key={card.id} card={card} />;
      })}
    </div>
  );
}
