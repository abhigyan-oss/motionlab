import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
  } from "motion/react";
  import { useState } from "react";
  import PageTransition from "../components/PageTransition";
  import "./Advanced.css";
  
  function Advanced() {
    const [replayKey, setReplayKey] = useState(0);
  
    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
  
    const springX = useSpring(mouseX, {
      stiffness: 150,
      damping: 15,
    });
  
    const springY = useSpring(mouseY, {
      stiffness: 150,
      damping: 15,
    });
  
    // 3D Card rotation
    const rotateX = useTransform(
      mouseY,
      [-150, 150],
      [12, -12]
    );
  
    const rotateY = useTransform(
      mouseX,
      [-150, 150],
      [-12, 12]
    );
  
    // Magnetic button
    const buttonX = useMotionValue(0);
    const buttonY = useMotionValue(0);
  
    const springButtonX = useSpring(buttonX, {
      stiffness: 200,
      damping: 15,
    });
  
    const springButtonY = useSpring(buttonY, {
      stiffness: 200,
      damping: 15,
    });
  
    // Interactive glow
    const glowX = useMotionValue(50);
    const glowY = useMotionValue(50);
  
    const smoothGlowX = useSpring(glowX, {
      stiffness: 120,
      damping: 20,
    });
  
    const smoothGlowY = useSpring(glowY, {
      stiffness: 120,
      damping: 20,
    });
  
    const glowLeft = useTransform(
      smoothGlowX,
      (value) => `${value}%`
    );
  
    const glowTop = useTransform(
      smoothGlowY,
      (value) => `${value}%`
    );
  
    const handleMouseMove = (
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      const rect =
        event.currentTarget.getBoundingClientRect();
  
      const x =
        event.clientX -
        rect.left -
        rect.width / 2;
  
      const y =
        event.clientY -
        rect.top -
        rect.height / 2;
  
      mouseX.set(x);
      mouseY.set(y);
    };
  
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
  
    const handleMagneticMove = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      const rect =
        event.currentTarget.getBoundingClientRect();
  
      const x =
        event.clientX -
        rect.left -
        rect.width / 2;
  
      const y =
        event.clientY -
        rect.top -
        rect.height / 2;
  
      buttonX.set(x * 0.35);
      buttonY.set(y * 0.35);
    };
  
    const handleMagneticLeave = () => {
      buttonX.set(0);
      buttonY.set(0);
    };
  
    const handleGlowMove = (
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      const rect =
        event.currentTarget.getBoundingClientRect();
  
      const x =
        ((event.clientX - rect.left) /
          rect.width) *
        100;
  
      const y =
        ((event.clientY - rect.top) /
          rect.height) *
        100;
  
      glowX.set(x);
      glowY.set(y);
    };
  
    const handleGlowLeave = () => {
      glowX.set(50);
      glowY.set(50);
    };
  
    return (
      <PageTransition>
        <main className="advanced-page">
          {/* HERO */}
  
          <section className="advanced-hero">
            <div className="advanced-label">
              06 / ADVANCED
            </div>
  
            <h1>
              Advanced <span>Motion</span>
            </h1>
  
            <p>
              Explore interactive animations with mouse
              tracking, 3D transforms and advanced Motion
              techniques.
            </p>
  
            <button
              className="advanced-replay"
              onClick={() =>
                setReplayKey(
                  (previous) => previous + 1
                )
              }
            >
              ↻ Replay animations
            </button>
          </section>
  
          {/* MOUSE TRACKING */}
  
          <section className="advanced-card">
            <div className="advanced-card-header">
              <div>
                <span>01 / MOUSE TRACKING</span>
                <h2>Follow the cursor</h2>
              </div>
  
              <p>
                Motion values combined with springs
                create smooth cursor-following
                interactions.
              </p>
            </div>
  
            <div
              className="mouse-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="mouse-orb"
                style={{
                  x: springX,
                  y: springY,
                }}
              />
  
              <div className="mouse-stage-content">
                Move your cursor around
              </div>
            </div>
          </section>
  
          {/* 3D TILT */}
  
          <section className="advanced-card">
            <div className="advanced-card-header">
              <div>
                <span>02 / 3D INTERACTION</span>
                <h2>Interactive tilt card</h2>
              </div>
  
              <p>
                Transform cursor movement into dynamic
                perspective-based 3D motion.
              </p>
            </div>
  
            <div
              className="tilt-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                key={replayKey}
                className="tilt-card"
                style={{
                  rotateX,
                  rotateY,
                  transformPerspective: 800,
                }}
              >
                <span>Motion</span>
  
                <small>
                  3D INTERACTION
                </small>
  
                <div className="tilt-glow" />
              </motion.div>
            </div>
          </section>
  
          {/* SVG MOTION */}
  
          <section className="advanced-card">
            <div className="advanced-card-header">
              <div>
                <span>03 / SVG MOTION</span>
                <h2>Animated path</h2>
              </div>
  
              <p>
                Animate SVG paths to create expressive
                illustrations and visual effects.
              </p>
            </div>
  
            <div className="svg-stage">
              <svg
                width="300"
                height="180"
                viewBox="0 0 300 180"
              >
                <motion.path
                  key={replayKey}
                  d="M20 140 C70 20, 120 160, 170 70 S250 30, 280 100"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
  
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#d000ff"
                    />
  
                    <stop
                      offset="100%"
                      stopColor="#7c3aed"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </section>
  
          {/* MAGNETIC BUTTON */}
  
          <section className="advanced-card">
            <div className="advanced-card-header">
              <div>
                <span>
                  04 / MAGNETIC INTERACTION
                </span>
  
                <h2>Magnetic button</h2>
              </div>
  
              <p>
                Use motion values and springs to create
                an element that subtly follows the
                user's cursor.
              </p>
            </div>
  
            <div className="magnetic-stage">
              <motion.button
                className="magnetic-button"
                onMouseMove={handleMagneticMove}
                onMouseLeave={
                  handleMagneticLeave
                }
                style={{
                  x: springButtonX,
                  y: springButtonY,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.92,
                }}
              >
                Explore Motion <span>↗</span>
              </motion.button>
            </div>
          </section>
  
          {/* INTERACTIVE GLOW */}
  
          <section className="advanced-card">
            <div className="advanced-card-header">
              <div>
                <span>
                  05 / INTERACTIVE GLOW
                </span>
  
                <h2>Cursor spotlight</h2>
              </div>
  
              <p>
                Create an interactive spotlight that
                smoothly follows your cursor using
                Motion values.
              </p>
            </div>
  
            <div
              className="glow-stage"
              onMouseMove={handleGlowMove}
              onMouseLeave={handleGlowLeave}
            >
              <motion.div
                className="glow-light"
                style={{
                  left: glowLeft,
                  top: glowTop,
                }}
              />
  
              <div className="glow-content">
                <span>INTERACTIVE</span>
  
                <h2>
                  Move through the light
                </h2>
  
                <p>
                  The spotlight follows your cursor
                  with smooth spring-based motion.
                </p>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    );
  }
  
  export default Advanced;