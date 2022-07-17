import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './message.module.scss';
import ConversationList from '../../components/ConversationList';
import MessageList from '../../components/MessageList';
import firebase from '../../configs/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import store from '../../redux/store';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
const cx = classNames.bind(styles);

const TOAST_LIMIT = 3;

export default function Messenger() {
    const socket = store.getState().socket.socketCurrent;
    const currentUser = store.getState().user.currentUser;
    const { toasts } = useToasterStore();
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

    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= TOAST_LIMIT)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    return (
        <div className={cx('container')}>
            <div className={cx('conversation-list')}>
                <ConversationList />
            </div>
            <div className={cx('message-list')}>
                <MessageList />
            </div>
            <Toaster position="bottom-left" reverseOrder={false} />
        </div>
    );
}
