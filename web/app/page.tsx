import { ArrowRight, Play, Sparkles, WandSparkles } from "lucide-react";

import { brand, metrics, modelStack, pipelineFlow, promptExample } from "./content";
import { VideoStage } from "./video-stage";

type ModelMarkProps = {
  mark: string;
  style: (typeof modelStack)[number]["markStyle"];
};

function ModelMark({ mark, style }: ModelMarkProps) {
  if (style === "minimax") {
    return (
      <span className="relative grid size-14 place-items-center" aria-hidden="true">
        <span className="absolute left-2 top-2 size-10 rounded-full bg-black/20" />
        <span className="absolute left-4 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[16px] border-l-[26px] border-y-transparent border-l-black" />
      </span>
    );
  }

  if (style === "flux") {
    return (
      <span className="relative grid size-14 place-items-center" aria-hidden="true">
        <span className="h-0 w-0 border-x-[24px] border-b-[42px] border-x-transparent border-b-black" />
        <span className="absolute bottom-3 h-0 w-0 border-x-[9px] border-b-[16px] border-x-transparent border-b-[#f7f5ee]" />
      </span>
    );
  }

  if (style === "seedance") {
    return (
      <span className="relative grid size-14 place-items-center" aria-hidden="true">
        <span className="size-12 rounded-full bg-black" />
        <span className="absolute ml-1 h-0 w-0 border-y-[12px] border-l-[19px] border-y-transparent border-l-[#f7f5ee]" />
      </span>
    );
  }

  if (style === "sound") {
    return (
      <span className="grid size-14 grid-cols-2 place-items-center gap-2 px-2" aria-hidden="true">
        <span className="h-10 w-3 rounded-full bg-black/28" />
        <span className="h-10 w-3 rounded-full bg-black/28" />
      </span>
    );
  }

  return (
    <span
      className="grid size-14 place-items-center rounded-[18px] bg-black text-2xl font-black text-[#f7f5ee]"
      aria-hidden="true"
    >
      {mark}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#151515] text-[#f7f5ee]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.10),transparent_27%),radial-gradient(circle_at_84%_9%,rgba(255,94,215,0.10),transparent_32%),linear-gradient(180deg,#242424_0%,#151515_46%,#101010_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:54px_54px] opacity-55" />

      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          className="font-display text-2xl font-semibold text-white"
          href="#top"
          aria-label="Vidora home"
        >
          {brand.name}
        </a>
        <div className="hidden items-center gap-8 text-sm font-semibold text-white/64 md:flex">
          <a className="transition hover:text-white" href="#action">
            Demo
          </a>
          <a className="transition hover:text-white" href="#models">
            Models
          </a>
          <a className="transition hover:text-white" href="#pipeline">
            Pipeline
          </a>
        </div>
        <a
          href="#action"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f7f5ee] px-5 py-2 text-sm font-black text-[#101010] shadow-[0_18px_50px_rgba(0,0,0,0.26)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          Watch demo
          <ArrowRight aria-hidden="true" size={16} />
        </a>
      </nav>

      <section id="top" className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-10 pt-5 sm:px-8 lg:pb-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-4 py-2 text-sm font-bold text-white/72 shadow-[0_18px_54px_rgba(0,0,0,0.20)]">
            <WandSparkles aria-hidden="true" size={16} />
            AI reel workflow demo
          </p>
          <h1 className="font-display max-w-5xl text-5xl font-semibold leading-[0.94] text-white sm:text-7xl lg:text-8xl">
            Turn story ideas into cinematic reels
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
            Vidora turns one story prompt into a multi-model reel flow with storyboard prompts,
            image generation, cohesive frames, motion clips, sound design, and final assembly.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl rounded-[24px] border border-white/10 bg-white/[0.055] p-4 shadow-[0_24px_78px_rgba(0,0,0,0.28)] backdrop-blur">
          <label className="block">
            <span className="mb-3 block text-sm font-semibold text-white/58">Story prompt</span>
            <textarea
              className="min-h-20 w-full resize-none rounded-[18px] border border-white/10 bg-[#1f1f1f] px-5 py-4 text-base leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#ff8ae5] focus:ring-4 focus:ring-[#ff5ed7]/18"
              defaultValue={promptExample}
              aria-label="Story prompt"
            />
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f7f5ee] px-5 py-3 text-sm font-black text-[#101010] shadow-[0_18px_52px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-white"
              type="button"
            >
              <Sparkles aria-hidden="true" size={17} />
              Generate demo
              <ArrowRight aria-hidden="true" size={17} />
            </button>
            <p className="max-w-sm text-sm leading-6 text-white/48">{brand.note}</p>
          </div>
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-display text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold text-white/42">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="action" className="mx-auto w-full max-w-7xl px-5 pb-14 pt-2 sm:px-8 lg:pb-20">
        <div className="mb-7 flex flex-col items-center gap-3 text-center">
          <p className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.14em] text-white/58">
            PRODUCT VIDEO
            <span className="grid h-[18px] w-6 place-items-center rounded-md bg-white/12">
              <Play aria-hidden="true" fill="currentColor" size={11} />
            </span>
          </p>
          <h2 className="font-display text-4xl font-semibold leading-none text-[#ffc8f3] sm:text-6xl">
            See Vidora in action
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-white/54 sm:text-base">
            Compare the sound-designed final reel with the pre-polish cut from the same generated
            sequence.
          </p>
        </div>
        <VideoStage />
      </section>

      <section id="models" className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl rounded-[30px] bg-[#f7f5ee] px-5 py-9 text-[#101010] shadow-[0_30px_80px_rgba(0,0,0,0.22)] sm:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.12em] text-black/40">
                Model stack
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-black sm:text-5xl">
                Every model had a job
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-black/52">
              The reel was generated through a chained flow: text planning, image generation,
              frame composition, short video generation, sound polish, and merge.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {modelStack.map((model) => (
              <article key={model.name} className="flex min-h-20 items-center gap-4">
                <ModelMark mark={model.mark} style={model.markStyle} />
                <div>
                  <h3 className="font-display text-2xl font-medium leading-tight text-black">
                    {model.name}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-black/48">{model.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 hidden grid-cols-6 gap-0 lg:grid">
            {modelStack.map((model, index) => (
              <div
                key={model.stage}
                className={`border-t-2 pt-4 text-sm font-black ${
                  index === 0 ? "border-[#ff5ed7] text-black" : "border-black/16 text-black/58"
                }`}
              >
                {model.stage}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pipeline"
        className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:py-16"
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[#ff8ae5]">
            Pipeline
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-5xl">
            From prompt to finished reel
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/56">
            A compact roadmap of the original backend workflow, framed for the landing page rather
            than documentation.
          </p>
        </div>

        <div className="grid gap-3">
          {pipelineFlow.map((step, index) => (
            <article
              key={step.title}
              className="grid gap-4 rounded-[18px] border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] sm:grid-cols-[44px_0.8fr_1.2fr] sm:items-center"
            >
              <span className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-sm font-black text-[#ffc8f3] ring-1 ring-white/10">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-xs font-black text-[#ff8ae5]">{step.model}</p>
              </div>
              <p className="text-sm leading-6 text-white/52">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 pb-10 text-sm text-white/42 sm:px-8">
        <span>{brand.name} demo</span>
        <span>Static demo. No backend calls or API tokens.</span>
      </footer>
    </main>
  );
}
