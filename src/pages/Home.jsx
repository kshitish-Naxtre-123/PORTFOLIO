import React from 'react';
import { ComplexNavbar } from '../components/Navbar';
import LandingPage from './Hero/LandingPage';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
const Home = () => {
  return (
   <>
   <ComplexNavbar/>
   <LandingPage/>
   <ContactForm/>
   {/* <Footer/> */}
   </>
  );
}

export default Home;
