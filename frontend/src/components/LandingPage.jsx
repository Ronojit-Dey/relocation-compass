import React from "react";
import { Compass, ArrowRight, PieChart, Scale, Globe } from "lucide-react";
import HeroScene from "./HeroScene";

export default function LandingPage({ onExplore }) {
  return (
    <div className="bg-background text-on-surface min-h-screen selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Top Brand Header */}
      <header className="w-full absolute top-0 left-0 p-6 md:p-12 z-50 flex justify-between items-center max-w-container-max mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full shadow-neo-sm bg-background flex items-center justify-center">
            <Compass className="w-6 h-6 text-primary" />
          </div>
          <span className="font-headline font-semibold text-2xl text-on-surface tracking-tight">
            Compass
          </span>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="w-full max-w-container-max mx-auto px-6 md:px-12 pt-32 pb-24 relative">
        {/* Hero Section */}
        <section className="relative min-h-[520px] flex flex-col items-center justify-center text-center z-10 mb-20 mt-4">
          {/* Abstract Neomorphic Blob + 3D Canvas Background */}
          <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none">
            <div className="w-[380px] h-[380px] md:w-[500px] md:h-[500px] animate-organic-blob bg-gradient-to-br from-primary-container to-brand-dark opacity-25 blur-[70px]"></div>
          </div>

          <div className="w-full max-w-xs h-40 mx-auto -mb-6 opacity-75">
            <HeroScene />
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-[88px] leading-[1.1] text-on-surface tracking-tight">
              Relocation Compass
            </h1>
            <p className="text-lg md:text-xl font-medium text-on-surface/75 max-w-2xl mx-auto leading-relaxed">
              Know your true worth, anywhere in the world. Seamlessly translate your lifestyle across borders.
            </p>

            <div className="pt-6">
              <button
                onClick={onExplore}
                className="px-10 py-5 rounded-full bg-primary-container text-on-primary-container font-headline text-lg font-bold shadow-neo-button hover:shadow-neo-inset transition-all duration-300 flex items-center gap-3 mx-auto group border border-white/40 cursor-pointer"
              >
                Explore the Dashboard
                <ArrowRight className="w-5 h-5 text-on-primary-container group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-neo flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-background shadow-neo-sm flex items-center justify-center">
              <PieChart className="w-9 h-9 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold text-on-surface mb-2">
                Granular cost categories
              </h3>
              <p className="text-on-surface-variant text-base">
                Break down living expenses beyond standard indices.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-neo flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-background shadow-neo-sm flex items-center justify-center">
              <Scale className="w-9 h-9 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold text-on-surface mb-2">
                Real salary equivalence
              </h3>
              <p className="text-on-surface-variant text-base">
                Calculate purchasing power, not just conversion rates.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-neo flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-background shadow-neo-sm flex items-center justify-center">
              <Globe className="w-9 h-9 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold text-on-surface mb-2">
                Global city coverage
              </h3>
              <p className="text-on-surface-variant text-base">
                Data spanning hundreds of metropolitan hubs worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}