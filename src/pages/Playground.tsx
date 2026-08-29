import TimelineBuilder from "../components/timeline/TimelineBuilder";
import { motion } from "motion/react";
import { useState } from "react";
import "./Playground.css";

type AnimationType = "spring" | "tween" | "inertia";

type Preset = {
  name: string;
  scale: number;
  rotate: number;
  x: number;
  y: number;
  stiffness: number;
  damping: number;
  duration: number;
};

const presets: Preset[] = [
  {
    name: "Gentle",
    scale: 1.1,
    rotate: 0,
    x: 0,
    y: -20,
    stiffness: 80,
    damping: 18,
    duration: 1,
  },
  {
    name: "Snappy",
    scale: 1.2,
    rotate: 8,
    x: 30,
    y: -20,
    stiffness: 300,
    damping: 20,
    duration: 0.4,
  },
  {
    name: "Bouncy",
    scale: 1.3,
    rotate: -12,
    x: -30,
    y: -30,
    stiffness: 180,
    damping: 7,
    duration: 0.8,
  },
  {
    name: "Smooth",
    scale: 1.15,
    rotate: 5,
    x: 0,
    y: -15,
    stiffness: 60,
    damping: 25,
    duration: 1.2,
  },
  {
    name: "Dramatic",
    scale: 1.45,
    rotate: 20,
    x: 50,
    y: -35,
    stiffness: 220,
    damping: 12,
    duration: 0.7,
  },
];

function Playground() {
  const [animationType, setAnimationType] =
    useState<AnimationType>("spring");

  const [scale, setScale] = useState(1.2);
  const [rotate, setRotate] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(-20);

  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [duration, setDuration] = useState(0.8);

  const [replayKey, setReplayKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const replay = () => {
    setReplayKey((previous) => previous + 1);
  };

  const reset = () => {
    setAnimationType("spring");
    setScale(1.2);
    setRotate(0);
    setX(0);
    setY(-20);
    setStiffness(100);
    setDamping(10);
    setDuration(0.8);

    replay();
  };

  const applyPreset = (preset: Preset) => {
    setScale(preset.scale);
    setRotate(preset.rotate);
    setX(preset.x);
    setY(preset.y);
    setStiffness(preset.stiffness);
    setDamping(preset.damping);
    setDuration(preset.duration);

    setAnimationType("spring");

    replay();
  };

  const generateCode = () => {
    const animationLines = [
      `    scale: ${scale},`,
      `    opacity: 1,`,
      `    rotate: ${rotate},`,
      `    x: ${x},`,
      `    y: ${y}`,
    ];

    let transitionCode = "";

    if (animationType === "spring") {
      transitionCode = `transition={{
        type: "spring",
        stiffness: ${stiffness},
        damping: ${damping}
      }}`;
    } else if (animationType === "tween") {
      transitionCode = `transition={{
        type: "tween",
        duration: ${duration}
      }}`;
    } else {
      transitionCode = `transition={{
        type: "inertia"
      }}`;
    }

    return `import { motion } from "motion/react";

export default function AnimatedBox() {
  return (
    <motion.div
      initial={{
        scale: 1,
        opacity: 0,
        rotate: 0,
        x: 0,
        y: 0
      }}
      animate={{
${animationLines.join("\n")}
      }}
      ${transitionCode}
      style={{
        width: 120,
        height: 120,
        borderRadius: 24,
        background: "#d000ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700
      }}
    >
      Motion
    </motion.div>
  );
}`;
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const transition =
    animationType === "spring"
      ? {
          type: "spring" as const,
          stiffness,
          damping,
        }
      : animationType === "tween"
      ? {
          type: "tween" as const,
          duration,
        }
      : {
          type: "inertia" as const,
        };

  return (
    <main className="playground-page">
      {/* HERO */}
      <section className="playground-hero">
        <div className="playground-label">
          07 / CODE GENERATOR
        </div>

        <h1>
          Motion <span>Generator</span>
        </h1>

        <p>
          Configure an animation visually and generate ready-to-use
          Motion code instantly.
        </p>
      </section>

      {/* PRESETS */}
      <section className="preset-section">
        <div className="section-heading">
          <div>
            <span>QUICK PRESETS</span>
            <h2>Start with a motion style</h2>
          </div>

          <button className="reset-button" onClick={reset}>
            Reset
          </button>
        </div>

        <div className="preset-grid">
          {presets.map((preset) => (
            <button
              key={preset.name}
              className="preset-button"
              onClick={() => applyPreset(preset)}
            >
              <span>{preset.name}</span>
              <small>Apply preset ↗</small>
            </button>
          ))}
        </div>
      </section>

      {/* PLAYGROUND */}
      <section className="playground-container">
        {/* PREVIEW */}
        <div className="playground-preview">
          <div className="preview-header">
            <div>
              <span>LIVE PREVIEW</span>
              <h2>Experiment with motion</h2>
            </div>

            <button onClick={replay}>
              ↻ Replay
            </button>
          </div>

          <div className="preview-stage">
            <motion.div
              key={replayKey}
              className="preview-object"
              initial={{
                scale: 0.65,
                opacity: 0,
                rotate: -10,
                x: 0,
                y: 0,
              }}
              animate={{
                scale,
                opacity: 1,
                rotate,
                x,
                y,
              }}
              transition={transition}
            >
              <span>Motion</span>
              <small>LAB</small>
            </motion.div>
          </div>
        </div>

        {/* CONTROLS */}
        <aside className="playground-controls">
          <div className="controls-header">
            <span>CONFIGURATION</span>
            <h2>Animation</h2>
          </div>

          {/* ANIMATION TYPE */}
          <div className="control-group">
            <label>Animation type</label>

            <div className="type-buttons">
              {(
                ["spring", "tween", "inertia"] as AnimationType[]
              ).map((type) => (
                <button
                  key={type}
                  className={
                    animationType === type ? "active" : ""
                  }
                  onClick={() => {
                    setAnimationType(type);
                    replay();
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* SCALE */}
          <div className="range-control">
            <div>
              <label>Scale</label>
              <strong>{scale.toFixed(1)}</strong>
            </div>

            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scale}
              onChange={(event) =>
                setScale(Number(event.target.value))
              }
            />
          </div>

          {/* ROTATION */}
          <div className="range-control">
            <div>
              <label>Rotation</label>
              <strong>{rotate}°</strong>
            </div>

            <input
              type="range"
              min="-180"
              max="180"
              value={rotate}
              onChange={(event) =>
                setRotate(Number(event.target.value))
              }
            />
          </div>

          {/* X POSITION */}
          <div className="range-control">
            <div>
              <label>X Position</label>
              <strong>{x}px</strong>
            </div>

            <input
              type="range"
              min="-100"
              max="100"
              value={x}
              onChange={(event) =>
                setX(Number(event.target.value))
              }
            />
          </div>

          {/* Y POSITION */}
          <div className="range-control">
            <div>
              <label>Y Position</label>
              <strong>{y}px</strong>
            </div>

            <input
              type="range"
              min="-100"
              max="100"
              value={y}
              onChange={(event) =>
                setY(Number(event.target.value))
              }
            />
          </div>

          {/* SPRING CONTROLS */}
          {animationType === "spring" && (
            <>
              <div className="range-control">
                <div>
                  <label>Stiffness</label>
                  <strong>{stiffness}</strong>
                </div>

                <input
                  type="range"
                  min="20"
                  max="400"
                  value={stiffness}
                  onChange={(event) =>
                    setStiffness(Number(event.target.value))
                  }
                />
              </div>

              <div className="range-control">
                <div>
                  <label>Damping</label>
                  <strong>{damping}</strong>
                </div>

                <input
                  type="range"
                  min="1"
                  max="50"
                  value={damping}
                  onChange={(event) =>
                    setDamping(Number(event.target.value))
                  }
                />
              </div>
            </>
          )}

          {/* TWEEN CONTROLS */}
          {animationType === "tween" && (
            <div className="range-control">
              <div>
                <label>Duration</label>
                <strong>{duration.toFixed(1)}s</strong>
              </div>

              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={duration}
                onChange={(event) =>
                  setDuration(Number(event.target.value))
                }
              />
            </div>
          )}
        </aside>
      </section>

      {/* GENERATED CODE */}
      <section className="code-generator">
        <div className="code-generator-header">
          <div>
            <span>GENERATED CODE</span>
            <h2>Ready to use</h2>
          </div>

          <div className="code-actions">
            <button onClick={copyCode}>
              {copied ? "✓ Copied" : "Copy code"}
            </button>
          </div>
        </div>

        <pre>{generateCode()}</pre>
      </section>

      {/* TIMELINE BUILDER */}
      <TimelineBuilder />
    </main>
  );
}

export default Playground;