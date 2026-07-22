"use client";

import Image from "next/image";
import { Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

import { demoVideos } from "./content";

type DemoVideo = (typeof demoVideos)[number];

const featuredVideo = demoVideos.find((video) => video.featured) ?? demoVideos[0];

export function VideoStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<DemoVideo>(featuredVideo);
  const [hasStarted, setHasStarted] = useState(false);

  const playActiveReel = () => {
    setHasStarted(true);
    void videoRef.current?.play().catch(() => undefined);
  };

  return (
    <div className="reel-gallery">
      <div className="reel-player">
        <video
          ref={videoRef}
          key={activeVideo.src}
          controls
          playsInline
          preload="metadata"
          poster={activeVideo.poster}
          data-testid="demo-video"
          aria-label={`${activeVideo.title} reel`}
          onPlay={() => setHasStarted(true)}
        >
          <source src={activeVideo.src} type="video/mp4" />
        </video>

        <div className="reel-player-label">
          <span>{activeVideo.subtitle}</span>
          <strong>{activeVideo.audio}</strong>
        </div>

        {!hasStarted ? (
          <button
            className="reel-play-button"
            type="button"
            aria-label={`Play ${activeVideo.title} reel`}
            onClick={playActiveReel}
          >
            <Play aria-hidden="true" fill="currentColor" size={20} />
          </button>
        ) : null}
      </div>

      <div className="reel-details">
        <p className="section-kicker">Generated reels</p>
        <h3>{activeVideo.title}</h3>
        <blockquote>&ldquo;{activeVideo.brief}&rdquo;</blockquote>
        <p>{activeVideo.note}</p>

        <div className="reel-selector" aria-label="Choose a generated reel">
          {demoVideos.map((video, index) => {
            const isActive = activeVideo.src === video.src;

            return (
              <button
                key={video.src}
                type="button"
                className={isActive ? "is-active" : ""}
                aria-label={`Show ${video.title} reel`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveVideo(video);
                  setHasStarted(false);
                }}
              >
                <span className="reel-selector-image">
                  <Image src={video.poster} alt="" fill sizes="130px" />
                </span>
                <span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{video.title}</strong>
                  <em>{video.audio}</em>
                </span>
                {video.featured ? <Volume2 aria-hidden="true" size={17} /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
