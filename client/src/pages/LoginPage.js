import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //const history = useHistory();
  const config = require('../config.json');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', data.username);
        setSuccessMessage("Login successful!");
        // history.push('/');
        
      } else {
       setLoginError('Invalid username or password');
        // const errorResponse = await response.json();
        // setLoginError(errorResponse.error);
        // console.log('Error:', errorResponse.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Login</button>
      {loginError && <p>{loginError}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}

export default LoginPage;