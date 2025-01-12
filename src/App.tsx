import React from 'react';
import { useTaskContext } from './TaskContext';
import TaskList from '@components/TaskList';
import TaskDetails from '@components/TaskDetails';
import TaskEditForm from '@components/TaskEditForm';

const App: React.FC = () => {
    const { state } = useTaskContext();

    return (
        <div className="app">
            <div className="main">
                {state.currentPage === 'main' && <TaskList />}
                {state.currentPage === 'details' && <TaskDetails taskId={state.selectedTaskId} />}
                {state.currentPage === 'edit' && <TaskEditForm taskId={state.selectedTaskId} />}
            </div>
        </div>
    );
};

export default App;