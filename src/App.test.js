import React, { useEffect } from 'react';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Messenger from './pages/Messenger';
import Friends from './pages/Friends';
import './App.css';
import socketIOClient from 'socket.io-client';
import { useDispatch } from 'react-redux';
import socketSlice from './redux/socketSlice';
const host = 'http://localhost:3001';

const socket = socketIOClient.connect(host);

export default function AppTest() {
    const dispatch = useDispatch();

    dispatch(socketSlice.actions.connect(socket));

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Messenger socket={socket} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/friends" element={<Friends />} />
            </Routes>
        </BrowserRouter>
    );
}
