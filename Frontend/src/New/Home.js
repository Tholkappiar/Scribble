import React, { useEffect } from 'react';
import './Home.css';
import { Outlet, Link, Navigate } from 'react-router-dom';
import About from './About';
import logo from './logo.png';
import Move from './Move';
import ProductPage from './Products';
import Typewriter from "typewriter-effect";

function Home() {
  const handleLogin = () => {
    
  };

  const handleSignup = () => {
    Navigate('/Signup');
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
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo">
              <img alt="logo" src={logo} style={{ width: '50px' }} />
              <span className="logo-name">Scribble</span>
            </Link>
            <div className="nav-links">
            <Link to="/login"><button onClick={handleLogin} className="nav-link">
                Login
              </button></Link>
              <Link to="/signup"><button onClick={handleSignup} className="nav-link">
                Signup
              </button></Link>
            </div>
          </div>
        </nav>
        <div className="content">
          <h1 className='logo-page-name'><Typewriter onInit={(typewriter) => {typewriter
         .typeString("Scribble Station")
         .pauseFor(1000)
         .deleteAll()
         .typeString("Welcomes You")
         .start();}} /></h1>
        </div>
      </header>
      <Outlet />
      <Move/>
      <About/>
      <ProductPage/>
    </div>
  );
}

export default Home;
