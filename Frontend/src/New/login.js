// Login.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logo.png';
import loginImg from './login.png';

function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = () => {
    return fetch('http://localhost:8080/login/get')
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const authenticate = (e) => {
    e.preventDefault();

    const userCheck = user.find((user) => user.username === username && user.password === password);

    if (username.length === 0) {
      setErrorMessage('Enter Username');
    } else if (password.length === 0) {
      setErrorMessage('Enter password');
    } else if (!userCheck) {
      setErrorMessage('Invalid credentials');
    } else {
      nav('/dashboard');
    }
  };

  useEffect(() => {
    const navbar = document.querySelector('.navbar');

    const changeNavbarColor = () => {
      if (window.scrollY > 600) {
        navbar.classList.add('scroll');
      } else {
        navbar.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', changeNavbarColor);

    return () => {
      window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []);

  return (
    <div className="login-container">
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
            <Link to="/signup">
              <button className="nav-link">Signup</button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="login-image">
        <img src={loginImg} alt="Login Image" />
      </div>
      <div className="login-form">
        <div className="container">
          <div className="header">
            <h1>Scribble Shop</h1>
            <p>Enter Credentials For Login</p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form>
            <div className="input">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="input">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <input onClick={authenticate} className="login-btn" type="submit" value="LOGIN" />
          </form>
          <Link to="/Signup">
            <p>No Account? Signup Now!</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
