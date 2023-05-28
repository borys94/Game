import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MessageStore {
  message: string | null
}

export const infoBarStore = createSlice({
  name: 'infoBar',
  initialState: {
    message: null
  },
  reducers: {
    addMessage: (state: MessageStore, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    deleteMessage: (state: MessageStore) => {
      state.message = null
    }
  }
})

export const { addMessage, deleteMessage } = infoBarStore.actions

export default infoBarStore.reducer
