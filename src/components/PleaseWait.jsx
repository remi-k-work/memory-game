// component css styles
import styles from "./PleaseWait.module.css";

export default function PleaseWait() {
  return (
    <aside className={styles["please-wait"]}>
      <dialog open>
        <h3>Please wait...</h3>
      </dialog>
    </aside>
  );
}
