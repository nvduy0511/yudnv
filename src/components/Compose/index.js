import React from 'react';
import classNames from 'classnames/bind';
import styles from './compose.module.scss';
import { TextareaAutosize } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const cx = classNames.bind(styles);

export default function Compose() {
    return (
        <div className={cx('compose')}>
            <TextareaAutosize placeholder="Nhập tin nhắn" />
            <div className={cx('compose-toolbar')}>
                <PanoramaIcon />
                <MicIcon />
                <EmojiEmotionsIcon />
            </div>
        </div>
    );
}
