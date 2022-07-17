import React, { useEffect } from 'react';
import ConversationTollbar from '../ToolBar/ConversationToolBar';
import ConversationListItem from '../ConversationListItem';
import classNames from 'classnames/bind';
import styles from './conversation-list.module.scss';
import SearchText from '../ToolBar/SearchText';
import { useSelector, useDispatch } from 'react-redux';
import conversationApi from '../../apis/conversationApi';
import messageSlice from '../../redux/messageSlice';
import userApi from '../../apis/userApi';
import store from '../../redux/store';
import Notify from '../../components/Notify';
import toast from 'react-hot-toast';
const cx = classNames.bind(styles);

export default function ConversationList() {
    const dispatch = useDispatch();
    const socket = store.getState().socket.socketCurrent;
    const currentUser = useSelector((state) => state.user.currentUser);
    const conversation = useSelector((state) => state.message.conversation);
    const conversationSelect = useSelector((state) => state.message.conversationSelect);

    const getConversation = async () => {
        console.log('------------init conversation -------------');
        try {
            const res = await conversationApi.getAllByIdUser(currentUser._id);
            dispatch(messageSlice.actions.initConversation(res.data));
        } catch (error) {
            console.log('Error call api get Conversation, ', error);
        }
    };

    useEffect(() => {
        const notify = (data) => {
            const fetchInforUser = async () => {
                try {
                    const res = await userApi.getOne(data.sender);
                    console.log('Fetch Data User');
                    if (data.conversation !== store.getState().message.conversationSelect._id)
                        toast.custom(
                            <Notify
                                userName={res.data.displayName}
                                message={data.content}
                                avatarUrl={res.data.photoURL}
                            />,
                        );
                } catch (error) {
                    console.log('Error fetch userApi', error);
                }
            };

            const conversationRead = {
                idConversation: store.getState().message.conversationSelect._id,
                idUser: store.getState().user.currentUser._id,
            };

            dispatch(
                messageSlice.actions.newMessageInConversation({
                    ...data,
                    ...conversationRead,
                }),
            );
            conversationApi.readConversation(conversationRead);
            fetchInforUser();
        };

        socket.on('notify', notify);
        getConversation();

        return () => {
            socket.off('notify', notify);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderConversation = () => {
        return conversation.map((item, index) => {
            let user_conversation;
            let isRead = false;
            item.users.some((i) => {
                if (i._id !== currentUser._id) user_conversation = i;
                return i._id !== currentUser._id;
            });

            for (const element of item.readBy) {
                if (element === currentUser._id) {
                    isRead = true;
                }
            }
            return (
                <ConversationListItem
                    idUser={currentUser._id}
                    key={index}
                    linkAvatar={user_conversation.photoURL}
                    name={user_conversation.displayName}
                    snippet={item.latestMessage}
                    data={item}
                    isRead={isRead}
                    isSelect={item._id === conversationSelect._id}
                />
            );
        });
    };
    console.log('re-render conversation List');
    return (
        <div className={cx('container')}>
            <ConversationTollbar />
            <SearchText placeholder="Tìm kiếm tin nhắn" />
            <div className={cx('conversation-item')}>{conversation && renderConversation()}</div>
        </div>
    );
}
