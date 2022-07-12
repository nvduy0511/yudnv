import React from 'react';
import classNames from 'classnames/bind';
import styles from './friend-list-item.module.scss';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import messageSlice from '../../redux/messageSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function FriendListItem({ dataUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickItem = () => {
        dispatch(messageSlice.actions.selectFriend(dataUser));
        navigate('/');
    };

    return (
        <div className={cx('card')}>
            <input type="image" src={dataUser.photoURL} alt="photo" />
            <div className={cx('card-footer')}>
                <h3>{dataUser.displayName}</h3>

                <Button size="small" variant="contained" onClick={handleClickItem}>
                    Nhắn tin
                </Button>
            </div>
        </div>
    );
}
