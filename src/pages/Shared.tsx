import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import "./Shared.css";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  number: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Interface Design",
    category: "DESIGN",
    description:
      "Explore how shared layout animations can transform a simple card into an immersive project view.",
    number: "01",
  },
  {
    id: 2,
    title: "Motion System",
    category: "DEVELOPMENT",
    description:
      "Build fluid interfaces where elements smoothly transition between different visual states.",
    number: "02",
  },
  {
    id: 3,
    title: "Creative Direction",
    category: "ANIMATION",
    description:
      "Use Motion to create expressive transitions that connect one interface state to another.",
    number: "03",
  },
  {
    id: 4,
    title: "Digital Product",
    category: "PRODUCT",
    description:
      "Combine layoutId, gestures and transitions to create polished product experiences.",
    number: "04",
  },
];

function Shared() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  return (
    <main className="shared-page">
      <section className="shared-hero">
        <div className="shared-label">06 / SHARED LAYOUT</div>

        <h1>
          Shared <span>Motion</span>
        </h1>

        <p>
          Transform cards into detailed views using shared layout
          animations and smooth transitions.
        </p>
      </section>

      <section className="shared-demo">
        <div className="shared-demo-header">
          <div>
            <span>SHARED ELEMENTS</span>
            <h2>Click a card to expand</h2>
          </div>

          <div className="shared-tech">layoutId</div>
        </div>

        <div className="shared-grid">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              className="shared-card"
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="shared-card-top">
                <motion.div
                  className="shared-icon"
                  layoutId={`icon-${project.id}`}
                >
                  ✦
                </motion.div>

                <span>{project.number}</span>
              </div>

              <div className="shared-card-content">
                <small>{project.category}</small>

                <motion.h3 layoutId={`title-${project.id}`}>
                  {project.title}
                </motion.h3>

                <p>{project.description}</p>
              </div>

              <div className="shared-arrow">↗</div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="shared-explanation">
        <div className="shared-info-card">
          <span>01</span>
          <h3>layoutId</h3>
          <p>
            Motion connects elements with the same layoutId and
            automatically animates between their positions.
          </p>
        </div>

        <div className="shared-info-card">
          <span>02</span>
          <h3>Shared Element</h3>
          <p>
            The selected card smoothly transforms into the larger
            modal instead of instantly switching components.
          </p>
        </div>

        <div className="shared-info-card">
          <span>03</span>
          <h3>AnimatePresence</h3>
          <p>
            The modal and backdrop can enter and exit smoothly
            while React conditionally renders the content.
          </p>
        </div>
      </section>

      <section className="shared-code">
        <div className="shared-code-title">
          <span>SHARED LAYOUT CONFIGURATION</span>
          <b>TypeScript</b>
        </div>

        <pre>{`<motion.div
  layoutId="project-1"
>
  Project Card
</motion.div>

<AnimatePresence>
  {selectedProject && (
    <motion.div
      layoutId={\`project-\${selectedProject.id}\`}
    >
      Project Details
    </motion.div>
  )}
</AnimatePresence>`}</pre>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="shared-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            <div className="shared-modal-wrapper">
              <motion.div
                className="shared-modal"
                layoutId={`project-${selectedProject.id}`}
              >
                <button
                  className="shared-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project"
                >
                  ×
                </button>

                <motion.div
                  className="shared-modal-icon"
                  layoutId={`icon-${selectedProject.id}`}
                >
                  ✦
                </motion.div>

                <div className="shared-modal-number">
                  {selectedProject.number}
                </div>

                <small>{selectedProject.category}</small>

                <motion.h2 layoutId={`title-${selectedProject.id}`}>
                  {selectedProject.title}
                </motion.h2>

                <p>{selectedProject.description}</p>

                <div className="shared-modal-footer">
                  <span>Shared Layout Animation</span>

                  <button
                    onClick={() => setSelectedProject(null)}
                  >
                    Close ↗
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Shared;