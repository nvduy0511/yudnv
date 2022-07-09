import React from 'react';
import classNames from 'classnames/bind';
import Avatar from '@mui/material/Avatar';
import styles from './conversation-list-item.module.scss';

const cx = classNames.bind(styles);
export default function ConversationListItem({
    linkAvatar = 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/107966166_1172185269806218_4096158675165172194_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JgGjuMQjFQUAX-e4jMq&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8JsE_NKtnCuMyFAgCiTdUKaOHV7zzz_vpkSB8X5guAcA&oe=62ECC88A',
    name = 'Nguyễn Văn Duy',
    snippet = 'Nội dung tin nhắn của bạn ',
}) {
    return (
        <div className={cx('conversation-item')}>
            <Avatar src={linkAvatar} sx={{ width: '50px', height: '50px' }}>
                D
            </Avatar>
            <div className={cx('conversation-info')}>
                <h1 className={cx('conversation-name')}>{name}</h1>
                <span className={cx('conversation-snippet')}>{snippet}</span>
            </div>
        </div>
    );
}
