import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div>
      <section className="hero-wrapper">
        <div className="hero-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <span className="hero-badge">Revolutionary Learning Platform</span>
          <h1 className="hero-headline">
            Learn Visually with Interactive 3D Models
          </h1>
          <p className="hero-subtext">
            EduViz is a marketplace for interactive 3D learning models. Explore,
            learn, and create like never before!
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-text">Explore 1000+ 3D Models</span>
            </div>
            <div className="feature-item">
              <span className="feature-text">Interactive Learning</span>
            </div>
            <div className="feature-item">
              <span className="feature-text">Sell Your Creations</span>
            </div>
          </div> 
          <div className="hero-cta">
            <Link to="/explore">
              <button className="cta-button">Explore Models</button>
            </Link>
            <Link to="/signup?role=creator">
              <button className="cta-button primary">Become a Creator</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
