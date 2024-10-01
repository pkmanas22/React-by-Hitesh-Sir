import React, { useContext } from 'react'
import UserContext from '../contexts/userContext'

export default function Profile() {
    const { user } = useContext(UserContext);

    if (!user) return <div>Please login first</div>

    return ( 
        <div>Welcome Mr. {user.username}</div>
    )
}
