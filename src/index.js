import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppTest from './App.test';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppTest />
        </PersistGate>
    </Provider>,
);
