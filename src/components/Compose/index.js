import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './compose.module.scss';
import { TextareaAutosize } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import messageApi from '../../apis/messageApi';
import store from '../../redux/store';
const cx = classNames.bind(styles);

export default function Compose({ idRoom }) {
    const editTextRef = useRef(null);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const user = store.getState().user.currentUser;
    const socket = store.getState().socket.socketCurrent;
    const sendMessageToServer = async (data) => {
        try {
            await messageApi.sendMessage(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickSendMessage = () => {
        const data = {
            conversation: idRoom,
            content: message,
            sender: user._id,
        };
        socket.emit('sendMessage', data);
        sendMessageToServer(data);
        setIsTyping(false);
        socket.emit('offTyping', idRoom);
        setMessage('');
        editTextRef.current.focus();

        // sendMessageToServer(data);
    };
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
        if (e.target.value && !isTyping) {
            setIsTyping(true);
            socket.emit('onTyping', idRoom);
        }
        if (!e.target.value && isTyping) {
            setIsTyping(false);
            socket.emit('offTyping', idRoom);
        }
    };
    return (
        <div className={cx('compose')}>
            <TextareaAutosize
                ref={editTextRef}
                onChange={handleChangeMessage}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.shiftKey === false) {
                        e.preventDefault();
                        handleClickSendMessage();
                    }
                }}
                value={message}
                placeholder="Nhập tin nhắn"
            />
            <div className={cx('compose-toolbar')}>
                <div onClick={handleClickSendMessage}>
                    <PanoramaIcon />
                </div>
                <MicIcon />
                <EmojiEmotionsIcon />
            </div>
        </div>
    );
}
