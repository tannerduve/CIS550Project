import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function SignupPage() {

    // useEffect(() => {
    //     fetch(`http://${config.server_host}:${config.server_port}/user`)
    //       .then(res => res.json())
    //       .then(resJson => setUsername(username))
    //       .then(resJson => setPassword(password));
    // }, []);
     
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('username:', username);
        console.log('password:', password);
        // You can add your login logic here
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Log In</button>
        </form>
    );

}