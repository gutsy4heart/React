import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error('Can\'t find root container');

const root = createRoot(rootContainer);

root.render(
    <Provider store={store}>
        <StrictMode>
            <App/>
        </StrictMode>
    </Provider>
)