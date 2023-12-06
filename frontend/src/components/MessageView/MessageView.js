import React from 'react';
import Message from '../Message';

import './MessageView.css';

const MessageView = ({ messages }) => {
    messages.sort((a, b) => a.unixTimestamp - b.unixTimestamp);

    return (
        <div className='message-view'>
            {messages.map((message, index) => (
                <Message key={index} {...message}/>
            ))}
        </div>
    )
}

export default MessageView;