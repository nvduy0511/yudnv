import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './message.module.scss';
import ConversationList from '../../components/ConversationList';
import MessageList from '../../components/MessageList';
import firebase from '../../configs/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import userApi from '../../apis/userApi';
import userSlice from '../../redux/userSlice';
import store from '../../redux/store';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

export default function Messenger() {
    const socket = store.getState().socket.socketCurrent;
    const currentUser = store.getState().user.currentUser;
    const navigate = useNavigate();
    useEffect(() => {
        const unRegisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                socket.emit('joinRoom', currentUser._id);
            } else {
                navigate('/login');
            }
        });

        return () => {
            unRegisterAuthObserver();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
