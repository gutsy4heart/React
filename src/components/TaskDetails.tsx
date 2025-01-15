import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const TaskDetails: React.FC<{ taskId: number }> = ({ taskId }) => {
    const task = useSelector((state: RootState) =>
        state.tasks.find((task) => task.id === taskId)
    );

    if (!task) return <div>Task not found</div>;

    return (
        <div>
            <h3>Task Details</h3>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Status: {task.completed ? 'Completed' : 'Uncompleted'}</p>
        </div>
    );
};

export default TaskDetails;
