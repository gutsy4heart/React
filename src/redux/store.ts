import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counter from './slices/counterSlice';

const rootReducer = combineReducers({
    counter,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;