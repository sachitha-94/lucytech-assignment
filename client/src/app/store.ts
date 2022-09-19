import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import homeSlice from 'features/home/homeSlice'

export const store = configureStore({
  reducer: {
    home: homeSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void | never> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
