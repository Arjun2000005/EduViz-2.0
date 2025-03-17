import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const canvasRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    termsAgree: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const connections = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: 0.6 + Math.random() * 0.3,
      });
    }

    for (let i = 0; i < 20; i++) {
      const startIndex = Math.floor(Math.random() * particles.length);
      const endIndex = Math.floor(Math.random() * particles.length);
      connections.push({
        start: startIndex,
        end: endIndex,
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connections.forEach((connection) => {
        const start = particles[connection.start];
        const end = particles[connection.end];
        const gradient = ctx.createLinearGradient(
          start.x,
          start.y,
          end.x,
          end.y
        );
        gradient.addColorStop(0, `rgba(174, 109, 242, ${connection.opacity})`);
        gradient.addColorStop(1, "rgba(174, 109, 242, 0)");
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(174, 109, 242, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:3000/api/auth/register"
      : "http://localhost:3000/api/auth/login";

    if (isSignUp) {
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.termsAgree
      ) {
        alert("Please fill all fields and agree to terms");
        return;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Sign up successful:", data);
          navigate("/role-selection"); // Redirect after signup
        } else {
          alert(data.message || "Sign up failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during sign up");
      }
    } else {
      if (!formData.email || !formData.password) {
        alert("Please fill all fields");
        return;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Sign in successful:", data);
          localStorage.setItem("token", data.token); // Store JWT token
          // Optionally redirect, e.g., navigate("/dashboard");
        } else {
          alert(data.message || "Sign in failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during sign in");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="model-background">
          <canvas ref={canvasRef} className="particles-canvas"></canvas>
          <div className="model-grid"></div>
        </div>

        <div className="signup-overlay" />

        <div className="signup-content-wrapper">
          <div className="signup-content">
            <div className="signup-info">
              <div className="signup-logo">
                <div className="logo-icon">
                  <span>EV</span>
                </div>
                EduViz
              </div>
              <h1 className="signup-headline">
                Join <span>EduViz</span> and Elevate Your Learning
              </h1>
              <p className="signup-subtext">
                Access high-quality courses, interactive content, and expert
                guidance. Learn, grow, and excel with EduViz!
              </p>
              <div className="signup-features">
                <div className="feature-point">
                  <div className="feature-point-icon">
                    <span>📚</span>
                  </div>
                  <div className="feature-point-text">
                    <h3 className="feature-point-title">
                      Unlimited Course Access
                    </h3>
                    <p className="feature-point-description">
                      Get access to a variety of courses in different domains.
                    </p>
                  </div>
                </div>
                <div className="feature-point">
                  <div className="feature-point-icon">
                    <span>🎯</span>
                  </div>
                  <div className="feature-point-text">
                    <h3 className="feature-point-title">
                      Personalized Learning Paths
                    </h3>
                    <p className="feature-point-description">
                      Customize your learning experience with AI-driven
                      recommendations.
                    </p>
                  </div>
                </div>
                <div className="feature-point">
                  <div className="feature-point-icon">
                    <span>💼</span>
                  </div>
                  <div className="feature-point-text">
                    <h3 className="feature-point-title">
                      Career-Oriented Training
                    </h3>
                    <p className="feature-point-description">
                      Gain skills that help you land jobs and internships.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="signup-form-container">
              <div className="form-decoration form-decoration-1" />
              <div className="form-decoration form-decoration-2" />
              <div className="form-header">
                <h2 className="form-title">
                  {isSignUp
                    ? "Create Your EduViz Account"
                    : "Sign In to EduViz"}
                </h2>
                <p className="form-subtitle">
                  {isSignUp
                    ? "Start learning today by signing up"
                    : "Welcome back! Please sign in"}
                </p>
              </div>
              <form className="signup-form" onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={
                      isSignUp
                        ? "Create a strong password"
                        : "Enter your password"
                    }
                  />
                </div>
                {isSignUp && (
                  <div className="form-checkbox">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      id="termsAgree"
                      name="termsAgree"
                      checked={formData.termsAgree}
                      onChange={handleInputChange}
                    />
                    <label className="checkbox-label" htmlFor="termsAgree">
                      I agree to the <a href="#">Terms of Service</a> and{" "}
                      <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                )}
                <button type="submit" className="signup-button">
                  <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                </button>
                <div className="or-divider">
                  <div className="divider-line" />
                  <span className="divider-text">OR</span>
                  <div className="divider-line" />
                </div>
                <div className="social-login">
                  <button type="button" className="social-button">
                    <span className="social-icon">G</span>
                  </button>
                  <button type="button" className="social-button">
                    <span className="social-icon">f</span>
                  </button>
                  <button type="button" className="social-button">
                    <span className="social-icon">in</span>
                  </button>
                </div>
                <div className="signin-link">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <a href="#" onClick={handleToggle}>
                    {isSignUp ? "Sign in" : "Sign up"}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
