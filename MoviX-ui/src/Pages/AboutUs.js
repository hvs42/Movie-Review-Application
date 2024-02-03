import React from 'react'
import { Container } from 'reactstrap'
import "../Static/Styles/AboutUs.css"
import Footer from '../Components/Footer'

export default function AboutUs() {
  return (
    <React.Fragment>
      <Container fluid style={{ minHeight: '60%' }}>
        <h1 className='about-header'>About Us</h1>
        <h3 className='subhead'>Welcome to MoviX
        </h3>

        <p className='about-content'>At our website, we aim to provide a platform for movie enthusiasts to express their opinions, share their thoughts, and engage in discussions about their favorite films. Our platform was created in 2023 by Akash Jaiswal, a passionate movie lover and an avid supporter of the cinematic arts.

          With a user-friendly interface and a vast collection of movies from various genres and eras, our website allows users to discover new films, read reviews, and contribute their own insights. Whether you're a casual moviegoer or a dedicated cinephile, we believe that everyone's voice deserves to be heard and respected.

          Our Features:

          User Signup and Login: To fully experience our platform, we encourage users to create an account, enabling them to access personalized features and participate in the movie review community.

          Movie Reviews and Ratings: Users can browse through an extensive collection of movies, read reviews from fellow users, and contribute their own reviews and ratings. By sharing your thoughts, you can help others make informed decisions about which movies to watch.

          Discussion Forums: Engage in meaningful conversations with other movie enthusiasts through our dedicated discussion forums. From analyzing plot twists to debating cinematic techniques, our forums provide a space for passionate individuals to connect and share their perspectives.

          Personalized Recommendations: We understand that each moviegoer has unique tastes and preferences. To enhance your movie-watching experience, our website offers personalized movie recommendations based on your previous ratings and reviews.

          At our core, we value inclusivity and diversity. We believe that everyone should have the opportunity to voice their opinions, irrespective of their background or level of expertise. Our goal is to foster a positive and respectful community where movie lovers can come together, exchange ideas, and celebrate the magic of cinema.</p>

        <h3 className='subhead'>Connect with Akash Jaiswal:</h3>

        <p className='about-content'>As the creator of this platform, Akash Jaiswal serves as both the administrator and a fellow movie enthusiast. You can find links to Akash's social media profiles in the footer of our website. Feel free to reach out, share your thoughts, or connect with Akash directly through those channels.

          Thank you for joining us on this cinematic journey. We hope you enjoy exploring our movie review system and discovering new movies that captivate and inspire you. Let's celebrate the power of storytelling together!</p>
      </Container>
      <Footer />
    </React.Fragment>
  )
}
