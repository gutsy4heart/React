import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';

interface TaskListProps {
    viewTaskDetails: (taskId: number) => void;
    startEditingTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ viewTaskDetails, startEditingTask }) => {
    const dispatch = useDispatch(); // Исправление: используем dispatch
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

    return (
        <div>
            <h2>Tasks</h2>

            {/* Поле для поиска */}
            <input
                type="text"
                placeholder="Search Tasks"
                value={searchQuery}
                onChange={(e) =>
                    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value }) // Исправление: используем dispatch
                }
            />

            {/* Выпадающий список фильтра */}
            <select
                value={filter}
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })} // Исправление: используем dispatch
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
            </select>

            {/* Список задач */}
            <ul>
                {searchedTasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => viewTaskDetails(task.id)}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => startEditingTask(task.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
