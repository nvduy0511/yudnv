import React, { useState, useEffect } from 'react';
import ConversationTollbar from '../ToolBar/ConversationToolBar';
import ConversationListItem from '../ConversationListItem';
import classNames from 'classnames/bind';
import styles from './conversation-list.module.scss';
import SearchText from '../ToolBar/SearchText';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import conversationApi from '../../apis/conversationApi';
const cx = classNames.bind(styles);

export default function ConversationList() {
    const [conversation, setConversation] = useState([]);
    const currentUser = useSelector((state) => state.user.currentUser);
    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await conversationApi.getAllByIdUser(currentUser._id);
                setConversation(res.data);
            } catch (error) {
                console.log('Error call api get Conversation, ', error);
            }
        };
        getConversation();
    }, [currentUser]);

    const renderConversation = () => {
        return conversation.map((item, index) => {
            let user_conversation;
            item.users.some((item) => {
                if (item._id !== currentUser._id) user_conversation = item;
                return item._id !== currentUser._id;
            });
            return (
                <ConversationListItem
                    key={index}
                    linkAvatar={user_conversation.photoURL}
                    name={user_conversation.displayName}
                    snippet={item.latestMessage}
                    data={item}
                />
            );
        });
    };
    return (
        <div className={cx('container')}>
            <ConversationTollbar />
            <SearchText placeholder="Tìm kiếm tin nhắn" />
            <div className={cx('conversation-item')}>
                {conversation && renderConversation()}
                {/* <ConversationListItem
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
                /> */}
            </div>
        </div>
    );
}
