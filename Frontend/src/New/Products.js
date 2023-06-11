import React, { useEffect } from 'react';
import './Products.css';
import leftImage from './reading.png';
import rightImage from './pen.png';
import Aos from 'aos';

function ProductPage() {
  useEffect(() => {
    Aos.init({duration: 500});
  }, []);

  useEffect(() => {
    Aos.refresh(); // Refresh AOS when the component updates (e.g., when navigating to this page)
  });
  return (
    <div className="page">
      <div className="left-side">
        <img data-aos="fade-up"  src={leftImage} alt="Left Image" className="image1" />
        <h2 data-aos="fade-up"  className='left-title'>Left Content</h2>
        <p  >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tortor neque.
          In iaculis eros justo, id consequat nisl condimentum non.
        </p>
      </div>
      <div className="right-side">
        <img data-aos="fade-up"  src={rightImage} alt="Right Image" className="image2" />
        <h2 data-aos="fade-up" >Right Content</h2>
        <p >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec tortor neque.
          In iaculis eros justo, id consequat nisl condimentum non.
        </p>
      </div>
    </div>
  );
}

export default ProductPage;
