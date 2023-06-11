import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import './Signup.css';
import signupimg from './MobileSignup.png';
import logo from './logo.png';

function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConPassword] = useState('');

  const senddb = (e) => {
    e.preventDefault();
    const details = { age, email, name, password, username };

    if (age.length === 0 || email.length === 0 || password.length === 0 || name.length === 0 || username.length === 0) {
      alert('Enter all fields');
    } else if (!validator.isEmail(email)) {
      alert('Enter a valid email!');
    } else if (password !== conpassword) {
      alert('Password and Confirm Password must be the same!');
    } else {
      fetch('http://localhost:8080/signup/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      })
        .then(() => {
          console.log('New Detail Added');
          console.log(JSON.stringify(details));
          console.log(e);
          nav('/');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="body">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img alt="logo" src={logo} style={{ width: '50px' }} />
            <span className="logo-name">Scribble</span>
          </Link>
          <div className="nav-links">
            <Link to="/">
              <button className="nav-link">Home</button>
            </Link>
            <Link to="/login">
              <button className="nav-link">Login</button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="signup-container">
        <div className="image-container">
          <img src={signupimg} alt="Signup" />
        </div>
        <div className="form-container">
          <div className="signup-form">
            <div className="signupcontainer">
              <div className="header">
                <h1>Create an Account</h1>
                <p>Get started for free!</p>
              </div>
              <form>
                <div className="input">
                  <i className="fa-solid fa-user"></i>
                  <input id='signup-name' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="input">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    id='signup-username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div className="input">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="input">
                  <i className="fa-solid fa-envelope"></i>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
                </div>
                <div className="input">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="input">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    onChange={(e) => setConPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                </div>
                <input className="signup-btn" onClick={senddb} type="submit" value="SIGN UP" />
              </form>
              <Link to="/Login">
                <p>Already have an account? Sign in</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
