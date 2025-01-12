
import { createStore } from 'redux';
import {tasksReducer} from './tasksReducer';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasks', serializedState);
    } catch (e) {
        console.error('Could not save state', e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('tasks');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error('Could not load state', e);
        return undefined;
    }
};

const persistedState = loadFromLocalStorage();

const store = createStore(tasksReducer, persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;