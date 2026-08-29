import { useState } from "react";
import { motion } from "motion/react";
import PageTransition from "../components/PageTransition";
import "./Gesture.css";

function Gesture() {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [copied, setCopied] = useState(false);

  const code = `whileHover={{
  scale: 1.08,
  rotate: 3
}}

whileTap={{
  scale: 0.92
}}

drag

transition={{
  type: "spring",
  stiffness: ${stiffness},
  damping: ${damping},
  mass: ${mass}
}}`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const resetPhysics = () => {
    setStiffness(100);
    setDamping(10);
    setMass(1);
  };

  return (
    <PageTransition>
      <main className="lab-page">
        {/* Header */}
        <motion.div
          className="lab-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>02 / GESTURE</p>

          <h1>Gesture Animations</h1>

          <span>
            Interact with elements using hover, tap and drag gestures.
          </span>
        </motion.div>

        {/* Demo */}
        <div className="gesture-demo">
          <div className="gesture-label">
            Drag the card around
          </div>

          <motion.div
            className="gesture-card"
            whileHover={{
              scale: 1.08,
              rotate: 3,
            }}
            whileTap={{
              scale: 0.92,
            }}
            drag
            dragConstraints={{
              left: -180,
              right: 180,
              top: -120,
              bottom: 120,
            }}
            dragElastic={0.2}
            whileDrag={{
              scale: 1.05,
              cursor: "grabbing",
            }}
            transition={{
              type: "spring",
              stiffness,
              damping,
              mass,
            }}
          >
            <span>DRAG</span>
            <small>ME</small>
          </motion.div>
        </div>

        {/* Spring Physics */}
        <div className="spring-controls">
          <div className="spring-title">
            <div>
              <span>SPRING PHYSICS</span>
              <h2>Control the motion</h2>
            </div>

            <button
              className="reset-button"
              onClick={resetPhysics}
            >
              Reset
            </button>
          </div>

          <div className="spring-sliders">
            {/* Stiffness */}
            <div className="spring-control">
              <div className="slider-header">
                <label>Stiffness</label>
                <strong>{stiffness}</strong>
              </div>

              <input
                type="range"
                min="20"
                max="300"
                value={stiffness}
                onChange={(event) =>
                  setStiffness(Number(event.target.value))
                }
              />

              <div className="slider-description">
                Controls how strongly the object moves toward
                its target.
              </div>
            </div>

            {/* Damping */}
            <div className="spring-control">
              <div className="slider-header">
                <label>Damping</label>
                <strong>{damping}</strong>
              </div>

              <input
                type="range"
                min="1"
                max="40"
                value={damping}
                onChange={(event) =>
                  setDamping(Number(event.target.value))
                }
              />

              <div className="slider-description">
                Controls how much the spring resists bouncing.
              </div>
            </div>

            {/* Mass */}
            <div className="spring-control">
              <div className="slider-header">
                <label>Mass</label>
                <strong>{mass}</strong>
              </div>

              <input
                type="range"
                min="0.2"
                max="5"
                step="0.1"
                value={mass}
                onChange={(event) =>
                  setMass(Number(event.target.value))
                }
              />

              <div className="slider-description">
                Controls the weight and momentum of the object.
              </div>
            </div>
          </div>
        </div>

        {/* Gesture Features */}
        <div className="gesture-features">
          <div className="gesture-feature">
            <span>01</span>

            <h3>Hover</h3>

            <p>
              Scale and rotate the card when the pointer enters.
            </p>
          </div>

          <div className="gesture-feature">
            <span>02</span>

            <h3>Tap</h3>

            <p>
              Compress the card while pressing it.
            </p>
          </div>

          <div className="gesture-feature">
            <span>03</span>

            <h3>Drag</h3>

            <p>
              Move the card freely inside the playground.
            </p>
          </div>
        </div>

        {/* Code Preview */}
        <motion.div
          className="gesture-code"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <div className="code-header">
            <span>Gesture Configuration</span>

            <div className="code-actions">
              <span className="code-language">
                TypeScript
              </span>

              <button
                className="copy-button"
                onClick={copyCode}
              >
                {copied ? "Copied ✓" : "Copy Code"}
              </button>
            </div>
          </div>

          <pre>
            <code>{code}</code>
          </pre>
        </motion.div>
      </main>
    </PageTransition>
  );
}

export default Gesture;