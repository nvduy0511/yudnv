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

const cx = classNames.bind(styles);

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

export default function MessageList() {
    const socket = store.getState().socket.socketCurrent;
    const currentUser = useSelector((state) => state.user.currentUser);
    const conversationSelect = useSelector((state) => state.message.conversationSelect);
    const [nameConversation, setNameConversation] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [userConversation, setUserConversation] = useState([]);
    const messageContentRef = useRef(null);

    const scrollToBottom = (behavior) => {
        messageContentRef.current?.scrollIntoView({ behavior: behavior });
    };

    useEffect(() => {
        const listener = (data) => {
            console.log(
                `message from ${data.conversation}: ${data.content}, sender: ${data.sender}`,
            );
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

            const getMessages = async () => {
                try {
                    const res = await messageApi.getAllByIdRoom(conversationSelect._id);
                    setMessages(res.data);
                } catch (error) {
                    console.log('Error when call API get messages in MessageList!');
                }
            };
            getMessages();
        }

        return () => {
            socket.off('message', listener);
            socket.off('onTyping', onTyping);
            socket.off('offTyping', offTyping);
            socket.emit('leaveRoom', conversationSelect._id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversationSelect]);

    useEffect(() => {
        scrollToBottom('smooth');
    }, [messages, isTyping]);

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
                    key={index}
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
    return (
        <div className={cx('message-list')}>
            <div className={cx('message-toolbar')}>
                <MessageToolbar displayNameReceiver={nameConversation} />
            </div>
            <div className={cx('message-content')}>
                {/* <MessageListItem startsSequence />
                <MessageListItem endsSequence />
                <MessageListItem isMine startsSequence />
                <MessageListItem isMine isSequence />
                <MessageListItem isMine endsSequence />
                <MessageListItem isSingle />
                <MessageListItem isSingle isMine /> */}
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
