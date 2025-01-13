import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Task } from '../types';

const TaskEditForm: React.FC = () => {
    const dispatch = useDispatch();
    const taskId = useSelector((state: RootState) => state.selectedTaskId);

    const task = useSelector((state: RootState) =>
        state.tasks.find((t: Task) => t.id === taskId)
    );

    if (!taskId || !task) {
        return (
            <div>
                <p>Task not found or no task selected</p>
                <button onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'main' } })}>
                    Go Back
                </button>
            </div>
        );
    }

    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description);

    const saveTask = () => {
        dispatch({
            type: 'EDIT_TASK',
            payload: {
                id: task.id,
                updates: { title, description },
            },
        });
        dispatch({ type: 'NAVIGATE', payload: { page: 'main' } });
    };

    return (
        <div className="task-edit-form">
            <h2>Edit Task</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
            ></textarea>
            <div>
                <button onClick={saveTask}>Save</button>
                <button onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'main' } })}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TaskEditForm;
