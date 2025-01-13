import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/store';
import { Task } from '../types';

const TaskList: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);
    const filter = useSelector((state: RootState) => state.filter);
    const searchQuery = useSelector((state: RootState) => state.searchQuery);
    const selectedTaskId = useSelector((state: RootState) => state.selectedTaskId);

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

    const selectTask = (taskId: number) => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId } });
    };

    const editTask = (taskId: number) => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'edit', taskId } });
    };

    const deleteTask = (taskId: number) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
    };

    const selectedTask = tasks.find((task) => task.id === selectedTaskId);

    return (
        <div className="task-container" style={{ display: 'flex', gap: '20px' }}>
            {/* Левая сторона */}
            <div className="task-list" style={{ flex: 1 }}>
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
                        onChange={(e) =>
                            dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
                        }
                    />
                </div>
                <ul>
                    {searchedTasks.map((task) => (
                        <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span onClick={() => selectTask(task.id)} style={{ cursor: 'pointer' }}>
                                {task.title}
                            </span>
                            <div>
                                <button onClick={() => editTask(task.id)}>Edit</button>
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Правая сторона */}
            <div className="task-details" style={{ flex: 1 }}>
                {selectedTask ? (
                    <div>
                        <h2>Task Details</h2>
                        <p>
                            <strong>Title:</strong> {selectedTask.title}
                        </p>
                        <p>
                            <strong>Description:</strong> {selectedTask.description}
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(selectedTask.id).toLocaleString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a task to view details</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;