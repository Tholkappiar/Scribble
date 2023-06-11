import React, { useEffect } from 'react';
import './About.css';
import Aos from 'aos';

function About() {
  useEffect(() => {
    Aos.init({ duration: 1700 });
  }, []);

  useEffect(() => {
    Aos.refresh(); // Refresh AOS when the component updates (e.g., when navigating to this page)
  });
  return (
    <div className="About">
      <header className="About-header">
        <div className="content">
          <h1 className='about-title' data-aos="fade-up">About Us</h1>
          <p data-aos="fade-up">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper elit vel enim ullamcorper, vitae sodales urna accumsan.</p>
        </div>
      </header>
    </div>
  );
}

export default About;
