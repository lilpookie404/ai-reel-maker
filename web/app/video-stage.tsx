"use client";

import { Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

import { demoVideos } from "./content";

type DemoVideo = (typeof demoVideos)[number];

const soundVideo = demoVideos.find((video) => video.featured) ?? demoVideos[0];

export function VideoStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<DemoVideo>(soundVideo);
  const [hasStarted, setHasStarted] = useState(false);

  const handleWatchFilm = () => {
    setHasStarted(true);
    void videoRef.current?.play().catch(() => undefined);
  };

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="relative overflow-hidden rounded-[28px] bg-white/[0.075] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.42)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[20px] bg-black">
          <video
            ref={videoRef}
            key={activeVideo.src}
            className="aspect-video w-full bg-black object-cover opacity-90"
            controls
            data-testid="demo-video"
            playsInline
            preload="metadata"
            aria-label={activeVideo.title}
            onPlay={() => setHasStarted(true)}
          >
            <source src={activeVideo.src} type="video/mp4" />
          </video>

          {!hasStarted ? (
            <button
              className="absolute left-1/2 top-1/2 z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-black px-5 py-3 text-sm font-black text-white shadow-[0_18px_48px_rgba(0,0,0,0.45)] transition hover:scale-[1.03] hover:bg-[#111] focus:outline-none focus:ring-4 focus:ring-white/20 sm:text-base"
              type="button"
              aria-label="Watch Film"
              onClick={handleWatchFilm}
            >
              Watch Film
              <span className="grid size-7 place-items-center rounded-full bg-white text-black">
                <Play aria-hidden="true" fill="currentColor" size={14} />
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3">
        <div
          className="inline-flex rounded-full border border-white/10 bg-black/35 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          aria-label="Demo video version"
        >
          {demoVideos.map((video) => {
            const isActive = activeVideo.src === video.src;

            return (
              <button
                key={video.src}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                  isActive
                    ? "bg-[#f7f5ee] text-[#101010]"
                    : "text-white/58 hover:bg-white/[0.07] hover:text-white"
                }`}
                type="button"
                aria-label={`Show ${video.audio.toLowerCase()}`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveVideo(video);
                  setHasStarted(false);
                }}
              >
                {video.featured ? <Volume2 aria-hidden="true" size={15} /> : null}
                {video.audio}
              </button>
            );
          })}
        </div>
        <p className="text-center text-sm font-semibold text-white/48">{activeVideo.subtitle}</p>
      </div>
    </div>
  );
}
