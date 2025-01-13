import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import TaskList from '@components/TaskList';
import TaskEditForm from '@components/TaskEditForm';

const App: React.FC = () => {
    const currentPage = useSelector((state: RootState) => state.currentPage);

    return (
        <div className="app">
            {currentPage === 'main' && <TaskList />}
            {currentPage === 'edit' && <TaskEditForm />}
        </div>
    );
};

export default App;
