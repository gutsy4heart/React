import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Task } from '../types';

interface TaskEditFormProps {
    taskId: number | null;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ taskId }) => {
    const dispatch = useDispatch();

    const task = useSelector((state: RootState) =>
        state.tasks.find((t: Task) => t.id === taskId)
    );

    // Handle the case where the task might not be found
    if (!task) {
        return <div>Task not found</div>;
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
            <button onClick={saveTask}>Save</button>
            <button onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'main' } })}>
                Cancel
            </button>
        </div>
    );
};

export default TaskEditForm;
