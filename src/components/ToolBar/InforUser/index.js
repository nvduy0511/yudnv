import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';

export default function InforUser() {
    const [user, setUser] = useState({});
    useEffect(() => {
        const user_local = JSON.parse(localStorage.getItem('user'));
        setUser(user_local);
    }, []);

    return (
        <div>
            <Avatar
                sx={{ width: '100px', height: '100px', border: 'solid 1px #c6c6da' }}
                src={user && user.photoURL}
            >
                U
            </Avatar>
            <h6 style={{ margin: '12px 0 0', fontSize: '18px' }}>{user && user.displayName}</h6>
        </div>
    );
}
