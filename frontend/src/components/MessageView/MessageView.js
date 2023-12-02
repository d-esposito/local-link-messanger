import React from 'react';
import Message from '../Message';

import './MessageView.css';

const MessageView = ({ messages }) => {
    return (
        <div className='message-view'>
            {messages.map((message, index) => (
                <Message key={index} {...message}/>
            ))}
        </div>
    )
}

export default MessageView;