import { motion, useAnimationControls } from "motion/react";
import { useState } from "react";
import "./TimelineBuilder.css";

type StepProperty = "scale" | "rotate" | "x" | "y";

type TimelineStep = {
  id: number;
  property: StepProperty;
  value: number;
  duration: number;
};

const initialSteps: TimelineStep[] = [
  {
    id: 1,
    property: "scale",
    value: 1.2,
    duration: 0.5,
  },
];

function TimelineBuilder() {
  const [steps, setSteps] =
    useState<TimelineStep[]>(initialSteps);

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const controls = useAnimationControls();

  const addStep = () => {
    const newStep: TimelineStep = {
      id: Date.now(),
      property: "rotate",
      value: 90,
      duration: 0.5,
    };

    setSteps((previous) => [...previous, newStep]);
  };

  const removeStep = (id: number) => {
    setSteps((previous) => {
      // Keep at least one step
      if (previous.length <= 1) {
        return previous;
      }

      return previous.filter((step) => step.id !== id);
    });
  };

  const moveStep = (
    index: number,
    direction: "up" | "down"
  ) => {
    setSteps((previous) => {
      const newSteps = [...previous];

      const newIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        newIndex < 0 ||
        newIndex >= newSteps.length
      ) {
        return previous;
      }

      [newSteps[index], newSteps[newIndex]] = [
        newSteps[newIndex],
        newSteps[index],
      ];

      return newSteps;
    });
  };

  const updateStep = (
    id: number,
    field: keyof TimelineStep,
    value: string | number
  ) => {
    setSteps((previous) =>
      previous.map((step) =>
        step.id === id
          ? {
              ...step,
              [field]:
                field === "property"
                  ? value
                  : Number(value),
            }
          : step
      )
    );
  };

  const playSequence = async () => {
    if (steps.length === 0 || isPlaying) {
      return;
    }

    setIsPlaying(true);

    // Reset object before playing sequence
    await controls.start({
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: {
        duration: 0.2,
      },
    });

    // Play every step sequentially
    for (const step of steps) {
      const animation = {
        transition: {
          duration: step.duration,
          ease: "easeInOut" as const,
        },
      };

      if (step.property === "x") {
        await controls.start({
          ...animation,
          x: step.value,
        });
      }

      if (step.property === "y") {
        await controls.start({
          ...animation,
          y: step.value,
        });
      }

      if (step.property === "scale") {
        await controls.start({
          ...animation,
          scale: step.value,
        });
      }

      if (step.property === "rotate") {
        await controls.start({
          ...animation,
          rotate: step.value,
        });
      }
    }

    setIsPlaying(false);
  };

  const resetAnimation = async () => {
    if (isPlaying) return;

    await controls.start({
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    });
  };

  const totalDuration = steps.reduce(
    (total, step) => total + step.duration,
    0
  );

  const generateSequenceCode = () => {
    const animations = steps
      .map(
        (step) => `    await controls.start({
      ${step.property}: ${step.value},
      transition: {
        duration: ${step.duration},
        ease: "easeInOut"
      }
    });`
      )
      .join("\n\n");

    return `import {
  motion,
  useAnimationControls
} from "motion/react";

export default function SequenceAnimation() {
  const controls = useAnimationControls();

  const playSequence = async () => {
${animations}
  };

  return (
    <>
      <button onClick={playSequence}>
        Play sequence
      </button>

      <motion.div
        animate={controls}
        initial={{
          scale: 1,
          rotate: 0,
          x: 0,
          y: 0
        }}
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
    </>
  );
}`;
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(
        generateSequenceCode()
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Failed to copy sequence:",
        error
      );
    }
  };

  return (
    <section className="timeline-builder">

      {/* HEADER */}

      <div className="timeline-header">
        <div>
          <span>SEQUENCE BUILDER</span>

          <h2>Build an animation timeline</h2>

          <p>
            Create multiple animation steps and control their
            order and timing.
          </p>
        </div>

        <button
          className="add-step-button"
          onClick={addStep}
        >
          + Add step
        </button>
      </div>

      {/* PREVIEW */}

      <div className="timeline-preview">
        <div className="timeline-preview-header">
          <div>
            <span>SEQUENCE PREVIEW</span>

            <h3>
              {steps.length}{" "}
              {steps.length === 1
                ? "step"
                : "steps"}{" "}
              · {totalDuration.toFixed(1)}s
            </h3>
          </div>

          <div className="timeline-actions">
            <button
              onClick={resetAnimation}
              disabled={isPlaying}
            >
              Reset
            </button>

            <button
              className="play-sequence"
              onClick={playSequence}
              disabled={isPlaying}
            >
              {isPlaying
                ? "Playing..."
                : "▶ Play sequence"}
            </button>
          </div>
        </div>

        <div className="sequence-stage">
          <motion.div
            className="sequence-object"
            animate={controls}
            initial={{
              scale: 1,
              rotate: 0,
              x: 0,
              y: 0,
            }}
          >
            <span>Motion</span>

            <small>SEQUENCE</small>
          </motion.div>
        </div>
      </div>

      {/* TIMELINE TRACK */}

      <div className="timeline-track">
        <div className="timeline-ruler">
          <span>0s</span>

          <span>
            {(totalDuration / 2).toFixed(1)}s
          </span>

          <span>
            {totalDuration.toFixed(1)}s
          </span>
        </div>

        <div className="timeline-line">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="timeline-block"
              style={{
                width: `${Math.max(
                  step.duration * 120,
                  100
                )}px`,
              }}
            >
              <strong>
                Step {index + 1}
              </strong>

              <small>
                {step.property} · {step.duration}s
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* STEP EDITOR */}

      <div className="steps-list">
        {steps.map((step, index) => (
          <div
            className="timeline-step"
            key={step.id}
          >
            <div className="step-number">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </div>

            {/* PROPERTY */}

            <div className="step-field">
              <label>Property</label>

              <select
                value={step.property}
                onChange={(event) =>
                  updateStep(
                    step.id,
                    "property",
                    event.target.value
                  )
                }
              >
                <option value="scale">
                  Scale
                </option>

                <option value="rotate">
                  Rotate
                </option>

                <option value="x">
                  X Position
                </option>

                <option value="y">
                  Y Position
                </option>
              </select>
            </div>

            {/* VALUE */}

            <div className="step-field">
              <label>Value</label>

              <input
                type="number"
                value={step.value}
                onChange={(event) =>
                  updateStep(
                    step.id,
                    "value",
                    event.target.value
                  )
                }
              />
            </div>

            {/* DURATION */}

            <div className="step-field">
              <label>Duration</label>

              <input
                type="number"
                min="0.1"
                max="5"
                step="0.1"
                value={step.duration}
                onChange={(event) =>
                  updateStep(
                    step.id,
                    "duration",
                    event.target.value
                  )
                }
              />
            </div>

            {/* ACTIONS */}

            <div className="step-actions">

              <button
                className="move-step"
                onClick={() =>
                  moveStep(index, "up")
                }
                disabled={index === 0}
                aria-label={`Move step ${
                  index + 1
                } up`}
              >
                ↑
              </button>

              <button
                className="move-step"
                onClick={() =>
                  moveStep(index, "down")
                }
                disabled={
                  index === steps.length - 1
                }
                aria-label={`Move step ${
                  index + 1
                } down`}
              >
                ↓
              </button>

              <button
                className="remove-step"
                onClick={() =>
                  removeStep(step.id)
                }
                disabled={steps.length === 1}
                aria-label={`Remove step ${
                  index + 1
                }`}
              >
                ×
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* GENERATED CODE */}

      <div className="timeline-code">
        <div className="timeline-code-header">
          <div>
            <span>GENERATED SEQUENCE</span>

            <h3>Motion configuration</h3>
          </div>

          <button onClick={copyCode}>
            {copied
              ? "✓ Copied"
              : "Copy"}
          </button>
        </div>

        <pre>
          {generateSequenceCode()}
        </pre>
      </div>

    </section>
  );
}

export default TimelineBuilder;