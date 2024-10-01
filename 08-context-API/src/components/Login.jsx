import React, { useContext, useState } from 'react'
import UserContext from '../contexts/userContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        setUser({ username, password });
    }

    if (user) return <div></div>

    return (
        <div>
            <h2>Login</h2>
            <input type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='username' />
            {" "}
            <input type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password' />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
