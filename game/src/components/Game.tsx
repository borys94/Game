import React, { useEffect, useState } from 'react'
import Game from '../game'
import { Link } from 'react-router-dom'

function GameCmp (): React.ReactElement {
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    if (game == null) {
      const game = new Game()
      setGame(game)
      ;(window as any).game = game
    }

    return () => {
      game?.destroy()
    }
  }, [])

  return (
    <div className="App">
      <canvas id="canvas" />
      <button onClick={() => game?.sounds.toogle()}>Sound</button>
      <Link to="editor">Editor</Link>
    </div>
  )
}

export default GameCmp
