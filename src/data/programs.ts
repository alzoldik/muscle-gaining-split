import {
  ExerciseItem,
  IMAGES_BY_FOCUS,
  WORKOUT_DAYS,
  WorkoutDay,
} from './workoutData';

export interface ProgramStat {
  label: string;
  value: string;
  sub: string;
  tone?: 'amber' | 'emerald';
}

export interface TrainingProgram {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  stats: ProgramStat[];
  days: WorkoutDay[];
}

const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const toAr = (n: number | string) => String(n).replace(/\d/g, (d) => AR_DIGITS[Number(d)]);

const restLabel = (sec: number): string => {
  if (sec <= 0) return 'مستمر';
  const min = sec / 60;
  if (min === 1) return '١ دقيقة';
  if (min >= 3) return `${toAr(min)} دقائق`;
  return `${toAr(min)} دقيقة`;
};

const BASE: Record<string, ExerciseItem> = Object.fromEntries(
  WORKOUT_DAYS.flatMap((d) => d.exercises).map((e) => [e.id, e])
);

/**
 * Prescription for a cloned exercise: sets, reps, RIR, rest seconds.
 * The movement data (video, cues, muscles, safety notes) is reused from the base exercise.
 */
type Rx = [sets: number | string, reps: string, rir: string, rest: number];

function ex(
  programId: string,
  dayNumber: number,
  baseId: string,
  [sets, reps, rir, rest]: Rx,
  overrides: Partial<ExerciseItem> = {}
): ExerciseItem {
  const base = BASE[baseId];
  if (!base) throw new Error(`Unknown base exercise: ${baseId}`);
  const setsStr = String(sets);
  const maxSets = Number(setsStr.split('-').pop());
  return {
    ...base,
    id: `${programId}-d${dayNumber}-${baseId.replace(/^d\d-/, '')}`,
    sets: setsStr,
    workingSetsCount: Number.isFinite(maxSets) ? maxSets : 1,
    reps,
    rir,
    restSeconds: rest,
    restLabel: restLabel(rest),
    isNew: false,
    ...overrides,
  };
}

function restDay(programId: string, dayNumber: number): WorkoutDay {
  const src = WORKOUT_DAYS.find((d) => d.dayNumber === 7)!;
  return {
    ...src,
    dayNumber,
    dayLabel: `يوم ${toAr(dayNumber)}`,
    exercises: src.exercises.map((e) => ({ ...e, id: `${programId}-d${dayNumber}-recovery` })),
  };
}

function day(
  programId: string,
  dayNumber: number,
  info: Pick<WorkoutDay, 'title' | 'subtitle' | 'coverImage' | 'coverAlt' | 'estimatedMinutes'>,
  items: Array<[baseId: string, rx: Rx, overrides?: Partial<ExerciseItem>]>
): WorkoutDay {
  return {
    dayNumber,
    dayLabel: `يوم ${toAr(dayNumber)}`,
    isRestDay: false,
    ...info,
    exercises: items.map(([id, rx, o]) => ex(programId, dayNumber, id, rx, o)),
  };
}

/* ------------------------------------------------------------------ */
/* Arnold split: Chest+Back / Shoulders+Arms / Legs, twice a week      */
/* ------------------------------------------------------------------ */
const A = 'arnold';
const ARNOLD_DAYS: WorkoutDay[] = [
  day(A, 1, {
    title: 'صدر وضهر (A)',
    subtitle: 'السوبر الكلاسيكي بتاع أرنولد: الصدر والضهر في نفس اليوم، عضلات متضادة فبتريّح واحدة وانت بتشتغل على التانية',
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'بنش وأوزان حرة لتمرين الصدر',
    estimatedMinutes: 75,
  }, [
    ['d5-db-flat-press', [4, '6-10', '1', 150]],
    ['d1-lat-pulldown', [4, '6-10', '1', 150]],
    ['d2-db-low-incline', [3, '8-12', '1', 120]],
    ['d1-t-bar-row', [3, '8-10', '1', 150]],
    ['d2-chest-fly', [3, '10-15', '0-1', 90]],
    ['d1-cable-pullover', [3, '10-12', '1', 90]],
    ['d1-abs-crunches', [3, '10-15', '1', 60]],
  ]),
  day(A, 2, {
    title: 'كتف ودراعات (A)',
    subtitle: 'الكتف بزواياه التلاتة وبعده بايسبس وترايسبس بالتبادل',
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'دمبلز ومنطقة أوزان حرة',
    estimatedMinutes: 70,
  }, [
    ['d5-db-shoulder-press', [4, '6-10', '1', 150], { name: 'DB shoulder press' }],
    ['d1-db-lateral-raises', [4, '10-15', '0-1', 90]],
    ['d1-reverse-pec-deck', [3, '12-15', '0-1', 90], { name: 'Reverse pec deck' }],
    ['d2-db-curl', [3, '8-12', '1', 90]],
    ['d2-dips-cgbp', [3, '6-10', '1-2', 120]],
    ['d2-bayesian-curl', [3, '10-12', '1', 90]],
    ['d2-overhead-rope', [3, '10-12', '1', 90]],
    ['d6-wrist-flexion', [2, '12-15', '1', 60]],
  ]),
  day(A, 3, {
    title: 'رجل (A)',
    subtitle: 'يوم رجل تقيل: سكوات بالماكينة، رومانيان، وعزل للأماميات والخلفيات والسمانة',
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'منطقة تمارين الرجل',
    estimatedMinutes: 70,
  }, [
    ['d6-hack-squat', [4, '6-10', '1-2', 180], { name: 'Hack squat' }],
    ['d6-rdl', [3, '6-10', '2-3', 180], { name: 'RDL' }],
    ['d6-leg-extension', [3, '10-15', '0-1', 90]],
    ['d6-lying-leg-curl', [3, '10-12', '0-1', 90]],
    ['d3-calf-raises', [4, '10-15', '0-1', 60]],
    ['d3-torso-rotation', [2, '12', '2', 60]],
  ]),
  day(A, 4, {
    title: 'صدر وضهر (B)',
    subtitle: 'نفس العضلات بتمارين مختلفة وتكرارات أعلى شوية عشان التحفيز يبقى متنوع',
    coverImage: IMAGES_BY_FOCUS.pull,
    coverAlt: 'أجهزة الكابل والسحب',
    estimatedMinutes: 70,
  }, [
    ['d2-machine-chest-press', [4, '8-12', '1', 120]],
    ['d5-close-seated-row', [4, '8-12', '1', 120]],
    ['d2-db-low-incline', [3, '8-12', '1', 120]],
    ['d5-lat-pulldown', [3, '8-12', '1', 120]],
    ['d2-chest-fly', [3, '12-15', '0-1', 90]],
    ['d5-face-pull', [3, '12-15', '1', 60]],
  ]),
  day(A, 5, {
    title: 'كتف ودراعات (B)',
    subtitle: 'رفرفة بأكتر من زاوية وتمارين دراع بتركيز على الإطالة',
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'كابلات ودمبلز لتمارين الكتف والدراع',
    estimatedMinutes: 65,
  }, [
    ['d5-db-shoulder-press', [3, '8-12', '1', 120], { name: 'DB shoulder press' }],
    ['d5-lateral-machine', [4, '12-15', '0-1', 90]],
    ['d1-cable-y-raises', [3, '10-12', '1', 90]],
    ['d5-db-preacher-curl', [3, '8-12', '1-2', 90]],
    ['d2-rope-pushdown', [3, '10-15', '0-1', 90]],
    ['d2-cable-hammer-curl', [3, '10-12', '1', 60]],
    ['d2-overhead-rope', [2, '10-12', '1', 90]],
    ['d1-cable-reverse-curl', [2, '10-12', '1', 60]],
  ]),
  day(A, 6, {
    title: 'رجل (B)',
    subtitle: 'ليج برس وخلفيات وجلوتس، مع الضامة والسمانة وأسفل الضهر',
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'جهاز الليج برس',
    estimatedMinutes: 70,
  }, [
    ['d3-leg-press', [4, '8-12', '1', 150]],
    ['d3-seated-leg-curl', [4, '8-12', '0-1', 90]],
    ['d3-smith-hip-thrust', [3, '8-12', '1', 120]],
    ['d6-leg-extension', [3, '12-15', '0-1', 90]],
    ['d3-adductor', [2, '12-15', '1', 60]],
    ['d6-calf-raises', [4, '10-15', '0-1', 60]],
    ['d6-back-extension', [2, '10-12', '2', 90]],
  ]),
  restDay(A, 7),
];

/* ------------------------------------------------------------------ */
/* Push / Pull / Legs ×2                                               */
/* ------------------------------------------------------------------ */
const P = 'ppl';
const PPL_DAYS: WorkoutDay[] = [
  day(P, 1, {
    title: 'دفع (Push A)',
    subtitle: 'صدر وكتف أمامي وجانبي وترايسبس، بادئ بالتمارين المركبة التقيلة',
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'بنش ودمبلز لتمارين الدفع',
    estimatedMinutes: 70,
  }, [
    ['d5-db-flat-press', [3, '6-10', '1', 150]],
    ['d2-db-low-incline', [3, '8-12', '1', 120]],
    ['d5-db-shoulder-press', [3, '8-10', '1', 150], { name: 'DB shoulder press' }],
    ['d2-chest-fly', [2, '12-15', '0-1', 90]],
    ['d1-db-lateral-raises', [3, '12-15', '0-1', 90]],
    ['d2-rope-pushdown', [3, '10-12', '0-1', 90]],
    ['d2-overhead-rope', [2, '10-12', '1', 90]],
  ]),
  day(P, 2, {
    title: 'سحب (Pull A)',
    subtitle: 'عرض وسُمك الضهر، كتف خلفي، وبايسبس',
    coverImage: IMAGES_BY_FOCUS.pull,
    coverAlt: 'جهاز السحب العلوي',
    estimatedMinutes: 70,
  }, [
    ['d1-lat-pulldown', [3, '6-10', '1', 150]],
    ['d1-t-bar-row', [3, '8-10', '1', 150]],
    ['d1-cable-pullover', [2, '10-12', '1', 90]],
    ['d5-face-pull', [3, '12-15', '1', 60]],
    ['d1-kelso-shrugs', [2, '10-12', '1-2', 90]],
    ['d2-bayesian-curl', [3, '10-12', '1', 90]],
    ['d2-cable-hammer-curl', [2, '10-12', '1', 60]],
  ]),
  day(P, 3, {
    title: 'رجل (Legs A)',
    subtitle: 'سكوات بالماكينة ورومانيان وعزل كامل للرجل',
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'منطقة تمارين الرجل',
    estimatedMinutes: 65,
  }, [
    ['d6-hack-squat', [3, '6-10', '1-2', 180], { name: 'Hack squat' }],
    ['d6-rdl', [3, '8-10', '2-3', 180], { name: 'RDL' }],
    ['d6-leg-extension', [3, '10-15', '0-1', 90]],
    ['d3-seated-leg-curl', [3, '10-12', '0-1', 90]],
    ['d3-calf-raises', [4, '10-15', '0-1', 60]],
    ['d1-abs-crunches', [3, '10-15', '1', 60]],
  ]),
  day(P, 4, {
    title: 'دفع (Push B)',
    subtitle: 'ماكينة صدر، ترايسبس تقيل، وكتف جانبي بالكابل والماكينة',
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'ماكينة ضغط الصدر',
    estimatedMinutes: 65,
  }, [
    ['d2-machine-chest-press', [3, '8-12', '1', 120]],
    ['d2-db-low-incline', [3, '8-12', '1', 120]],
    ['d2-dips-cgbp', [3, '6-10', '1-2', 120]],
    ['d3-cable-lateral', [3, '12-15', '0-1', 60]],
    ['d5-lateral-machine', [2, '12-15', '0-1', 90]],
    ['d2-overhead-rope', [3, '10-12', '1', 90]],
    ['d5-rope-pushdown', [2, '10-15', '0-1', 60]],
  ]),
  day(P, 5, {
    title: 'سحب (Pull B)',
    subtitle: 'تجديف بقبضة ضيقة، سحب علوي، كتف خلفي، وباي ارتكاز',
    coverImage: IMAGES_BY_FOCUS.pull,
    coverAlt: 'أجهزة التجديف والكابل',
    estimatedMinutes: 65,
  }, [
    ['d5-close-seated-row', [3, '8-12', '1', 120]],
    ['d5-lat-pulldown', [3, '8-12', '1', 120]],
    ['d5-t-bar-row', [2, '10-12', '1', 120]],
    ['d1-reverse-pec-deck', [3, '12-15', '0-1', 90], { name: 'Reverse pec deck' }],
    ['d5-db-preacher-curl', [3, '8-12', '1-2', 90]],
    ['d2-db-curl', [2, '10-12', '1', 60]],
    ['d1-cable-reverse-curl', [2, '10-12', '1', 60]],
  ]),
  day(P, 6, {
    title: 'رجل (Legs B)',
    subtitle: 'ليج برس، جلوتس، ضامة وفخذ خارجي، وتبياليس للسمانة الأمامية',
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'جهاز الليج برس',
    estimatedMinutes: 70,
  }, [
    ['d3-leg-press', [4, '8-12', '1', 150]],
    ['d6-lying-leg-curl', [3, '10-12', '0-1', 90]],
    ['d3-smith-hip-thrust', [3, '8-12', '1', 120]],
    ['d6-leg-extension', [2, '12-15', '0-1', 90]],
    ['d3-adductor', [2, '12-15', '1', 60]],
    ['d3-abductor', [2, '12-15', '1', 60]],
    ['d6-tibialis-raise', [2, '15-20', '1', 60]],
    ['d6-calf-raises', [3, '10-15', '0-1', 60]],
  ]),
  restDay(P, 7),
];

export const PROGRAMS: TrainingProgram[] = [
  {
    id: 'modified',
    name: 'الجدول المعدّل',
    nameEn: 'Modified hybrid split',
    description: 'الجدول الأصلي بعد التعديلات العلمية: ٥ أيام تدريب ويومين راحة.',
    stats: [
      { label: 'تقسيمة الأسبوع', value: '٥ تدريب + ٢ راحة', sub: 'الراحة في اليوم ٤ واليوم ٧' },
      { label: 'التكرار الأسبوعي', value: '٢× لكل عضلة', sub: 'المعدل المثالي للتضخيم', tone: 'amber' },
      { label: 'التمارين المضافة حديثًا', value: '٧ إضافات ذكية', sub: 'كتف خلفي، صدر، تبياليس، أسفل ضهر', tone: 'emerald' },
    ],
    days: WORKOUT_DAYS,
  },
  {
    id: A,
    name: 'أرنولد سبليت',
    nameEn: 'Arnold split',
    description: 'صدر+ضهر / كتف+دراعات / رجل، ومكررين مرتين في الأسبوع. حجم تمرين عالي، مناسب للمتوسطين والمتقدمين.',
    stats: [
      { label: 'تقسيمة الأسبوع', value: '٦ تدريب + ١ راحة', sub: 'الراحة في اليوم ٧' },
      { label: 'التكرار الأسبوعي', value: '٢× لكل عضلة', sub: 'كل جزء بيتكرر كل ٣ أيام', tone: 'amber' },
      { label: 'شكل اليوم', value: 'عضلات متضادة', sub: 'صدر مع ضهر، باي مع تراي', tone: 'emerald' },
    ],
    days: ARNOLD_DAYS,
  },
  {
    id: P,
    name: 'دفع · سحب · رجل',
    nameEn: 'Push Pull Legs',
    description: 'تقسيمة PPL مكررة مرتين: يوم دفع، يوم سحب، يوم رجل. أشهر تقسيمة للتضخيم ومرنة جدًا.',
    stats: [
      { label: 'تقسيمة الأسبوع', value: '٦ تدريب + ١ راحة', sub: 'الراحة في اليوم ٧' },
      { label: 'التكرار الأسبوعي', value: '٢× لكل عضلة', sub: 'نسخة A ونسخة B بتمارين مختلفة', tone: 'amber' },
      { label: 'شكل اليوم', value: 'حسب نوع الحركة', sub: 'دفع / سحب / رجل', tone: 'emerald' },
    ],
    days: PPL_DAYS,
  },
];

export const DEFAULT_PROGRAM_ID = 'modified';

export const ALL_EXERCISES: ExerciseItem[] = PROGRAMS.flatMap((p) =>
  p.days.flatMap((d) => d.exercises)
);
