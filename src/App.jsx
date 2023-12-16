// components
import ControlPanel from "./components/ControlPanel";
import CardGrid from "./components/CardGrid";
import PleaseWait from "./components/PleaseWait";

// game context
import { useGameState } from "./js/GameContext";

function App() {
  const { isPleaseWait } = useGameState();

  return (
    <>
      <div className="main-grid">
        <header>
          <ControlPanel />
        </header>
        <main>
          <CardGrid />
        </main>
        <footer>
          <small>Free images courtesy of</small>
          <a href="https://pixabay.com/" target="_blank">
            <img src="/pixabay.svg" width={94} alt="Free Images" />
          </a>
        </footer>
      </div>
      {isPleaseWait && <PleaseWait />}
    </>
  );
}

export default App;
