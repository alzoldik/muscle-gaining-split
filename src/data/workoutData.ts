export type MotionPattern =
  | 'lat_pulldown'
  | 't_bar_row'
  | 'cable_pullover'
  | 'kelso_shrug'
  | 'reverse_pec_deck'
  | 'cable_y_raise'
  | 'lateral_raise'
  | 'reverse_curl'
  | 'cable_crunch'
  | 'incline_db_press'
  | 'machine_chest_press'
  | 'pec_deck_fly'
  | 'close_grip_bench'
  | 'overhead_rope_ext'
  | 'rope_pushdown'
  | 'bayesian_curl'
  | 'db_curl'
  | 'hammer_curl'
  | 'seated_leg_curl'
  | 'smith_hip_thrust'
  | 'leg_press'
  | 'adductor'
  | 'abductor'
  | 'calf_raise'
  | 'torso_rotation'
  | 'flat_db_press'
  | 'db_shoulder_press'
  | 'seated_cable_row'
  | 'face_pull'
  | 'preacher_curl'
  | 'hack_squat'
  | 'rdl'
  | 'leg_extension'
  | 'lying_leg_curl'
  | 'back_extension'
  | 'tibialis_raise'
  | 'wrist_flexion'
  | 'treadmill_walk'
  | 'mobility_rest'
  | 'stretch';

export type MuscleZone =
  | 'lats'
  | 'upper_back'
  | 'rear_delt'
  | 'side_delt'
  | 'front_delt'
  | 'chest'
  | 'triceps'
  | 'biceps'
  | 'forearms'
  | 'abs'
  | 'lower_back'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'adductors'
  | 'calves'
  | 'tibialis';

export type Level = 1 | 2 | 3;

export const DIFFICULTY_LABELS: Record<Level, string> = { 1: 'سهل', 2: 'متوسط', 3: 'صعب' };
export const RISK_LABELS: Record<Level, string> = { 1: 'منخفضة', 2: 'متوسطة', 3: 'عالية' };

export interface ExerciseItem {
  id: string;
  name: string;
  nameAr: string;
  sets: string;
  workingSetsCount: number;
  reps: string;
  rir: string;
  restSeconds: number;
  restLabel: string;
  youtubeUrl: string;
  videoUrl: string;
  posterUrl: string;
  motion: MotionPattern;
  primaryMuscles: MuscleZone[];
  secondaryMuscles: MuscleZone[];
  isNew?: boolean;
  /** Stretch after the workout (not a working exercise). */
  kind?: 'stretch';
  /** Warm-up sets before the working sets (W.U Sets in the PDF). */
  warmupSets?: number;
  /** How hard the technique is to learn: 1 easy, 2 medium, 3 hard. */
  difficulty: Level;
  /** Injury risk for a beginner if done wrong: 1 low, 2 medium, 3 high. */
  risk: Level;
  /** Name of the PDF exercise this one replaces for safety. */
  replaces?: string;
  safetyCaution?: {
    problem: string;
    solution: string;
  };
  cues: string[];
  tempoLabel: string;
  phases: [string, string, string]; // [Eccentric/Stretch, Pause, Concentric/Squeeze]
}

export interface WorkoutDay {
  dayNumber: number;
  dayLabel: string;
  title: string;
  subtitle: string;
  isRestDay: boolean;
  restNote?: string;
  coverImage: string;
  coverAlt: string;
  estimatedMinutes: number;
  exercises: ExerciseItem[];
}

export const HERO_IMAGE = 'src/assets/images/hero_hypertrophy_studio_1795266909040.jpg';
export const IMAGES_BY_FOCUS = {
  pull: 'src/assets/images/day_pull_back_1795266908953.jpg',
  push: 'src/assets/images/day_push_chest_1795266908968.jpg',
  legs: 'src/assets/images/day_legs_power_1795266909295.jpg',
  recovery: 'src/assets/images/recovery_mobility_1795266909023.jpg',
};

export const MUSCLE_LABELS: Record<MuscleZone, string> = {
  lats: 'المجنص (Lats)',
  upper_back: 'أعلى الضهر والترابيس',
  rear_delt: 'الكتف الخلفي',
  side_delt: 'الكتف الجانبي',
  front_delt: 'الكتف الأمامي',
  chest: 'الصدر',
  triceps: 'الترايسبس',
  biceps: 'البايسبس',
  forearms: 'السواعد',
  abs: 'البطن والجذع',
  lower_back: 'أسفل الضهر',
  glutes: 'الجلوتس',
  quads: 'الكوادز (الأماميات)',
  hamstrings: 'الهامسترنج (الخلفيات)',
  adductors: 'الضامة (Adductors)',
  calves: 'السمانة',
  tibialis: 'السمانة الأمامية (Tibialis)',
};

/*
 * The modified program follows the coach's PDF ("Shadad split 2.0 optimized") exercise for exercise,
 * in the same order, with the same warm-up sets, working sets, reps and rest.
 * Only three things differ, all for beginner safety:
 *   1. RDLs  ->  45° back extension (glute & hamstring focus)
 *   2. Smith incline shoulder press  ->  seated DB shoulder press with back support
 *   3. Free-weight / compound lifts stop 1-2 reps short of failure (RIR 1-2) instead of 1-0.
 */
const R_2_3 = { restSeconds: 150, restLabel: '٢-٣ دقائق' };
const R_15_2 = { restSeconds: 105, restLabel: '١.٥-٢ دقيقة' };
const R_1_2 = { restSeconds: 90, restLabel: '١-٢ دقيقة' };

/* ---------------- Reusable movement definitions (same exercise on several days) ---------------- */

const CHEST_SUPPORTED_T_BAR = {
  name: 'T-bar machine (chest supported)',
  nameAr: 'تجديف T-Bar على الماكينة (صدرك مسنود)',
  youtubeUrl: 'https://www.youtube.com/results?search_query=chest+supported+t+bar+row+machine+form',
  videoUrl: 'src/assets/videos/lever-lying-t-bar-row-3h.mp4',
  posterUrl: 'src/assets/posters/lever-lying-t-bar-row-3h.jpg',
  motion: 't_bar_row' as MotionPattern,
  primaryMuscles: ['upper_back', 'lats'] as MuscleZone[],
  secondaryMuscles: ['rear_delt', 'biceps'] as MuscleZone[],
  difficulty: 1 as Level,
  risk: 1 as Level,
  cues: [
    'استخدم النسخة اللي صدرك مسنود فيها على المخدة؛ كده أسفل ضهرك مش شايل أي وزن',
    'اسحب بالكوعين للخلف وضم لوحي الكتف في آخر الحركة',
    'افرد دراعك على الآخر تحت عشان الضهر ياخد إطالة كاملة',
  ],
  tempoLabel: 'سحب ١ث · عصر ١ث · نزول ٢-٣ث',
  phases: ['إطالة لوحي الكتف', 'صدر ثابت على المسند', 'سحب المرفقين للخلف'] as [string, string, string],
};

const WIDE_PULLDOWN = {
  name: 'Wide grip lat pulldown',
  nameAr: 'سحب علوي قبضة واسعة',
  youtubeUrl: 'https://www.youtube.com/results?search_query=wide+grip+lat+pulldown+form',
  videoUrl: 'src/assets/videos/cable-wide-grip-lat-pulldown--7v7.mp4',
  posterUrl: 'src/assets/posters/cable-wide-grip-lat-pulldown--7v7.jpg',
  motion: 'lat_pulldown' as MotionPattern,
  primaryMuscles: ['lats'] as MuscleZone[],
  secondaryMuscles: ['upper_back', 'biceps'] as MuscleZone[],
  difficulty: 1 as Level,
  risk: 1 as Level,
  cues: [
    'اسحب الكوعين لتحت ناحية وسطك وصدرك مرفوع',
    'متتمرجحش بضهرك؛ اطلع بالبار ببطء في ٢-٣ ثواني',
    'نزّل البار لحد أعلى صدرك، مش ورا رقبتك',
  ],
  tempoLabel: 'سحب ١ث · ثبات ١ث · صعود ٣ث',
  phases: ['إطالة كاملة لفوق', 'ثبات مع شد المجنص', 'سحب لأعلى الصدر'] as [string, string, string],
};

const ROPE_PUSHDOWN = {
  name: 'Rope triceps pushdown',
  nameAr: 'ترايسبس كابل بالحبل لتحت',
  youtubeUrl: 'https://www.youtube.com/results?search_query=rope+triceps+pushdown+form',
  videoUrl: 'src/assets/videos/cable-pushdown-64b.mp4',
  posterUrl: 'src/assets/posters/cable-pushdown-64b.jpg',
  motion: 'rope_pushdown' as MotionPattern,
  primaryMuscles: ['triceps'] as MuscleZone[],
  secondaryMuscles: [] as MuscleZone[],
  difficulty: 1 as Level,
  risk: 1 as Level,
  cues: [
    'الكوعين ثابتين جنب جسمك طول المجموعة',
    'افرد دراعك على الآخر وافتح طرفين الحبل تحت',
    'اطلع ببطء لحد زاوية ٩٠ درجة تقريبًا',
  ],
  tempoLabel: 'دفع ١ث · عصر ١ث · صعود ٢ث',
  phases: ['ثني الكوع', 'المرفق ثابت جنبك', 'فرد كامل لتحت'] as [string, string, string],
};

const CABLE_CRUNCH = {
  name: 'Abdominal crunches (cable)',
  nameAr: 'كرانش بطن على الكابل',
  youtubeUrl: 'https://www.youtube.com/results?search_query=cable+crunch+form',
  videoUrl: 'src/assets/videos/cable-kneeling-crunch-641.mp4',
  posterUrl: 'src/assets/posters/cable-kneeling-crunch-641.jpg',
  motion: 'cable_crunch' as MotionPattern,
  primaryMuscles: ['abs'] as MuscleZone[],
  secondaryMuscles: [] as MuscleZone[],
  difficulty: 1 as Level,
  risk: 1 as Level,
  cues: [
    'قرّب ضلوعك من وسطك، الحركة من البطن مش من الحوض',
    'طلّع النفس كله وانت نازل',
    'متشدّش الحبل بدراعك ولا برقبتك',
  ],
  tempoLabel: 'انقباض ١ث · عصر ١ث · رجوع ٢ث',
  phases: ['الجذع ممدود لفوق', 'الحوض ثابت', 'انحناء الجذع لتحت'] as [string, string, string],
};

const ADDUCTOR_MACHINE = {
  name: 'Adductors machine',
  nameAr: 'جهاز الضامة (الفخذ الداخلي)',
  youtubeUrl: 'https://www.youtube.com/results?search_query=adductor+machine+form',
  videoUrl: 'src/assets/videos/lever-seated-hip-adduction-10.mp4',
  posterUrl: 'src/assets/posters/lever-seated-hip-adduction-10.jpg',
  motion: 'adductor' as MotionPattern,
  primaryMuscles: ['adductors'] as MuscleZone[],
  secondaryMuscles: ['glutes'] as MuscleZone[],
  difficulty: 1 as Level,
  risk: 1 as Level,
  cues: [
    'افتح رجلك لآخر مدى مريح في البداية، من غير ما توجعك',
    'اضغط لجوه بالفخذ الداخلي',
    'متقفلش الجهاز بخبطة؛ رجّعه ببطء',
  ],
  tempoLabel: 'قفل ١ث · عصر ١ث · فتح ٢-٣ث',
  phases: ['إطالة الفخذ الداخلي', 'ضهرك على المسند', 'ضم الفخذين لجوه'] as [string, string, string],
};

const SMITH_CALF = {
  name: 'Smith standing calf raises',
  nameAr: 'سمانة واقف على السميث',
  youtubeUrl: 'https://www.youtube.com/results?search_query=smith+machine+calf+raise+form',
  videoUrl: 'src/assets/videos/smith-calf-raise-32.mp4',
  posterUrl: 'src/assets/posters/smith-calf-raise-32.jpg',
  motion: 'calf_raise' as MotionPattern,
  primaryMuscles: ['calves'] as MuscleZone[],
  secondaryMuscles: [] as MuscleZone[],
  difficulty: 1 as Level,
  risk: 1 as Level,
  cues: [
    'اقف على حرف استيب عشان الكعب ينزل لآخره',
    'اقف ١-٢ ثانية تحت عشان متستخدمش ارتداد الوتر',
    'اطلع على مشط رجلك على الآخر والركبة مفرودة',
  ],
  tempoLabel: 'ثبات تحت ٢ث · رفع ١ث · عصر ١ث',
  phases: ['إطالة ووقفة ٢ث', 'ركبة مفرودة', 'طلوع كامل على المشط'] as [string, string, string],
};

const DB_SHOULDER_PRESS = {
  name: 'Seated DB shoulder press',
  nameAr: 'ضغط كتف بالدمبل جالس (ضهرك مسنود)',
  youtubeUrl: 'https://www.youtube.com/results?search_query=seated+dumbbell+shoulder+press+form',
  videoUrl: 'src/assets/videos/dumbbell-seated-shoulder-press-6kp.mp4',
  posterUrl: 'src/assets/posters/dumbbell-seated-shoulder-press-6kp.jpg',
  motion: 'db_shoulder_press' as MotionPattern,
  primaryMuscles: ['front_delt'] as MuscleZone[],
  secondaryMuscles: ['side_delt', 'triceps'] as MuscleZone[],
  difficulty: 2 as Level,
  risk: 2 as Level,
  safetyCaution: {
    problem: 'السميث بيجبر الكتف يمشي في خط ثابت، وده ممكن يعمل احتكاك في الكتف (Impingement) لو المسار مش مناسب لجسمك',
    solution: 'بالدمبل الكتف بياخد مساره الطبيعي. الكوع قدامك ٣٠-٤٥ درجة، والبنش ٧٥-٨٠ درجة، ووزن تقدر تتحكم فيه',
  },
  cues: [
    'اضبط البنش على ٧٥-٨٠ درجة، مش ٩٠ بالظبط',
    'خلي الكوعين قدامك شوية (٣٠-٤٥ درجة) مش على الجنب خالص',
    'انزل لحد مستوى ودنك وبعدين ادفع لفوق',
  ],
  tempoLabel: 'نزول ٢-٣ث · دفع ١ث',
  phases: ['نزول لمستوى الودن', 'الكوع قدامك ٣٠-٤٥°', 'دفع لفوق'] as [string, string, string],
};

/* ---------------- Stretches after the workout: shown inside each training day ---------------- */

/** Which muscles the day trains, so the stretches match it. */
export type DayFocus = 'pull' | 'push' | 'upper' | 'legs';

type RoutineDef = Omit<
  ExerciseItem,
  'id' | 'kind' | 'workingSetsCount' | 'rir' | 'videoUrl' | 'posterUrl' | 'difficulty' | 'risk' | 'motion'
> & { slug: string };

const routineItem = (key: string, d: RoutineDef) => ({ key, d });

const stretch = (
  key: string,
  slug: string,
  name: string,
  nameAr: string,
  muscles: MuscleZone[],
  cues: string[],
  perSide = true
) =>
  routineItem(key, {
    slug,
    name,
    nameAr,
    sets: '1',
    reps: perSide ? '٣٠ث لكل جنب' : '٣٠ ثانية',
    restSeconds: 30,
    restLabel: '٣٠ث',
    youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`,
    primaryMuscles: muscles,
    secondaryMuscles: [],
    cues,
    tempoLabel: 'ثبات ٣٠ ثانية · نفس عميق',
    phases: ['ادخل في الإطالة ببطء', 'اثبت من غير هز', 'اخرج ببطء'],
  });

const S_LAT = stretch('lat', 'kneeling-lat-stretch-78s', 'Kneeling lat stretch', 'إطالة المجنص على الركب', ['lats'], [
  'إيدك قدامك على الأرض أو البنش وارجع بمؤخرتك لورا',
  'هتحس بشد على جنب الضهر تحت الإبط',
  'شد مريح بس، مش وجع',
], false);
const S_SHOULDER = stretch('shoulder', 'across-chest-shoulder-stretch-7nh', 'Cross body shoulder stretch', 'إطالة الكتف بالدراع على الصدر', ['rear_delt', 'side_delt'], [
  'اسحب دراعك على صدرك بالإيد التانية',
  'كتفك لتحت ومتلفش جسمك',
  'بتريّح الكتف الخلفي والجانبي بعد الرفرفة والسحب',
]);
const S_NECK = stretch('neck', 'side-neck-stretch-6t9', 'Upper trap stretch', 'إطالة الرقبة والترابيس', ['upper_back'], [
  'ميّل ودنك ناحية كتفك والكتف التاني لتحت',
  'ممكن تسحب راسك بإيدك سنة صغيرة جدًا',
  'مهمة بعد الكيلسو والـ Y raise',
]);
const S_CHEST = stretch('chest', 'standing-one-arm-chest-stretch-6c1', 'Doorway chest stretch', 'إطالة الصدر على الحيطة', ['chest', 'front_delt'], [
  'دراعك على الحيطة أو الباب والكوع على مستوى الكتف',
  'لف جسمك للناحية التانية لحد ما تحس بشد في الصدر',
  'متزقش جامد؛ الكتف ميتوجعش',
]);
const S_TRICEPS = stretch('triceps', 'overhead-triceps-stretch-6r1', 'Overhead triceps stretch', 'إطالة الترايسبس فوق الراس', ['triceps'], [
  'دراعك فوق راسك والكوع مثني، واسحبه بالإيد التانية',
  'ضهرك مستقيم ومتقوّسش',
  'بتريّح الترايسبس والكوع بعد الحبل والأوفرهيد',
]);
const S_HAMSTRING = stretch('hamstring', 'hamstring-stretch-724', 'Hamstring stretch', 'إطالة الخلفيات', ['hamstrings'], [
  'رجلك مفرودة وانزل من الوسط وضهرك مستقيم',
  'الشد يكون ورا الفخد، مش في أسفل الضهر',
  'متنطّش؛ اثبت بس',
]);
const S_QUAD = stretch('quad', 'all-fours-squad-stretch-72f', 'Quad stretch', 'إطالة الأماميات', ['quads'], [
  'امسك رجلك من ورا وقرّب كعبك من مؤخرتك',
  'الركبتين جنب بعض والحوض لقدام سنة',
  'بتريّح الركبة بعد الهاك والرجل الأمامي',
]);
const S_HIP_FLEXOR = stretch('hip-flexor', 'kneeling-hip-flexor-stretch-6c6', 'Kneeling hip flexor stretch', 'إطالة مقدمة الحوض على ركبة', ['quads', 'glutes'], [
  'ركبة على الأرض والتانية قدامك، وادفع الحوض لقدام',
  'اعصر الجلوتس بتاع الرجل اللي على الأرض',
  'مهمة جدًا لأسفل الضهر بعد يوم الرجل',
]);
const S_CALF = stretch('calf', 'calf-stretch-with-hands-against-wall-793', 'Wall calf stretch', 'إطالة السمانة على الحيطة', ['calves'], [
  'إيدك على الحيطة ورجل ورا مفرودة والكعب على الأرض',
  'ميّل لقدام لحد ما تحس بشد في السمانة',
  'بعد السمانة على السميث على طول',
]);

const STRETCHES: Record<DayFocus, ReturnType<typeof routineItem>[]> = {
  pull: [S_LAT, S_SHOULDER, S_NECK],
  push: [S_CHEST, S_SHOULDER, S_TRICEPS],
  upper: [S_CHEST, S_LAT, S_SHOULDER, S_TRICEPS],
  legs: [S_HAMSTRING, S_QUAD, S_HIP_FLEXOR, S_CALF],
};

const toItem = (idPrefix: string, { key, d }: ReturnType<typeof routineItem>): ExerciseItem => {
  const { slug, ...rest } = d;
  return {
    ...rest,
    id: `${idPrefix}-st-${key}`,
    kind: 'stretch',
    workingSetsCount: 1,
    rir: '-',
    videoUrl: `src/assets/videos/${slug}.mp4`,
    posterUrl: `src/assets/posters/${slug}.jpg`,
    motion: 'stretch',
    difficulty: 1,
    risk: 1,
  };
};

/** Puts the day's stretches after its exercises. */
export function withStretches(day: WorkoutDay, focus: DayFocus, idPrefix: string): WorkoutDay {
  if (day.isRestDay) return day;
  return {
    ...day,
    estimatedMinutes: day.estimatedMinutes + 4,
    exercises: [...day.exercises, ...STRETCHES[focus].map((r) => toItem(idPrefix, r))],
  };
}

const MODIFIED_FOCUS: Record<number, DayFocus> = { 1: 'pull', 2: 'push', 3: 'legs', 5: 'upper', 6: 'legs' };

const PDF_DAYS: WorkoutDay[] = [
  {
    dayNumber: 1,
    dayLabel: 'يوم ١',
    title: 'ضهر وكتف',
    subtitle: 'نفس تمارين يوم ١ في الـ PDF وبنفس الترتيب: كتف جانبي، عرض الضهر، ترابيس، سُمك، وبطن',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.pull,
    coverAlt: 'جهاز السحب العلوي للكابل وبار واسع في صالة تدريب حديثة',
    estimatedMinutes: 60,
    exercises: [
      {
        id: 'd1-cable-y-raises',
        name: 'Cable Y raises',
        nameAr: 'رفرفة كابل على شكل حرف Y',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_1_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+y+raise+form',
        videoUrl: 'src/assets/videos/cable-y-raise-8o6.mp4',
        posterUrl: 'src/assets/posters/cable-y-raise-8o6.jpg',
        motion: 'cable_y_raise',
        primaryMuscles: ['side_delt', 'upper_back'],
        secondaryMuscles: ['rear_delt'],
        difficulty: 2,
        risk: 1,
        cues: [
          'اسحب الكابلين متقاطعين لفوق وبرا على شكل حرف Y',
          'متشيلش كتافك لفوق ناحية ودانك',
          'انزل ببطء عشان الكتف والترابيس السفلي يشتغلوا',
        ],
        tempoLabel: 'رفع ١ث · ثبات ١ث · نزول ٢ث',
        phases: ['البداية متقاطعة', 'الجذع ثابت', 'رفع بزاوية ٤٥ درجة'],
      },
      {
        id: 'd1-lat-pulldown',
        ...WIDE_PULLDOWN,
        warmupSets: 1,
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1-0',
        ...R_2_3,
      },
      {
        id: 'd1-kelso-shrugs',
        name: 'Kelso shrugs',
        nameAr: 'شراجز كيلسو (ضم لوحي الكتف)',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=kelso+shrug+form',
        videoUrl: 'src/assets/videos/dumbbell-incline-shrug-6il.mp4',
        posterUrl: 'src/assets/posters/dumbbell-incline-shrug-6il.jpg',
        motion: 'kelso_shrug',
        primaryMuscles: ['upper_back'],
        secondaryMuscles: ['rear_delt'],
        difficulty: 2,
        risk: 1,
        safetyCaution: {
          problem: 'ممكن تتعب رقبتك لو شلت وزن تقيل أو رفعت كتافك لودانك',
          solution: 'وزن متوسط، صدرك على البنش، وركّز إنك تضم لوحي الكتف لورا من غير ما تشيل كتافك لفوق',
        },
        cues: [
          'دراعك مفرود على الآخر؛ الحركة من لوح الكتف بس',
          'اضغط لوحي الكتف ناحية العمود الفقري من غير ما تثني الكوع',
          'وزن متوسط بيحمي الرقبة وبيخلي الانقباض أوضح',
        ],
        tempoLabel: 'ضم ١ث · ثبات ١ث · فرد ٢ث',
        phases: ['فتح لوحي الكتف', 'عصر نص الضهر', 'ضم لوحي الكتف لورا'],
      },
      {
        id: 'd1-t-bar-row',
        ...CHEST_SUPPORTED_T_BAR,
        sets: '1',
        workingSetsCount: 1,
        reps: '6-10',
        rir: '1-2',
        ...R_2_3,
      },
      {
        id: 'd1-cable-pullover',
        name: 'Cable lat pullover',
        nameAr: 'بلوفر كابل للمجنص',
        warmupSets: 1,
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+lat+pullover+form',
        videoUrl: 'src/assets/videos/cable-straight-arm-pulldown-6fc.mp4',
        posterUrl: 'src/assets/posters/cable-straight-arm-pulldown-6fc.jpg',
        motion: 'cable_pullover',
        primaryMuscles: ['lats'],
        secondaryMuscles: ['abs', 'triceps'],
        difficulty: 2,
        risk: 1,
        cues: [
          'ميّل جسمك لقدام ٣٠-٤٠ درجة والكوع مثني سنة صغيرة وثابت',
          'اسحب من الكتف في قوس لحد فخادك',
          'ركّز على إطالة المجنص فوق',
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · صعود ٣ث',
        phases: ['إطالة كاملة للمجنص', 'زاوية الكوع ثابتة', 'سحب القوس للوسط'],
      },
      {
        id: 'd1-db-lateral-raises',
        name: 'DB lateral raises',
        nameAr: 'رفرفة جانبي بالدمبل',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-10',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form',
        videoUrl: 'src/assets/videos/lateral-raise-96.mp4',
        posterUrl: 'src/assets/posters/lateral-raise-96.jpg',
        motion: 'lateral_raise',
        primaryMuscles: ['side_delt'],
        secondaryMuscles: ['upper_back'],
        difficulty: 1,
        risk: 1,
        cues: [
          'ارفع الدمبل مايل لقدام سنة (حوالي ٣٠ درجة)',
          'الكوع هو اللي يقود الحركة مش الرسغ، لحد مستوى الكتف',
          'انزل ببطء ومتريّحش الدمبل على رجلك',
        ],
        tempoLabel: 'رفع ١ث · نزول ٢-٣ث',
        phases: ['شد مستمر تحت', 'من غير مرجحة', 'رفع لمستوى الكتف'],
      },
      {
        id: 'd1-cable-reverse-curl',
        name: 'Cable reverse curl',
        nameAr: 'باي عكسي على الكابل (سواعد)',
        warmupSets: 1,
        sets: '1',
        workingSetsCount: 1,
        reps: '8-12',
        rir: '1-2',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+reverse+curl+form',
        videoUrl: 'src/assets/videos/cable-reverse-curl-6f6.mp4',
        posterUrl: 'src/assets/posters/cable-reverse-curl-6f6.jpg',
        motion: 'reverse_curl',
        primaryMuscles: ['forearms', 'biceps'],
        secondaryMuscles: [],
        difficulty: 1,
        risk: 1,
        cues: [
          'امسك البار وضهر إيدك لفوق',
          'الكوعين ثابتين جنبك ومتقدمهمش لقدام',
          'ممتاز للعضلة العضدية الكعبرية (Brachioradialis)',
        ],
        tempoLabel: 'رفع ١ث · نزول ٢ث',
        phases: ['إطالة كاملة تحت', 'الكوعين ثابتين', 'ثني الكوع لفوق'],
      },
      {
        id: 'd1-abs-crunches',
        ...CABLE_CRUNCH,
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_15_2,
      },
    ],
  },
  {
    dayNumber: 2,
    dayLabel: 'يوم ٢',
    title: 'صدر ودراعات',
    subtitle: 'نفس تمارين يوم ٢ في الـ PDF: صدر مايل وفراشة، وبعدها بايسبس وترايسبس بالتبادل',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'دمبل أسود مطفي بجانب بنش مائل منخفض في جيم حديث',
    estimatedMinutes: 60,
    exercises: [
      {
        id: 'd2-db-low-incline',
        name: 'DB low incline chest press',
        nameAr: 'ضغط صدر دمبل مايل واطي (١٥-٣٠°)',
        warmupSets: 2,
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=low+incline+dumbbell+press+form',
        videoUrl: 'src/assets/videos/dumbbell-incline-bench-press-6i6.mp4',
        posterUrl: 'src/assets/posters/dumbbell-incline-bench-press-6i6.jpg',
        motion: 'incline_db_press',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt', 'triceps'],
        difficulty: 2,
        risk: 2,
        safetyCaution: {
          problem: 'لو نزلت بالدمبل أوطى من اللازم أو فتحت كوعك على الجنب خالص، الضغط بيروح على مقدمة الكتف',
          solution: 'الكوع ٤٥ درجة من جسمك، انزل لحد مستوى صدرك بس، ووقّف قبل الفشل بعدة أو اتنين (RIR 1-2)',
        },
        cues: [
          'البنش على ١٥-٣٠ درجة عشان الصدر العلوي والنص',
          'انزل بالكوعين بزاوية ٤٥ درجة بعيد عن جسمك',
          'انزل لحد مستوى صدرك بعمق مريح وبعدين ادفع',
        ],
        tempoLabel: 'نزول ٣ث · ثبات ١ث · دفع ١ث',
        phases: ['نزول جنب الصدر', 'وقفة خفيفة تحت', 'دفع لفوق'],
      },
      {
        id: 'd2-chest-fly',
        name: 'Chest fly machine',
        nameAr: 'فراشة صدر على الماكينة',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=pec+deck+fly+form',
        videoUrl: 'src/assets/videos/lever-pec-deck-fly-2s.mp4',
        posterUrl: 'src/assets/posters/lever-pec-deck-fly-2s.jpg',
        motion: 'pec_deck_fly',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt'],
        difficulty: 1,
        risk: 1,
        cues: [
          'الكوع مثني سنة صغيرة وثابت طول التمرين',
          'فكّر إنك بتقرّب كوعك من بعض، مش إيدك بس',
          'وقّف في الفتح عند خط كتفك من غير مبالغة',
        ],
        tempoLabel: 'فتح ٢-٣ث · ضم ١ث · عصر ١ث',
        phases: ['فتح وإطالة للصدر', 'صدرك مرفوع', 'تقريب الكوعين قدام الصدر'],
      },
      {
        id: 'd2-db-curl',
        name: 'DB no cheat curl',
        nameAr: 'باي دمبل من غير غش',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=strict+dumbbell+bicep+curl+form',
        videoUrl: 'src/assets/videos/dumbbell-biceps-curl-6hm.mp4',
        posterUrl: 'src/assets/posters/dumbbell-biceps-curl-6hm.jpg',
        motion: 'db_curl',
        primaryMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        difficulty: 1,
        risk: 1,
        cues: [
          'لف كف إيدك لفوق مع بداية الرفع',
          'جسمك ثابت خالص، من غير مرجحة بضهرك (عشان كده اسمه No cheat)',
          'افرد دراعك على الآخر تحت',
        ],
        tempoLabel: 'رفع ١ث · نزول ٢-٣ث',
        phases: ['فرد كامل تحت', 'الجذع ثابت', 'ثني مع لف الرسغ'],
      },
      {
        id: 'd2-rope-pushdown',
        ...ROPE_PUSHDOWN,
        warmupSets: 1,
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
      },
      {
        id: 'd2-bayesian-curl',
        name: 'Biceps bayesian curl',
        nameAr: 'باي بايزيان على الكابل',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=bayesian+cable+curl+form',
        videoUrl: 'src/assets/videos/dumbbell-incline-curl--6i9.mp4',
        posterUrl: 'src/assets/posters/dumbbell-incline-curl--6i9.jpg',
        motion: 'bayesian_curl',
        primaryMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        difficulty: 2,
        risk: 1,
        cues: [
          'ضهرك للكابل واتقدم خطوة لقدام، دراعك ممدود ورا جسمك',
          'الكوع ثابت ورا جسمك وارفع الساعد من غير ما تسحب الكوع لقدام',
          'الفيديو بيوضح نفس الفكرة بالدمبل على بنش مايل (البايسبس في وضع إطالة)',
        ],
        tempoLabel: 'رفع ١ث · نزول ٣ث',
        phases: ['إطالة البايسبس ورا الجسم', 'الكتف ثابت لورا', 'ثني الساعد لفوق'],
      },
      {
        id: 'd2-overhead-rope',
        name: 'Rope overhead extension',
        nameAr: 'ترايسبس فوق الراس بالحبل',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-10',
        rir: '1-2',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+overhead+triceps+extension+rope+form',
        videoUrl: 'src/assets/videos/cable-overhead-triceps-extension--64u.mp4',
        posterUrl: 'src/assets/posters/cable-overhead-triceps-extension--64u.jpg',
        motion: 'overhead_rope_ext',
        primaryMuscles: ['triceps'],
        secondaryMuscles: [],
        difficulty: 2,
        risk: 2,
        safetyCaution: {
          problem: 'ضغط على وتر الكوع لو الوزن تقيل أو نزلت بسرعة',
          solution: 'وزن متوسط، نزول بطيء، والكوعين ثابتين؛ ووقّف قبل الفشل بعدة أو اتنين',
        },
        cues: [
          'دراعك العلوي ثابت جنب راسك بزاوية مريحة',
          'خلي الساعد ينزل لآخره عشان الرأس الطويل ياخد إطالة',
          'افرد بهدوء من غير ما الكوع يفتح لبرا',
        ],
        tempoLabel: 'نزول ٣ث · فرد ١ث',
        phases: ['إطالة ورا الراس', 'الدراع العلوي ثابت', 'فرد كامل لقدام وفوق'],
      },
      {
        id: 'd2-cable-hammer-curl',
        name: 'Cable hammer curl',
        nameAr: 'هامر كيرل بالحبل على الكابل',
        sets: '1',
        workingSetsCount: 1,
        reps: '8-10',
        rir: '1-0',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+rope+hammer+curl+form',
        videoUrl: 'src/assets/videos/cable-hammer-curl-63c.mp4',
        posterUrl: 'src/assets/posters/cable-hammer-curl-63c.jpg',
        motion: 'hammer_curl',
        primaryMuscles: ['biceps', 'forearms'],
        secondaryMuscles: [],
        difficulty: 1,
        risk: 1,
        cues: [
          'امسك الحبل والإبهام لفوق',
          'الكوعين ثابتين جنبك',
          'بيشتغل على الـ Brachialis اللي بيدي سُمك للدراع',
        ],
        tempoLabel: 'رفع ١ث · نزول ٢ث',
        phases: ['إطالة كاملة تحت', 'قبضة ثابتة', 'رفع لآخر انقباض'],
      },
    ],
  },
  {
    dayNumber: 3,
    dayLabel: 'يوم ٣',
    title: 'رجل وكتف جانبي وبطن',
    subtitle: 'نفس تمارين يوم ٣ في الـ PDF: خلفيات، ليج برس، جلوتس، ضامة، سمانة، وبعدها كتف جانبي وبطن',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'جهاز الهاك سكوات والأوزان الحديدية في صالة تدريب احترافية',
    estimatedMinutes: 65,
    exercises: [
      {
        id: 'd3-seated-leg-curl',
        name: 'Seated leg curl',
        nameAr: 'رجل خلفي جالس',
        warmupSets: 2,
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=seated+leg+curl+form',
        videoUrl: 'src/assets/videos/lever-seated-leg-curl-11.mp4',
        posterUrl: 'src/assets/posters/lever-seated-leg-curl-11.jpg',
        motion: 'seated_leg_curl',
        primaryMuscles: ['hamstrings'],
        secondaryMuscles: ['calves'],
        difficulty: 1,
        risk: 1,
        cues: [
          'ثبّت مخدة الفخذ كويس؛ القعدة بتدي الخلفيات إطالة ممتازة',
          'اسحب كعبك لتحت ولورا لآخر مدى',
          'اطلع ببطء وانت مقاوم الوزن',
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · رجوع ٣ث',
        phases: ['إطالة كاملة', 'الحوض ثابت في الكرسي', 'ثني الركبة لتحت'],
      },
      {
        id: 'd3-leg-press',
        name: 'Leg press machine',
        nameAr: 'دفع رجل (Leg Press)',
        warmupSets: 2,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=leg+press+form',
        videoUrl: 'src/assets/videos/sled-45-leg-press-1o.mp4',
        posterUrl: 'src/assets/posters/sled-45-leg-press-1o.jpg',
        motion: 'leg_press',
        primaryMuscles: ['quads', 'glutes'],
        secondaryMuscles: ['hamstrings'],
        difficulty: 1,
        risk: 2,
        safetyCaution: {
          problem: 'لو نزلت أعمق من مرونتك، الحوض بيتلف وأسفل الضهر بيقوم من الكرسي، وده ضغط على الفقرات',
          solution: 'انزل لحد قبل ما الحوض يتحرك من الكرسي بس، ومتقفلش الركبة على الآخر فوق',
        },
        cues: [
          'القدمين في نص المنصة بعرض الكتف',
          'انزل لأعمق نقطة وأسفل ضهرك لسه لازق في الكرسي',
          'متقفلش الركبة على الآخر فوق',
        ],
        tempoLabel: 'نزول ٣ث · دفع ١ث',
        phases: ['ثني والحوض ثابت', 'الكعب على المنصة', 'دفع لفوق'],
      },
      {
        id: 'd3-smith-hip-thrust',
        name: 'Smith hip thrust',
        nameAr: 'هيب ثرست على السميث',
        warmupSets: 1,
        sets: '1',
        workingSetsCount: 1,
        reps: '8-12',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=smith+machine+hip+thrust+form',
        videoUrl: 'src/assets/videos/smith-hip-thrust-8hx.mp4',
        posterUrl: 'src/assets/posters/smith-hip-thrust-8hx.jpg',
        motion: 'smith_hip_thrust',
        primaryMuscles: ['glutes'],
        secondaryMuscles: ['hamstrings', 'quads'],
        difficulty: 2,
        risk: 1,
        cues: [
          'أسفل لوح الكتف على البنش، والساق عمودية فوق',
          'ادفع بالكعب وارفع الحوض واقفل بالجلوتس مش بضهرك',
          'حط مخدة على البار عشان متوجعش عضمة الحوض',
        ],
        tempoLabel: 'دفع ١ث · عصر ١-٢ث · نزول ٢ث',
        phases: ['نزول بالحوض', 'الدقن لتحت سنة', 'رفع الحوض وعصر الجلوتس'],
      },
      {
        id: 'd3-adductor',
        ...ADDUCTOR_MACHINE,
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
      },
      {
        id: 'd3-calf-raises',
        ...SMITH_CALF,
        warmupSets: 1,
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
      },
      {
        id: 'd3-cable-lateral',
        name: 'Cable lateral raises (wrist height)',
        nameAr: 'رفرفة جانبي كابل (البكرة عند الرسغ)',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1-0',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+lateral+raise+form',
        videoUrl: 'src/assets/videos/cable-one-arm-lateral-raise-64s.mp4',
        posterUrl: 'src/assets/posters/cable-one-arm-lateral-raise-64s.jpg',
        motion: 'lateral_raise',
        primaryMuscles: ['side_delt'],
        secondaryMuscles: [],
        difficulty: 1,
        risk: 1,
        cues: [
          'W.H يعني البكرة على مستوى رسغك (Wrist Height)',
          'ارفع دراعك لبرا وسيب مسافة بين كتفك وودنك',
          'انزل ببطء والشد مستمر',
        ],
        tempoLabel: 'رفع ١ث · نزول ٢-٣ث',
        phases: ['شد مستمر قدام الجسم', 'الجذع ثابت', 'رفع لمستوى الكتف'],
      },
      {
        id: 'd3-torso-rotation',
        name: 'Cable torso rotation',
        nameAr: 'لف الجذع على الكابل',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-2',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+torso+rotation+form',
        videoUrl: 'src/assets/videos/cable-twist-6g7.mp4',
        posterUrl: 'src/assets/posters/cable-twist-6g7.jpg',
        motion: 'torso_rotation',
        primaryMuscles: ['abs'],
        secondaryMuscles: ['lower_back'],
        difficulty: 2,
        risk: 2,
        safetyCaution: {
          problem: 'لو اللف جه من أسفل الضهر بدل الصدر والحوض، بيضغط على الفقرات القطنية',
          solution: 'وزن خفيف، حركة بطيئة، بطنك مشدودة، ولف الصدر والحوض مع بعض',
        },
        cues: [
          'دراعك مفرود قدامك والكابل على مستوى صدرك',
          'لف صدرك ببطء وبطنك مشدودة (Core bracing)',
          'متخطفش الوزن في أول الحركة',
        ],
        tempoLabel: 'لف ٢ث · ثبات ١ث · رجوع ٢ث',
        phases: ['رجوع بطيء', 'شد البطن', 'لف الجذع من الصدر'],
      },
      {
        id: 'd3-abs-crunches',
        ...CABLE_CRUNCH,
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1-0',
        ...R_15_2,
      },
    ],
  },
  {
    dayNumber: 4,
    dayLabel: 'يوم ٤',
    title: 'راحة واستشفاء 🛌',
    subtitle: 'يوم راحة بعد ٣ أيام ورا بعض، زي الـ PDF بالظبط',
    isRestDay: true,
    restNote: 'في أيام الراحة: اعمل ١٠ دقايق Mobility للجسم كله لتحسين مرونة المفاصل وتسريع الاستشفاء.',
    coverImage: IMAGES_BY_FOCUS.recovery,
    coverAlt: 'سجادة تمرين وأحزمة مقاومة وعصا مرونة في مساحة هادئة مضاءة بنور طبيعي',
    estimatedMinutes: 15,
    exercises: [
      {
        id: 'd4-mobility',
        name: 'Full body mobility routine (10 min)',
        nameAr: 'روتين مرونة وحركة للجسم كله (١٠ دقائق)',
        sets: '1',
        workingSetsCount: 1,
        reps: '10 دقائق',
        rir: '-',
        restSeconds: 0,
        restLabel: 'مستمر',
        youtubeUrl: 'https://www.youtube.com/results?search_query=full+body+mobility+routine+10+minutes',
        videoUrl: 'src/assets/videos/cat-cow-stretch-9l6.mp4',
        posterUrl: 'src/assets/posters/cat-cow-stretch-9l6.jpg',
        motion: 'mobility_rest',
        primaryMuscles: ['lower_back', 'upper_back'],
        secondaryMuscles: ['glutes', 'hamstrings'],
        difficulty: 1,
        risk: 1,
        cues: [
          'حركات هادية بتفتح الحوض والعمود الفقري والكتف',
          'نفس عميق وهادي بيساعد الجسم يستشفى',
          'اشرب ٣ لتر مية ونام ٧-٩ ساعات',
        ],
        tempoLabel: 'حركة انسيابية من غير مجهود',
        phases: ['شهيق وإطالة خفيفة', 'تحريك المفاصل بمدى كامل', 'زفير واسترخاء'],
      },
    ],
  },
  {
    dayNumber: 5,
    dayLabel: 'يوم ٥',
    title: 'جزء علوي (Upper)',
    subtitle: 'يوم ٤ في الـ PDF: ضهر وصدر وكتف ودراعات. ضغط الكتف على السميث اتبدّل بالدمبل جالس عشان الكتف',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'منطقة تدريب الجزء العلوي مع بنش وأوزان حرة',
    estimatedMinutes: 65,
    exercises: [
      {
        id: 'd5-t-bar-row',
        ...CHEST_SUPPORTED_T_BAR,
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1-2',
        ...R_2_3,
      },
      {
        id: 'd5-db-flat-press',
        name: 'DB flat press',
        nameAr: 'بنش دمبل مستوي',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+bench+press+form',
        videoUrl: 'src/assets/videos/dumbbell-bench-press-84.mp4',
        posterUrl: 'src/assets/posters/dumbbell-bench-press-84.jpg',
        motion: 'flat_db_press',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt', 'triceps'],
        difficulty: 2,
        risk: 2,
        safetyCaution: {
          problem: 'لو الكوع مفتوح ٩٠ درجة على الجنب أو نزلت أوطى من صدرك، الضغط بيروح على مقدمة الكتف',
          solution: 'الكوع ٤٥ درجة، لوحي الكتف مضمومين على البنش، ووقّف قبل الفشل بعدة أو اتنين',
        },
        cues: [
          'رجلك ثابتة في الأرض ولوحي الكتف مضمومين لورا ولتحت',
          'انزل بالدمبل ناحية نص صدرك والكوع ٤٥ درجة',
          'ادفع لفوق والرسغ ثابت',
        ],
        tempoLabel: 'نزول ٣ث · ثبات ١ث · دفع ١ث',
        phases: ['نزول لخط الصدر', 'لوحي الكتف ثابتين', 'دفع لفوق'],
      },
      {
        id: 'd5-wide-pulldown',
        ...WIDE_PULLDOWN,
        warmupSets: 1,
        sets: '1',
        workingSetsCount: 1,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
      },
      {
        id: 'd5-db-shoulder-press',
        ...DB_SHOULDER_PRESS,
        replaces: 'Smith incline shoulder press',
        sets: '1',
        workingSetsCount: 1,
        reps: '6-10',
        rir: '1-2',
        ...R_2_3,
      },
      {
        id: 'd5-close-seated-row',
        name: 'Close grip seated row',
        nameAr: 'تجديف كابل جالس قبضة ضيقة',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=close+grip+seated+cable+row+form',
        videoUrl: 'src/assets/videos/cable-low-seated-row-64g.mp4',
        posterUrl: 'src/assets/posters/cable-low-seated-row-64g.jpg',
        motion: 'seated_cable_row',
        primaryMuscles: ['lats', 'upper_back'],
        secondaryMuscles: ['biceps'],
        difficulty: 1,
        risk: 1,
        cues: [
          'اسحب المقبض ناحية بطنك والكوعين لازقين في وسطك',
          'ضهرك مفرود ومتتمرجحش لورا كتير',
          'ممتاز للألياف السفلية للمجنص',
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · إطالة ٢-٣ث',
        phases: ['إطالة لقدام وضهرك مفرود', 'الجذع ثابت', 'سحب لتحت البطن'],
      },
      {
        id: 'd5-lateral-machine',
        name: 'Lateral raises machine',
        nameAr: 'جهاز الرفرفة الجانبي',
        warmupSets: 1,
        sets: '3',
        workingSetsCount: 3,
        reps: '10-12',
        rir: '1-0',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=lateral+raise+machine+form',
        videoUrl: 'src/assets/videos/lever-lateral-raise-0a.mp4',
        posterUrl: 'src/assets/posters/lever-lateral-raise-0a.jpg',
        motion: 'lateral_raise',
        primaryMuscles: ['side_delt'],
        secondaryMuscles: [],
        difficulty: 1,
        risk: 1,
        cues: [
          'ادفع بدراعك في المخدات مش بإيدك بس',
          'كتافك لتحت بعيد عن ودانك',
          'المقاومة مستمرة طول الحركة',
        ],
        tempoLabel: 'رفع ١ث · ثبات ١ث · نزول ٢ث',
        phases: ['شد مستمر تحت', 'الكتف لتحت', 'رفع لمستوى الكتف'],
      },
      {
        id: 'd5-db-preacher-curl',
        name: 'DB preacher curl',
        nameAr: 'باي ارتكاز بالدمبل (Preacher)',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-2',
        ...R_15_2,
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+preacher+curl+form',
        videoUrl: 'src/assets/videos/dumbbell-preacher-curl-6js.mp4',
        posterUrl: 'src/assets/posters/dumbbell-preacher-curl-6js.jpg',
        motion: 'preacher_curl',
        primaryMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        difficulty: 1,
        risk: 2,
        safetyCaution: {
          problem: 'وتر البايسبس بيكون في أضعف وضع ليه تحت، لو وصلت للفشل وفردت دراعك بعنف بوزن تقيل',
          solution: 'وقّف قبل الفشل بعدة أو اتنين، وانزل ببطء ومتقفلش الكوع بخبطة تحت',
        },
        cues: [
          'الإبط والدراع العلوي لازقين على المسند',
          'انزل ببطء ووقّف قبل ما الكوع يتقفل على الآخر',
          'ارفع بالبايسبس من غير ما كتفك يقوم من المسند',
        ],
        tempoLabel: 'رفع ١ث · نزول ٣ث بحذر',
        phases: ['نزول بطيء من غير قفل', 'الدراع ثابت على المسند', 'رفع لآخر انقباض'],
      },
      {
        id: 'd5-rope-pushdown',
        ...ROPE_PUSHDOWN,
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_15_2,
      },
    ],
  },
  {
    dayNumber: 6,
    dayLabel: 'يوم ٦',
    title: 'رجل (كوادز وخلفيات)',
    subtitle: 'يوم ٥ في الـ PDF. الـ RDL اتبدّل بـ Back extension 45° عشان أسفل الضهر، والباقي زي ما هو',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'جهاز الهاك سكوات المائل والأقراص الحديدية في يوم الأرجل',
    estimatedMinutes: 60,
    exercises: [
      {
        id: 'd6-hip-hinge',
        name: '45° back extension (glute & hamstring focus)',
        nameAr: 'ظهر ٤٥ درجة بتركيز على الجلوتس والخلفيات',
        replaces: 'RDLs',
        warmupSets: 2,
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=45+degree+back+extension+glute+hamstring+focus',
        videoUrl: 'src/assets/videos/45-degree-hyperextension--6xt.mp4',
        posterUrl: 'src/assets/posters/45-degree-hyperextension--6xt.jpg',
        motion: 'back_extension',
        primaryMuscles: ['hamstrings', 'glutes'],
        secondaryMuscles: ['lower_back'],
        difficulty: 1,
        risk: 1,
        safetyCaution: {
          problem: 'الـ RDL اللي في الـ PDF من أكتر التمارين اللي بتعوّر أسفل الضهر (الديسك L4-L5) للمبتدئ لو الضهر اتقوّس أو الوزن زاد',
          solution: 'نفس حركة الـ Hip hinge ونفس الإطالة للخلفيات، بس الجهاز ساندك والوزن خفيف (وزن جسمك، وبعدين طارة على صدرك)، فمفيش ضغط على الفقرات',
        },
        cues: [
          'المخدة تحت عضمة الحوض بالظبط عشان تتني من الوسط (الورك)',
          'انزل لحد ما تحس بشد في الخلفيات، واطلع بعصر الجلوتس لحد ما جسمك يبقى خط مستقيم بس',
          'ابدأ بوزن جسمك؛ لما تعدّي ١٢ عدة بسهولة امسك طارة على صدرك',
        ],
        tempoLabel: 'نزول ٢-٣ث · طلوع ١ث · عصر ١ث',
        phases: ['نزول من الورك', 'شد في الخلفيات', 'طلوع بعصر الجلوتس'],
      },
      {
        id: 'd6-hack-squat',
        name: 'Hack squat machine',
        nameAr: 'هاك سكوات على الماكينة',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1-2',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=hack+squat+machine+form',
        videoUrl: 'src/assets/videos/sled-hack-squat-1r.mp4',
        posterUrl: 'src/assets/posters/sled-hack-squat-1r.jpg',
        motion: 'hack_squat',
        primaryMuscles: ['quads'],
        secondaryMuscles: ['glutes'],
        difficulty: 2,
        risk: 2,
        safetyCaution: {
          problem: 'ضغط زيادة على الركبة لو رجلك واطية على المنصة أو الركبة داخلة لجوه',
          solution: 'رجلك في نص المنصة، الركبة في نفس اتجاه صوابعك، ووقّف قبل الفشل بعدة أو اتنين',
        },
        cues: [
          'ضهرك ومؤخرتك لازقين في مسند الجهاز طول الوقت',
          'انزل لأعمق نقطة مريحة من غير ما الكعب يقوم',
          'الركبة تمشي في اتجاه صوابع رجلك',
        ],
        tempoLabel: 'نزول ٣ث · ثبات ١ث · دفع ١ث',
        phases: ['نزول والكعب ثابت', 'الركبة مع الصوابع', 'دفع بنص القدم'],
      },
      {
        id: 'd6-leg-extension',
        name: 'Leg extension machine',
        nameAr: 'رجل أمامي على الماكينة',
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=leg+extension+form',
        videoUrl: 'src/assets/videos/lever-leg-extension-0b.mp4',
        posterUrl: 'src/assets/posters/lever-leg-extension-0b.jpg',
        motion: 'leg_extension',
        primaryMuscles: ['quads'],
        secondaryMuscles: [],
        difficulty: 1,
        risk: 1,
        cues: [
          'اضبط الكرسي بحيث محور الجهاز على مستوى ركبتك',
          'امسك المقابض اللي على الجنب كويس',
          'فرد كامل وعصر فوق، ونزول بطيء',
        ],
        tempoLabel: 'رفع ١ث · عصر ١ث · نزول ٢-٣ث',
        phases: ['ثني الركبة', 'الفخذ ثابت في الكرسي', 'فرد كامل وعصر'],
      },
      {
        id: 'd6-lying-leg-curl',
        name: 'Lying leg curl',
        nameAr: 'رجل خلفي نايم',
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=lying+leg+curl+form',
        videoUrl: 'src/assets/videos/lever-lying-leg-curl-0c.mp4',
        posterUrl: 'src/assets/posters/lever-lying-leg-curl-0c.jpg',
        motion: 'lying_leg_curl',
        primaryMuscles: ['hamstrings'],
        secondaryMuscles: ['calves'],
        difficulty: 1,
        risk: 1,
        cues: [
          'اضغط حوضك في البنش ومتقومش مؤخرتك وانت بتسحب',
          'اسحب كعبك ناحية الجلوتس من غير خطف',
          'انزل ببطء لحد الإطالة الكاملة',
        ],
        tempoLabel: 'سحب ١ث · نزول ٣ث',
        phases: ['إطالة كاملة تحت', 'الحوض ثابت على البنش', 'ثني الركبة على الآخر'],
      },
      {
        id: 'd6-adductor',
        ...ADDUCTOR_MACHINE,
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-0',
        ...R_2_3,
      },
      {
        id: 'd6-wrist-flexion',
        name: 'DB wrist flexion',
        nameAr: 'سواعد بالدمبل (ثني الرسغ)',
        warmupSets: 1,
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1-0',
        ...R_2_3,
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+wrist+curl+form',
        videoUrl: 'src/assets/videos/dumbbell-one-arm-wrist-curl-6jk.mp4',
        posterUrl: 'src/assets/posters/dumbbell-one-arm-wrist-curl-6jk.jpg',
        motion: 'wrist_flexion',
        primaryMuscles: ['forearms'],
        secondaryMuscles: [],
        difficulty: 1,
        risk: 1,
        cues: [
          'ساعدك على البنش أو فخدك والرسغ برا',
          'سيب الدمبل ينزل لأطراف صوابعك وبعدين اقفل واثني الرسغ لفوق',
          'تحكم بطيء عشان متضغطش على الأوتار',
        ],
        tempoLabel: 'رفع ١ث · نزول ٢ث',
        phases: ['الدمبل في أطراف الصوابع', 'الساعد ثابت', 'ثني الرسغ لفوق'],
      },
      {
        id: 'd6-calf-raises',
        ...SMITH_CALF,
        warmupSets: 1,
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1-0',
        ...R_15_2,
      },
    ],
  },
  {
    dayNumber: 7,
    dayLabel: 'يوم ٧',
    title: 'راحة، أو مشي ٣٠ دقيقة 🛌',
    subtitle: 'استشفاء خفيف قبل ما الدورة تبدأ من جديد',
    isRestDay: true,
    restNote: 'ممكن راحة تامة أو مشي خفيف ٣٠ دقيقة + ١٠ دقائق Mobility للجسم كله.',
    coverImage: IMAGES_BY_FOCUS.recovery,
    coverAlt: 'مساحة استشفاء هادئة للتمدد والمشي الخفيف',
    estimatedMinutes: 30,
    exercises: [
      {
        id: 'd7-active-recovery',
        name: 'Light walk (30 min) + Mobility',
        nameAr: 'مشي خفيف ٣٠ دقيقة + إطالات مرونة',
        sets: '1',
        workingSetsCount: 1,
        reps: '٣٠ دقيقة',
        rir: '-',
        restSeconds: 0,
        restLabel: 'مستمر',
        youtubeUrl: 'https://www.youtube.com/results?search_query=full+body+mobility+routine+10+minutes',
        videoUrl: 'src/assets/videos/walking-on-incline-treadmill-8x5.mp4',
        posterUrl: 'src/assets/posters/walking-on-incline-treadmill-8x5.jpg',
        motion: 'treadmill_walk',
        primaryMuscles: ['quads', 'hamstrings', 'calves'],
        secondaryMuscles: ['glutes'],
        difficulty: 1,
        risk: 1,
        cues: [
          'مشي بسرعة مريحة تقدر تتكلم وانت ماشي',
          'بيحسّن الدورة الدموية وبيسرّع الاستشفاء',
          'وبعدها ١٠ دقائق Mobility للجسم كله',
        ],
        tempoLabel: 'إيقاع ثابت مريح',
        phases: ['خطوة منتظمة', 'نفس مريح', 'استشفاء نشط'],
      },
    ],
  },
];

export const WORKOUT_DAYS: WorkoutDay[] = PDF_DAYS.map((d) =>
  d.isRestDay ? d : withStretches(d, MODIFIED_FOCUS[d.dayNumber], `d${d.dayNumber}`)
);

/**
 * Exercises that are NOT in the coach's PDF (so not in the modified program),
 * kept only because the Arnold and PPL programs reuse them.
 */
export const EXTRA_EXERCISES: ExerciseItem[] = [
  {
    id: 'x-reverse-pec-deck',
    name: 'Reverse pec deck',
    nameAr: 'فراشة عكسي للكتف الخلفي',
    sets: '3',
    workingSetsCount: 3,
    reps: '12-15',
    rir: '0-1',
    ...R_1_2,
    youtubeUrl: 'https://www.youtube.com/results?search_query=reverse+pec+deck+rear+delt+form',
    videoUrl: 'src/assets/videos/lever-seated-reverse-fly-12.mp4',
    posterUrl: 'src/assets/posters/lever-seated-reverse-fly-12.jpg',
    motion: 'reverse_pec_deck',
    primaryMuscles: ['rear_delt'],
    secondaryMuscles: ['upper_back'],
    difficulty: 1,
    risk: 1,
    cues: [
      'افتح المقابض لبرا في قوس واسع من غير ما تضم لوحي الكتف بقوة',
      'الرسغ مستقيم والكوع على مستوى الكتف',
      'بيحمي مفصل الكتف وبيوازن تمارين الدفع',
    ],
    tempoLabel: 'فتح ١ث · تحكم ٢-٣ث',
    phases: ['رجوع متحكم فيه', 'الكتف لتحت', 'فتح لورا بالكتف الخلفي'],
  },
  {
    id: 'x-machine-chest-press',
    name: 'Machine chest press',
    nameAr: 'ضغط صدر على الماكينة',
    sets: '2',
    workingSetsCount: 2,
    reps: '8-10',
    rir: '1',
    ...R_2_3,
    youtubeUrl: 'https://www.youtube.com/results?search_query=machine+chest+press+form',
    videoUrl: 'src/assets/videos/lever-chest-press-0t.mp4',
    posterUrl: 'src/assets/posters/lever-chest-press-0t.jpg',
    motion: 'machine_chest_press',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['front_delt', 'triceps'],
    difficulty: 1,
    risk: 1,
    cues: [
      'اضبط الكرسي بحيث المقابض في نص صدرك',
      'لوحي الكتف لازقين في المسند ومتقدمش كتفك لقدام',
      'الماكينة بتثبّت المسار فمناسبة جدًا للمبتدئ',
    ],
    tempoLabel: 'نزول ٢-٣ث · دفع ١ث',
    phases: ['إطالة الصدر', 'الكتفين لورا', 'دفع كامل لقدام'],
  },
  {
    id: 'x-abductor',
    name: 'Abductor machine',
    nameAr: 'جهاز الفخذ الخارجي',
    sets: '2',
    workingSetsCount: 2,
    reps: '12-15',
    rir: '0-1',
    ...R_1_2,
    youtubeUrl: 'https://www.youtube.com/results?search_query=hip+abductor+machine+form',
    videoUrl: 'src/assets/videos/lever-seated-hip-abduction-19.mp4',
    posterUrl: 'src/assets/posters/lever-seated-hip-abduction-19.jpg',
    motion: 'abductor',
    primaryMuscles: ['glutes'],
    secondaryMuscles: [],
    difficulty: 1,
    risk: 1,
    cues: [
      'اقعد مفرود أو مايل لقدام سنة عشان أعلى الجلوتس',
      'افتح بركبك لبرا واثبت ثانية',
      'رجوع بطيء لجوه',
    ],
    tempoLabel: 'فتح ١ث · ثبات ١ث · رجوع ٢ث',
    phases: ['رجوع متحكم لجوه', 'الحوض ثابت', 'فتح الفخذين لبرا'],
  },
  {
    id: 'x-face-pull',
    name: 'Face pull',
    nameAr: 'فيس بول بالحبل',
    sets: '2',
    workingSetsCount: 2,
    reps: '12-15',
    rir: '1',
    ...R_1_2,
    youtubeUrl: 'https://www.youtube.com/results?search_query=face+pull+form',
    videoUrl: 'src/assets/videos/cable-standing-rear-delt-row--6fx.mp4',
    posterUrl: 'src/assets/posters/cable-standing-rear-delt-row--6fx.jpg',
    motion: 'face_pull',
    primaryMuscles: ['rear_delt', 'upper_back'],
    secondaryMuscles: [],
    difficulty: 2,
    risk: 1,
    cues: [
      'اسحب الحبل ناحية جبهتك ولف ساعدك لبرا',
      'الكوع على مستوى الكتف أو أعلى سنة',
      'بيحمي الكفة المدورة (Rotator cuff)',
    ],
    tempoLabel: 'سحب ١ث · ثبات ١-٢ث · رجوع ٢ث',
    phases: ['مد الدراع لقدام', 'الكوع بمستوى الكتف', 'سحب مع لف الكتف لبرا'],
  },
  {
    id: 'x-lat-pulldown',
    name: 'Lat pulldown',
    nameAr: 'سحب علوي بالبار',
    sets: '2',
    workingSetsCount: 2,
    reps: '8-12',
    rir: '1',
    ...R_2_3,
    youtubeUrl: 'https://www.youtube.com/results?search_query=lat+pulldown+form',
    videoUrl: 'src/assets/videos/bar-lateral-pulldown-6r.mp4',
    posterUrl: 'src/assets/posters/bar-lateral-pulldown-6r.jpg',
    motion: 'lat_pulldown',
    primaryMuscles: ['lats'],
    secondaryMuscles: ['biceps'],
    difficulty: 1,
    risk: 1,
    cues: [
      'نزّل كتفك لتحت الأول وبعدين اثني الكوع',
      'حركة ناعمة من غير خطف',
      'بيكمّل حجم الضهر في الأسبوع',
    ],
    tempoLabel: 'سحب ١ث · صعود ٣ث',
    phases: ['إطالة كاملة لفوق', 'صدرك مرفوع', 'سحب لأعلى الصدر'],
  },
  {
    id: 'x-tibialis-raise',
    name: 'Tibialis raise',
    nameAr: 'رفع مشط القدم (السمانة الأمامية)',
    sets: '2',
    workingSetsCount: 2,
    reps: '15-20',
    rir: '1',
    ...R_1_2,
    youtubeUrl: 'https://www.youtube.com/results?search_query=tibialis+raise+form',
    videoUrl: 'src/assets/videos/smith-toe-raise-3r.mp4',
    posterUrl: 'src/assets/posters/smith-toe-raise-3r.jpg',
    motion: 'tibialis_raise',
    primaryMuscles: ['tibialis'],
    secondaryMuscles: [],
    difficulty: 1,
    risk: 1,
    cues: [
      'ارفع مشط رجلك لفوق على قد ما تقدر',
      'انزل ببطء',
      'بيقوّي العضلة اللي قدام الساق وبيحمي الكاحل والركبة',
    ],
    tempoLabel: 'رفع ١ث · عصر ١ث · نزول ٢ث',
    phases: ['المشط لتحت', 'الركبة مفرودة', 'رفع الصوابع لفوق'],
  },
];

export const CARDIO_PROTOCOL = {
  title: 'الكارديو بعد كل تمرين',
  detail: 'بعد التمرين: مشي على المشاية، سرعة 4 وميل 10، لمدة ٢٠ دقيقة (زي الـ PDF). متمسكش في المشاية وهي مايلة',
  note: 'ممتاز لصحة القلب وحرق الدهون دون التأثير سلباً على البناء العضلي.',
  speed: '4.0',
  incline: '10%',
  duration: '20 دقيقة',
};

export const SCHEDULE_PROS = [
  {
    num: '01',
    title: 'التكرار كويس',
    detail: 'كل عضلة بتتدرب مرتين في الأسبوع، وده الأفضل للتضخيم.',
  },
  {
    num: '02',
    title: 'راحة في مكانها',
    detail: 'فيه يومين راحة، واليوم الرابع والسابع مكانهم صح.',
  },
  {
    num: '03',
    title: 'اختيار تمارين ذكي',
    detail: 'فيه تمارين كابل وماكينات بتشد العضلة وهي ممدودة، زي Bayesian curl وLat pullover وOverhead extension وSeated leg curl. التمارين دي من أحسن حاجة للتضخيم حسب الأبحاث الحديثة.',
  },
  {
    num: '04',
    title: 'الكتف الجانبي واخد حقه',
    detail: 'حوالي ٩ مجموعات في الأسبوع.',
  },
  {
    num: '05',
    title: 'الضهر متوازن',
    detail: 'فيه تمارين عرض (pulldown وpullover) وتمارين سُمك (T-bar وrow).',
  },
  {
    num: '06',
    title: 'الكارديو بعد التمرين',
    detail: '(مشي مايل ٢٠ دقيقة) حاجة ممتازة للقلب وحرق الدهون، ومش بيأثر على العضل.',
  },
];

export const SCHEDULE_CONS = [
  {
    issue: 'RDLs خطر على المبتدئ',
    details: 'الرومانيان ديدلفت بيحمّل أسفل الضهر (الديسك L4-L5) مباشرة. لو الضهر اتقوّس سنة أو الوزن زاد قبل ما التكنيك يتظبط، الإصابة سهلة جدًا',
    fixApplied: 'اتبدّل بـ Back extension 45° بتركيز على الجلوتس والخلفيات: نفس حركة الـ Hip hinge، والجهاز ساندك، والوزن خفيف',
  },
  {
    issue: 'Smith incline shoulder press',
    details: 'السميث بيمشي في خط ثابت، فلو المسار مش مناسب لجسمك الكتف بيتزنق (Impingement)',
    fixApplied: 'اتبدّل بضغط كتف دمبل جالس وضهرك مسنود، والكوع قدامك ٣٠-٤٥ درجة',
  },
  {
    issue: 'T bar machine',
    details: 'نسخة الـ T-bar اللي انت واقف فيها ومنحني بتحمّل أسفل الضهر طول المجموعة',
    fixApplied: 'استخدم النسخة اللي صدرك مسنود فيها على المخدة (Chest supported)، نفس العضلات من غير حمل على الضهر',
  },
  {
    issue: 'كل المجموعات للفشل (RIR 1-0)',
    details: 'للمبتدئ، الفشل في التمارين الحرة والمركبة (بنش دمبل، هاك، ليج برس، هيب ثرست) هو اللحظة اللي التكنيك بيبوظ فيها والإصابة بتحصل',
    fixApplied: 'التمارين الحرة والمركبة بقت RIR 1-2 (وقّف قبل الفشل بعدة أو اتنين). تمارين الماكينات والكابل فضلت RIR 1-0 زي الـ PDF',
  },
  {
    issue: 'مفيش إحماء حركي ولا إطالات',
    details: 'الـ PDF فيه مجموعات إحماء بأوزان خفيفة بس، مفيش تسخين للمفاصل قبلها',
    fixApplied: 'اتضاف بروتوكول إحماء حركي قبل التمرين وإطالات بعده (برا الجدول، مش تمارين زيادة)',
  },
];

export const HIGH_LOAD_WARNINGS = [
  {
    exerciseId: 'd6-hip-hinge',
    dayNumber: 6,
    name: 'RDLs (اتشال)',
    problem: 'أكتر تمرين في الـ PDF ممكن يعوّر الفقرات القطنية (الديسك L4-L5) للمبتدئ',
    solution: 'اتبدّل بـ Back extension 45°: نفس الشد في الخلفيات والجلوتس، والجهاز ساندك ومفيش ضغط على الفقرات',
  },
  {
    exerciseId: 'd5-db-shoulder-press',
    dayNumber: 5,
    name: 'Smith incline shoulder press',
    problem: 'السميث بيجبر الكتف يمشي في مسار ثابت، وده ممكن يعمل احتكاك في الكتف (impingement)',
    solution: 'اتبدّل بدمبل جالس، والكوع مايل قدامك بزاوية ٣٠ إلى ٤٥ درجة',
  },
  {
    exerciseId: 'd6-hack-squat',
    dayNumber: 6,
    name: 'Hack squat',
    problem: 'ضغط على الركبة',
    solution: 'الرجل في نص المنصة، والركبة تمشي في نفس اتجاه صوابع رجلك، وRIR 1-2',
  },
  {
    exerciseId: 'd3-leg-press',
    dayNumber: 3,
    name: 'Leg press',
    problem: 'أسفل الضهر بيقوم من الكرسي لو نزلت أعمق من مرونتك',
    solution: 'انزل لحد قبل ما الحوض يتحرك بس، ومتقفلش الركبة فوق',
  },
  {
    exerciseId: 'd2-db-low-incline',
    dayNumber: 2,
    name: 'DB low incline press / DB flat press',
    problem: 'ضغط على مقدمة الكتف لو الكوع مفتوح على الجنب أو نزلت أوطى من صدرك',
    solution: 'الكوع ٤٥ درجة، لوحي الكتف مضمومين، وRIR 1-2',
  },
  {
    exerciseId: 'd2-overhead-rope',
    dayNumber: 2,
    name: 'Rope overhead extension',
    problem: 'ضغط على وتر الكوع',
    solution: 'خلي الحمل متوسط، ونفّذه ببطء',
  },
  {
    exerciseId: 'd5-db-preacher-curl',
    dayNumber: 5,
    name: 'DB preacher curl',
    problem: 'وتر البايسبس بيكون في أضعف وضع ليه تحت',
    solution: 'متفردش دراعك على الآخر بخبطة وانت شايل وزن تقيل، وRIR 1-2',
  },
  {
    exerciseId: 'd3-torso-rotation',
    dayNumber: 3,
    name: 'Cable torso rotation',
    problem: 'لو اللف جه من الفقرات بدل الحوض والصدر',
    solution: 'وزن خفيف، والحركة بطيئة ومتحكم فيها',
  },
  {
    exerciseId: 'd1-kelso-shrugs',
    dayNumber: 1,
    name: 'Kelso shrugs',
    problem: 'تعب على الرقبة لو عملتها بوزن تقيل',
    solution: 'ركّز إنك تضم لوحي الكتف لبعض، متشيلش كتافك لفوق',
  },
];

export const DYNAMIC_WARMUPS = [
  {
    dayType: 'أيام الجزء العلوي',
    movements: 'Arm circles، Band pull-apart، Band external rotation، Cat-cow',
    duration: '٥ إلى ٨ دقائق',
    youtubeUrl: 'https://www.youtube.com/results?search_query=upper+body+dynamic+warm+up+shoulder',
  },
  {
    dayType: 'أيام الرجل',
    movements: 'Leg swings، Hip circles، Bodyweight squat، Glute bridge، Ankle rocks',
    duration: '٥ إلى ٨ دقائق',
    youtubeUrl: 'https://www.youtube.com/results?search_query=lower+body+dynamic+warm+up',
  },
];

export const STATIC_STRETCHES: Array<{
  muscle: string;
  stretch: string;
  youtubeUrl: string;
  videoUrl: string;
  posterUrl: string;
}> = [
  { muscle: 'الصدر', stretch: 'Doorway chest stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=doorway+chest+stretch', videoUrl: 'src/assets/videos/standing-one-arm-chest-stretch-6c1.mp4', posterUrl: 'src/assets/posters/standing-one-arm-chest-stretch-6c1.jpg' },
  { muscle: 'الضهر', stretch: "Child's pose، Lat stretch على العمود", youtubeUrl: 'https://www.youtube.com/results?search_query=lat+stretch+child+pose', videoUrl: 'src/assets/videos/kneeling-lat-stretch-78s.mp4', posterUrl: 'src/assets/posters/kneeling-lat-stretch-78s.jpg' },
  { muscle: 'الكتف', stretch: 'Cross-body shoulder stretch، Sleeper stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=sleeper+stretch+cross+body', videoUrl: 'src/assets/videos/across-chest-shoulder-stretch-7nh.mp4', posterUrl: 'src/assets/posters/across-chest-shoulder-stretch-7nh.jpg' },
  { muscle: 'الترايسبس والبايسبس', stretch: 'Overhead triceps stretch، Wall biceps stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=triceps+biceps+stretch', videoUrl: 'src/assets/videos/overhead-triceps-stretch-6r1.mp4', posterUrl: 'src/assets/posters/overhead-triceps-stretch-6r1.jpg' },
  { muscle: 'الرقبة والترابيس', stretch: 'Upper trap stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=upper+trapezius+stretch', videoUrl: 'src/assets/videos/side-neck-stretch-6t9.mp4', posterUrl: 'src/assets/posters/side-neck-stretch-6t9.jpg' },
  { muscle: 'الهامسترنج', stretch: 'Standing hamstring stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=hamstring+stretch', videoUrl: 'src/assets/videos/hamstring-stretch-724.mp4', posterUrl: 'src/assets/posters/hamstring-stretch-724.jpg' },
  { muscle: 'الكوادز', stretch: 'Standing quad stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=standing+quad+stretch', videoUrl: 'src/assets/videos/all-fours-squad-stretch-72f.mp4', posterUrl: 'src/assets/posters/all-fours-squad-stretch-72f.jpg' },
  { muscle: 'الحوض (مهم جدًا لأسفل الضهر)', stretch: 'Hip flexor lunge stretch، Pigeon stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=hip+flexor+pigeon+stretch', videoUrl: 'src/assets/videos/kneeling-hip-flexor-stretch-6c6.mp4', posterUrl: 'src/assets/posters/kneeling-hip-flexor-stretch-6c6.jpg' },
  { muscle: 'السمانة', stretch: 'Wall calf stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=wall+calf+stretch', videoUrl: 'src/assets/videos/calf-stretch-with-hands-against-wall-793.mp4', posterUrl: 'src/assets/posters/calf-stretch-with-hands-against-wall-793.jpg' },
  { muscle: 'أسفل الضهر', stretch: 'Knee to chest، Cat-cow', youtubeUrl: 'https://www.youtube.com/results?search_query=lower+back+stretch+knee+to+chest', videoUrl: 'src/assets/videos/cat-cow-stretch-9l6.mp4', posterUrl: 'src/assets/posters/cat-cow-stretch-9l6.jpg' },
];

export const NUTRITION_TIPS = [
  {
    title: 'بروتين',
    metric: '١.٦ - ٢.٢ جم/كجم',
    detail: 'من ١.٦ لـ ٢.٢ جرام لكل كيلو من وزنك يوميًا، متقسم على ٣ لـ ٥ وجبات.',
  },
  {
    title: 'كرياتين مونوهيدرات',
    metric: '٣ - ٥ جم يوميًا',
    detail: '٣ لـ ٥ جرام كل يوم، وده أكتر مكمل مثبت علميًا.',
  },
  {
    title: 'مية',
    metric: '~ ٣ لتر يوميًا',
    detail: 'حوالي ٣ لتر في اليوم، وزوّد لو بتعرق كتير.',
  },
  {
    title: 'نوم',
    metric: '٧ - ٩ ساعات',
    detail: 'من ٧ لـ ٩ ساعات. الفايدة الحقيقية من التمرين بتحصل وانت نايم.',
  },
  {
    title: 'Deload (أسبوع تخفيف)',
    metric: 'كل ٦ - ٨ أسابيع',
    detail: 'كل ٦ لـ ٨ أسابيع، اعمل أسبوع بنص المجموعات وبعيد عن الفشل.',
  },
  {
    title: 'التطور التدريجي',
    metric: 'زيادة الوزن تدريجياً',
    detail: 'لما توصل لأعلى رقم في مدى التكرارات، زوّد الوزن.',
  },
];
