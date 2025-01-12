import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksReducer';

const store = configureStore({
    reducer: tasksReducer, // Or combine reducers here if you have multiple slices
});

export default store;

// Export types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
