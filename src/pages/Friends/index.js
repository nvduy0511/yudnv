import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './friends.module.scss';

import userApi from '../../apis/userApi';
import FriendList from '../../components/FriendList';
import SearchText from '../../components/ToolBar/SearchText';

const cx = classNames.bind(styles);
export default function Friends() {
    const [users, setUsers] = useState([]);
    const current_user = JSON.parse(sessionStorage.getItem('user'));
    useEffect(() => {
        const getData = async () => {
            const res = await userApi.getAllNotIcludeMe(current_user.uid);
            setUsers(res.data);
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
            <FriendList data={users} />
        </div>
    );
}
