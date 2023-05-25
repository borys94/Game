import React, { useEffect } from 'react'
import styles from './Game.module.scss'
import { Button, IconButton } from './common/Button'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../store'
import { initGame, toggleSound, unpause } from '../store/game'
import Game from '../game'
import Sounds from '../game/sounds'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'

function GameCmp(): React.ReactElement {
  const paused = useSelector((state: RootState) => state.game.paused)
  const game = useSelector((state: RootState) => state.game.instance)
  const loadedAssets = useSelector((state: RootState) => state.game.loadedAssets)
  const sound = useSelector((state: RootState) => state.game.sound)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const play = () => {
    if (!game) {
      dispatch(initGame({ game: new Game() }))
    } else {
      dispatch(unpause())
    }
  }

  useEffect(() => {
    if (paused) {
      Sounds.playMenu()
      Sounds.stopBackground()
    } else {
      Sounds.stopMenu()
      Sounds.playBackground()
    }
  }, [paused])

  const handleToogleSound = () => {
    Sounds.toogle()
    Sounds.playMenu()
    dispatch(toggleSound())
  }

  const goToEditor = () => {
    navigate('editor')
  }

  const openFullscreen = () => {
    document.documentElement.requestFullscreen()
  }

  return (
    <div className={styles.gameWrapper}>
      <div className={styles.canvas}>
        <canvas id="canvas" width="400" height="400" />
        {/* {game && !loadedAssets && <span className={styles.loadingLabel}>Loading</span>} */}
      </div>
      {/* TODO: usuwanie menu  */}
      <div className={paused ? styles.menuWrapper : styles.hiddenMenu}>
        <div className={styles.menuBackground} style={{ backgroundImage: 'url("menuBackground.png")' }} />
        {/* {paused && <div className={styles.backgroundContent} />} */}
        {/* </div> */}
        <div className={styles.overlay} />
        <div className={styles.menu}>
          <Button variant="primary" onClick={play}>
            PLAY
          </Button>
          <Button variant="secondary" onClick={goToEditor}>
            MAP EDITOR
          </Button>

          {/* TODO */}
          <Button variant="secondary">SETTINGS</Button>
          <Button variant="secondary">HELP</Button>

          <div className={styles.bottomBar}>
            <IconButton onClick={handleToogleSound}>
              <img src={`assets/volume${sound ? '' : '-slash'}.svg`} alt="volume" />
            </IconButton>
            {/* <IconButton>
              <img src='icons/gear.svg' />
            </IconButton> */}

            <a href="https://github.com/borys94/Game" target="_blank">
              <IconButton>
                <img src="icons/github.svg" />
              </IconButton>
            </a>
            <IconButton onClick={openFullscreen}>
              <img src="assets/fullscreen.svg" />
            </IconButton>
          </div>

          <div className={styles.levels}>
            <div className={styles.card}>
              <div className={styles.levelsWrapper}>
                <div className={styles.level}>
                  <div>LEVEL 1</div>
                  <div>98%</div>
                  <div>PLAY</div>
                </div>
                <div className={styles.level}>
                  <div>LEVEL 2</div>
                  <div>21%</div>
                  <div>PLAY</div>
                </div>
                <div className={styles.level}>
                  <div>LEVEL 3</div>
                  {/* <div>21%</div> */}
                  <div>PLAY</div>
                </div>
                {new Array(7).fill(0).map((a, index) => (
                  <div key={index} className={classnames(styles.level, styles.disabledLevel)}>
                    <div>LEVEL {index + 4}</div>
                    <div>PLAY</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCmp
