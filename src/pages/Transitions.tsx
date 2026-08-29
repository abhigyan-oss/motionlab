import { motion } from "motion/react";
import { useState } from "react";
import "./Transitions.css";

type TransitionType =
  | "fade"
  | "slide"
  | "scale"
  | "blur";

type Direction = "left" | "right" | "up" | "down";

type EaseType =
  | "easeOut"
  | "easeInOut"
  | "linear";

function Transitions() {
  const [transitionType, setTransitionType] =
    useState<TransitionType>("fade");

  const [direction, setDirection] =
    useState<Direction>("left");

  const [duration, setDuration] =
    useState(0.7);

  const [ease, setEase] =
    useState<EaseType>("easeInOut");

  const [replayKey, setReplayKey] =
    useState(0);

  const [copied, setCopied] =
    useState(false);

  const replay = () => {
    setReplayKey((previous) => previous + 1);
  };

  const getInitialState = () => {
    if (transitionType === "fade") {
      return {
        opacity: 0,
      };
    }

    if (transitionType === "scale") {
      return {
        opacity: 0,
        scale: 0.7,
      };
    }

    if (transitionType === "blur") {
      return {
        opacity: 0,
        scale: 0.95,
        filter: "blur(18px)",
      };
    }

    const distance = 100;

    if (direction === "left") {
      return {
        opacity: 0,
        x: -distance,
      };
    }

    if (direction === "right") {
      return {
        opacity: 0,
        x: distance,
      };
    }

    if (direction === "up") {
      return {
        opacity: 0,
        y: -distance,
      };
    }

    return {
      opacity: 0,
      y: distance,
    };
  };

  const getAnimateState = () => {
    if (transitionType === "fade") {
      return {
        opacity: 1,
      };
    }
  
    if (transitionType === "scale") {
      return {
        opacity: 1,
        scale: 1,
      };
    }
  
    if (transitionType === "blur") {
      return {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      };
    }
  
    return {
      opacity: 1,
      x: 0,
      y: 0,
    };
  };

  const generateCode = () => {
    let initialCode = "";
    let animateCode = "";
  
    if (transitionType === "fade") {
      initialCode = `opacity: 0`;
      animateCode = `opacity: 1`;
    }
  
    if (transitionType === "scale") {
      initialCode = `opacity: 0,
          scale: 0.7`;
  
      animateCode = `opacity: 1,
          scale: 1`;
    }
  
    if (transitionType === "blur") {
      initialCode = `opacity: 0,
          scale: 0.95,
          filter: "blur(18px)"`;
  
      animateCode = `opacity: 1,
          scale: 1,
          filter: "blur(0px)"`;
    }
  
    if (transitionType === "slide") {
      if (direction === "left") {
        initialCode = `opacity: 0,
          x: -100`;
      }
  
      if (direction === "right") {
        initialCode = `opacity: 0,
          x: 100`;
      }
  
      if (direction === "up") {
        initialCode = `opacity: 0,
          y: -100`;
      }
  
      if (direction === "down") {
        initialCode = `opacity: 0,
          y: 100`;
      }
  
      animateCode = `opacity: 1,
          x: 0,
          y: 0`;
    }
  
    return `import { motion } from "motion/react";
  
  export default function TransitionBox() {
    return (
      <motion.div
        initial={{
          ${initialCode}
        }}
        animate={{
          ${animateCode}
        }}
        transition={{
          duration: ${duration},
          ease: "${ease}"
        }}
      >
        Transition
      </motion.div>
    );
  }`;
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(
        generateCode()
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to copy code:",
        error
      );
    }
  };

  return (
    <main className="transitions-page">
      {/* HERO */}

      <section className="transitions-hero">
        <div className="transitions-label">
          05 / TRANSITIONS
        </div>

        <h1>
          Smooth <span>Transitions</span>
        </h1>

        <p>
          Explore elegant page and component
          transitions with complete control over
          timing, direction and easing.
        </p>
      </section>

      {/* TRANSITION LAB */}

      <section className="transition-lab">

        {/* PREVIEW */}

        <div className="transition-preview">

          <div className="transition-preview-header">
            <div>
              <span>LIVE PREVIEW</span>

              <h2>
                Experiment with transitions
              </h2>
            </div>

            <button onClick={replay}>
              ↻ Replay
            </button>
          </div>

          <div className="transition-stage">

            <motion.div
              key={replayKey}
              className="transition-object"
              initial={getInitialState()}
              animate={getAnimateState()}
              transition={{
                duration,
                ease,
              }}
            >
              <span>Motion</span>

              <small>
                TRANSITION
              </small>
            </motion.div>

          </div>
        </div>

        {/* CONTROLS */}

        <aside className="transition-controls">

          <div className="transition-controls-header">
            <span>CONFIGURATION</span>

            <h2>Transition</h2>
          </div>

          {/* TYPE */}

          <div className="transition-control-group">

            <label>
              Transition type
            </label>

            <div className="transition-type-buttons">

              {(
                [
                  "fade",
                  "slide",
                  "scale",
                  "blur",
                ] as TransitionType[]
              ).map((type) => (
                <button
                  key={type}
                  className={
                    transitionType === type
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setTransitionType(type);
                    replay();
                  }}
                >
                  {type}
                </button>
              ))}

            </div>
          </div>

          {/* DIRECTION */}

          {transitionType === "slide" && (
            <div className="transition-control-group">

              <label>
                Direction
              </label>

              <div className="direction-buttons">

                {(
                  [
                    "left",
                    "right",
                    "up",
                    "down",
                  ] as Direction[]
                ).map((item) => (
                  <button
                    key={item}
                    className={
                      direction === item
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      setDirection(item);
                      replay();
                    }}
                  >
                    {item}
                  </button>
                ))}

              </div>
            </div>
          )}

          {/* DURATION */}

          <div className="transition-range-control">

            <div>
              <label>
                Duration
              </label>

              <strong>
                {duration.toFixed(1)}s
              </strong>
            </div>

            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={duration}
              onChange={(event) =>
                setDuration(
                  Number(event.target.value)
                )
              }
            />

          </div>

          {/* EASE */}

          <div className="transition-control-group">

            <label>
              Easing
            </label>

            <div className="ease-buttons">

              {(
                [
                  "easeOut",
                  "easeInOut",
                  "linear",
                ] as EaseType[]
              ).map((item) => (
                <button
                  key={item}
                  className={
                    ease === item
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setEase(item);
                    replay();
                  }}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

        </aside>

      </section>

      {/* CODE */}

      <section className="transition-code">

        <div className="transition-code-header">

          <div>
            <span>
              GENERATED CODE
            </span>

            <h2>
              Ready to use
            </h2>
          </div>

          <button onClick={copyCode}>
            {copied
              ? "✓ Copied"
              : "Copy code"}
          </button>

        </div>

        <pre>
          {generateCode()}
        </pre>

      </section>

      {/* TECHNIQUES */}

      <section className="transition-techniques">

        <div className="transition-section-heading">

          <span>
            TRANSITION TECHNIQUES
          </span>

          <h2>
            Make movement feel intentional
          </h2>

        </div>

        <div className="transition-technique-grid">

          <article>
            <span>01</span>

            <h3>
              Fade
            </h3>

            <p>
              Subtle opacity transitions for
              clean and minimal interface
              changes.
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>
              Slide
            </h3>

            <p>
              Directional movement that creates
              clear spatial relationships between
              elements.
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>
              Scale
            </h3>

            <p>
              Combine scale and opacity to create
              depth and focus.
            </p>
          </article>

          <article>
            <span>04</span>

            <h3>
              Blur
            </h3>

            <p>
              Cinematic blur transitions for
              polished visual reveals.
            </p>
          </article>

        </div>

      </section>

    </main>
  );
}

export default Transitions;