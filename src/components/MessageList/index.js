import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './message-list.module.scss';
import MessageToolbar from '../ToolBar/MessageToolBar';
import MessageListItem from '../MessageListItem';
import Compose from '../Compose';
import { useSelector } from 'react-redux';
import messageApi from '../../apis/messageApi';
import store from '../../redux/store';
import Lottie from 'react-lottie';
import animationData from '../../animation/typing.json';
import CircularProgress from '@mui/material/CircularProgress';

const cx = classNames.bind(styles);

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

const LIMIT = 20;

export default function MessageList() {
    const socket = store.getState().socket.socketCurrent;
    const currentUser = useSelector((state) => state.user.currentUser);
    const conversationSelect = useSelector((state) => state.message.conversationSelect);
    const [nameConversation, setNameConversation] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [userConversation, setUserConversation] = useState([]);
    const messageContentRef = useRef(null);
    const [page, setPage] = useState(1);
    const [isPageChange, setIsPageChange] = useState(false);
    const scrollToBottom = (behavior) => {
        messageContentRef.current?.scrollIntoView({ behavior: behavior });
    };

    useEffect(() => {
        if (!isPageChange) {
            scrollToBottom('smooth');
        } else {
            setIsPageChange(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTyping, messages]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await messageApi.getAllByIdRoom(conversationSelect._id, LIMIT, page);
                setMessages((p) => [...res.data.reverse(), ...p]);
            } catch (error) {
                console.log('Error when call API get messages in MessageList!');
            }
        };
        getMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const listener = (data) => {
            setMessages((message) => [...message, data]);
        };
        socket.on('message', listener);

        const onTyping = () => {
            console.log('onTyping');
            setIsTyping(true);
        };
        const offTyping = () => {
            console.log('offTyping');
            setIsTyping(false);
        };
        socket.on('onTyping', onTyping);
        socket.on('offTyping', offTyping);

        if (Object.keys(conversationSelect).length === 0) {
            setNameConversation('Chọn tin nhắn');
        } else {
            //check room or create room
            socket.emit('joinRoom', conversationSelect._id);
            conversationSelect.users.some((item) => {
                if (item._id !== currentUser._id) setNameConversation(item.displayName);
                return item._id !== currentUser._id;
            });

            const userConversation = [];
            for (const item of conversationSelect.users) {
                if (item._id !== currentUser._id) userConversation.push(item._id);
            }
            setUserConversation(userConversation);
        }
        scrollToBottom('smooth');

        return () => {
            setPage(1);
            socket.off('message', listener);
            socket.off('onTyping', onTyping);
            socket.off('offTyping', offTyping);
            setIsTyping(false);
            socket.emit('leaveRoom', conversationSelect._id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationSelect]);

    const renderMessage = () => {
        const render = messages.map((item, index, elements) => {
            const isMine = item.sender === currentUser._id;
            const itemNext = elements[index + 1];
            const itemPre = elements[index - 1];
            let startsSequence = false;
            let isSingle = false;
            let endsSequence = false;

            if (itemPre) {
                if (item.sender !== itemPre.sender) {
                    startsSequence = true;
                }
            } else if (!itemPre && itemNext) {
                if (item.sender === itemNext.sender) startsSequence = true;
            }

            if (itemNext) {
                if (item.sender !== itemNext.sender) {
                    startsSequence = false;
                    isSingle = true;
                    if (itemPre && item.sender === itemPre.sender) {
                        endsSequence = true;
                        isSingle = false;
                    }
                }
            } else {
                if (startsSequence) isSingle = true;
            }
            return (
                <MessageListItem
                    key={index + item.content}
                    isMine={isMine}
                    endsSequence={endsSequence}
                    startsSequence={startsSequence}
                    isSingle={isSingle}
                    content={item.content}
                />
            );
        });
        return render;
    };
    const handleScrollTop = (e) => {
        let element = e.target;
        if (element.scrollTop === 0) {
            setPage((p) => p + 1);
            setIsPageChange(true);
            element.scrollTop = 2;
        }
    };

    return (
        <div className={cx('message-list')}>
            <div className={cx('message-toolbar')}>
                <MessageToolbar displayNameReceiver={nameConversation} />
            </div>
            <div className={cx('message-content')} onScroll={handleScrollTop}>
                {isPageChange && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size="20px" />
                    </div>
                )}
                {renderMessage()}
                {isTyping && (
                    <div style={{ height: '40px' }}>
                        <Lottie
                            options={defaultOptions}
                            width={70}
                            style={{ margin: 0, marginLeft: -10 }}
                        />
                    </div>
                )}
                <div ref={messageContentRef}></div>
            </div>
            <div className={cx('message-compose')}>
                <Compose
                    idRoom={conversationSelect && conversationSelect._id}
                    userConversation={userConversation}
                />
            </div>
        </div>
    );
}
