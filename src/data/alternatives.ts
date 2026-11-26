import type { Level, MotionPattern } from './workoutData';

/** A substitute way to train the same muscle when the planned machine is busy / missing. */
export interface ExerciseAlternative {
  name: string;
  nameAr: string;
  /** Equipment needed, shown as a small tag (دمبل / كابل / ماكينة / سميث). */
  equipment: string;
  note?: string;
  youtubeUrl: string;
  /** Every alternative has a local demo clip, so the player never shows an empty video. */
  videoUrl: string;
  posterUrl: string;
  difficulty: Level;
  risk: Level;
}

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${q} form`)}`;

type ClipInfo = Pick<ExerciseAlternative, 'name' | 'nameAr' | 'equipment' | 'difficulty' | 'risk'>;

/**
 * Every exercise clip that exists in src/assets/videos, with its levels.
 * Alternatives can only be picked from this list, so each one is guaranteed to have a video.
 * High-risk lifts (barbell RDL, barbell close grip bench) are left out on purpose.
 */
const CLIPS = {
  'cable-wide-grip-lat-pulldown--7v7': { name: 'Wide grip lat pulldown', nameAr: 'سحب علوي قبضة واسعة', equipment: 'كابل', difficulty: 1, risk: 1 },
  'bar-lateral-pulldown-6r': { name: 'Lat pulldown', nameAr: 'سحب علوي بالبار (قبضة عادية)', equipment: 'كابل', difficulty: 1, risk: 1 },
  'cable-straight-arm-pulldown-6fc': { name: 'Straight arm pulldown', nameAr: 'سحب كابل بدراع مفرود', equipment: 'كابل', difficulty: 2, risk: 1 },
  'lever-lying-t-bar-row-3h': { name: 'Chest supported T-bar row', nameAr: 'تجديف T-Bar وصدرك مسنود', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'lever-t-bar-row-1f': { name: 'Standing T-bar row machine', nameAr: 'تجديف T-Bar واقف ومنحني', equipment: 'ماكينة', difficulty: 2, risk: 2 },
  'cable-low-seated-row-64g': { name: 'Seated cable row', nameAr: 'تجديف كابل جالس', equipment: 'كابل', difficulty: 1, risk: 1 },
  'dumbbell-incline-shrug-6il': { name: 'Kelso shrug (incline dumbbell)', nameAr: 'شراجز كيلسو بالدمبل على بنش مايل', equipment: 'دمبل', difficulty: 2, risk: 1 },
  'lever-seated-reverse-fly-12': { name: 'Reverse pec deck', nameAr: 'فراشة عكسي على الماكينة', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'cable-standing-rear-delt-row--6fx': { name: 'Face pull / rear delt row', nameAr: 'فيس بول بالحبل', equipment: 'كابل', difficulty: 2, risk: 1 },
  'cable-y-raise-8o6': { name: 'Cable Y raise', nameAr: 'رفرفة Y على الكابل', equipment: 'كابل', difficulty: 2, risk: 1 },
  'lateral-raise-96': { name: 'Dumbbell lateral raise', nameAr: 'رفرفة جانبي بالدمبل', equipment: 'دمبل', difficulty: 1, risk: 1 },
  'cable-one-arm-lateral-raise-64s': { name: 'Cable one arm lateral raise', nameAr: 'رفرفة جانبي كابل بدراع واحد', equipment: 'كابل', difficulty: 1, risk: 1 },
  'lever-lateral-raise-0a': { name: 'Lateral raise machine', nameAr: 'ماكينة الرفرفة الجانبي', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'cable-reverse-curl-6f6': { name: 'Cable reverse curl', nameAr: 'باي عكسي على الكابل', equipment: 'كابل', difficulty: 1, risk: 1 },
  'cable-hammer-curl-63c': { name: 'Cable rope hammer curl', nameAr: 'هامر كيرل بالحبل', equipment: 'كابل', difficulty: 1, risk: 1 },
  'dumbbell-biceps-curl-6hm': { name: 'Dumbbell biceps curl', nameAr: 'باي دمبل واقف', equipment: 'دمبل', difficulty: 1, risk: 1 },
  'dumbbell-incline-curl--6i9': { name: 'Incline dumbbell curl', nameAr: 'باي دمبل على بنش مايل', equipment: 'دمبل', difficulty: 2, risk: 1 },
  'dumbbell-preacher-curl-6js': { name: 'Dumbbell preacher curl', nameAr: 'باي ارتكاز بالدمبل', equipment: 'دمبل', difficulty: 1, risk: 2 },
  'cable-kneeling-crunch-641': { name: 'Cable kneeling crunch', nameAr: 'كرانش كابل على الركب', equipment: 'كابل', difficulty: 1, risk: 1 },
  'cable-twist-6g7': { name: 'Cable torso rotation', nameAr: 'لف الجذع على الكابل', equipment: 'كابل', difficulty: 2, risk: 2 },
  'dumbbell-incline-bench-press-6i6': { name: 'Dumbbell incline press', nameAr: 'ضغط دمبل مايل', equipment: 'دمبل', difficulty: 2, risk: 2 },
  'dumbbell-bench-press-84': { name: 'Dumbbell bench press', nameAr: 'بنش دمبل مستوي', equipment: 'دمبل', difficulty: 2, risk: 2 },
  'lever-chest-press-0t': { name: 'Machine chest press', nameAr: 'ماكينة ضغط الصدر', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'lever-pec-deck-fly-2s': { name: 'Pec deck fly', nameAr: 'فراشة صدر على الماكينة', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'cable-overhead-triceps-extension--64u': { name: 'Cable overhead triceps extension', nameAr: 'ترايسبس فوق الراس بالكابل', equipment: 'كابل', difficulty: 2, risk: 2 },
  'cable-pushdown-64b': { name: 'Rope pushdown', nameAr: 'ترايسبس حبل لتحت', equipment: 'كابل', difficulty: 1, risk: 1 },
  'dumbbell-seated-shoulder-press-6kp': { name: 'Seated dumbbell shoulder press', nameAr: 'ضغط كتف دمبل جالس', equipment: 'دمبل', difficulty: 2, risk: 2 },
  'lever-seated-leg-curl-11': { name: 'Seated leg curl', nameAr: 'رجل خلفي جالس', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'lever-lying-leg-curl-0c': { name: 'Lying leg curl', nameAr: 'رجل خلفي نايم', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'smith-hip-thrust-8hx': { name: 'Smith hip thrust', nameAr: 'هيب ثرست على السميث', equipment: 'سميث', difficulty: 2, risk: 1 },
  '45-degree-hyperextension--6xt': { name: '45° back extension', nameAr: 'ظهر ٤٥ درجة', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'sled-45-leg-press-1o': { name: 'Leg press 45°', nameAr: 'دفع رجل ٤٥ درجة', equipment: 'ماكينة', difficulty: 1, risk: 2 },
  'sled-hack-squat-1r': { name: 'Hack squat', nameAr: 'هاك سكوات', equipment: 'ماكينة', difficulty: 2, risk: 2 },
  'lever-leg-extension-0b': { name: 'Leg extension', nameAr: 'رجل أمامي', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'lever-seated-hip-adduction-10': { name: 'Hip adduction machine', nameAr: 'ماكينة الضامة', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'lever-seated-hip-abduction-19': { name: 'Hip abduction machine', nameAr: 'ماكينة الفخذ الخارجي', equipment: 'ماكينة', difficulty: 1, risk: 1 },
  'smith-calf-raise-32': { name: 'Smith calf raise', nameAr: 'سمانة على السميث', equipment: 'سميث', difficulty: 1, risk: 1 },
  'smith-toe-raise-3r': { name: 'Smith toe raise', nameAr: 'رفع مشط القدم على السميث', equipment: 'سميث', difficulty: 1, risk: 1 },
  'dumbbell-one-arm-wrist-curl-6jk': { name: 'Dumbbell wrist curl', nameAr: 'سواعد دمبل', equipment: 'دمبل', difficulty: 1, risk: 1 },
  'walking-on-incline-treadmill-8x5': { name: 'Incline treadmill walk', nameAr: 'مشي على مشاية مايلة', equipment: 'مشاية', difficulty: 1, risk: 1 },
  'cat-cow-stretch-9l6': { name: 'Cat cow', nameAr: 'كات كاو', equipment: 'بدون أدوات', difficulty: 1, risk: 1 },
  'kneeling-hip-flexor-stretch-6c6': { name: 'Kneeling hip flexor stretch', nameAr: 'إطالة مقدمة الحوض على ركبة', equipment: 'بدون أدوات', difficulty: 1, risk: 1 },
  'hamstring-stretch-724': { name: 'Hamstring stretch', nameAr: 'إطالة الخلفيات', equipment: 'بدون أدوات', difficulty: 1, risk: 1 },
  'kneeling-lat-stretch-78s': { name: 'Kneeling lat stretch', nameAr: 'إطالة المجنص على الركب', equipment: 'بدون أدوات', difficulty: 1, risk: 1 },
} satisfies Record<string, ClipInfo>;

type ClipSlug = keyof typeof CLIPS;

const alt = (slug: ClipSlug, note?: string): ExerciseAlternative => {
  const info: ClipInfo = CLIPS[slug];
  return {
    ...info,
    note,
    youtubeUrl: yt(info.name),
    videoUrl: `src/assets/videos/${slug}.mp4`,
    posterUrl: `src/assets/posters/${slug}.jpg`,
  };
};

const VERTICAL_PULL = [
  alt('cable-wide-grip-lat-pulldown--7v7'),
  alt('bar-lateral-pulldown-6r'),
  alt('cable-straight-arm-pulldown-6fc', 'بيشتغل على المجنص لوحده من غير البايسبس'),
];

const HORIZONTAL_ROW = [
  alt('lever-lying-t-bar-row-3h', 'أأمن اختيار لأسفل الضهر'),
  alt('cable-low-seated-row-64g'),
  alt('lever-t-bar-row-1f', 'ضهرك مستقيم ووزن متوسط، لأن أسفل الضهر شايل معاك'),
];

const PULLOVER = [
  alt('cable-straight-arm-pulldown-6fc'),
  alt('cable-wide-grip-lat-pulldown--7v7'),
  alt('bar-lateral-pulldown-6r'),
];

const SCAP_RETRACTION = [
  alt('dumbbell-incline-shrug-6il'),
  alt('lever-lying-t-bar-row-3h', 'دراعك مفرود وضم لوحي الكتف بس من غير ما تثني الكوع'),
  alt('lever-seated-reverse-fly-12'),
  alt('cable-standing-rear-delt-row--6fx'),
];

const REAR_DELT = [
  alt('lever-seated-reverse-fly-12'),
  alt('cable-standing-rear-delt-row--6fx'),
  alt('cable-y-raise-8o6'),
];

const Y_RAISE = [
  alt('cable-y-raise-8o6'),
  alt('lateral-raise-96'),
  alt('cable-one-arm-lateral-raise-64s'),
  alt('lever-lateral-raise-0a'),
];

const LATERAL_RAISE = [
  alt('lateral-raise-96'),
  alt('cable-one-arm-lateral-raise-64s'),
  alt('lever-lateral-raise-0a'),
  alt('cable-y-raise-8o6'),
];

const REVERSE_CURL = [
  alt('cable-reverse-curl-6f6'),
  alt('cable-hammer-curl-63c'),
];

const CRUNCH = [
  alt('cable-kneeling-crunch-641'),
];

const INCLINE_PRESS = [
  alt('dumbbell-incline-bench-press-6i6'),
  alt('lever-chest-press-0t', 'الماكينة بتثبّت المسار، أسهل وأأمن للمبتدئ'),
  alt('dumbbell-bench-press-84'),
];

const FLAT_PRESS = [
  alt('dumbbell-bench-press-84'),
  alt('lever-chest-press-0t', 'الماكينة بتثبّت المسار، أسهل وأأمن للمبتدئ'),
  alt('dumbbell-incline-bench-press-6i6'),
];

const CHEST_FLY = [
  alt('lever-pec-deck-fly-2s'),
  alt('lever-chest-press-0t'),
];

const TRICEPS = [
  alt('cable-pushdown-64b'),
  alt('cable-overhead-triceps-extension--64u', 'وزن متوسط عشان وتر الكوع'),
];

const STRETCH_CURL = [
  alt('dumbbell-incline-curl--6i9'),
  alt('dumbbell-biceps-curl-6hm'),
  alt('cable-hammer-curl-63c'),
];

const CURL = [
  alt('dumbbell-biceps-curl-6hm'),
  alt('dumbbell-incline-curl--6i9'),
  alt('dumbbell-preacher-curl-6js'),
  alt('cable-hammer-curl-63c'),
];

const HAMMER = [
  alt('cable-hammer-curl-63c'),
  alt('cable-reverse-curl-6f6'),
  alt('dumbbell-biceps-curl-6hm'),
];

const PREACHER = [
  alt('dumbbell-preacher-curl-6js'),
  alt('dumbbell-biceps-curl-6hm'),
  alt('dumbbell-incline-curl--6i9'),
];

const LEG_CURL = [
  alt('lever-seated-leg-curl-11'),
  alt('lever-lying-leg-curl-0c'),
  alt('45-degree-hyperextension--6xt', 'ركّز إن الحركة من الورك والشد في الخلفيات'),
];

const GLUTE = [
  alt('smith-hip-thrust-8hx'),
  alt('45-degree-hyperextension--6xt', 'ضهرك مدوّر سنة فوق وركّز على عصر الجلوتس'),
  alt('lever-seated-hip-abduction-19', 'بيشتغل على أعلى الجلوتس'),
];

const SQUAT_PATTERN = [
  alt('sled-hack-squat-1r'),
  alt('sled-45-leg-press-1o'),
  alt('lever-leg-extension-0b', 'عزل للأماميات بس، مفيش جلوتس'),
];

const ADDUCTOR = [
  alt('lever-seated-hip-adduction-10'),
  alt('sled-45-leg-press-1o', 'رجلك واسعة على المنصة والصوابع لبرا عشان الضامة تشتغل'),
];

const ABDUCTOR = [
  alt('lever-seated-hip-abduction-19'),
  alt('smith-hip-thrust-8hx'),
];

const CALF = [alt('smith-calf-raise-32')];

const ROTATION = [
  alt('cable-twist-6g7'),
  alt('cable-kneeling-crunch-641', 'أأمن على الفقرات لأنه من غير لف'),
];

const SHOULDER_PRESS = [
  alt('dumbbell-seated-shoulder-press-6kp'),
  alt('lever-lateral-raise-0a', 'لو كتفك بيوجعك في الضغط، اكتفي بالرفرفة النهارده'),
];

/** Hip hinge without loading the spine. The barbell RDL is intentionally not offered. */
const HINGE = [
  alt('45-degree-hyperextension--6xt'),
  alt('smith-hip-thrust-8hx'),
  alt('lever-seated-leg-curl-11'),
  alt('lever-lying-leg-curl-0c'),
];

const LEG_EXTENSION = [
  alt('lever-leg-extension-0b'),
  alt('sled-hack-squat-1r'),
  alt('sled-45-leg-press-1o'),
];

const TIBIALIS = [alt('smith-toe-raise-3r')];

const WRIST = [
  alt('dumbbell-one-arm-wrist-curl-6jk'),
  alt('cable-reverse-curl-6f6'),
];

const CARDIO = [alt('walking-on-incline-treadmill-8x5')];

const MOBILITY = [
  alt('cat-cow-stretch-9l6'),
  alt('kneeling-hip-flexor-stretch-6c6'),
  alt('hamstring-stretch-724'),
  alt('kneeling-lat-stretch-78s'),
];

export const ALTERNATIVES_BY_MOTION: Record<MotionPattern, ExerciseAlternative[]> = {
  lat_pulldown: VERTICAL_PULL,
  t_bar_row: HORIZONTAL_ROW,
  seated_cable_row: HORIZONTAL_ROW,
  cable_pullover: PULLOVER,
  kelso_shrug: SCAP_RETRACTION,
  reverse_pec_deck: REAR_DELT,
  face_pull: REAR_DELT,
  cable_y_raise: Y_RAISE,
  lateral_raise: LATERAL_RAISE,
  reverse_curl: REVERSE_CURL,
  cable_crunch: CRUNCH,
  incline_db_press: INCLINE_PRESS,
  machine_chest_press: FLAT_PRESS,
  flat_db_press: FLAT_PRESS,
  pec_deck_fly: CHEST_FLY,
  close_grip_bench: TRICEPS,
  overhead_rope_ext: TRICEPS,
  rope_pushdown: TRICEPS,
  bayesian_curl: STRETCH_CURL,
  db_curl: CURL,
  hammer_curl: HAMMER,
  preacher_curl: PREACHER,
  seated_leg_curl: LEG_CURL,
  lying_leg_curl: LEG_CURL,
  smith_hip_thrust: GLUTE,
  leg_press: SQUAT_PATTERN,
  hack_squat: SQUAT_PATTERN,
  adductor: ADDUCTOR,
  abductor: ABDUCTOR,
  calf_raise: CALF,
  torso_rotation: ROTATION,
  db_shoulder_press: SHOULDER_PRESS,
  rdl: HINGE,
  leg_extension: LEG_EXTENSION,
  back_extension: HINGE,
  tibialis_raise: TIBIALIS,
  wrist_flexion: WRIST,
  treadmill_walk: CARDIO,
  mobility_rest: MOBILITY,
  stretch: [],
};

/** Alternatives for an exercise, excluding the one that is the exercise itself (same demo clip). */
export function getAlternatives(motion: MotionPattern, ownVideoUrl: string): ExerciseAlternative[] {
  return (ALTERNATIVES_BY_MOTION[motion] || []).filter((a) => a.videoUrl !== ownVideoUrl);
}
