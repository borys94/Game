import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type Game from '../game'

interface GameStore {
  instance: Game | null
  paused: boolean
  loadedAssets: boolean
  sound: boolean
}

interface InitGameAction {
  game: Game
}

export const gameStore = createSlice({
  name: 'game',
  initialState: {
    instance: null,
    paused: true,
    loadedAssets: false,
    sound: false
  },
  reducers: {
    initGame: (state: GameStore, action: PayloadAction<InitGameAction>) => {
      state.instance = action.payload.game
      state.instance.setupListeners()
      state.instance.sounds.active = state.sound

      state.paused = state.instance.paused
    },
    unpause: (state: GameStore, action: PayloadAction<void>) => {
      if (!state.instance) {
        throw new Error('No game instance')
      }
      state.paused = false
      state.instance.paused = false
    },
    pause: (state: GameStore, action: PayloadAction<void>) => {
      if (!state.instance) {
        throw new Error('No game instance')
      }
      state.paused = true
      state.instance.paused = true
    },
    setLoadedAssets: (state: GameStore, action: PayloadAction<void>) => {
      state.loadedAssets = true
    },
    toggleSound: (state: GameStore, action: PayloadAction<void>) => {
      state.sound = !state.sound
    }
  }
})

export const { initGame, unpause, pause, setLoadedAssets, toggleSound } = gameStore.actions

export default gameStore.reducer
