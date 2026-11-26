import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Repeat,
  Flame,
  Footprints,
  Moon,
  PlayCircle,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Sun,
  Timer,
} from 'lucide-react';
import {
  CARDIO_PROTOCOL,
  DYNAMIC_WARMUPS,
  ExerciseItem,
  HERO_IMAGE,
  HIGH_LOAD_WARNINGS,
  SCHEDULE_CONS,
  SCHEDULE_PROS,
  STATIC_STRETCHES,
} from './data/workoutData';
import { ALL_EXERCISES, DEFAULT_PROGRAM_ID, PROGRAMS } from './data/programs';
import {
  ExerciseMiniIcon,
  LevelBadges,
  ExerciseMotionPlayer,
  resolveVariant,
} from './components/ExerciseMotionPlayer';
import { StretchCard } from './components/StretchCard';
import { RestTimerBar } from './components/RestTimerBar';
import { SafeImage } from './components/SafeImage';
import { NutritionCalculator } from './components/NutritionCalculator';

type FilterMode = 'all' | 'new' | 'caution';

const SECTION_HEADERS: Record<'main' | 'stretch', { title: string; note: string; tone: string }> = {
  main: { title: 'التمرين', note: 'تمارين الـ PDF', tone: 'text-amber-600 dark:text-amber-400' },
  stretch: { title: 'إطالات بعد التمرين', note: '٣٠ ثانية لكل إطالة، بعد الكارديو', tone: 'text-sky-600 dark:text-sky-400' },
};

const STORAGE_KEY = 'hypertrophy_completed_sets_v1';
const THEME_KEY = 'hypertrophy_theme_v1';
const PROGRAM_KEY = 'hypertrophy_program_v1';
const VARIANTS_KEY = 'hypertrophy_variants_v1';
const DESKTOP_QUERY = '(min-width: 1024px)';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore storage errors
  }
}

/** True on wide screens, where details live in the sticky side panel instead of inline. */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

/** Scrolls an element into view once React has rendered it. */
function scrollToId(id: string) {
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const isDesktop = useIsDesktop();

  const [programId, setProgramId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PROGRAM_KEY);
      return saved && PROGRAMS.some((p) => p.id === saved) ? saved : DEFAULT_PROGRAM_ID;
    } catch {
      return DEFAULT_PROGRAM_ID;
    }
  });
  const program = PROGRAMS.find((p) => p.id === programId) || PROGRAMS[0];
  const days = program.days;

  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(
    days[0].exercises[0].id
  );
  // Mobile: which exercise card is expanded inline (no popups).
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Chosen alternative per exercise: { [exerciseId]: alternativeName }
  const [variants, setVariants] = useState<Record<string, string>>(() =>
    readJson(VARIANTS_KEY, {})
  );

  // Completed sets map: { [exerciseId]: number[] (completed set indices) }
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>(() =>
    readJson(STORAGE_KEY, {})
  );

  // Active rest / stretch timer state
  const [timerState, setTimerState] = useState<{
    active: boolean;
    seconds: number;
    label: string;
    triggerId: number;
  }>({
    active: false,
    seconds: 90,
    label: 'راحة',
    triggerId: 0,
  });

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDark]);

  useEffect(() => writeStorage(STORAGE_KEY, JSON.stringify(completedSets)), [completedSets]);
  useEffect(() => writeStorage(VARIANTS_KEY, JSON.stringify(variants)), [variants]);
  useEffect(() => writeStorage(PROGRAM_KEY, programId), [programId]);

  const currentDay = useMemo(
    () => days.find((d) => d.dayNumber === selectedDayNum) || days[0],
    [days, selectedDayNum]
  );

  const programHasNew = useMemo(
    () => days.some((d) => d.exercises.some((e) => e.isNew)),
    [days]
  );

  const filteredExercises = useMemo(() => {
    if (filterMode === 'new') {
      return currentDay.exercises.filter((e) => e.isNew);
    }
    if (filterMode === 'caution') {
      return currentDay.exercises.filter((e) => Boolean(e.safetyCaution) || e.risk >= 2);
    }
    return currentDay.exercises;
  }, [currentDay, filterMode]);

  const activeExercise: ExerciseItem = useMemo(() => {
    const foundInAll = ALL_EXERCISES.find((e) => e.id === selectedExerciseId);
    if (foundInAll) return foundInAll;
    return currentDay.exercises[0];
  }, [currentDay, selectedExerciseId]);

  const cardioExercise = ALL_EXERCISES.find((e) => e.id === 'd7-active-recovery')!;

  const handleSelectProgram = (id: string) => {
    const next = PROGRAMS.find((p) => p.id === id);
    if (!next) return;
    setProgramId(id);
    setSelectedDayNum(1);
    setFilterMode('all');
    setExpandedId(null);
    setSelectedExerciseId(next.days[0].exercises[0].id);
  };

  const handleSelectDay = (dayNum: number) => {
    setSelectedDayNum(dayNum);
    setFilterMode('all');
    setExpandedId(null);
    const dayObj = days.find((d) => d.dayNumber === dayNum);
    if (dayObj && dayObj.exercises.length > 0) {
      setSelectedExerciseId(dayObj.exercises[0].id);
    }
  };

  /** Desktop: load into the side panel. Mobile: expand/collapse the card inline. */
  const handleOpenExercise = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    if (isDesktop) return;
    const willExpand = expandedId !== exerciseId;
    setExpandedId(willExpand ? exerciseId : null);
    if (willExpand) scrollToId(`ex-${exerciseId}`);
  };

  const handleSelectVariant = (exerciseId: string, name: string | null) => {
    setVariants((prev) => {
      const next = { ...prev };
      if (name) next[exerciseId] = name;
      else delete next[exerciseId];
      return next;
    });
  };

  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    setCompletedSets((prev) => {
      const existing = prev[exerciseId] || [];
      const exists = existing.includes(setIndex);
      const updated = exists
        ? existing.filter((i) => i !== setIndex)
        : [...existing, setIndex];
      return { ...prev, [exerciseId]: updated };
    });
  };

  const handleStartTimer = (seconds: number, label: string) => {
    setTimerState((prev) => ({
      active: true,
      seconds,
      label,
      triggerId: prev.triggerId + 1,
    }));
  };

  const handlePreviewFromWarning = (dayNum: number, exerciseId: string) => {
    // Warnings refer to the modified program.
    setProgramId(DEFAULT_PROGRAM_ID);
    setSelectedDayNum(dayNum);
    setFilterMode('all');
    setSelectedExerciseId(exerciseId);
    if (isDesktop) {
      scrollToId('schedule');
    } else {
      setExpandedId(exerciseId);
      scrollToId(`ex-${exerciseId}`);
    }
  };

  const dayCompletedCount = currentDay.exercises.reduce((acc, ex) => {
    const done = (completedSets[ex.id] || []).length;
    return acc + (done >= ex.workingSetsCount ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0B0E14] dark:text-slate-100">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-[#0B0E14]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line brand wordmark */}
          <a
            href="#top"
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 font-display"
          >
            دليل التضخيم
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#schedule"
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              الجدول المعدّل
            </a>
            <a
              href="#review"
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              التقييم العلمي
            </a>
            <a
              href="#safety"
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              تنبيهات الحمل
            </a>
            <a
              href="#warmup"
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              الإحماء والإطالات
            </a>
            <a
              href="#nutrition"
              className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              التغذية
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href="#schedule"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0"
            >
              ابدأ التمرين
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-6 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    برنامج تضخيم عضلي متوازن
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>مبني على علم التدريب والتشريح</span>
                  <span aria-hidden="true">·</span>
                  <span>مع عروض حركية عالية الدقة (HD) وفيديو لكل تمرين</span>
                </div>

                <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight [text-wrap:balance]">
                  الجدول المعدّل للتضخيم مع حركة التمارين عالية الجودة
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  <strong className="text-slate-900 dark:text-white">ملاحظة على الترتيب:</strong>{' '}
                  في الجدول، أول رقم بعد اسم التمرين هو <span className="font-semibold">مجموعات الإحماء</span>،
                  وبعده <span className="font-semibold">مجموعات العمل</span>، وبعدها{' '}
                  <span className="font-semibold">التكرارات</span>، وبعدها{' '}
                  <span className="font-semibold font-mono-num">RIR</span> (يعني كام عدة باقية قبل الفشل)، وآخر رقم هو{' '}
                  <span className="font-semibold">الراحة</span>.
                </p>

                {/* Medical Disclaimer — subtle all-around hairline border */}
                <div className="mt-5 rounded-xl border border-amber-500/35 bg-amber-500/5 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    الكلام ده مبني على علم التدريب والتشريح، لكنه مش بديل إن دكتور يكشف عليك. لو عندك إصابة قديمة في الركبة أو الضهر أو الكتف، استخدم أداة التعديل في قسم التغذية والإصابات بالأسفل.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold transition-colors whitespace-nowrap"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>استعراض جدول الـ ٧ أيام</span>
                </a>
                <a
                  href="#safety"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <span>تمارين محتاجة حذر ({HIGH_LOAD_WARNINGS.length})</span>
                </a>
              </div>
            </div>

            {/* Hero Photography Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 min-h-[260px] lg:min-h-full">
              <SafeImage
                src={HERO_IMAGE}
                alt="صالة تدريب حديثة بأوزان حرة وأجهزة كابل للتضخيم"
                className="w-full h-full lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-medium text-amber-400">
                  تغطية شاملة لجميع المجموعات العضلية
                </span>
                <p className="mt-1 text-base font-bold text-white">
                  أداء مضبوط · تحكم في السلبى · حماية للمفاصل
                </p>
              </div>
            </div>
          </div>

          {/* 4-Column Summary Strip below Hero (follows the selected program) */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {program.stats.map((st) => (
              <div
                key={st.label}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400">{st.label}</div>
                <div
                  className={`mt-1 text-xl font-bold font-mono-num ${
                    st.tone === 'amber'
                      ? 'text-amber-600 dark:text-amber-400'
                      : st.tone === 'emerald'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {st.value}
                </div>
                <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{st.sub}</div>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">الكارديو بعد التمرين</div>
              <div className="mt-1 text-xl font-bold font-mono-num text-slate-900 dark:text-white">
                ٢٠ دقيقة مشي
              </div>
              <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                سرعة 4 · ميل 10 على المشاية
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 (Main Interactive Workspace): الجدول المعدّل */}
        <section id="schedule" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-slate-200 dark:border-slate-800/80">
          {/* Workspace Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                رابعًا · الجداول التفاعلية
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                جدول التمرين وعروض الأداء الصحيح (HD)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDark((d) => !d)}
                aria-label={isDark ? 'تبديل للوضع الفاتح' : 'تبديل للوضع الداكن'}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[40px] whitespace-nowrap"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                <span>{isDark ? 'الوضع النهاري' : 'الوضع الداكن'}</span>
              </button>

              {Object.keys(completedSets).length > 0 && (
                <button
                  type="button"
                  onClick={() => setCompletedSets({})}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[40px] whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>تصفير المجموعات</span>
                </button>
              )}
            </div>
          </div>

          {/* Program Switcher */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              اختار الجدول
            </div>
            <div role="radiogroup" aria-label="اختار الجدول" className="grid grid-cols-3 gap-2">
              {PROGRAMS.map((p) => {
                const active = p.id === program.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => handleSelectProgram(p.id)}
                    className={`text-right p-3 rounded-xl border transition-colors min-h-[60px] ${
                      active
                        ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/40'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`text-sm font-bold leading-snug ${
                        active ? 'text-amber-700 dark:text-amber-300' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {p.name}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 truncate" dir="ltr">
                      {p.nameEn}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* 7-Day Selector Tabs */}
          <div
            role="tablist"
            aria-label="أيام الأسبوع التدريبية"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6"
          >
            {days.map((day) => {
              const active = day.dayNumber === selectedDayNum;
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectDay(day.dayNumber)}
                  className={`text-right p-3 rounded-xl border transition-colors min-h-[60px] flex flex-col justify-between ${
                    active
                      ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className="text-xs font-bold font-mono-num">{day.dayLabel}</span>
                    <span
                      className={`text-[11px] font-mono-num ${
                        active ? 'text-slate-900/80' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {day.isRestDay ? 'راحة' : `${day.exercises.length} تمارين`}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-semibold truncate w-full">
                    {day.title.replace('🛌', '').trim()}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Day Visual Banner + Filter Bar */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-6 h-44 sm:h-52">
            <SafeImage
              src={currentDay.coverImage}
              alt={currentDay.coverAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 p-5 sm:p-7 flex flex-col justify-end">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                    <span>{currentDay.dayLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-num">
                      {currentDay.isRestDay
                        ? `${currentDay.estimatedMinutes} دقيقة استشفاء`
                        : `~${currentDay.estimatedMinutes} دقيقة · ${dayCompletedCount}/${currentDay.exercises.length} تمرين مكتمل`}
                    </span>
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                    {currentDay.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-200 max-w-2xl">
                    {currentDay.subtitle}
                  </p>
                </div>

                {!currentDay.isRestDay && (
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-black/50 backdrop-blur-sm border border-white/15">
                    {[
                      { id: 'all' as FilterMode, label: 'كل التمارين' },
                      ...(programHasNew ? [{ id: 'new' as FilterMode, label: 'الجديدة فقط' }] : []),
                      { id: 'caution' as FilterMode, label: 'تحتاج حذر' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFilterMode(f.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                          filterMode === f.id
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'text-slate-200 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main 2-Column Interactive Split: Exercise List + Sticky Biomechanics Player */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Right in RTL: Exercise Schedule List */}
            <div className="lg:col-span-7 space-y-3">
              {currentDay.restNote && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {currentDay.restNote}
                </div>
              )}

              {filteredExercises.length === 0 ? (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-8 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    لا توجد تمارين مطابقة لهذا الفلتر في {currentDay.dayLabel}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilterMode('all')}
                    className="mt-3 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
                  >
                    عرض كل التمارين
                  </button>
                </div>
              ) : (
                filteredExercises.map((ex, index) => {
                  const isExpanded = !isDesktop && expandedId === ex.id;
                  const isSelected = isDesktop ? activeExercise.id === ex.id : isExpanded;
                  const doneIndices = completedSets[ex.id] || [];
                  const allDone = doneIndices.length >= ex.workingSetsCount;
                  const shown = resolveVariant(ex, variants[ex.id]);
                  const section = ex.kind ?? 'main';
                  const prevSection = index > 0 ? filteredExercises[index - 1].kind ?? 'main' : null;
                  const sectionHeader =
                    !currentDay.isRestDay && section !== prevSection
                      ? SECTION_HEADERS[section]
                      : null;

                  return (
                    <React.Fragment key={ex.id}>
                    {sectionHeader && (
                      <div className={`flex items-center gap-2 px-1 ${index > 0 ? 'pt-3' : ''}`}>
                        <span className={`text-xs font-bold ${sectionHeader.tone}`}>{sectionHeader.title}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{sectionHeader.note}</span>
                        <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
                      </div>
                    )}
                    <div
                      id={`ex-${ex.id}`}
                      className={`scroll-mt-20 rounded-xl border transition-colors bg-white dark:bg-[#111622] ${
                        isSelected
                          ? 'border-amber-500 ring-1 ring-amber-500/40'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Clickable Info Area -> side panel (desktop) / inline details (mobile) */}
                        <button
                          type="button"
                          onClick={() => handleOpenExercise(ex.id)}
                          aria-expanded={isDesktop ? undefined : isExpanded}
                          className="flex items-center gap-3.5 text-right min-w-0 flex-1 group"
                        >
                          <ExerciseMiniIcon
                            videoUrl={shown.videoUrl}
                            posterUrl={shown.posterUrl}
                            name={shown.name}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-mono-num font-semibold">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono-num text-slate-800 dark:text-slate-200 font-semibold">
                                {ex.sets} × {ex.reps}
                              </span>
                              <span aria-hidden="true">·</span>
                              {ex.kind ? (
                                <span className="font-semibold text-sky-600 dark:text-sky-400">إطالة</span>
                              ) : (
                                <span className="font-mono-num">RIR {ex.rir}</span>
                              )}
                              {ex.isNew && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                    <Sparkles className="w-3 h-3" />
                                    جديد
                                  </span>
                                </>
                              )}
                              {ex.replaces && !shown.variant && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                    <AlertTriangle className="w-3 h-3" />
                                    بدل {ex.replaces}
                                  </span>
                                </>
                              )}
                              {shown.variant && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold">
                                    <Repeat className="w-3 h-3" />
                                    بديل
                                  </span>
                                </>
                              )}
                            </div>

                            <div className="mt-1 text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                              {shown.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {shown.nameAr}
                            </div>
                            {!currentDay.isRestDay && !ex.kind && (
                              <div className="mt-1.5">
                                <LevelBadges difficulty={shown.difficulty} risk={shown.risk} compact />
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Action Controls: Set Checkboxes, Motion View (mobile), Rest Timer, YouTube Link */}
                        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                          {/* Set Checkboxes */}
                          {!currentDay.isRestDay && (
                            <div
                              className="flex items-center gap-1.5"
                              aria-label={`تحديد مجموعات ${ex.name}`}
                            >
                              {Array.from({ length: ex.workingSetsCount }).map((_, setIdx) => {
                                const checked = doneIndices.includes(setIdx);
                                return (
                                  <button
                                    key={setIdx}
                                    type="button"
                                    onClick={() => handleToggleSet(ex.id, setIdx)}
                                    title={`المجموعة ${setIdx + 1}`}
                                    aria-label={`المجموعة ${setIdx + 1} من ${ex.name}`}
                                    aria-pressed={checked}
                                    className={`w-8 h-8 rounded-lg border text-xs font-mono-num font-bold flex items-center justify-center transition-colors ${
                                      checked
                                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-amber-500'
                                    }`}
                                  >
                                    {checked ? <Check className="w-3.5 h-3.5" /> : setIdx + 1}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          <div className="flex items-center gap-1.5">
                            {/* Mobile: expand / collapse details inline */}
                            {!isDesktop && (
                              <button
                                type="button"
                                onClick={() => handleOpenExercise(ex.id)}
                                aria-expanded={isExpanded}
                                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-semibold min-h-[36px] whitespace-nowrap"
                              >
                                <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                />
                                <span>{isExpanded ? 'إخفاء' : 'التفاصيل'}</span>
                              </button>
                            )}

                            {ex.restSeconds > 0 && (
                              <button
                                type="button"
                                onClick={() => handleStartTimer(ex.restSeconds, shown.name)}
                                title={`مؤقت الراحة (${ex.restLabel})`}
                                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium min-h-[36px] whitespace-nowrap"
                              >
                                <Timer className="w-3.5 h-3.5 text-amber-500" />
                                <span className="font-mono-num">{ex.restLabel}</span>
                              </button>
                            )}

                            <a
                              href={shown.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800 text-slate-700 dark:text-slate-200 text-xs font-semibold min-h-[36px] transition-colors whitespace-nowrap"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                              <span>شوف</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {allDone && !currentDay.isRestDay && (
                        <div className="px-4 py-1.5 border-t border-emerald-500/20 bg-emerald-500/5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>تم إكمال جميع مجموعات العمل لهذا التمرين</span>
                        </div>
                      )}

                      {/* Mobile inline details (replaces the old popup) */}
                      {isExpanded && (
                        <div className="border-t border-slate-200 dark:border-slate-800 p-2 sm:p-3">
                          <ExerciseMotionPlayer
                            exercise={ex}
                            onStartRestTimer={handleStartTimer}
                            variantName={variants[ex.id] ?? null}
                            onSelectVariant={(name) => handleSelectVariant(ex.id, name)}
                          />
                          <button
                            type="button"
                            onClick={() => setExpandedId(null)}
                            className="mt-2 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px]"
                          >
                            <ChevronDown className="w-4 h-4 rotate-180" />
                            <span>إخفاء التفاصيل</span>
                          </button>
                        </div>
                      )}
                    </div>
                    </React.Fragment>
                  );
                })
              )}

              {/* Post-Workout Cardio Protocol Strip */}
              <div id="ex-cardio" className="scroll-mt-20 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] overflow-hidden">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Footprints className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {CARDIO_PROTOCOL.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                      {CARDIO_PROTOCOL.detail}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (isDesktop) {
                      setSelectedExerciseId(cardioExercise.id);
                    } else {
                      setExpandedId((cur) => (cur === 'cardio' ? null : 'cardio'));
                    }
                  }}
                  aria-expanded={isDesktop ? undefined : expandedId === 'cardio'}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap shrink-0 min-h-[38px]"
                >
                  {!isDesktop && expandedId === 'cardio' ? 'إخفاء المعاينة' : 'معاينة المشاية'}
                </button>
              </div>
              {!isDesktop && expandedId === 'cardio' && (
                <div className="border-t border-slate-200 dark:border-slate-800 p-2 sm:p-3">
                  <ExerciseMotionPlayer
                    exercise={cardioExercise}
                    onStartRestTimer={handleStartTimer}
                    variantName={variants[cardioExercise.id] ?? null}
                    onSelectVariant={(name) => handleSelectVariant(cardioExercise.id, name)}
                  />
                </div>
              )}
              </div>
            </div>

            {/* Right/Opposite in RTL (Desktop Sticky Motion Stage) */}
            {isDesktop && (
              <div className="lg:col-span-5 lg:sticky lg:top-20">
                <ExerciseMotionPlayer
                  exercise={activeExercise}
                  onStartRestTimer={handleStartTimer}
                  variantName={variants[activeExercise.id] ?? null}
                  onSelectVariant={(name) => handleSelectVariant(activeExercise.id, name)}
                />
              </div>
            )}
          </div>
        </section>

        {/* Section 1 & 2: المميزات والعيوب */}
        <section id="review" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200 dark:border-slate-800/80">
          <div className="mb-8">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              أولًا وثانيًا · التحليل العلمي للجدول الأصلي
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              مميزات الجدول والعيوب التي تم تصحيحها
            </h2>
          </div>

          {/* أولًا: المميزات */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>أولًا: مميزات الجدول</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCHEDULE_PROS.map((pro) => (
                <div
                  key={pro.num}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5"
                >
                  <div className="text-xs font-mono-num font-bold text-emerald-600 dark:text-emerald-400">
                    {pro.num}. {pro.title}
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pro.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ثانيًا: العيوب */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>ثانيًا: العيوب (وكيف عالجها الجدول المعدّل)</span>
            </h3>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-bold text-slate-600 dark:text-slate-300">
                      <th className="py-3.5 px-4 whitespace-nowrap">العيب</th>
                      <th className="py-3.5 px-4">التفاصيل العلمية</th>
                      <th className="py-3.5 px-4">التعديل المطبّق</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                    {SCHEDULE_CONS.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-rose-600 dark:text-rose-400 align-top whitespace-nowrap">
                          {row.issue}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 leading-relaxed align-top">
                          {row.details}
                        </td>
                        <td className="py-3.5 px-4 text-emerald-700 dark:text-emerald-400 font-medium align-top">
                          {row.fixApplied}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: تمارين عليها حمل زيادة */}
        <section id="safety" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200 dark:border-slate-800/80">
          <div className="mb-8">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              ثالثًا · الوقاية من الإصابات
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              تمارين عليها حمل زيادة والحل التشريحي الآمن
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <th className="py-3.5 px-4 whitespace-nowrap">التمرين</th>
                    <th className="py-3.5 px-4">المشكلة / الخطر</th>
                    <th className="py-3.5 px-4">الحل الصحيح</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">معاينة الحركة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  {HIGH_LOAD_WARNINGS.map((item) => (
                    <tr
                      key={item.name}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white align-top whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 text-amber-700 dark:text-amber-300 leading-relaxed align-top">
                        {item.problem}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200 leading-relaxed align-top">
                        {item.solution}
                      </td>
                      <td className="py-3.5 px-4 align-top whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            handlePreviewFromWarning(item.dayNumber, item.exerciseId)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-semibold transition-colors min-h-[36px]"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>شوف الأداء الآمن</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: الإحماء والإطالات في وقتها */}
        <section id="warmup" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200 dark:border-slate-800/80">
          <div className="mb-8">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              خامسًا · بروتوكول المرونة وحماية المفاصل
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              الإحماء والإطالات في وقتها
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              <strong className="text-slate-900 dark:text-white">قاعدة مهمة:</strong> قبل التمرين بنعمل إطالات{' '}
              <span className="font-semibold text-amber-600 dark:text-amber-400">متحركة (Dynamic)</span>.
              بعد التمرين بنعمل إطالات{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">ثابتة (Static)</span>، كل إطالة ٣٠ ثانية مرتين. الإطالات الثابتة قبل التمرين بتقلل قوتك.
            </p>
          </div>

          {/* Dynamic Warm-up Cards */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>قبل التمرين (٥ إلى ٨ دقائق إحماء متحرك)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DYNAMIC_WARMUPS.map((wu) => (
                <div
                  key={wu.dayType}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        {wu.dayType}
                      </span>
                      <span className="text-xs font-mono-num text-slate-500 dark:text-slate-400">
                        {wu.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {wu.movements}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      بعدها ١-٢ مجموعة إحماء خفيفة على أول تمرين
                    </span>
                    <a
                      href={wu.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                      <span>شوف الفيديو</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Static Stretches Table with 30s Timer */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                بعد التمرين (إطالات ثابتة — ٣٠ ثانية × مرتين لكل عضلة)
              </h3>
              <button
                type="button"
                onClick={() => handleStartTimer(30, 'إطالة ثابتة (٣٠ ثانية)')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap min-h-[38px]"
              >
                <Timer className="w-4 h-4" />
                <span>تشغيل مؤقت ٣٠ ثانية للإطالة</span>
              </button>
            </div>

            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              دوس على الفيديو عشان يكبر ملء الشاشة.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STATIC_STRETCHES.map((st) => (
                <StretchCard
                  key={st.muscle}
                  muscle={st.muscle}
                  stretch={st.stretch}
                  videoUrl={st.videoUrl}
                  posterUrl={st.posterUrl}
                  youtubeUrl={st.youtubeUrl}
                  onStartTimer={() => handleStartTimer(30, `إطالة ${st.muscle}`)}
                />
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-700 dark:text-slate-200">
                <strong className="text-slate-900 dark:text-white">في أيام الراحة:</strong> اعمل ١٠ دقايق Mobility للجسم كله لتحسين حركة المفاصل.
              </p>
              <a
                href="https://www.youtube.com/results?search_query=full+body+mobility+routine+10+minutes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                <span>فيديو Mobility ١٠ دقايق</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 6: Nutrition & Personal Calculator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <NutritionCalculator />
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0E14] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>دليل التضخيم المتكامل · البرنامج المعدّل بحركات عالية الدقة (HD) وفيديوهات الشرح</span>
          <a href="#top" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            العودة للأعلى
          </a>
        </div>
      </footer>

      {/* Active Rest / Stretch Countdown Timer */}
      {timerState.active && (
        <RestTimerBar
          initialSeconds={timerState.seconds}
          label={timerState.label}
          triggerId={timerState.triggerId}
          onClose={() => setTimerState((s) => ({ ...s, active: false }))}
        />
      )}
    </div>
  );
}
