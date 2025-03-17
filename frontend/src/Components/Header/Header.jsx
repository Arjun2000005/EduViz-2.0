import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = false;

  // Add scroll event listener to change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header-wrapper ${scrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <div className="logo">EduViz</div>
      </Link>

      <nav className="nav-links">
        <div className="nav-link-item">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-link-item">
          <Link to="/explore">Explore Models</Link>
        </div>
        <div className="nav-link-item">
          <Link to="/how-it-works">How It Works</Link>
        </div>
        <div className="nav-link-item">
          <Link to="/signup?role=creator">Become a Creator</Link>
        </div>
      </nav>

      {isLoggedIn ? (
        <div className="profile-section">
          <div
            className="profile-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            👤
          </div>
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-item">
                <Link to="/dashboard">Dashboard</Link>
              </div>
              <div className="dropdown-item">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="dropdown-item">Logout</div>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="button primary">Sign Up</button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
