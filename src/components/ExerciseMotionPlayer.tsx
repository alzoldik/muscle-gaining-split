import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ExternalLink,
  Gauge,
  Maximize2,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ExerciseItem,
  MUSCLE_LABELS,
  MuscleZone,
} from '../data/workoutData';

interface ExerciseMotionPlayerProps {
  exercise: ExerciseItem;
  onStartRestTimer?: (seconds: number, label: string) => void;
}

/** Muscle Focus Summary */
function MuscleFocusSummary({
  primary,
  secondary,
}: {
  primary: MuscleZone[];
  secondary: MuscleZone[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
        <span className="inline-block w-2.5 h-2.5 rounded-xs bg-red-500" aria-hidden="true" />
        <span>العضلة الأساسية:</span>
        <span className="text-red-600 dark:text-red-400 font-semibold">
          {primary.map((m) => MUSCLE_LABELS[m]).join(' · ')}
        </span>
      </div>
      {secondary.length > 0 && (
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-xs bg-amber-500" aria-hidden="true" />
          <span>عضلات مساعدة:</span>
          <span>{secondary.map((m) => MUSCLE_LABELS[m]).join(' · ')}</span>
        </div>
      )}
    </div>
  );
}

/** Crisp 16:9 HD Looping Exercise Thumbnail for Exercise List Rows */
export function ExerciseMiniIcon({
  videoUrl,
  posterUrl,
  name,
}: {
  videoUrl: string;
  posterUrl: string;
  name: string;
}) {
  return (
    <div className="w-20 h-12 rounded-lg bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
      <video
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label={`حركة تمرين ${name}`}
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}

export const ExerciseMotionPlayer: React.FC<ExerciseMotionPlayerProps> = ({
  exercise,
  onStartRestTimer,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const zoomVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<0.5 | 1>(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = speed;
    if (isPlaying) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [exercise.videoUrl, isPlaying, speed]);

  useEffect(() => {
    const zv = zoomVideoRef.current;
    if (!zv || !zoomOpen) return;
    zv.playbackRate = speed;
    zv.play().catch(() => {});
  }, [zoomOpen, speed, exercise.videoUrl]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>حركة تشريحية عالية الدقة (HD)</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-num">RIR {exercise.rir}</span>
            {exercise.isNew && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  مضاف بالجدول المعدل
                </span>
              </>
            )}
          </div>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {exercise.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            {exercise.nameAr}
          </p>
        </div>

        <a
          href={exercise.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>فيديو يوتيوب</span>
        </a>
      </div>

      {/* 960x540 HD Auto-Looping Exercise Stage */}
      <div className="bg-slate-100 dark:bg-[#0C1018] p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="rounded-xl bg-white border border-slate-200 dark:border-slate-700 overflow-hidden aspect-video flex items-center justify-center">
          <video
            ref={videoRef}
            key={exercise.videoUrl}
            src={exercise.videoUrl}
            poster={exercise.posterUrl}
            autoPlay={isPlaying}
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label={`عرض الأداء الصحيح لتمرين ${exercise.name} (${exercise.nameAr})`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Clean Controls Bar Below Video (zero overlay clutter) */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPlaying((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[36px] whitespace-nowrap"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'إيقاف' : 'تشغيل'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSpeed((s) => (s === 1 ? 0.5 : 1))}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors min-h-[36px] whitespace-nowrap ${
                speed === 0.5
                  ? 'border-amber-500/60 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{speed === 0.5 ? '0.5x بطيء' : '1x عادي'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label="تكبير عرض الحركة"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors min-h-[36px] whitespace-nowrap"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>تكبير HD</span>
          </button>
        </div>

        {/* 3-Step Execution Phases Strip */}
        <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-[11px]">
          {exercise.phases.map((phase, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white dark:bg-[#111622] border border-slate-200/80 dark:border-slate-800 px-2.5 py-2 text-center"
            >
              <span className="font-mono-num text-amber-600 dark:text-amber-400 font-bold">
                {idx + 1}.{' '}
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {phase}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Muscles & Form Details */}
      <div className="p-4 sm:p-5 space-y-4">
        <MuscleFocusSummary
          primary={exercise.primaryMuscles}
          secondary={exercise.secondaryMuscles}
        />

        {/* Key Numbers Row */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-center">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">المجموعات × التكرار</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono-num mt-0.5">
              {exercise.sets} × {exercise.reps}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">قبل الفشل (RIR)</div>
            <div className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono-num mt-0.5">
              {exercise.rir}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">الراحة</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono-num mt-0.5">
              {exercise.restLabel}
            </div>
          </div>
        </div>

        {/* High-Load Safety Warning if applicable */}
        {exercise.safetyCaution && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>تنبيه حمل زيادة على المفاصل</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold">المشكلة: </span>
              {exercise.safetyCaution.problem}
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
              <span className="font-semibold">الحل الآمن: </span>
              {exercise.safetyCaution.solution}
            </p>
          </div>
        )}

        {/* Form Cues */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>نقاط الأداء الصحيح</span>
            </div>
            <span className="text-[11px] font-mono-num text-slate-500 dark:text-slate-400">
              {exercise.tempoLabel}
            </span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {exercise.cues.map((cue, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono-num text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                  {idx + 1}.
                </span>
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {exercise.restSeconds > 0 && onStartRestTimer && (
            <button
              type="button"
              onClick={() => onStartRestTimer(exercise.restSeconds, exercise.name)}
              className="flex-1 min-w-[140px] py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              تشغيل مؤقت الراحة ({exercise.restLabel})
            </button>
          )}
          <a
            href={exercise.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4 text-red-500" />
            <span>شوف الشرح على يوتيوب</span>
          </a>
        </div>
      </div>

      {/* Lightbox Zoom Modal (Full 960x540 HD) */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`تكبير حركة ${exercise.name}`}
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {exercise.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {exercise.nameAr}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="إغلاق التكبير"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-3 sm:p-4 flex items-center justify-center aspect-video">
              <video
                ref={zoomVideoRef}
                src={exercise.videoUrl}
                poster={exercise.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                aria-label={`تكبير حركة تمرين ${exercise.name}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
