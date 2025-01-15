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
        case 'NAVIGATE': {
            console.log('Navigating to page:', action.payload.page, 'Task ID:', action.payload.taskId);
            return {
                ...state,
                currentPage: action.payload.page,
                selectedTaskId: action.payload.taskId ?? null,
            };
        }
        case 'EDIT_TASK': {
            const { id, updates } = action.payload;
            console.log('Editing task:', id, 'Updates:', updates);
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, ...updates } : task
                ),
            };
        }
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };
        case 'DELETE_TASK': {
            const taskId = action.payload;
            console.log('Deleting task:', taskId);
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== taskId),
            };
        }
        default:
            return state;
    }
};
