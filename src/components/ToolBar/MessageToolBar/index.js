import React from 'react';
import classNames from 'classnames/bind';
import styles from './message-toolbar.module.scss';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const cx = classNames.bind(styles);

export default function index() {
    return (
        <div className={cx('message-toolbar')}>
            <h2>Nguyễn Văn Duy</h2>
            <div className={cx('toolbar')}>
                <LocalPhoneIcon />
                <VideocamIcon />
                <InfoOutlinedIcon />
            </div>
        </div>
    );
}
