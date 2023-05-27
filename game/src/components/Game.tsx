import React, { useEffect, useState } from 'react'
import styles from './Game.module.scss'
import { Button, IconButton } from './common/Button'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../store'
import { initGame, toggleSound, unpause } from '../store/game'
import Game from '../game'
import Sounds from '../game/sounds'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import classnames from 'classnames'
import Card from './common/Card/Card'
import HelpModal from './HelpModal'
import mapStore from '../game/mapStore'
import Map from '../game/map/map'
import sounds from '../game/sounds'

function GameCmp(): React.ReactElement {
  const [helpOpen, setHelpOpen] = useState(false)
  const [game, setGame] = useState<Game>()
  const [paused, setPaused] = useState(true)
  const [sound, setSound] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams()
  const mapName = searchParams.get('mapName')

  const play = () => {
    if (!game) {
      return
    }
    game.paused = false
    setPaused(false)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        game.paused = !game.paused
        setPaused(game.paused)
      }
    }
    window.addEventListener('keydown', onKeyDown)

    const game = new Game()
    ;(window as any).game = game
    setGame(game)
    setSound(sounds.active)
    return () => {
      game.destroy()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (mapName && game) {
      game.map = new Map(game, mapStore.getMapByName(mapName)?.map!)
      play()
    }
  }, [game, mapName])

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
    setSound(sounds.active)
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
          <Button variant="primary" onClick={goToEditor}>
            MAP EDITOR
          </Button>

          {/* TODO */}
          <Button variant="primary">SETTINGS</Button>
          <Button variant="primary" onClick={() => setHelpOpen(true)}>
            HELP
          </Button>

          <div className={styles.bottomBar}>
            <IconButton onClick={handleToogleSound}>
              <img src={`assets/volume${sounds.active ? '' : '-slash'}.svg`} alt="volume" />
            </IconButton>

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
            <Card>
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
            </Card>
          </div>
        </div>
      </div>

      <HelpModal open={helpOpen} handleClose={() => setHelpOpen(false)} />
    </div>
  )
}

export default GameCmp
