import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/store';
import { Task } from '../types';

const TaskList: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const filter = useSelector((state: RootState) => state.filter);
    const searchQuery = useSelector((state: RootState) => state.searchQuery);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const filteredTasks: Task[] =
        filter === 'all'
            ? tasks
            : filter === 'completed'
                ? tasks.filter((task) => task.completed)
                : tasks.filter((task) => !task.completed);

    const searchedTasks: Task[] = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addTask = () => {
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            completed: false,
        };
        dispatch({ type: 'ADD_TASK', payload: newTask });
        setTitle('');
        setDescription('');
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
    };

    const toggleTask = (taskId: number) => {
        dispatch({ type: 'TOGGLE_TASK', payload: taskId });
    };

    const deleteTask = (taskId: number) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    };

    const setFilter = (filterType: string) => {
        dispatch({ type: 'SET_FILTER', payload: filterType });
    };

    return (
        <div className="task-list">
            <div>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search Tasks"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div>
                <button onClick={() => setFilter('all')}>Show All</button>
                <button onClick={() => setFilter('completed')}>Show Completed</button>
                <button onClick={() => setFilter('uncompleted')}>Show Uncompleted</button>
            </div>
            <ul>
                {searchedTasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span>{task.title}</span>

                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
