// TaskContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { RootState, Action } from './types';

const initialState: RootState = {
    tasks: [],
    filter: 'all',
    searchQuery: '',
    currentPage: 'main',
    selectedTaskId: null,
};

const TaskContext = createContext<{
    state: RootState;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const tasksReducer = (state: RootState, action: Action): RootState => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload.updates }
                        : task
                ),
            };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'NAVIGATE':
            return {
                ...state,
                currentPage: action.payload.page,
                selectedTaskId: action.payload.taskId || null,
            };
        default:
            return state;
    }
};

interface TaskProviderProps {
    children: ReactNode; // Define the type of children
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, initialState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
