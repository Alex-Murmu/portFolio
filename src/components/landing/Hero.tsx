"use client";
import { heroConfig } from "@/config/Hero";
import { Copy, Music } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const paths = {
  x: "M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z",
  linkedin: "M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM88.1,96H64V184H88.1ZM76.1,80A14.1,14.1,0,1,1,62,65.9h.1A14.1,14.1,0,0,1,76.1,80ZM184,96H160V112h-.3a20.8,20.8,0,0,0-18.7-10c-20.2,0-23.9,13.7-23.9,27.9V184h24V132c0-12.8,.2-29.3,17.9-29.3s20.6,13.9,20.6,28V184h24Z",
  github: "M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z",
  youtube: "M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C70.44,216.12,125,216,128,216s57.56.12,91.84-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52ZM112,160V96l64,32Z",
  instagram: "M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z",
  pinterest: "M216,128a88,88,0,0,1-84.09,87.45C118,191.75,124.08,165.19,128,152c-3.92-7.84-16-20-16-32a40,40,0,0,1,77.19-13.8A64,64,0,0,1,96,164c-8,0-8-8,0-8a54.47,54.47,0,0,0,14-2c13.63-4.48,24-16,24-36a24,24,0,0,0-48,0c0,16,8,24,8,32-10,26-16,48-16,64a88,88,0,1,1,134-80,88.12,88.12,0,0,1-8,36Z",
  peerlist: "M230.92,212c-15.23-26.33-38.7-48-54.71-65.49-9.3-10.15-6.56-22.26-3.18-33.12a68,68,0,1,0-110.06,0c3.38,10.86,6.12,23-3.18,33.12C43.78,164,20.31,185.67,5.08,212a8,8,0,0,0,13.85,8c18.84-32.61,52-59.67,72.3-76.32a52.34,52.34,0,0,1-3.23-15.68,52,52,0,1,1,104,0,52.34,52.34,0,0,1-3.23,15.68c20.26,16.65,53.46,43.71,72.3,76.32a8,8,0,0,0,13.85-8Z",
  mail: "M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z",
} as const;

export default function Hero() {
  const { name, avatar } = heroConfig;
  const email = "ft.alexrayen@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const socialLinks: { label: string; href: string; path: string }[] = [
    { label: "X", href: "https://x.com/AlexMurmu24", path: paths.x },
    { label: "LinkedIn", href: "www.linkedin.com/in/alex-murmu", path: paths.linkedin },
    { label: "GitHub", href: "https://github.com/Alex-Murmu/", path: paths.github },
    { label: "YouTube", href: "https://youtube.com/", path: paths.youtube },
    { label: "Instagram", href: "https://instagram.com/", path: paths.instagram },
    { label: "Pinterest", href: "https://pinterest.com/ramxcodes", path: paths.pinterest },
    { label: "Peerlist", href: "https://peerlist.io/ramxcodes", path: paths.peerlist },
    { label: "Email", href: "mailto:ft.alexrayen@gmail.com", path: paths.mail },
  ];

  return (
    <section className="">
      <div className="mx-auto max-w-[760px] px-6">
        <div className="animate-fade-up">
          <div className="flex justify-center items-center  md:flex-row md:items-start md:gap-8">
            <Image
              src={avatar}
              alt={name}
              width={96}
              height={96}
              className="size-24 shrink-0 rounded-full border border-white/10 object-cover transition-transform duration-200 hover:scale-105"
            />
            <div className="mt-6 flex flex-col items-center justify-center md:mt- md:items-start">
              <h1 className="text-[22px] font-semibold uppercase leading-[1.1] ">{name}</h1>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text- text-[#8b8b8b] md:justify-start">
                <span>Full Stack Developer</span>
                <span aria-hidden="true">·</span>
                <span>Software Engineer</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  {email}
                  <button
                    onClick={handleCopy}
                    type="button"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="inline-flex items-center transition-colors duration-200"
                  >
                    {copied ? (
                      <span className="text-xs font-medium text-green-500">Copied!</span>
                    ) : (
                      <Copy
                        size={16}
                        className="text-[#8b8b8b] transition-colors duration-200 hover:text-white"
                      />
                    )}
                  </button>
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-lg text-[#b6b6b6]">
            Love to build cool stuff, content creator &amp; polymath.
          </p>

          <div className="mt-1 flex items-center gap-2 text-lg text-[#9f9f9f]">
            <Music size={22} className="text-[#1DB954]" />
            <span>Last played —</span>
            <span className="text-[#c8c8c8]">Kon Color ki saree Pehni ho</span>
            <span aria-hidden="true">·</span>
            <span>Hamnet Soren</span>
          </div>

          <nav className="mt-5 flex items-center gap-4" aria-label="Social media links">
            {socialLinks.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#8d8d8d] transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  width={20}
                  height={20}
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-up{animation:fadeUp .5s ease-out forwards}`}</style>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="bg-[#0f0f10] py-20">
      <div className="mx-auto max-w-[760px] px-6">
        <div className="flex animate-pulse flex-col items-center md:flex-row md:items-start md:gap-8">
          <div className="size-24 shrink-0 rounded-full bg-gray-800" />
          <div className="mt-6 flex flex-col items-center gap-3 md:mt-0 md:items-start">
            <div className="h-10 w-64 rounded bg-gray-800" />
            <div className="h-5 w-80 rounded bg-gray-800" />
          </div>
        </div>
      </div>
    </section>
  );
}
