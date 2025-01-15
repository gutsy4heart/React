import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksReducer'; // Убедитесь, что путь верный
import { RootState } from '../types';

const saveToLocalStorage = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasksState', serializedState);
    } catch (e) {
        console.error('Could not save state to localStorage:', e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('tasksState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState) as RootState;
    } catch (e) {
        console.error('Could not load state from localStorage:', e);
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
    reducer: tasksReducer,
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;

export type AppDispatch = typeof store.dispatch;
