import React, { useEffect } from "react";
import "./App.css";
import EditorComponent from "./components/Editor";
import Editor from "./lib/editor";
import Game from "./game";
import "normalize.css";

let game: Game;

function App() {
  useEffect(() => {
    if (!game) {
      game = new Game();
    }
  }, []);

  return (
    <div className="App">
      <canvas id="canvas" />
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <EditorComponent />
//     </div>
//   );
// }

export default App;
