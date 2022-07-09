import React from 'react';
import ConversationTollbar from '../ToolBar/ConversationToolBar';
import ConversationListItem from '../ConversationListItem';
import classNames from 'classnames/bind';
import styles from './conversation-list.module.scss';
import SearchText from '../ToolBar/SearchText';
const cx = classNames.bind(styles);

export default function ConversationList() {
    return (
        <div className={cx('container')}>
            <ConversationTollbar />
            <SearchText placeholder="Tìm kiếm tin nhắn" />
            <div className={cx('conversation-item')}>
                <ConversationListItem
                    linkAvatar="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    name="Bùi Thái"
                    snippet="Rất vui được gặp bạn!"
                />
                <ConversationListItem
                    linkAvatar="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/121168892_1034374453677753_8054252095271796378_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=54r2m9ZVpE0AX8n22sk&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_4W5kLdjI7oF-nlrpu3xYs-vlzb82SJFJRHOvPS_iWZA&oe=62EB596C"
                    name="Hồng Hường"
                    snippet="Hello hân hạnh được làm quen"
                />
                <ConversationListItem />
                <ConversationListItem
                    linkAvatar="https://cdnmedia.thethaovanhoa.vn/Upload/O5NP4aFt6GVwE7JTFAOaA/files/2022/06/son-tung-mtp-va-hai-tu%20(1).jpg"
                    name="Sơn Tùng"
                    snippet="Alo bạn đang làm gì đó?"
                />
            </div>
        </div>
    );
}
