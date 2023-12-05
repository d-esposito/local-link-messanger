import { React, createContext, useState } from 'react';

const UsernameContext = createContext();

const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('llm-username') ?? 'NewUser');

    const setNewUsername = (newUsername) => {
        setUsername(newUsername);
    }

    return (
        <UsernameContext.Provider value={{ username, setNewUsername }}>
            {children}
        </UsernameContext.Provider>
    )
}

export { UsernameProvider, UsernameContext };