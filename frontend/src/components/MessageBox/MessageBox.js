import { React, useState } from "react";
import './MessageBox.css';

const MessageBox = ({ sendMessage }) => {
    const [messageText, setMessageText] = useState('');

    const handleMessageChange = (e) => {
        setMessageText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            senderUsername: "User",
            unixTimestamp: Date.now(),
            messageText: messageText
        };
        sendMessage(JSON.stringify(message));
        setMessageText('');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                rows={1}
                value={messageText}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter your message..."
            />
            <button type="submit">Send</button>
        </form>
    )
}

export default MessageBox;