import React, { useContext } from 'react';
import { UsernameContext } from '../../contexts/UsernameContext';
import './Message.css';

function getDatetimeStringFromUnixMillis(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

function stringToColor(seedString) {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = (hash % 360 + 360) % 360;
    return `hsl(${hue}, 30%, 60%)`;
}

const Message = ({ senderUsername, unixTimestamp, messageText }) => {
    const { username } = useContext(UsernameContext);
    const sentFromCurrentUser = username === senderUsername;
    const backgroundHexColorCode = stringToColor(senderUsername);

    return (
        <div
            className={
                'message'+
                (sentFromCurrentUser ? ' current-user' : '')
            }
            style={{'background': backgroundHexColorCode}}
        >
            <p className='message-text'>{messageText}</p>
            <div className='message-info'>
                <p>{senderUsername}</p>
                <p>{getDatetimeStringFromUnixMillis(unixTimestamp)}</p>
            </div>
        </div>
    )
}

export default Message