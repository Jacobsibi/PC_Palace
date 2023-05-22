
import React from 'react';

import styles from '../styles/About.module.css';

const AboutPage = () => { return (
    <div style={{ textAlign: 'center' }}   className={styles.background} >
        <h1>About us</h1>

        <h4>Don't know how to build a PC? No problem! Just use our AI Computer Builder page and we'll sort it out.</h4>
        
        <br/ > <br/ >

    <div className={styles.div1} style={{ textAlign: 'left', padding: 20 }}>
    <h2>The basics</h2>
        <p style={{ textAlign: 'justify', align: 'right', padding: 40, paddingTop: 20, width: 900}}>
        At PC Palace, we are passionate about building the perfect computer. We know that every person has unique needs and preferences when it comes to their computer, and we strive to provide a personalized experience for each and every one of our customers. 
        Our team of computer experts has years of experience building custom PCs for gaming, productivity, creative work, and more. We use only the highest quality components and take great care in assembling each computer with precision and attention to detail.
        In addition to building custom computers, we also offer a wide range of computer parts and accessories. Whether you're looking to upgrade your graphics card, add more RAM, or get a new keyboard and mouse, we've got you covered.
        At PC Palace, we believe in providing our customers with the best possible experience. That's why we offer free shipping on all orders, a 30-day money-back guarantee, and dedicated customer support to help answer any questions you may have.
        Thank you for choosing PC Palace for all of your computer building needs. We look forward to helping you build the perfect computer!
        </p>
    </div>
    <img src={"/pcsmall.png"} styles={{}} className={styles.image} alt="pc image"/>

    <br/ ><br/ >
    <div className={styles.div2} style={{ textAlign: 'left', padding: 20 }}>

    <h2>More info</h2>    
    <p style={{ textAlign: 'justify', padding: 20}} >
    PC Palace is an ecommerce website that allows users to create custom PC builds and purchase the parts required for them.
     It also allows individual component purchasing if a user wants to upgrade their current PC or buy parts one at a time. Within
     the website there are several different pages that can be accessed by users including but not limited to: Home, PC builder, Hardware, 
     Peripherals, Specials, Brands, Support with more to come. The purpose of this website is to provide an alternative to other 
    PC builder websites that may run advertisements or add unnecessary costs on top of regular prices. We believe that building a PC shouldnt 
    be something made unnecessarily complicated so this website has been made to suggest the best parts on the market and help you build your
    next gaming rig. All images used are not owned by PC Palace. We do not claim ownership of any media shown on this site. 
    We have used these images for educational purposes only.</p> 
    </div>

    </div> )
}

export default AboutPage;



