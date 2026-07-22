"use client";

import Image from "next/image";
import { AudioLines, Film, Focus, Layers3, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { brand, workflowStages } from "./content";

type PipelineStage = (typeof workflowStages)[number];

function StageVisual({ stage, index }: { stage: PipelineStage; index: number }) {
  const showVideo = stage.visual === "motion" || stage.visual === "atmosphere";

  return (
    <div className={`compositor compositor--${stage.visual}`} data-testid="active-compositor">
      <div className="compositor-media">
        {showVideo ? (
          <video
            key={stage.visual}
            autoPlay
            muted
            loop
            playsInline
            poster={stage.imageSrc}
            aria-label={`${stage.title} preview`}
          >
            <source src="/videos/demo-1.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            key={stage.imageSrc}
            src={stage.imageSrc}
            alt="Generated scene from the dusky room reel"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            priority={index === 0}
          />
        )}
      </div>

      <div className="compositor-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{stage.artifact}</span>
      </div>

      {stage.visual === "story" ? (
        <div className="story-overlay">
          <span>Source idea</span>
          <p>&ldquo;{brand.sourceIdea}&rdquo;</p>
          <div className="storyboard-strip" aria-hidden="true">
            {["/frames/dusk-room-01.jpg", "/frames/dusk-room-02.jpg", "/frames/dusk-room-03.jpg"].map(
              (src, frameIndex) => (
                <div key={src}>
                  <Image src={src} alt="" fill sizes="160px" />
                  <small>Scene {frameIndex + 1}</small>
                </div>
              ),
            )}
          </div>
        </div>
      ) : null}

      {stage.visual === "character" ? (
        <div className="character-focus" aria-hidden="true">
          <span><Focus size={15} /> Character reference</span>
        </div>
      ) : null}

      {stage.visual === "setting" ? (
        <div className="setting-guide" aria-hidden="true">
          <span>16:9 environment</span>
          <i />
        </div>
      ) : null}

      {stage.visual === "composition" ? (
        <div className="composition-overlay" aria-hidden="true">
          <span>Character</span>
          <span>+</span>
          <span>Setting</span>
          <span><Layers3 size={15} /> Connected frame</span>
        </div>
      ) : null}

      {stage.visual === "motion" ? (
        <div className="motion-overlay" aria-hidden="true">
          <Play fill="currentColor" size={16} />
          <span>5 sec scene motion</span>
        </div>
      ) : null}

      {stage.visual === "sequence" ? (
        <div className="sequence-overlay" aria-hidden="true">
          {["01", "02", "03", "04"].map((label, frameIndex) => (
            <div key={label}>
              <Image
                src={`/frames/dusk-room-0${frameIndex + 1}.jpg`}
                alt=""
                fill
                sizes="130px"
              />
              <span>{label}</span>
            </div>
          ))}
          <p><Film size={15} /> Scenes joined in order</p>
        </div>
      ) : null}

      {stage.visual === "atmosphere" ? (
        <div className="sound-overlay" aria-hidden="true">
          <div className="sound-wave">
            {[22, 38, 66, 45, 78, 54, 84, 36, 62, 28, 70, 44, 76, 32].map((height, barIndex) => (
              <i key={`${height}-${barIndex}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <p><AudioLines size={16} /> Rain / typing / room tone</p>
          <span><Sparkles size={15} /> Ready to watch</span>
        </div>
      ) : null}

      <div className="compositor-tool">
        <Image src={stage.logoSrc} alt="" width={28} height={28} unoptimized />
        <div>
          <span>Active service</span>
          <strong>{stage.tool}</strong>
        </div>
      </div>
    </div>
  );
}

export function PipelineExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const activeStage = workflowStages[activeIndex];

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const nextIndex = Number((visibleEntry.target as HTMLElement).dataset.stageIndex);
          setActiveIndex(nextIndex);
        }
      },
      { rootMargin: "-24% 0px -48%", threshold: [0.1, 0.35, 0.6] },
    );

    stageRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const activateStage = (index: number) => {
    setActiveIndex(index);
  };

  const moveToStage = (index: number) => {
    activateStage(index);
    const stageNode = stageRefs.current[index];

    if (stageNode && typeof stageNode.scrollIntoView === "function") {
      stageNode.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="pipeline-experience">
      <div className="pipeline-index" aria-label="Pipeline stages">
        {workflowStages.map((stage, index) => (
          <button
            key={stage.id}
            className={index === activeIndex ? "is-active" : ""}
            type="button"
            aria-label={`View ${stage.shortTitle} stage`}
            aria-pressed={index === activeIndex}
            onClick={() => moveToStage(index)}
            onMouseEnter={() => activateStage(index)}
            onFocus={() => activateStage(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage.shortTitle}</strong>
          </button>
        ))}
      </div>

      <div className="pipeline-scroll-grid">
        <div className="pipeline-step-stack">
          {workflowStages.map((stage, index) => (
            <article
              key={stage.id}
              ref={(node) => {
                stageRefs.current[index] = node;
              }}
              data-stage-index={index}
              data-testid={`workflow-node-${stage.id}`}
              className={`pipeline-step ${index === activeIndex ? "is-active" : ""}`}
              tabIndex={0}
              onMouseEnter={() => activateStage(index)}
              onFocus={() => activateStage(index)}
            >
              <div className="pipeline-step-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="pipeline-endpoint">POST {stage.endpoint}</p>
                <h3>{stage.title}</h3>
                <p className="pipeline-description">{stage.description}</p>
                <div className="pipeline-transfer">
                  <span>{stage.input}</span>
                  <i aria-hidden="true" />
                  <strong>{stage.output}</strong>
                </div>
                <p className="pipeline-model">{stage.tool} <span>{stage.provider}</span></p>
              </div>
            </article>
          ))}
        </div>

        <div className="pipeline-sticky-canvas">
          <StageVisual stage={activeStage} index={activeIndex} />
        </div>
      </div>
    </div>
  );
}
