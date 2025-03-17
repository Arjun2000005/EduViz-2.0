import { useState, useEffect, useRef } from "react";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaChevronLeft,
  FaInfoCircle,
} from "react-icons/fa";
import { bicycleData } from "../../Data/bicycleData";
import ModelViewer from "../../Components/Model/ModelViewer/ModelViewer";
import ModelDescription from "../../Components/Model/ModelDescription/ModelDescription";
// Import the CSS file (we'll create this separately)
import "./ModelPage.css";

export default function ModelPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modelViewerRef, setModelViewerRef] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modelSrc, setModelSrc] = useState(null);
  const [isDismantleMode, setIsDismantleMode] = useState(true);
  const [selectedPart, setSelectedPart] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const parts = Object.keys(bicycleData.parts);

  // Animation progress effect
  useEffect(() => {
    let progressInterval;

    if (isPlaying) {
      progressInterval = setInterval(() => {
        setAnimationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 4;
        });
      }, 100);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPlaying]);

  // Reset animation progress when animation completes
  useEffect(() => {
    if (animationProgress === 100) {
      setTimeout(() => {
        setAnimationProgress(0);
        setIsPlaying(false);
        setIsDismantleMode(!isDismantleMode);
      }, 200);
    }
  }, [animationProgress, isDismantleMode]);

  useEffect(() => {
    // Update port from 5000 to 3000 to match backend
    const url = `http://localhost:3000/model/model/${bicycleData.fullviewModel}`;
    setModelSrc(url);
  }, []);

  const handlePartSelect = (part) => {
    const partFileId = bicycleData.parts[part].modelId;
    // Update port from 5000 to 3000 to match backend
    const url = `http://localhost:3000/model/model/${partFileId}`;
    setModelSrc(url);
    setSelectedPart(part);
    setShowDetailView(true);
    setIsDrawerOpen(false);
  };

  const handleToggleAnimation = () => {
    if (modelViewerRef && modelViewerRef.current) {
      const animations = modelViewerRef.current.availableAnimations;
      if (animations.length > 0) {
        modelViewerRef.current.animationName = animations[0];
        modelViewerRef.current.play();
        setIsPlaying(true);
        setAnimationProgress(0);
        setTimeout(() => {
          modelViewerRef.current.pause();
          setIsPlaying(false);
          setIsDismantleMode(!isDismantleMode);
        }, 2500);
      }
    }
  };

  const handleBackClick = () => {
    setShowDetailView(false);
    setSelectedPart(null);
    // Update port from 5000 to 3000 to match backend
    const url = `http://localhost:3000/model/model/${bicycleData.fullviewModel}`;
    setModelSrc(url);
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleModelViewerLoad = (ref) => setModelViewerRef(ref);

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Model-Viewer Pro</h1>
          <div className="header-controls">
            <button onClick={toggleDrawer} className="menu-button">
              <span>Parts</span>
              <FaBars className="icon" />
            </button>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? (
                <FaSun className="icon" />
              ) : (
                <FaMoon className="icon" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-content">
          <h2>Parts Library</h2>
          <ul className="parts-list">
            {parts.map((part) => (
              <li
                key={part}
                onClick={() => handlePartSelect(part)}
                className={`part-item ${
                  selectedPart === part ? "selected" : ""
                }`}
              >
                <span className="part-name">
                  {bicycleData.parts[part].name}
                </span>
                <FaInfoCircle className="info-icon" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isDrawerOpen && <div className="overlay" onClick={toggleDrawer}></div>}

      <main className="main-content">
        <div className="controls">
          {!showDetailView ? (
            <div className="main-controls">
              <button
                onClick={handleToggleAnimation}
                disabled={isPlaying}
                className={`action-button ${isPlaying ? "disabled" : ""}`}
              >
                {isDismantleMode ? "Dismantle" : "Assemble"}
              </button>
              {isPlaying && (
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${animationProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleBackClick} className="back-button">
              <FaChevronLeft className="icon" />
              <span>Back to Full View</span>
            </button>
          )}
        </div>

        {!showDetailView ? (
          <div className="model-container">
            <div className="model-backdrop"></div>
            {modelSrc ? (
              <ModelViewer
                modelSrc={modelSrc}
                isPlaying={isPlaying}
                showDetailView={showDetailView}
                onLoad={handleModelViewerLoad}
              />
            ) : (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading model...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="split-view">
            <div className="model-container detail-view">
              <div className="model-backdrop"></div>
              {modelSrc ? (
                <ModelViewer
                  modelSrc={modelSrc}
                  isPlaying={isPlaying}
                  showDetailView={showDetailView}
                  onLoad={handleModelViewerLoad}
                />
              ) : (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <p>Loading model...</p>
                </div>
              )}
            </div>
            <div className="description-container">
              <ModelDescription selectedPart={selectedPart} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
