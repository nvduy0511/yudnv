import React from 'react';
import classNames from 'classnames/bind';
import styles from './notify.module.scss';

import Avatar from '@mui/material/Avatar';

const cx = classNames.bind(styles);

export default function Notify({
    message = 'Xin chào bạn!',
    userName = 'Nguyễn Văn Duy',
    avatarUrl,
}) {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <Avatar src={avatarUrl} sx={{ width: 50, height: 50 }}>
                    D
                </Avatar>
                <div className={cx('content-message')}>
                    <p>{userName}</p>
                    <div>{message}</div>
                </div>
            </div>
            <div className={cx('control')}>
                <span>Ẩn</span>
            </div>
        </div>
    );
}
