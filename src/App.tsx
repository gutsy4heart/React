import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskEditForm from './components/TaskEditForm';
import { RootState } from './types';  // Путь к вашему типу состояния

const App: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.currentPage);
    const selectedTaskId = useSelector((state: RootState) => state.selectedTaskId);

    // Синхронизация состояния с URL
    useEffect(() => {
        const onPopState = () => {
            const path = window.location.pathname.split('/');
            const taskId = path[3]; // Получаем taskId, которое может быть undefined

            if (path[1] === 'tasks' && taskId) { // Проверка на наличие taskId
                if (path[2] === 'details' || path[2] === 'edit') {
                    dispatch({ type: 'NAVIGATE', payload: { page: path[2], taskId: parseInt(taskId, 10) } });
                }
            } else {
                dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
            }
        };

        // Слушаем события изменения истории браузера
        window.addEventListener('popstate', onPopState);

        // Проверка URL при монтировании компонента
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

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {/* Левая часть: список задач */}
            <div style={{ flex: 1, maxWidth: '400px' }}>
                {currentPage === 'main' && <TaskList viewTaskDetails={viewTaskDetails} startEditingTask={startEditingTask} />}
            </div>

            {/* Правая часть: окно деталей или редактирования задачи */}
            <div style={{ flex: 1 }}>
                {currentPage === 'details' && selectedTaskId && <TaskDetails taskId={selectedTaskId} />}
                {currentPage === 'edit' && selectedTaskId && <TaskEditForm taskId={selectedTaskId} />}
            </div>
        </div>
    );
};

export default App;
