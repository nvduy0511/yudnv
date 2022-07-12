import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './compose.module.scss';
import { TextareaAutosize } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function Compose({ idRoom }) {
    const [message, setMessage] = useState('');
    const socket = useSelector((state) => state.socket.socketCurrent);
    const handleClickSendMessage = () => {
        socket.emit('sendMessage', {
            idRoom: idRoom,
            message: message,
        });
    };
    return (
        <div className={cx('compose')}>
            <TextareaAutosize
                onChange={(e) => setMessage(e.target.value)}
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
