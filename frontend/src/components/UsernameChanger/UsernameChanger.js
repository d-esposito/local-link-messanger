import React, { useContext } from 'react';
import { UsernameContext } from '../../contexts/UsernameContext';
import './UsernameChanger.css';

const UsernameChanger = () => {
    const { username, setNewUsername } = useContext(UsernameContext);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
        localStorage.setItem('llm-username', e.target.value);
    }

    return (
        <textarea 
            className='username-changer'
            rows={1}
            value={username}
            onChange={handleUsernameChange}
            spellCheck={false}
        />
    )
}

export default UsernameChanger;