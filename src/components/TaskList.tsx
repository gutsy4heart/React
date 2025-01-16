import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, TaskListProps } from '../types';

const TaskList: React.FC<TaskListProps> = ({ viewTaskDetails, startEditingTask, startAddingTask }) => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const filter = useSelector((state: RootState) => state.filter);
    const searchQuery = useSelector((state: RootState) => state.searchQuery);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'uncompleted') return !task.completed;
        return true;
    });

    const searchedTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleTaskStatus = (taskId: number) => {
        dispatch({ type: 'TOGGLE_TASK', payload: taskId });
        window.history.pushState(null, '', '/');
    };

    const deleteTask = (taskId: number) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
        window.history.pushState(null, '', '/');
    };

    return (
        <div>
            <h2>Tasks</h2>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Search Tasks"
                    value={searchQuery}
                    onChange={(e) =>
                        dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
                    }
                />

                <button onClick={startAddingTask}>Add</button>
            </div>

            <select
                value={filter}
                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
            </select>

            <ul>
                {searchedTasks.map((task) => (
                    <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskStatus(task.id)}
                        />

                        <span
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => viewTaskDetails(task.id)}
                        >
                            {task.title}
                        </span>

                        <button onClick={() => startEditingTask(task.id)}>Edit</button>

                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
