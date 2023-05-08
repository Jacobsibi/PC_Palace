
import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const AboutPage = () => { return (
    <div style={{ textAlign: 'center' }}    >
        <h2>About us</h2>

        <h4>How to build a PC: A PC is simply built by assembling the parts.</h4>
        <h4>To use the other pages in the website, simply click the links in the navigation bar a the top of the screen.</h4>
        <br/ > <br/ >

    <h4>The basics</h4>
        <p>At PC Palace, we are passionate about building the perfect computer. We know that every person has unique needs and preferences when it comes to their computer, and we strive to provide a personalized experience for each and every one of our customers.</p>
        <p>Our team of computer experts has years of experience building custom PCs for gaming, productivity, creative work, and more. We use only the highest quality components and take great care in assembling each computer with precision and attention to detail.</p>
        <p>In addition to building custom computers, we also offer a wide range of computer parts and accessories. Whether you're looking to upgrade your graphics card, add more RAM, or get a new keyboard and mouse, we've got you covered.</p>
        <p>At PC Palace, we believe in providing our customers with the best possible experience. That's why we offer free shipping on all orders, a 30-day money-back guarantee, and dedicated customer support to help answer any questions you may have.</p>
        <p>Thank you for choosing PC Palace for all of your computer building needs. We look forward to helping you build the perfect computer!</p>
        <br/ ><br/ >

    <h4>More info</h4>    
    <p>PC Palace is an ecommerce website that allows users to create custom PC builds and purchase the parts required for them.
     It also allows individual component purchasing if a user wants to upgrade their current PC or buy parts one at a time. Within
     the website there are several different pages that can be accessed by users including but not limited to: Home, PC builder, Hardware
     ,Peripherals, Specials, Brands, Support with more to come.</p><p>The purpose of this website is to provide an alternative to other 
    PC builder websites that may run advertisements or add unnecessary costs on top of regular prices. We believe that building a PC shouldnt 
    be something made unnecessarily complicated so this website has been made to suggest the best parts on the market and help you build your
    next gaming rig. All images used are not owned by PC Palace. We do not claim ownership of any media shown on this site. We have used these images for educational purposes only.</p> 
    
    </div> )
}

export default AboutPage;



