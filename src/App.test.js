import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Messenger from './pages/Messenger';
import Friends from './pages/Friends';
import './App.css';

export default function AppTest() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/message" element={<Messenger />} />
                <Route path="/friends" element={<Friends />} />
            </Routes>
        </BrowserRouter>
    );
}
