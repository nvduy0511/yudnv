import React from 'react';
import classNames from 'classnames/bind';
import styles from './message-list-item.module.scss';
import clsx from 'clsx';
// import clsx from 'clsx';
const cx = classNames.bind(styles);

export default function MessageListItem({
    isMine = false,
    startsSequence = false,
    endsSequence = false,
    isSingle = false,
}) {
    return (
        <div
            className={clsx(cx('message'), {
                [cx('mine')]: isMine,
                [cx('start')]: startsSequence,
                [cx('end')]: endsSequence,
                [cx('single')]: isSingle,
            })}
        >
            {/* {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>} */}

            <div className={cx('bubble-container')}>
                <div className={cx('bubble')}>
                    Hello world! This is a long message that will hopefully get wrapped by our message bubble component!
                    We will see how well it works.
                </div>
            </div>
        </div>
    );
}
