import React from "react";
import { Database, Server, Calculator, BarChart3, Cloud, Layers, CheckCircle2 } from "lucide-react";

const PIPELINE_STEPS = [
  {
    step: "01",
    phase: "Edge Distribution & Routing",
    title: "Global CDN & Query Normalization",
    description:
      "The client React SPA is globally distributed via Cloudflare Pages edge network. User search tokens, currency conversions, and metropolitan inputs are parsed with edge-cached assets.",
    icon: Cloud,
    badge: "Cloudflare Pages",
    tags: ["React SPA", "Vite Bundler", "Global Edge CDN", "Client Normalization"],
    side: "left"
  },
  {
    step: "02",
    phase: "Async Backend Orchestration",
    title: "FastAPI Engine on Render Web Service",
    description:
      "A containerized high-performance ASGI server on Render intercepts requests, validating incoming payloads using Pydantic V2 models and initiating asynchronous non-blocking I/O routines.",
    icon: Server,
    badge: "Render Web Service",
    tags: ["FastAPI Async", "Uvicorn Server", "Pydantic V2", "CORS Middleware"],
    side: "right"
  },
  {
    step: "03",
    phase: "Cluster Retrieval & Aggregation",
    title: "Asynchronous MongoDB Atlas Sharding",
    description:
      "FastAPI queries indexed MongoDB Atlas M0 document shards via Motor/PyMongo, retrieving median rent distributions, grocery baskets, transit passes, and utilities with sub-millisecond query execution.",
    icon: Database,
    badge: "MongoDB Atlas M0",
    tags: ["Motor Async Driver", "Shard Indexing", "Document Pipeline", "PyMongo 4.x"],
    side: "left"
  },
  {
    step: "04",
    phase: "Mathematical Core",
    title: "Purchasing Power Parity (PPP) Matrix",
    description:
      "The computation engine evaluates cross-city cost vectors, calculating weighted expense ratios to determine the precise gross equivalent compensation required to sustain lifestyle parity.",
    icon: Calculator,
    badge: "Math Engine",
    tags: ["Weighted Variance", "Lifestyle Parity", "Exchange Rates", "Salary Vectors"],
    side: "right"
  },
  {
    step: "05",
    phase: "Visual Synthesizer & Exports",
    title: "Dynamic Visual & CSV Generation",
    description:
      "Calculated matrices stream back to the UI, rendering comparative Recharts visualizers, localized currency conversions, and automated downloadable CSV relocation dossiers.",
    icon: BarChart3,
    badge: "Client Synthesizer",
    tags: ["Recharts Visualizer", "CSV Stream Export", "Currency Engine", "Neomorphic UI"],
    side: "left"
  }
];

export default function PipelineRoadmap() {
  return (
    <section className="w-full py-16 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background shadow-neo-sm text-[#00ed64] text-xs font-bold uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5 text-[#00ed64]" />
          Behind The Architecture
        </div>
        <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-on-surface tracking-tight">
          How the Pipeline Works
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">
          Trace how user search requests flow from edge infrastructure through the Render runtime to MongoDB Atlas.
        </p>
      </div>

      {/* Timeline Tree Container */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        {/* Central Vertical Spine (True Neomorphic Inset with #00ed64 Glowing Core) */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-2 -translate-x-1/2 bg-background shadow-neo-inset rounded-full overflow-hidden p-[1px]">
          <div className="w-full h-full bg-gradient-to-b from-[#00ed64]/20 via-[#00ed64] to-[#00ed64]/20" />
        </div>

        <div className="space-y-12 md:space-y-16">
          {PIPELINE_STEPS.map((item) => {
            const Icon = item.icon;
            const isLeft = item.side === "left";

            return (
              <div
                key={item.step}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? "md:flex-row-reverse" : ""
                } gap-8 group`}
              >
                {/* Content Card (Full Neomorphic Structure: bg-background + shadow-neo + no flat borders) */}
                <div className="ml-12 md:ml-0 md:w-1/2 flex justify-center w-full">
                  <div className="w-full max-w-lg bg-background rounded-3xl p-6 md:p-8 shadow-neo transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    {/* Top Row: Phase + Neomorphic Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold text-[#00ed64] uppercase tracking-wider">
                        {item.phase}
                      </span>
                      <span className="px-3 py-1 bg-background shadow-neo-sm text-[#00ed64] rounded-full text-[11px] font-semibold">
                        {item.badge}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-headline font-bold text-lg md:text-xl text-on-surface mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Micro Tech Tags with Neomorphic Inset Pills */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-on-surface-variant/10">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-on-surface-variant bg-background px-2.5 py-1 rounded-lg shadow-neo-sm"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#00ed64]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Step Waypoint Badge (Neomorphic Raised with Glowing #00ed64 Accent) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-6 flex items-center justify-center z-20">
                  <div className="w-12 h-12 rounded-2xl bg-background shadow-neo flex flex-col items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#00ed64]" />
                    <span className="text-[10px] font-black text-on-surface-variant leading-none mt-0.5">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Spacer on Opposite Side for Balanced Desktop Alternation */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}