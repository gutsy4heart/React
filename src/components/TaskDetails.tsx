import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../types';


const TaskDetails: React.FC<{ taskId: number }> = ({ taskId }) => {
    const dispatch = useDispatch();
    const task = useSelector((state: RootState) =>
        state.tasks.find((task) => task.id === taskId)
    );
    const handleCancel = () => {
        dispatch({ type: 'NAVIGATE', payload: { page: 'main', taskId: null } });
        window.history.pushState(null, '', '/');
    };

    if (!task) return <div>Task not found</div>;

    return (
        <div className={'task-details'}>
            <h3>Task Details</h3>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Status: {task.completed ? 'Completed' : 'Uncompleted'}</p>
            <strong>Created At:</strong> {new Date(task.id).toLocaleString()}
            <br/>
            <button type='submit' onClick={handleCancel}>Close</button>
        </div>
    );
};

export default TaskDetails;
