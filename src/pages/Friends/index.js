import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './friends.module.scss';

import userApi from '../../apis/userApi';
import FriendList from '../../components/FriendList';
import SearchText from '../../components/ToolBar/SearchText';
import store from '../../redux/store';

const cx = classNames.bind(styles);
export default function Friends() {
    const [friends, setFriends] = useState([]);
    const current_user = store.getState().user.currentUser;
    useEffect(() => {
        const getData = async () => {
            const res = await userApi.getAllNotIcludeMe(current_user._id);
            setFriends(res.data);
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h2>Gợi ý bạn bè</h2>
                <SearchText placeholder="Nhập tên tìm kiếm" />
            </div>
            <FriendList data={friends} />
        </div>
    );
}
