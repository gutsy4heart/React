import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import { TaskProvider } from './TaskContext';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error("Can't find root container");

const root = createRoot(rootContainer);

root.render(
    <StrictMode>
        <TaskProvider>
            <App />
        </TaskProvider>
    </StrictMode>
);
