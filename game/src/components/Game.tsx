import React, { useRef } from 'react'
import styles from './Game.module.scss'
import { Button } from './common/Button'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../store'
import { initGame, toggleSound, unpause } from '../store/game'
import Game from '../game'
import Sounds from '../game/sounds'
import { useNavigate } from 'react-router-dom'

function GameCmp (): React.ReactElement {
  const paused = useSelector((state: RootState) => state.game.paused)
  const game = useSelector((state: RootState) => state.game.instance)
  const loadedAssets = useSelector((state: RootState) => state.game.loadedAssets)
  const sound = useSelector((state: RootState) => state.game.sound)
  const sounds = useRef(new Sounds())
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const play = () => {
    if (!game) {
      dispatch(initGame({ game: new Game(sounds.current) }))
    } else {
      dispatch(unpause())
    }
  }

  const handleToogleSound = () => {
    sounds.current.toogle()
    sounds.current.play()
    dispatch(toggleSound())
  }

  const goToEditor = () => {
    navigate('editor')
  }

  const openFullscreen = () => {
    document.documentElement.requestFullscreen()
  }

  return (
    <>
      <div className={styles.canvas}>
        <canvas id="canvas" width="400" height="400" />
        {game && !loadedAssets && <span className={styles.loadingLabel}>Loading</span>}
        <div className={paused ? styles.menuWrapper : styles.hiddenMenu}>
          <div className={styles.overlay} />
          <div className={styles.menu}>
            <Button onClick={play}>Play</Button>
            <Button onClick={goToEditor}>Map Editor</Button>
            
            {/* TODO */}
            {/* <Button>Help</Button> */}
            <div className={styles.soundIcon}>
              <img src={`assets/volume${sound ? '' : '-slash'}.svg`} width="32" onClick={handleToogleSound} />
            </div>
          </div>
        </div>
      </div>
      {paused && (
        <div className={styles.fullscreenWrapper}>
          <img src={`assets/fullscreen.svg`} width="32" onClick={openFullscreen} />
        </div>
      )}
    </>
  )
}

export default GameCmp
