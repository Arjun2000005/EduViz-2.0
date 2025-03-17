import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaCubes,
  FaUserGraduate,
  FaStore,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "./HomePage.css";
import HeroSection from "../../Components/HeroSection/HeroSection";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />

      <HeroSection />

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How EduViz Works</h2>
            <p className="section-subtitle">
              Our platform makes 3D learning accessible and engaging for
              everyone
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaCubes />
              </div>
              <h3 className="feature-title">Diverse 3D Models</h3>
              <p className="feature-description">
                Explore thousands of interactive 3D models across engineering,
                medical, architectural, and educational categories.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaLaptopCode />
              </div>
              <h3 className="feature-title">WebGL Technology</h3>
              <p className="feature-description">
                Powered by Three.js for smooth and responsive 3D rendering
                directly in your browser without additional plugins.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaGraduationCap />
              </div>
              <h3 className="feature-title">Interactive Learning</h3>
              <p className="feature-description">
                Rotate, zoom, dissect, and interact with models to understand
                complex concepts through visual exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Categories</h2>
            <p className="section-subtitle">
              Discover 3D models across multiple disciplines and subjects
            </p>
          </div>

          <div className="categories-grid">
            <Link to="/category/engineering" className="category-card">
              <div className="category-image engineering-bg"></div>
              <h3 className="category-title">Engineering</h3>
              <p className="category-count">240+ Models</p>
            </Link>

            <Link to="/category/medical" className="category-card">
              <div className="category-image medical-bg"></div>
              <h3 className="category-title">Medical</h3>
              <p className="category-count">180+ Models</p>
            </Link>

            <Link to="/category/architecture" className="category-card">
              <div className="category-image architecture-bg"></div>
              <h3 className="category-title">Architecture</h3>
              <p className="category-count">150+ Models</p>
            </Link>

            <Link to="/category/science" className="category-card">
              <div className="category-image science-bg"></div>
              <h3 className="category-title">Science</h3>
              <p className="category-count">320+ Models</p>
            </Link>
          </div>

          <div className="categories-cta">
            <Link to="/categories" className="btn-secondary">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Join our community as a learner or creator in three simple steps
            </p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <FaUserGraduate />
              </div>
              <h3 className="step-title">Create an Account</h3>
              <p className="step-description">
                Sign up for free as a learner or creator and set up your profile
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <FaStore />
              </div>
              <h3 className="step-title">Browse or Upload</h3>
              <p className="step-description">
                Discover models as a learner or upload your creations as a
                creator
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <FaChalkboardTeacher />
              </div>
              <h3 className="step-title">Learn or Earn</h3>
              <p className="step-description">
                Interact with models to learn or earn money by selling your
                creations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section className="featured-models-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Models</h2>
            <p className="section-subtitle">
              Top-rated and popular 3D learning resources
            </p>
          </div>

          <div className="models-grid">
            <div className="model-card">
              <div className="model-image model1-bg"></div>
              <div className="model-content">
                <h3 className="model-title">Human Heart Anatomy</h3>
                <p className="model-category">Medical</p>
                <div className="model-stats">
                  <span className="model-rating">4.9 ★</span>
                  <span className="model-price">$12.99</span>
                </div>
                <Link to="/model/human-heart" className="btn-model">
                  View Model
                </Link>
              </div>
            </div>

            <div className="model-card">
              <div className="model-image model2-bg"></div>
              <div className="model-content">
                <h3 className="model-title">Electric Motor Components</h3>
                <p className="model-category">Engineering</p>
                <div className="model-stats">
                  <span className="model-rating">4.8 ★</span>
                  <span className="model-price">$9.99</span>
                </div>
                <Link to="/model/electric-motor" className="btn-model">
                  View Model
                </Link>
              </div>
            </div>

            <div className="model-card">
              <div className="model-image model3-bg"></div>
              <div className="model-content">
                <h3 className="model-title">Solar System</h3>
                <p className="model-category">Science</p>
                <div className="model-stats">
                  <span className="model-rating">4.7 ★</span>
                  <span className="model-price">$7.99</span>
                </div>
                <Link to="/model/solar-system" className="btn-model">
                  View Model
                </Link>
              </div>
            </div>

            <div className="model-card">
              <div className="model-image model4-bg"></div>
              <div className="model-content">
                <h3 className="model-title">Sustainable House Design</h3>
                <p className="model-category">Architecture</p>
                <div className="model-stats">
                  <span className="model-rating">4.8 ★</span>
                  <span className="model-price">$14.99</span>
                </div>
                <Link to="/model/sustainable-house" className="btn-model">
                  View Model
                </Link>
              </div>
            </div>
          </div>

          <div className="models-cta">
            <Link to="/models" className="btn-primary">
              Explore All Models
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Hear from students, educators, and creators in our community
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "As a medical student, the interactive anatomy models have
                  revolutionized how I study complex systems. I can rotate and
                  explore each organ in detail."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar student-avatar"></div>
                <div className="author-info">
                  <h4 className="author-name">Sarah Johnson</h4>
                  <p className="author-title">Medical Student</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "My engineering students grasp mechanical concepts much faster
                  when they can manipulate and interact with the 3D models on
                  EduViz."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar teacher-avatar"></div>
                <div className="author-info">
                  <h4 className="author-name">Dr. Robert Chen</h4>
                  <p className="author-title">Engineering Professor</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "I've earned over $10,000 selling my architectural 3D models.
                  The platform makes it easy to reach students and professionals
                  worldwide."
                </p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar creator-avatar"></div>
                <div className="author-info">
                  <h4 className="author-name">Miguel Torres</h4>
                  <p className="author-title">3D Content Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="cta-text">
              Join thousands of students, educators, and creators on EduViz
              today
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary">
                Get Started for Free
              </Link>
              <Link to="/creators" className="btn-secondary">
                Learn About Creating
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
