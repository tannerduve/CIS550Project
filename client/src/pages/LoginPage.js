import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from './favicon.ico';
const config = require('../config.json');

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://${config.server_host}:${config.server_port}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });
      console.log(response);
      console.log(username);
      console.log(password);
  
      if (response && response.ok) {
        window.sessionStorage.setItem("username", username);
        navigate('/home');
      } else {
        const error = await response.text();
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to fetch');
    }
  };

  return (
    <Container maxWidth="xs">
      <p></p>
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}> 
        {<img style={{ width: 300, height: 300 }} src={logo} alt={''}/>}
      </div>
      <p></p>
      <Typography variant="h3" fontFamily='serif' align="center">
        Login
      </Typography>
      {error && (
        <Typography variant="body1" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
      <p>
        Don't have an account? 
        <NavLink to={`/signup`}> Sign up here</NavLink>
      </p>
    </Container>
  );
}