import React from "react";
import { Compass, Mail, ExternalLink, Code2, Share2 } from "lucide-react";

export default function Footer({ onExplore }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background pt-12 pb-8 border-t border-outline-variant/20 relative mt-8">
      <div className="max-w-container-max mx-auto px-6 md:px-12 flex flex-col gap-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full shadow-neo-sm bg-background flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <span className="font-headline font-bold text-xl text-on-surface tracking-tight">
                Relocation Compass
              </span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              A full-stack, data-driven purchasing power calculator translating living expenses and compensation across global metropolitan hubs.
            </p>
          </div>

          {/* Architecture Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#00ed64] uppercase tracking-wider">
              Deployment Architecture
            </h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ed64]" />
                Cloudflare Pages (Frontend)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ed64]" />
                FastAPI Engine (Render)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ed64]" />
                MongoDB Atlas Cluster
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Developer Connect
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {/* GitHub SVG */}
              <a
                href="https://github.com/Ronojit-Dey/relocation-compass"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-background shadow-neo flex items-center justify-center text-on-surface hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
                aria-label="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="https://www.linkedin.com/in/ranajit-dey-4b8911275/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-background shadow-neo flex items-center justify-center text-on-surface hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Email Icon */}
              <a
                href="rana.062004@gmail.com"
                className="w-10 h-10 rounded-xl bg-background shadow-neo flex items-center justify-center text-on-surface hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Inset Divider & Copyright */}
        <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <div>
            &copy; {currentYear} Relocation Compass. Open-source cost of living analytics.
          </div>
          <div className="flex gap-6">
            <button
              onClick={onExplore}
              className="hover:text-primary transition font-medium flex items-center gap-1 cursor-pointer"
            >
              Launch Dashboard <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}