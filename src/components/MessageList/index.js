import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './message-list.module.scss';
import MessageToolbar from '../ToolBar/MessageToolBar';
import MessageListItem from '../MessageListItem';
import Compose from '../Compose';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

export default function MessageList() {
    const friendSelect = useSelector((state) => state.message.friendSelect);
    const [user, setUser] = useState({});
    const [idRoom, setIdRoom] = useState('');

    useEffect(() => {
        if (Object.keys(friendSelect).length === 0) {
            setUser({
                displayName: 'Unknow ...',
            });
        } else {
            setIdRoom(friendSelect._id);
            setUser(friendSelect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [friendSelect]);
    console.log('idRoom MessageList', idRoom);
    return (
        <div className={cx('message-list')}>
            <div className={cx('message-toolbar')}>
                <MessageToolbar displayNameReceiver={user && user.displayName} />
            </div>
            <div className={cx('message-content')}>
                <MessageListItem startsSequence />
                <MessageListItem endsSequence />
                <MessageListItem isMine startsSequence />
                <MessageListItem isMine isSequence />
                <MessageListItem isMine endsSequence />
                <MessageListItem isSingle />
                <MessageListItem isSingle isMine />
            </div>
            <div className={cx('message-compose')}>
                <Compose idRoom={idRoom} />
            </div>
        </div>
    );
}
