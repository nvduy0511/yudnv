import React from 'react';
import classNames from 'classnames/bind';
import styles from './message-list.module.scss';
import MessageToolbar from '../ToolBar/MessageToolBar';
import MessageListItem from '../MessageListItem';
import Compose from '../Compose';
const cx = classNames.bind(styles);
export default function index() {
    return (
        <div className={cx('message-list')}>
            <div className={cx('message-toolbar')}>
                <MessageToolbar />
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
                <Compose />
            </div>
        </div>
    );
}
