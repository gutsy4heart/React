import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux'; // Импортируем Provider из react-redux
import store from '@redux/store'; // Импорт Redux store
import App from './App';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error("Can't find root container");

const root = createRoot(rootContainer);

root.render(
    <StrictMode>
        <Provider store={store}> {/* Оборачиваем App в Provider */}
            <App />
        </Provider>
    </StrictMode>
);
