import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './message.module.scss';
import ConversationList from '../../components/ConversationList';
import MessageList from '../../components/MessageList';
import firebase from '../../configs/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import userApi from '../../apis/userApi';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function Messenger() {
    const socket = useSelector((state) => state.socket.socketCurrent);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('message', (data) => {
            console.log(`message from ${data.idRoom}: ${data.message}`);
        });

        const unRegisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const findOrCreateUser = async () => {
                    const user_req = {
                        _id: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                    };

                    try {
                        const res = await userApi.findOrCreate(user_req);
                        localStorage.setItem('user', JSON.stringify(res.data.user));

                        socket.emit('joinRoom', res.data.user._id);
                    } catch (error) {
                        console.log(error);
                    }
                };
                findOrCreateUser();
            } else {
                navigate('/login');
            }
        });

        //socket connect

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
