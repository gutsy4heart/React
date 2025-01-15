import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';

interface TaskListProps {
    viewTaskDetails: (taskId: number) => void;
    startEditingTask: (taskId: number) => void;
    startAddingTask: () => void; // Новый пропс для добавления задачи
}

const TaskList: React.FC<TaskListProps> = ({ viewTaskDetails, startEditingTask, startAddingTask }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const filter = useSelector((state: RootState) => state.filter);
    const searchQuery = useSelector((state: RootState) => state.searchQuery);

    // Фильтрация задач
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'uncompleted') return !task.completed;
        return true;
    });

    // Поиск задач
    const searchedTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleTaskStatus = (taskId: number) => {
        dispatch({ type: 'TOGGLE_TASK', payload: taskId });
        window.history.pushState(null, '', '/'); // Возвращаемся на главную страницу
    };

    const deleteTask = (taskId: number) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
        window.history.pushState(null, '', '/'); // Возвращаемся на главную страницу
    };

    return (
        <div>
            <h2>Tasks</h2>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* Поле для поиска */}
                <input
                    type="text"
                    placeholder="Search Tasks"
                    value={searchQuery}
                    onChange={(e) =>
                        dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
                    }
                />

                {/* Кнопка "Добавить задачу" */}
                <button onClick={startAddingTask}>Add Task</button>
            </div>

            {/* Выпадающий список фильтра */}
            <select
                value={filter}
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
            </select>

            {/* Список задач */}
            <ul>
                {searchedTasks.map((task) => (
                    <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Чекбокс для изменения статуса */}
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskStatus(task.id)}
                        />

                        {/* Название задачи */}
                        <span
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => viewTaskDetails(task.id)}
                        >
                            {task.title}
                        </span>

                        {/* Кнопка "Редактировать" */}
                        <button onClick={() => startEditingTask(task.id)}>Edit</button>

                        {/* Кнопка "Удалить" */}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
