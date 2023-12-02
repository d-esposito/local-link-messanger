import React from 'react';

import './Message.css';

const Message = ({ senderUsername, unixTimestamp, messageText }) => {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    const timestamp = `${year}-${month}-${day} ${hour}:${minute}`;

    return (
        <div className='message'>
            <p className='message-text'>{messageText}</p>
            <div className='message-info'>
                <p>{senderUsername}</p>
                <p>{timestamp}</p>
            </div>
        </div>
    )
}

export default Message