import React from 'react';
import classNames from 'classnames/bind';
import Avatar from '@mui/material/Avatar';
import styles from './conversation-list-item.module.scss';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import messageSlice from '../../redux/messageSlice';
import conversationApi from '../../apis/conversationApi';
import store from '../../redux/store';

const cx = classNames.bind(styles);
export default function ConversationListItem({
    idUser,
    linkAvatar = 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/107966166_1172185269806218_4096158675165172194_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JgGjuMQjFQUAX-e4jMq&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8JsE_NKtnCuMyFAgCiTdUKaOHV7zzz_vpkSB8X5guAcA&oe=62ECC88A',
    name = 'Nguyễn Văn Duy',
    snippet = 'Nội dung tin nhắn của bạn ',
    data,
    isRead,
    isSelect,
}) {
    const dispatch = useDispatch();
    const handleClickItem = () => {
        const readConversation = async () => {
            try {
                const readMessage = {
                    idConversation: data._id,
                    idUser: idUser,
                };
                conversationApi.readConversation(readMessage);
                dispatch(messageSlice.actions.readConversation(readMessage));
                dispatch(messageSlice.actions.accessConversation(data));
            } catch (error) {
                console.log('Error when call Api readConversation', error);
            }
        };
        readConversation();
    };
    return (
        <div
            className={clsx(cx('conversation-item'), {
                [cx('conversation-item-unread')]: !isRead,
                [cx('is-select')]: isSelect,
            })}
            onClick={handleClickItem}
        >
            <Avatar src={linkAvatar} sx={{ width: '50px', height: '50px' }}>
                D
            </Avatar>
            <div className={cx('conversation-info')}>
                <h1 className={cx('conversation-name')}>{name}</h1>
                <span className={cx('conversation-snippet')}>{snippet}</span>
            </div>

            <div className={cx('conversation-unread')}>
                {!isRead && <div className={cx('dot')}></div>}
            </div>
        </div>
    );
}
