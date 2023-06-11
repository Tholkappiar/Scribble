import React, { useEffect } from 'react';
import './Move.css';
import { Outlet, Link } from 'react-router-dom';
import firstimg from './first.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Move() {
  useEffect(() => {
    Aos.init({ duration: 1700 });
  }, []);

  useEffect(() => {
    Aos.refresh(); // Refresh AOS when the component updates (e.g., when navigating to this page)
  });

  return (
    <div className="App">
      <div className="page" data-aos="fade-up">
        <div data-aos="fade-up" className="left">
          <img alt="image" src={firstimg} className="moving-image" />
        </div>
        <div className="right">
          <h2 data-aos="fade-up">Welcome to Scribble Station</h2>
          <div data-aos="fade-up">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tortor neque. In iaculis eros justo,
              id consequat nisl condimentum non. Integer sed odio sit amet mauris suscipit gravida eget eu metus. Duis
              non urna consequat, aliquam nisl et, vehicula purus.
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Move;
