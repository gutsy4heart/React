export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export interface RootState {
    tasks: Task[];
    filter: 'all' | 'completed' | 'uncompleted';
    searchQuery: string;
    currentPage: string;
    selectedTaskId: number | null;
}

export type Action =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'TOGGLE_TASK'; payload: number }
    | { type: 'EDIT_TASK'; payload: { id: number; updates: Partial<Task> } }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'SET_FILTER'; payload: 'all' | 'completed' | 'uncompleted' }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'NAVIGATE'; payload: { page: string; taskId?: number } };
