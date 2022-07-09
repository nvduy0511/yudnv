import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './setting.module.scss';

import SettingsIcon from '@mui/icons-material/Settings';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Setting(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const id_timeout = setTimeout(() => {
            const user_local = JSON.parse(sessionStorage.getItem('user'));
            setUser(user_local);
        }, 100);
        return () => clearTimeout(id_timeout);
    }, []);

    const logOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                alert('SignOut Success');
                localStorage.clear();
                navigate('/');
            })
            .catch((error) => {
                alert('SignOut Fail');
            });
    };
    return (
        <div>
            <label htmlFor="nav-input" style={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon fontSize="30px" className={cx('setting-icon')} />
            </label>
            <input type={'checkbox'} hidden className={cx('nav-input')} id="nav-input"></input>
            <label htmlFor="nav-input" className={cx('overlay')} />

            <div className={cx('nav')}>
                <label htmlFor="nav-input">
                    <CloseOutlinedIcon
                        sx={{ position: 'absolute', top: '5px', right: '5px', color: '#000000ad', cursor: 'pointer' }}
                    />
                </label>

                <div className={cx('nav-user')}>
                    <Avatar
                        sx={{ width: '100px', height: '100px', border: 'solid 1px #c6c6da' }}
                        src={user && user.photoURL}
                    >
                        U
                    </Avatar>
                    <h6 style={{ margin: '12px 0 0', fontSize: '18px' }}>{user && user.displayName}</h6>
                </div>
                <ul className={cx('nav-list')}>
                    <label htmlFor="nav-input" className={cx('nav-item')}>
                        <PersonIcon />
                        <p>Thông tin cá nhân</p>
                    </label>
                    <label htmlFor="nav-input" className={cx('nav-item')}>
                        <GroupsIcon />
                        <p>Bạn bè</p>
                    </label>
                    <label htmlFor="nav-input" className={cx('nav-item')} onClick={logOut}>
                        <LogoutIcon />
                        <p>Đăng xuất</p>
                    </label>
                </ul>
            </div>
        </div>
    );
}

export default Setting;
