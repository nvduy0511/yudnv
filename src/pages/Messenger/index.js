import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './message.module.scss';
import ConversationList from '../../components/ConversationList';
import MessageList from '../../components/MessageList';

const cx = classNames.bind(styles);

export default function Messenger() {
    return (
        <div className={cx('container')}>
            <div className={cx('conversation-list')}>
                <ConversationList />
            </div>
            <div className={cx('message-list')}>
                <MessageList />
            </div>
        </div>
    );
}
