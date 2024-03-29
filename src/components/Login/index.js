import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './login.module.scss';

import FirebaseUIAuth from 'react-firebaseui-localized';
import firebase, { uiConfig, firebaseApp } from '../../configs/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import userApi from '../../apis/userApi';
import userSlice from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const unRegisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const findOrCreateUser = async () => {
                    const user_req = {
                        _id: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                    };

                    try {
                        const res = await userApi.findOrCreate(user_req);
                        dispatch(userSlice.actions.login(res.data.user));
                    } catch (error) {
                        console.log(error);
                    }
                };
                findOrCreateUser();
                navigate('/');
            }
        });

        return () => unRegisterAuthObserver();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('container-login')}>
                <FirebaseUIAuth
                    lang="vi"
                    version="4.7.3"
                    config={uiConfig}
                    auth={firebaseApp.auth()}
                    firebase={firebase}
                />
            </div>
        </div>
    );
}
