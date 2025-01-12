import React from 'react';
import { useTaskContext } from '../TaskContext';

const TaskDetails: React.FC<{ taskId: number | null }> = ({ taskId }) => {
    const { state } = useTaskContext();
    const task = state.tasks.find((t) => t.id === taskId);

    if (!task) return <div>Task not found</div>;

    return (
        <div className="task-details">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskDetails;
