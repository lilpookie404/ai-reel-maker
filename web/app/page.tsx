import {
  ArrowRight,
  Film,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  WandSparkles,
} from "lucide-react";

import { brand, demoVideos, metrics, pipelineSteps, promptExample } from "./content";

const featuredVideo = demoVideos.find((video) => video.featured) ?? demoVideos[0];
const secondaryVideos = demoVideos.filter((video) => !video.featured);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171511]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a className="flex items-center gap-3" href="#top" aria-label="Vidora home">
          <span className="grid size-10 place-items-center rounded-full bg-[#171511] text-[#f7f4ee]">
            <Sparkles aria-hidden="true" size={18} />
          </span>
          <span className="text-xl font-semibold tracking-normal">{brand.name}</span>
        </a>
        <a
          href="#action"
          className="hidden items-center gap-2 rounded-full border border-[#171511]/15 bg-white/70 px-4 py-2 text-sm font-medium text-[#171511] shadow-sm shadow-[#171511]/5 backdrop-blur transition hover:bg-white sm:flex"
        >
          <Play aria-hidden="true" size={16} />
          Watch demo
        </a>
      </nav>

      <section id="top" className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e85d3f]/25 bg-[#fffaf3] px-4 py-2 text-sm font-semibold text-[#9d321f] shadow-sm">
            <WandSparkles aria-hidden="true" size={16} />
            Static AI video workflow demo
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#171511] sm:text-6xl lg:text-7xl">
            Turn ideas into vivid cinematic videos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#625b50] sm:text-xl">
            Vidora shows how a story prompt can move through storyboard, scene continuity,
            sound design, and final reel assembly.
          </p>
        </div>

        <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-[#171511]/10 bg-[#fffaf3] p-3 shadow-2xl shadow-[#171511]/10">
          <div className="rounded-[1.5rem] border border-[#171511]/10 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <label className="flex-1">
                <span className="mb-3 block text-sm font-semibold text-[#625b50]">
                  Story idea
                </span>
                <textarea
                  className="min-h-28 w-full resize-none rounded-3xl border border-[#171511]/10 bg-[#f7f4ee] px-5 py-4 text-base leading-7 text-[#171511] outline-none ring-[#d8f275] transition placeholder:text-[#8b8377] focus:ring-4"
                  defaultValue={promptExample}
                  aria-label="Story idea"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#171511] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#171511]/20 transition hover:-translate-y-0.5 hover:bg-[#2c2923]"
                  type="button"
                >
                  <Sparkles aria-hidden="true" size={18} />
                  Generate demo
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
                <p className="max-w-xs text-sm leading-6 text-[#736a5f]">{brand.note}</p>
              </div>
            </div>
          </div>
        </div>

        <section id="action" className="mx-auto w-full max-w-6xl">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9d321f]">
                Product video
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[#171511] sm:text-4xl">
                See Vidora in action
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#625b50]">
              A generated 60-second reel with scene continuity and AI-added sound effects.
            </p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#171511]/10 bg-[#171511] p-2 shadow-2xl shadow-[#171511]/20">
            <video
              className="aspect-video w-full rounded-[1.5rem] bg-black object-cover"
              controls
              data-testid="demo-video"
              playsInline
              preload="metadata"
              aria-label={featuredVideo.title}
            >
              <source src={featuredVideo.src} type="video/mp4" />
            </video>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d8f275] px-4 py-2 text-sm font-semibold text-[#171511]">
              <Volume2 aria-hidden="true" size={16} />
              {featuredVideo.audio}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#625b50] ring-1 ring-[#171511]/10">
              <Film aria-hidden="true" size={16} />
              {featuredVideo.subtitle}
            </span>
          </div>
        </section>
      </section>

      <section className="border-y border-[#171511]/10 bg-[#171511] px-5 py-12 text-[#f7f4ee] sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-l border-[#d8f275]/40 pl-5">
              <p className="text-4xl font-semibold">{metric.value}</p>
              <p className="mt-2 text-sm text-[#c9c0b3]">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9d321f]">
            Pipeline
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#171511] sm:text-4xl">
            From prompt to finished reel
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#625b50]">
            The original backend connects prompt expansion, image generation, frame extraction,
            video generation, audio enhancement, and merging into one automated workflow.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {pipelineSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#171511]/10 bg-white/75 p-5 shadow-sm shadow-[#171511]/5"
            >
              <span className="mb-5 grid size-9 place-items-center rounded-full bg-[#171511] text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-[#171511]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#625b50]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9d321f]">
              Outputs
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-[#171511]">
              Demo reel variants
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#625b50]">
            Compare the finished sound-enhanced reel with the raw generated output.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#171511]/10 bg-[#fffaf3] p-6 shadow-xl shadow-[#171511]/10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9d321f]">
              Finished reel
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#171511]">{featuredVideo.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#625b50]">
              The main product video above uses {featuredVideo.src} and includes{" "}
              {featuredVideo.audio.toLowerCase()}.
            </p>
          </div>

          {secondaryVideos.map((video) => (
            <article
              key={video.src}
              className="rounded-[2rem] border border-[#171511]/10 bg-white p-4 shadow-xl shadow-[#171511]/10"
            >
              <video
                className="aspect-video w-full rounded-[1.5rem] bg-black object-cover"
                controls
                data-testid="demo-video"
                playsInline
                preload="metadata"
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#171511]">{video.title}</h3>
                  <p className="text-sm text-[#625b50]">{video.subtitle}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f2eee6] px-3 py-2 text-sm font-semibold text-[#625b50]">
                  <VolumeX aria-hidden="true" size={16} />
                  {video.audio}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
