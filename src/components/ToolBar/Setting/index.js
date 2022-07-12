import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './setting.module.scss';

import SettingsIcon from '@mui/icons-material/Settings';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import InforUser from '../InforUser';
const cx = classNames.bind(styles);

function Setting(props) {
    const navigate = useNavigate();
    const [infoUserVisible, setInforUserVisible] = useState(false);

    const logOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                alert('SignOut Success');
                localStorage.clear();
                navigate('/login');
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
            <input
                type={'checkbox'}
                hidden
                className={cx('nav-input')}
                id="nav-input"
                onChange={() => setInforUserVisible((p) => !p)}
            ></input>
            <label htmlFor="nav-input" className={cx('overlay')} />

            <div className={cx('nav')}>
                <label htmlFor="nav-input">
                    <CloseOutlinedIcon
                        sx={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            color: '#000000ad',
                            cursor: 'pointer',
                        }}
                    />
                </label>
                {infoUserVisible && <InforUser />}
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
