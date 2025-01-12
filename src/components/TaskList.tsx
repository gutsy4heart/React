import React, { useState } from 'react';
import { useTaskContext } from '../TaskContext';
import { Task } from '../types';

const TaskList: React.FC = () => {
    const { state, dispatch } = useTaskContext();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const filteredTasks: Task[] =
        state.filter === 'all'
            ? state.tasks
            : state.filter === 'completed'
                ? state.tasks.filter((task) => task.completed)
                : state.tasks.filter((task) => !task.completed);

    const searchedTasks: Task[] = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase())
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

    const navigateTo = (page: string, taskId?: number) => {
        dispatch({ type: 'NAVIGATE', payload: { page, taskId } });
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
                    value={state.searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div>
                <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
                    Show All
                </button>
                <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
                    Show Completed
                </button>
                <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'uncompleted' })}>
                    Show Uncompleted
                </button>
            </div>
            <ul>
                {searchedTasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                        />
                        <span onClick={() => navigateTo('details', task.id)}>{task.title}</span>
                        <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
                            Delete
                        </button>
                        <button onClick={() => navigateTo('edit', task.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
