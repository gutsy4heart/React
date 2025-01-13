import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from '@redux/store';
import App from './App';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error("Can't find root container");

const root = createRoot(rootContainer);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
