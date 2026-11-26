import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Check,
  ExternalLink,
  Gauge,
  Maximize2,
  Pause,
  Play,
  Repeat,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  DIFFICULTY_LABELS,
  ExerciseItem,
  Level,
  MUSCLE_LABELS,
  MuscleZone,
  RISK_LABELS,
} from '../data/workoutData';
import { ExerciseAlternative, getAlternatives } from '../data/alternatives';
import { openVideoFullscreen } from './fullscreen';

interface ExerciseMotionPlayerProps {
  exercise: ExerciseItem;
  onStartRestTimer?: (seconds: number, label: string) => void;
  /** Name of the chosen alternative for this exercise, or null for the original. */
  variantName?: string | null;
  onSelectVariant?: (name: string | null) => void;
}

/** Resolves what is actually shown: the planned exercise or the chosen alternative. */
export function resolveVariant(
  exercise: ExerciseItem,
  variantName?: string | null
): {
  variant: ExerciseAlternative | null;
  name: string;
  nameAr: string;
  videoUrl: string;
  posterUrl: string;
  youtubeUrl: string;
  difficulty: Level;
  risk: Level;
} {
  const variant = variantName
    ? getAlternatives(exercise.motion, exercise.videoUrl).find((a) => a.name === variantName) || null
    : null;
  if (!variant) {
    return {
      variant: null,
      name: exercise.name,
      nameAr: exercise.nameAr,
      videoUrl: exercise.videoUrl,
      posterUrl: exercise.posterUrl,
      youtubeUrl: exercise.youtubeUrl,
      difficulty: exercise.difficulty,
      risk: exercise.risk,
    };
  }
  return {
    variant,
    name: variant.name,
    nameAr: variant.nameAr,
    videoUrl: variant.videoUrl,
    posterUrl: variant.posterUrl,
    youtubeUrl: variant.youtubeUrl,
    difficulty: variant.difficulty,
    risk: variant.risk,
  };
}

const LEVEL_TONE: Record<Level, string> = {
  1: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  2: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
  3: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
};

const LEVEL_DOT: Record<Level, string> = {
  1: 'bg-emerald-500',
  2: 'bg-amber-500',
  3: 'bg-rose-500',
};

function LevelMeter({ level }: { level: Level }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`inline-block w-1.5 h-1.5 rounded-full ${i <= level ? LEVEL_DOT[level] : 'bg-slate-300 dark:bg-slate-600'}`}
        />
      ))}
    </span>
  );
}

/** Difficulty (how hard the technique is) and risk (injury risk if done wrong) chips. */
export function LevelBadges({
  difficulty,
  risk,
  compact = false,
}: {
  difficulty: Level;
  risk: Level;
  compact?: boolean;
}) {
  const base = `inline-flex items-center gap-1 rounded border font-semibold whitespace-nowrap ${
    compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-[11px]'
  }`;
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span className={`${base} ${LEVEL_TONE[difficulty]}`} title="مستوى الصعوبة: قد إيه التكنيك صعب يتعلم">
        <LevelMeter level={difficulty} />
        الصعوبة: {DIFFICULTY_LABELS[difficulty]}
      </span>
      <span className={`${base} ${LEVEL_TONE[risk]}`} title="مستوى الخطورة: احتمال الإصابة لو اتلعب غلط">
        <LevelMeter level={risk} />
        الخطورة: {RISK_LABELS[risk]}
      </span>
    </span>
  );
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
  variantName = null,
  onSelectVariant,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<0.5 | 1>(1);
  const shown = resolveVariant(exercise, variantName);
  const alternatives = getAlternatives(exercise.motion, exercise.videoUrl);

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
  }, [shown.videoUrl, isPlaying, speed]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>حركة تشريحية عالية الدقة (HD)</span>
            <span aria-hidden="true">·</span>
            {exercise.kind ? (
              <span className="font-semibold">إطالة بعد التمرين</span>
            ) : (
              <span className="font-mono-num">RIR {exercise.rir}</span>
            )}
            {exercise.isNew && !shown.variant && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  مضاف بالجدول المعدل
                </span>
              </>
            )}
            {shown.variant && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold inline-flex items-center gap-1">
                  <Repeat className="w-3 h-3" />
                  بديل لـ {exercise.name}
                </span>
              </>
            )}
          </div>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {shown.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            {shown.nameAr}
          </p>
          {!exercise.kind && (
            <div className="mt-2">
              <LevelBadges difficulty={shown.difficulty} risk={shown.risk} />
            </div>
          )}
          {exercise.replaces && !shown.variant && (
            <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              بديل آمن لـ {exercise.replaces} اللي في الـ PDF
            </p>
          )}
        </div>

        <a
          href={shown.youtubeUrl}
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
            key={shown.videoUrl}
            src={shown.videoUrl}
            poster={shown.posterUrl}
            autoPlay={isPlaying}
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label={`عرض الأداء الصحيح لتمرين ${shown.name} (${shown.nameAr})`}
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
            onClick={() => openVideoFullscreen(videoRef.current)}
            aria-label="تكبير الفيديو ملء الشاشة"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors min-h-[36px] whitespace-nowrap"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>ملء الشاشة</span>
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

      {/* Alternatives: same muscle, different equipment */}
      {alternatives.length > 0 && onSelectVariant && (
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Repeat className="w-4 h-4 text-sky-500 shrink-0" />
              <span>الجهاز مش موجود أو مشغول؟ اختار بديل</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-num">
              {alternatives.length} بدائل
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            نفس العضلة ونفس المجموعات والتكرارات، بأداة تانية. اختيارك بيتحفظ للمرة الجاية.
          </p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[null, ...alternatives].map((a) => {
              const name = a ? a.name : null;
              const selected = (variantName ?? null) === name;
              return (
                <button
                  key={name ?? '__original'}
                  type="button"
                  onClick={() => onSelectVariant(name)}
                  aria-pressed={selected}
                  className={`text-right rounded-lg border px-3 py-2 transition-colors min-h-[52px] ${
                    selected
                      ? 'border-sky-500 bg-sky-500/10 ring-1 ring-sky-500/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                      {a ? a.nameAr : `الأصلي: ${exercise.nameAr}`}
                    </span>
                    {selected ? (
                      <Check className="w-4 h-4 text-sky-500 shrink-0" />
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                        {a ? a.equipment : 'المخطط'}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="truncate" dir="ltr">{a ? a.name : exercise.name}</span>
                  </div>
                  <div className="mt-1">
                    <LevelBadges
                      difficulty={a ? a.difficulty : exercise.difficulty}
                      risk={a ? a.risk : exercise.risk}
                      compact
                    />
                  </div>
                  {a?.note && selected && (
                    <p className="mt-1 text-[11px] text-sky-700 dark:text-sky-300 leading-relaxed">
                      {a.note}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
            {exercise.warmupSets ? (
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                + {exercise.warmupSets} إحماء بوزن خفيف
              </div>
            ) : null}
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">قبل الفشل (RIR)</div>
            <div className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono-num mt-0.5">
              {exercise.rir}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">{exercise.kind ? 'المؤقت' : 'الراحة'}</div>
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
              <span>تنبيه أمان للمفاصل</span>
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
              onClick={() => onStartRestTimer(exercise.restSeconds, shown.name)}
              className="flex-1 min-w-[140px] py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              {exercise.kind === 'stretch'
                ? `مؤقت الإطالة (${exercise.restLabel})`
                : `تشغيل مؤقت الراحة (${exercise.restLabel})`}
            </button>
          )}
          <a
            href={shown.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4 text-red-500" />
            <span>شوف الشرح على يوتيوب</span>
          </a>
        </div>
      </div>

    </div>
  );
};
