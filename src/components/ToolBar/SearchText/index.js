import React from 'react';
import classNames from 'classnames/bind';
import styles from './conversation-search.module.scss';

const cx = classNames.bind(styles);

export default function SearchText({ placeholder = '', sx = {} }) {
    return (
        <div className={cx('conversation-search')} style={sx}>
            <input type="search" placeholder={placeholder} />
        </div>
    );
}
