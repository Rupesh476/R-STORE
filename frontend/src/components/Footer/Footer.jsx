import React from 'react'
import "./Footer.css";
import { assets } from '../../assets/assets.js';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <h1 className='logo'>R STORE</h1>
                <p>I am a freelancer full-stack web developer . I make ecommerce app restaurant app and more . This is a demo project but i am learnig a lot by putting efforts on it and more.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+9749702549523</li>
                    <li>sahrupesh288@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 © R STORE - All Right Reserved </p>
    </div>
  )
}

export default Footer