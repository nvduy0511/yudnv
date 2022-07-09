import React from 'react';
import classNames from 'classnames/bind';
import styles from './friend-list.module.scss';
import FriendListItem from '../FriendListItem';

const cx = classNames.bind(styles);
export default function FriendList({ data }) {
    const renderData = () => {
        return data.map((item, index) => {
            return <FriendListItem key={index} photoURL={item.photoURL} displayName={item.displayName} />;
        });
    };

    return <div className={cx('list-friend')}>{renderData()}</div>;
}
