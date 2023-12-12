// components
import ControlPanel from "./components/ControlPanel";
import CardGrid from "./components/CardGrid";

// game context
import { useGameState } from "./js/GameContext";

function App() {
  const { isPleaseWait } = useGameState();

  // *** TEST ***
  //testPixabay();
  // fetchAndSave();
  // *** TEST ***

  return (
    <>
      <header>
        <ControlPanel />
      </header>
      <main>
        {isPleaseWait ? (
          <dialog open>
            <p>Please wait...</p>
            <form method="dialog">
              <button>OK</button>
            </form>
          </dialog>
        ) : (
          <CardGrid />
        )}
      </main>
    </>
  );
}

export default App;
