import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Mail,
  Play,
} from "lucide-react";

import { architectureNotes, brand, endpoints, workflowStages } from "./content";
import { PipelineExperience } from "./pipeline-experience";
import { VideoStage } from "./video-stage";

function GitHubLogo() {
  return (
    <svg
      className="github-logo"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.36 6.84 9.72.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.37 9.37 0 0 1 12 6.97c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.32 8.02h4.36V23H.32V8.02Zm7.44 0h4.18v2.05H12c.58-1.1 2-2.26 4.12-2.26 4.41 0 5.22 2.9 5.22 6.67V23h-4.35v-7.55c0-1.8-.03-4.11-2.51-4.11-2.51 0-2.9 1.96-2.9 3.98V23H7.76V8.02Z" />
    </svg>
  );
}

function EndpointRail() {
  return (
    <div className="endpoint-rail" aria-label="FastAPI endpoints">
      <div className="endpoint-track">
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} aria-hidden={copyIndex === 1} className="endpoint-set">
            {endpoints.map((endpoint) => (
              <span key={`${copyIndex}-${endpoint}`}>
                <Code2 aria-hidden="true" size={17} />
                POST {endpoint}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-nav">
        <a className="site-logo" href="#top" aria-label="Vidora home">
          {brand.name}
        </a>
        <nav aria-label="Primary navigation">
          <a href="#idea">Idea</a>
          <a href="#process">Process</a>
          <a href="#reels">Reels</a>
          <a href="#build">Build</a>
        </nav>
        <a className="nav-action" href="#reels">
          <Play aria-hidden="true" fill="currentColor" size={14} />
          View reels
        </a>
      </header>

      <section className="hero" id="top">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/frames/dusk-room-01.jpg"
          aria-hidden="true"
          data-testid="hero-video"
        >
          <source src="/videos/demo-1.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />

        <div className="hero-content">
          <p className="hero-kicker">AI reel maker / Built by {brand.creator}</p>
          <h1>Vidora turns scene ideas into reels.</h1>
          <p className="hero-copy">
            I built an API that plans each scene, creates its world, moves it, adds atmosphere,
            and assembles the result.
          </p>
          <div className="hero-actions">
            <a href="#process">
              Follow the build
              <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a href="#reels">
              Watch the output
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>

        <div className="hero-route" aria-label="Reel generation sequence">
          {workflowStages.map((stage) => (
            <span key={stage.id}>{stage.shortTitle}</span>
          ))}
          <i aria-hidden="true" />
        </div>
      </section>

      <section className="idea-section reveal-on-scroll" id="idea">
        <div className="section-shell idea-grid">
          <div>
            <p className="section-kicker">The starting point</p>
            <h2>It begins with one sentence.</h2>
          </div>
          <blockquote>&ldquo;{brand.sourceIdea}&rdquo;</blockquote>
        </div>
        <div className="idea-flow" aria-hidden="true">
          <div>
            {workflowStages.map((stage) => (
              <span key={stage.id}>{stage.shortTitle}<ArrowRight size={17} /></span>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section-shell process-heading reveal-on-scroll">
          <p className="section-kicker">Inside the orchestration</p>
          <h2>What happens between the sentence and the reel.</h2>
          <p>
            Every stage receives a real artifact, adds one deliberate layer, and passes the work
            forward. The sequence is the system.
          </p>
        </div>
        <div className="section-shell">
          <PipelineExperience />
        </div>
      </section>

      <section className="reels-section" id="reels">
        <div className="section-shell reels-heading reveal-on-scroll">
          <div>
            <p className="section-kicker">The generated work</p>
            <h2>The reels tell the rest.</h2>
          </div>
          <p>
            Two scene ideas, generated through the same modular architecture. The dusky room run
            includes the atmosphere service added later in the project.
          </p>
        </div>
        <div className="section-shell reveal-on-scroll">
          <VideoStage />
        </div>
      </section>

      <section className="build-section" id="build">
        <div className="section-shell build-intro reveal-on-scroll">
          <p className="section-kicker">How I built it</p>
          <h2>Services, not a black box.</h2>
          <p>{brand.note}</p>
        </div>

        <EndpointRail />

        <div className="section-shell architecture-grid">
          {architectureNotes.map((note, index) => (
            <article key={note.title} className="reveal-on-scroll">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Braces aria-hidden="true" size={25} />
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="section-shell footer-grid">
          <div>
            <p className="footer-logo">Vidora</p>
            <p>A 2025 AI reel maker by Vaishnavi Awadhiya.</p>
          </div>

          <a className="footer-top" href="#top">
            Back to top
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>

          <div className="social-links">
            <a
              href="https://github.com/lilpookie404/vidora"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubLogo />
            </a>
            <a href="mailto:vaishnaviawadhiya2811@gmail.com" aria-label="Email">
              <Mail aria-hidden="true" size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/vaishnavi-awadhiya/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInLogo />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
