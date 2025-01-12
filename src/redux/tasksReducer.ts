import { RootState, Action } from '../types';

const initialState: RootState = {
    tasks: [],
    filter: 'all',
    searchQuery: '',
    currentPage: 'main',
    selectedTaskId: null,
};

export const tasksReducer = (state: RootState = initialState, action: Action): RootState => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload,
            };
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload,
            };
        case 'NAVIGATE':
            return {
                ...state,
                currentPage: action.payload.page,
                selectedTaskId: action.payload.taskId ?? null,
            };
        default:
            return state;
    }
};
