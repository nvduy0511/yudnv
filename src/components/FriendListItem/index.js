import React from 'react';
import classNames from 'classnames/bind';
import styles from './friend-list-item.module.scss';
import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

export default function FriendListItem({
    photoURL = 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/289891396_1478054955947928_7410442007537109820_n.jpg?stp=cp1_dst-jpg_p480x480&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=_FFVD6rgnaIAX_XZ2GV&tn=Z6H23MzZOJs4vNuF&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8ixTgIBg8tBIoVCTFi_EbdtMSvpUpzKLRbSurYDXalcg&oe=62CD98EB',
    displayName = 'Nguyễn Văn Duy',
}) {
    return (
        <div className={cx('card')}>
            <input type="image" src={photoURL} alt="photo" />
            <div className={cx('card-footer')}>
                <h3>{displayName}</h3>
                <Button size="small" variant="contained">
                    Nhắn tin
                </Button>
            </div>
        </div>
    );
}
