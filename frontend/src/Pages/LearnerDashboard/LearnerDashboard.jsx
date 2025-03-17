import React, { useState } from "react";
import "./LearnerDashboard.css";
import img from "../../images/img.jpg";

function LearnerDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("Welcome");

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const recommendedModels = [
    {
      id: 1,
      title: "Human Anatomy Explorer",
      price: "$24.99",
      imageUrl: img,
      description:
        "Interactive 3D model of the human body for biology students",
      isNew: true,
    },
    {
      id: 2,
      title: "Solar System Simulator",
      price: "$19.99",
      imageUrl: "/api/placeholder/200/120",
      description: "Explore planets and orbits in a dynamic 3D environment",
      isNew: false,
    },
    {
      id: 3,
      title: "Geometric Shapes Lab",
      price: "$14.99",
      imageUrl: "/api/placeholder/200/120",
      description: "Visualize and manipulate 3D geometric forms",
      isNew: true,
    },
  ];

  const userModels = [
    {
      id: 1,
      title: "Heart Dissection Model",
      created: "March 10, 2025",
      views: "1.2K",
      imageUrl: "/api/placeholder/200/120",
    },
    {
      id: 2,
      title: "Earth Layers Visualizer",
      created: "March 12, 2025",
      views: "850",
      imageUrl: "/api/placeholder/200/120",
    },
  ];

  const learningProgress = {
    exploredModels: 4,
    totalModels: 10,
    explorationPercentage: 40,
    nextModel: "Physics of Motion",
    hoursSpent: 15,
  };

  const userStats = [
    { label: "Models Explored", value: learningProgress.exploredModels },
    { label: "Models Purchased", value: userModels.length },
  ];

  const WelcomePage = () => (
    <div className="welcome-page">
      <div className="welcome-hero">
        <div className="welcome-intro">
          <h1 className="welcome-title">Welcome back, John</h1>
          <p className="welcome-subtitle">
            Explore interactive 3D models and enhance your visual learning:
          </p>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${learningProgress.explorationPercentage}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {learningProgress.explorationPercentage}% Explored -{" "}
              {learningProgress.exploredModels}/{learningProgress.totalModels}{" "}
              Models
            </p>
          </div>

          <div className="upcoming-course">
            <h3>Next to Explore</h3>
            <div className="course-preview">
              <div className="course-preview-icon"></div>
              <div className="course-preview-info">
                <h4>{learningProgress.nextModel}</h4>
                <button className="primary-button">Start Exploring</button>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-overview">
          {userStats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h2 className="stat-value">{stat.value}</h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="recommended-section">
        <div className="section-header">
          <h2 className="section-title">Recommended 3D Models</h2>
          <button className="text-button">Browse Marketplace</button>
        </div>
        <div className="model-list">
          {recommendedModels.map((model) => (
            <div className="model-card" key={model.id}>
              <div className="model-image-container">
                <img
                  src={model.imageUrl}
                  alt={model.title}
                  className="model-image"
                />
                {model.isNew && <span className="model-badge">NEW</span>}
              </div>
              <div className="model-content">
                <h3 className="model-title">{model.title}</h3>
                <p className="model-description">{model.description}</p>
                <div className="model-footer">
                  <p className="model-price">{model.price}</p>
                  <button className="model-action-button">Purchase</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="insights-section">
        <h2 className="section-title">Your Exploration Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h3>Exploration Streak</h3>
            <div className="streak-display">
              <span className="streak-number">5</span>
              <span className="streak-text">days</span>
            </div>
            <p className="insight-tip">
              Keep exploring daily to unlock new achievements!
            </p>
          </div>
          <div className="insight-card">
            <h3>Weekly Activity</h3>
            <div className="focus-chart">
              <div className="chart-bar" style={{ height: "20%" }}></div>
              <div className="chart-bar" style={{ height: "35%" }}></div>
              <div className="chart-bar" style={{ height: "50%" }}></div>
              <div className="chart-bar" style={{ height: "65%" }}></div>
              <div className="chart-bar" style={{ height: "30%" }}></div>
              <div className="chart-bar" style={{ height: "15%" }}></div>
              <div className="chart-bar active" style={{ height: "45%" }}></div>
            </div>
            <div className="chart-labels">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ModelViewer = () => (
    <div className="model-viewer">
      <h1 className="page-title">My 3D Models</h1>
      <div className="model-list">
        {userModels.map((model) => (
          <div className="model-card" key={model.id}>
            <div className="model-image-container">
              <img
                src={model.imageUrl}
                alt={model.title}
                className="model-image"
              />
            </div>
            <h3 className="model-title">{model.title}</h3>
            <p className="model-details">Created: {model.created}</p>
            <p className="model-status">Views: {model.views}</p>
            <button className="model-action-button">Edit Model</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo-container">
          <h2 className="logo">EduViz</h2>
        </div>
        <nav className="sidebar-nav">
          <ul className="menu-list">
            {["Welcome", "My Models", "Marketplace", "Forum", "Settings"].map(
              (item) => (
                <li key={item} className="menu-item">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`menu-button ${
                      activeMenuItem === item ? "active" : ""
                    }`}
                  >
                    <span className="menu-text">{item}</span>
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="profile-preview">
          <div className="profile-avatar">JD</div>
          <span className="profile-name">John Doe</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          {activeMenuItem !== "Welcome" && (
            <h1 className="page-title">{activeMenuItem}</h1>
          )}
          {activeMenuItem === "My Models" && (
            <div className="header-actions">
              <button className="action-button">Upload New Model</button>
            </div>
          )}
        </header>

        {activeMenuItem === "Welcome" && <WelcomePage />}
        {activeMenuItem === "My Models" && <ModelViewer />}
        {activeMenuItem === "Marketplace" && (
          <p className="placeholder-text">
            Browse and purchase 3D models coming soon!
          </p>
        )}
        {activeMenuItem === "Forum" && (
          <p className="placeholder-text">Community forum coming soon!</p>
        )}
        {activeMenuItem === "Settings" && (
          <p className="placeholder-text">Settings content coming soon!</p>
        )}
      </main>

      <aside className="right-panel">
        <div className="panel-section notifications">
          <h3 className="panel-title">Notifications</h3>
          <div className="notification-list">
            <div className="notification-item unread">
              <p className="notification-text">
                New 3D model available: Chemistry Lab
              </p>
              <span className="notification-time">2 hours ago</span>
            </div>
            <div className="notification-item">
              <p className="notification-text">
                Your model received 100 new views!
              </p>
              <span className="notification-time">Yesterday</span>
            </div>
          </div>
        </div>

        <div className="panel-section chat">
          <h3 className="panel-title">EduViz Assistant</h3>
          <div className="chat-messages">
            <div className="message assistant">
              <p>How can I assist with your 3D models today?</p>
            </div>
          </div>
          <form className="chat-form">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="chat-submit">
              Send
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}

export default LearnerDashboard;
