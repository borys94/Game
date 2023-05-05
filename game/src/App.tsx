/* eslint-disable */
import React, { useEffect } from 'react'
import './App.css'
import Game from './game'
import EditorComponent from './components/Editor'
import 'normalize.css'

let game: Game | undefined

function App (): JSX.Element {
  useEffect(() => {
    if (!game) {
      game = new Game()
    }
  }, [])

  return (
    <div className="App">
      <canvas id="canvas" />
    </div>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <EditorComponent />
//     </div>
//   );
// }

export default App
/* eslint-enable */
