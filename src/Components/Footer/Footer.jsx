import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
  return (
   <div className='footer-outer'>
    <div className='footer-cont'>
      <div className='logo-slogan'>
            <img src={logo} alt='logo-image' />
            <h5>Dil Ka Rasta BAWARCHI KHANA Se<span style={{fontSize:'1.5rem'}}>&hearts;</span></h5>
      </div>
      
      <div className='footer-links'> 
      <div className='footer-about'>
         <Link to='#'>ABOUT US</Link>
         <Link to='#'>CONTACT US</Link>
      </div>

      <div className='footer-support'>
         <Link to='#'>SUPPORT</Link>
         <Link to='#'>SERVICES</Link>
      </div>

      <div className='footer-faq'>
         <Link to='#'>FAQS</Link>
         <Link to='#'>SHOWCASE</Link>
      </div>
      </div>
    </div>
    <div className='line'></div>
      <div className='footer-social-links'>
      <a href="https://www.facebook.com/profile.php?id=100061879961906" target="_blank" rel="Facebook-Link">
          <FaFacebookF />
        </a>
        <a href="https://x.com/Sanjana0614" target="_blank" rel="Twitter-link">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/sanjana.sharma_1411/" target="_blank" rel="Instagram-link">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/sanjanasharma14/" target="_blank" rel="Linkedin-link">
          <FaLinkedinIn />
        </a>
      </div>
      <h4>Created and Designed by <Link to={"https://www.linkedin.com/in/sanjanasharma14/" }target="_blank" style={{textDecoration:"none"}}><span style={{fontSize:'1.27rem', color:'red'}}>Sanjana &hearts;</span></Link></h4>
       </div>
  )
}

export default Footer
