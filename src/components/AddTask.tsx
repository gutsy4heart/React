import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddTask: React.FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveTask = () => {
        if (!title.trim()) {
            alert('Task title cannot be empty.');
            return;
        }

        dispatch({
            type: 'ADD_TASK',
            payload: {
                id: Date.now(),
                title,
                description,
                completed: false,
            },
        });

        // Возвращаемся на главную страницу после добавления задачи
        dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
        window.history.pushState(null, '', '/');
    };

    const cancelTask = () => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
        window.history.pushState(null, '', '/');
    };

    return (
        <div>
            <h2>Add Task</h2>
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
            <div>
                <button onClick={saveTask}>Save</button>
                <button onClick={cancelTask}>Cancel</button>
            </div>
        </div>
    );
};

export default AddTask;
