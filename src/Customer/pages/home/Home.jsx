// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import News from '../../newsLetter/News';
import Instapic from '../../Dashbord/Instapic';
import Testimonial from '../../Dashbord/Testimonial';
import Event from '../../Dashbord/Event';
import Smabout from '../../Dashbord/Smabout';
import Hero from '../../Dashbord/Hero';
import Smblogs from '../../Dashbord/Smblogs';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  
  return (
    <div>
      <Hero />
      <Smabout />
      <Event />
      {/* <Testimonial/> */}
      <Instapic />
      {/* <Smblogs /> */}
    </div>
  );
}

export default Home
