import React from 'react';
import classNames from 'classnames/bind';
import styles from './conversation-toolbar.module.scss';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Setting from '../Setting';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function ConversationToolBar() {
    const navigate = useNavigate();

    return (
        <div className={cx('container')}>
            <Setting className={cx('container-icon')} />
            <h2>Tin nhắn</h2>
            <div onClick={() => navigate('/friends')}>
                <AddCircleOutlineIcon className={cx('container-icon')} />
            </div>
        </div>
    );
}
