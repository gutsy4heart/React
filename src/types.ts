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
    currentPage: 'main' | 'details' | 'edit' | 'add';
    selectedTaskId: number | null;
    isAddingTask: boolean;
}

export interface Action {
    type: string;
    payload?: any;
}
