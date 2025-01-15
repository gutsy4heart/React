import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../types';

const TaskEditForm: React.FC<{ taskId: number }> = ({ taskId }) => {
    const dispatch = useDispatch();
    const task = useSelector((state: RootState) =>
        state.tasks.find((task) => task.id === taskId)
    );

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task) {
            dispatch({
                type: 'EDIT_TASK',
                payload: { id: task.id, updates: { title, description } },
            });
            dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
            window.history.pushState(null, '', '/');
        }
    };

    const handleCancel = () => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
        window.history.pushState(null, '', '/');
    };

    if (!task) return <div>Task not found</div>;

    return (
        <div>
            <h3>Edit Task</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default TaskEditForm;
