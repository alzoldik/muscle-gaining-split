import React, { useRef } from 'react';
import { ExternalLink, Maximize2, Timer } from 'lucide-react';
import { openVideoFullscreen } from './fullscreen';

interface StretchCardProps {
  muscle: string;
  stretch: string;
  videoUrl: string;
  posterUrl: string;
  youtubeUrl: string;
  onStartTimer: () => void;
}

/** Stretch demo with a large, tappable video that opens in native fullscreen. */
export const StretchCard: React.FC<StretchCardProps> = ({
  muscle,
  stretch,
  videoUrl,
  posterUrl,
  youtubeUrl,
  onStartTimer,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] overflow-hidden flex flex-col">
      <button
        type="button"
        onClick={() => openVideoFullscreen(videoRef.current)}
        aria-label={`تكبير فيديو إطالة ${muscle}`}
        className="relative block w-full aspect-video bg-white border-b border-slate-200 dark:border-slate-800 group"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={`إطالة ${muscle}`}
          className="w-full h-full object-contain"
        />
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 text-white text-[11px] font-semibold opacity-90 group-hover:opacity-100">
          <Maximize2 className="w-3 h-3" />
          تكبير
        </span>
      </button>

      <div className="p-3.5 flex-1 flex flex-col gap-3">
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">{muscle}</div>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{stretch}</p>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onStartTimer}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-semibold min-h-[38px] whitespace-nowrap"
          >
            <Timer className="w-3.5 h-3.5" />
            <span>مؤقت ٣٠ث</span>
          </button>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold min-h-[38px] whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5 text-red-500" />
            <span>يوتيوب</span>
          </a>
        </div>
      </div>
    </div>
  );
};
