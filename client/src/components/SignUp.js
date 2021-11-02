import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

function SignUp({ setCurrentUser }) {
    const history = useHistory()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch("/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        }),
      })
      .then(res => {
        if (res.ok) {
          res.json().then(gym => {
            setCurrentUser(gym)
            history.push('/members')
          })
        } else {
          res.json().then(errors => {
            console.error(errors)
          })
        }
      })
    }
  
    return (
      <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <button type="submit">Submit</button>
          <p><Link to="/">LogIn</Link></p>
      </form>
    );
  } 

  export default SignUp;