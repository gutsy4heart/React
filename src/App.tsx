import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from '@components/TaskList';
import TaskDetails from '@components/TaskDetails';
import TaskEditForm from '@components/TaskEditForm';
import AddTask from '@components/AddTask'; // Новый компонент для добавления задач
import { RootState } from './types';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.currentPage);
    const selectedTaskId = useSelector((state: RootState) => state.selectedTaskId);

    useEffect(() => {
        const onPopState = () => {
            const path = window.location.pathname.split('/');
            if (path[1] === 'tasks') {
                const taskId = path[3] ? parseInt(path[3], 10) : null;
                if (taskId && (path[2] === 'details' || path[2] === 'edit')) {
                    dispatch({ type: 'NAVIGATE', payload: { page: path[2], taskId } });
                } else if (path[2] === 'add') {
                    dispatch({ type: 'NAVIGATE', payload: { page: 'add', taskId: null } });
                } else {
                    dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
                }
            } else {
                dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
            }
        };

        window.addEventListener('popstate', onPopState);
        onPopState();

        return () => {
            window.removeEventListener('popstate', onPopState);
        };
    }, [dispatch]);

    const viewTaskDetails = (taskId: number) => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'details', taskId } });
        window.history.pushState(null, '', `/tasks/details/${taskId}`);
    };

    const startEditingTask = (taskId: number) => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'edit', taskId } });
        window.history.pushState(null, '', `/tasks/edit/${taskId}`);
    };

    const startAddingTask = () => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'add', taskId: null } });
        window.history.pushState(null, '', '/tasks/add');
    };
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, maxWidth: '400px' }}>
                <TaskList
                    viewTaskDetails={viewTaskDetails}
                    startEditingTask={startEditingTask}
                    startAddingTask={startAddingTask}
                />
            </div>
            <div style={{ flex: 1 }}>
                {currentPage === 'details' && selectedTaskId && <TaskDetails taskId={selectedTaskId} />}
                {currentPage === 'edit' && selectedTaskId && <TaskEditForm taskId={selectedTaskId} />}
                {currentPage === 'add' && <AddTask />}
            </div>
        </div>
    );
};

export default App;
