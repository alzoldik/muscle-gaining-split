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
  | 'mobility_rest';

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

export const HERO_IMAGE = '/src/assets/images/hero_hypertrophy_studio_1795266909040.jpg';
export const IMAGES_BY_FOCUS = {
  pull: '/src/assets/images/day_pull_back_1795266908953.jpg',
  push: '/src/assets/images/day_push_chest_1795266908968.jpg',
  legs: '/src/assets/images/day_legs_power_1795266909295.jpg',
  recovery: '/src/assets/images/recovery_mobility_1795266909023.jpg',
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

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    dayNumber: 1,
    dayLabel: 'يوم ١',
    title: 'ضهر وكتف (سحب)',
    subtitle: 'تركيز على عرض وسُمك الضهر مع إضافة الكتف الخلفي وترتيب الترابيس بعد السحب الأساسي',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.pull,
    coverAlt: 'جهاز السحب العلوي للكابل وبار واسع في صالة تدريب حديثة',
    estimatedMinutes: 65,
    exercises: [
      {
        id: 'd1-lat-pulldown',
        name: 'Wide grip lat pulldown',
        nameAr: 'سحب علوي قبضة واسعة',
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=wide+grip+lat+pulldown+form',
        videoUrl: '/src/assets/videos/cable-wide-grip-lat-pulldown--7v7.mp4',
        posterUrl: '/src/assets/posters/cable-wide-grip-lat-pulldown--7v7.jpg',
        motion: 'lat_pulldown',
        primaryMuscles: ['lats'],
        secondaryMuscles: ['upper_back', 'biceps'],
        cues: [
          'اسحب الكوعين لأسفل تجاه الخصر مع ثبات الصدر مرفوعاً',
          'تجنب المرجحة بالضهر؛ تحكّم في الصعود لمدة ٢-٣ ثوانٍ',
          'انزل بالبار حتى مستوى أعلى الصدر مع عصر المجنص'
        ],
        tempoLabel: 'نزول ١ث · ثبات ١ث · صعود ٣ث',
        phases: ['إطالة كاملة للأعلى', 'ثبات مع شد المجنص', 'سحب لأسفل الصدر'],
      },
      {
        id: 'd1-t-bar-row',
        name: 'T-bar row machine',
        nameAr: 'تجديف T-Bar على الماكينة',
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=t+bar+row+machine+form',
        videoUrl: '/src/assets/videos/lever-t-bar-row-1f.mp4',
        posterUrl: '/src/assets/posters/lever-t-bar-row-1f.jpg',
        motion: 't_bar_row',
        primaryMuscles: ['upper_back', 'lats'],
        secondaryMuscles: ['rear_delt', 'biceps'],
        cues: [
          'ثبت الصدر على المسند وتجنب تقوس أسفل الضهر',
          'اسحب بالمرفقين للخلف وضم لوحي الكتف في نهاية السحبة',
          'اسمح للكتف بالتمدد للأمام في نهاية النزول'
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · نزول ٢-٣ث',
        phases: ['إطالة لوحي الكتف', 'ثبات بضهر مستقيم', 'سحب المرفقين للخلف'],
      },
      {
        id: 'd1-cable-pullover',
        name: 'Cable lat pullover',
        nameAr: 'بلوفر كابل للمجنص',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1',
        restSeconds: 120,
        restLabel: '٢ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+lat+pullover',
        videoUrl: '/src/assets/videos/cable-straight-arm-pulldown-6fc.mp4',
        posterUrl: '/src/assets/posters/cable-straight-arm-pulldown-6fc.jpg',
        motion: 'cable_pullover',
        primaryMuscles: ['lats'],
        secondaryMuscles: ['abs', 'triceps'],
        cues: [
          'ميل بالجذع للأمام ٣٠-٤٠ درجة مع ثبات انحناءة خفيفة في الكوع',
          'اسحب من مفصل الكتف في قوس دائري حتى الفخذين',
          'ركّز على أقصى إطالة للمجنص في الأعلى'
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · صعود ٣ث',
        phases: ['إطالة كاملة للمجنص', 'تثبيت زاوية الكوع', 'سحب القوس للخصر'],
      },
      {
        id: 'd1-kelso-shrugs',
        name: 'Kelso shrugs',
        nameAr: 'شراجز كيلسو (سحب لوحي الكتف)',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1-2',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=kelso+shrug',
        videoUrl: '/src/assets/videos/dumbbell-incline-shrug-6il.mp4',
        posterUrl: '/src/assets/posters/dumbbell-incline-shrug-6il.jpg',
        motion: 'kelso_shrug',
        primaryMuscles: ['upper_back'],
        secondaryMuscles: ['rear_delt'],
        safetyCaution: {
          problem: 'تعب على الرقبة لو عملتها بوزن تقيل أو رفعت كتافك للأذنين',
          solution: 'ركّز إنك تضم لوحي الكتف لبعض للخلف، متشيلش كتافك لفوق، وجاء ترتيبه بعد السحب الأساسي لحماية القبضة',
        },
        cues: [
          'الذراعان مفرودتان بالكامل؛ الحركة من لوحي الكتف فقط',
          'اضغط لوحي الكتف تجاه العمود الفقري دون ثني الكوع',
          'اختيار وزن متوسط يحمي الرقبة ويحقق انقباضاً أدق'
        ],
        tempoLabel: 'ضم ١ث · ثبات ١ث · فرد ٢ث',
        phases: ['فتح لوحي الكتف', 'عصر منتصف الضهر', 'ضم لوحي الكتف للخلف'],
      },
      {
        id: 'd1-reverse-pec-deck',
        name: 'Reverse pec deck (كتف خلفي)',
        nameAr: 'فراشة عكسي للكتف الخلفي',
        sets: '3',
        workingSetsCount: 3,
        reps: '12-15',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=reverse+pec+deck+rear+delt',
        videoUrl: '/src/assets/videos/lever-seated-reverse-fly-12.mp4',
        posterUrl: '/src/assets/posters/lever-seated-reverse-fly-12.jpg',
        motion: 'reverse_pec_deck',
        primaryMuscles: ['rear_delt'],
        secondaryMuscles: ['upper_back'],
        isNew: true,
        cues: [
          'ادفع المقابض للخارج بقوس واسع دون ضم لوحي الكتف بقوة',
          'حافظ على استقامة الرسغ وارتفاع الكوع بمستوى الكتف',
          'تمرين مضاف لمعالجة غياب الكتف الخلفي وحماية مفصل الكتف'
        ],
        tempoLabel: 'فتح ١ث · تحكم ٢-٣ث',
        phases: ['عودة متحكم بها', 'ثبات الكتف لأسفل', 'فتح للخلف بالكتف الخلفي'],
      },
      {
        id: 'd1-cable-y-raises',
        name: 'Cable Y raises',
        nameAr: 'رفرفة كابل على شكل حرف Y',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+y+raise',
        videoUrl: '/src/assets/videos/cable-y-raise-8o6.mp4',
        posterUrl: '/src/assets/posters/cable-y-raise-8o6.jpg',
        motion: 'cable_y_raise',
        primaryMuscles: ['side_delt', 'upper_back'],
        secondaryMuscles: ['rear_delt'],
        cues: [
          'اسحب الكابلين بشكل متقاطع للأعلى والخارج على شكل حرف Y',
          'تجنب رفع الأكتاف للأعلى أثناء الحركة',
          'تحكّم في النزول للتركيز على الألياف السفلية للترابيس والكتف'
        ],
        tempoLabel: 'رفع ١ث · ثبات ١ث · نزول ٢ث',
        phases: ['وضع البداية المتقاطع', 'تثبيت الجذع', 'رفع بزاوية 45 درجة'],
      },
      {
        id: 'd1-db-lateral-raises',
        name: 'DB lateral raises',
        nameAr: 'رفرفة جانبية بالدمبل',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-15',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+lateral+raise+form',
        videoUrl: '/src/assets/videos/lateral-raise-96.mp4',
        posterUrl: '/src/assets/posters/lateral-raise-96.jpg',
        motion: 'lateral_raise',
        primaryMuscles: ['side_delt'],
        secondaryMuscles: ['upper_back'],
        cues: [
          'ارفع الدمبل في مستوى اللوح الكتفي (مائل للأمام ٣٠ درجة)',
          'قد الحركة بالكوع وليس بالمعصم حتى مستوى الكتف',
          'انزل ببطء دون إراحة الوزن على الفخذين'
        ],
        tempoLabel: 'رفع ١ث · نزول ٢-٣ث',
        phases: ['شد مستمر بالأسفل', 'ثبات بدون مرجحة', 'رفع جانبي لمستوى الكتف'],
      },
      {
        id: 'd1-cable-reverse-curl',
        name: 'Cable reverse curl',
        nameAr: 'مرجحة كابل عكسية للسواعد',
        sets: '1-2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+reverse+curl',
        videoUrl: '/src/assets/videos/cable-reverse-curl-6f6.mp4',
        posterUrl: '/src/assets/posters/cable-reverse-curl-6f6.jpg',
        motion: 'reverse_curl',
        primaryMuscles: ['forearms', 'biceps'],
        secondaryMuscles: [],
        cues: [
          'اقبض على المسطرة بقبضة علوية (ظهر اليد للأعلى)',
          'ثبت الكوعين بجانب الجذع دون دفعهما للأمام',
          'ممتاز لتقوية العضلة العضدية الكعبرية (Brachioradialis)'
        ],
        tempoLabel: 'رفع ١ث · نزول ٢ث',
        phases: ['إطالة كاملة للأسفل', 'تثبيت الكوعين', 'ثني الكوع لأعلى'],
      },
      {
        id: 'd1-abs-crunches',
        name: 'Abdominal crunches',
        nameAr: 'طحن بطن بالكابل',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-15',
        rir: '0-1',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+crunch',
        videoUrl: '/src/assets/videos/cable-kneeling-crunch-641.mp4',
        posterUrl: '/src/assets/posters/cable-kneeling-crunch-641.jpg',
        motion: 'cable_crunch',
        primaryMuscles: ['abs'],
        secondaryMuscles: [],
        cues: [
          'ثني العمود الفقري (تقريب القفص الصدري للحوض) وليس ثني الورك',
          'أخرج الزفير بالكامل عند الوصول لأقصى انقباض',
          'تجنب شد الرقبة أو سحب الحبل بالذراعين'
        ],
        tempoLabel: 'انقباض ١ث · عصر ١ث · عودة ٢ث',
        phases: ['تمدد الجذع لأعلى', 'تثبيت الحوض', 'انحناء الجذع للأسفل'],
      },
    ],
  },
  {
    dayNumber: 2,
    dayLabel: 'يوم ٢',
    title: 'صدر ودراعات',
    subtitle: 'رفع حجم الصدر الأسبوعي وإضافة تمرين دفع تقيل للترايسبس بجانب الكابل',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'دمبل أسود مطفي بجانب بنش مائل منخفض في جيم حديث',
    estimatedMinutes: 70,
    exercises: [
      {
        id: 'd2-db-low-incline',
        name: 'DB low incline press',
        nameAr: 'بنش دمبل مائل منخفض (١٥-٣٠°)',
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1',
        restSeconds: 180,
        restLabel: '٣ دقائق',
        youtubeUrl: 'https://www.youtube.com/results?search_query=low+incline+dumbbell+press',
        videoUrl: '/src/assets/videos/dumbbell-incline-bench-press-6i6.mp4',
        posterUrl: '/src/assets/posters/dumbbell-incline-bench-press-6i6.jpg',
        motion: 'incline_db_press',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt', 'triceps'],
        cues: [
          'اضبط زاوية البنش ١٥ إلى ٣٠ درجة لاستهداف الصدر العلوي والمتوسط',
          'انزل بالكوعين بزاوية ٤٥ درجة بعيداً عن الجسم',
          'المس بالدمبل مستوى الصدر بعمق مريح ثم ادفع للأعلى'
        ],
        tempoLabel: 'نزول ٣ث · ثبات ١ث · دفع ١ث',
        phases: ['نزول عميق بجانب الصدر', 'ثبات خفيف بالأسفل', 'دفع للأعلى بتقارب'],
      },
      {
        id: 'd2-machine-chest-press',
        name: 'Machine chest press',
        nameAr: 'ضغط صدر على الماكينة',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-10',
        rir: '1',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=machine+chest+press+form',
        videoUrl: '/src/assets/videos/lever-chest-press-0t.mp4',
        posterUrl: '/src/assets/posters/lever-chest-press-0t.jpg',
        motion: 'machine_chest_press',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt', 'triceps'],
        isNew: true,
        cues: [
          'اضبط الكرسي بحيث تكون المقابض في منتصف الصدر',
          'ثبت لوحي الكتف على المسند ولا تدع الكتف يتقدم للأمام',
          'تمرين مضاف لرفع مجموعات الصدر الأسبوعية للمعدل المثالي (١٠-١٤)'
        ],
        tempoLabel: 'نزول ٢-٣ث · دفع ١ث',
        phases: ['إطالة عضلة الصدر', 'تثبيت الكتفين للخلف', 'دفع كامل للأمام'],
      },
      {
        id: 'd2-chest-fly',
        name: 'Chest fly machine',
        nameAr: 'تفتيح صدر على جهاز الفراشة',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=pec+deck+fly+form',
        videoUrl: '/src/assets/videos/lever-pec-deck-fly-2s.mp4',
        posterUrl: '/src/assets/posters/lever-pec-deck-fly-2s.jpg',
        motion: 'pec_deck_fly',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt'],
        cues: [
          'حافظ على انحناءة ثابتة وخفيفة في المرفقين طوال التمرين',
          'فكّر في تقريب الكوعين من بعضهما وليس اليدين فقط',
          'توقف عند خط الكتفين في الفتح دون مبالغة تؤذي المفصل'
        ],
        tempoLabel: 'فتح ٢-٣ث · ضم ١ث · عصر ١ث',
        phases: ['فتح وعصر إطالة للصدر', 'ثبات الصدر مرفوعاً', 'تقريب الكوعين أمام الصدر'],
      },
      {
        id: 'd2-dips-cgbp',
        name: 'Dips أو Close grip bench',
        nameAr: 'متوازي أو بنش قبضة ضيقة',
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1-2',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=close+grip+bench+press+form',
        videoUrl: '/src/assets/videos/close-grip-bench-press-0.mp4',
        posterUrl: '/src/assets/posters/close-grip-bench-press-0.jpg',
        motion: 'close_grip_bench',
        primaryMuscles: ['triceps', 'chest'],
        secondaryMuscles: ['front_delt'],
        isNew: true,
        cues: [
          'أمسك البار بعرض الكتفين أو استخدم المتوازي بجذع شبه مستقيم',
          'انزل بالكوعين قريباً من الجوانب لتركيز الحمل على الترايسبس',
          'يوفر حملاً ميكانيكياً ثقيلاً يكمّل تمارين الكابل'
        ],
        tempoLabel: 'نزول ٢-٣ث · دفع ١ث',
        phases: ['نزول محكوم لأسفل الصدر', 'كوعان بجانب الجسم', 'دفع قوي للترايسبس'],
      },
      {
        id: 'd2-overhead-rope',
        name: 'Rope overhead extension',
        nameAr: 'ترايسبس فوق الرأس بالحبل',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+overhead+triceps+extension+rope',
        videoUrl: '/src/assets/videos/cable-overhead-triceps-extension--64u.mp4',
        posterUrl: '/src/assets/posters/cable-overhead-triceps-extension--64u.jpg',
        motion: 'overhead_rope_ext',
        primaryMuscles: ['triceps'],
        secondaryMuscles: [],
        safetyCaution: {
          problem: 'ضغط عالٍ على وتر الكوع عند استخدام أوزان ثقيلة أو سرعة في الأداء',
          solution: 'خلي الحمل متوسط، ونفّذه ببطء وتحكّم في النزول مع الحفاظ على ثبات الكوعين',
        },
        cues: [
          'ثبت الذراعين العلويين بجانب الرأس بزاوية مريحة',
          'اسمح للساعد بالنزول لأقصى ثني للحصول على إطالة للرأس الطويل',
          'افرد الساعدين بسلاسة دون أرجحة الكوع للخارج'
        ],
        tempoLabel: 'نزول ٣ث · فرد ١ث',
        phases: ['إطالة الرأس الطويل خلف الرأس', 'ثبات الذراع العلوي', 'فرد كامل للأمام والأعلى'],
      },
      {
        id: 'd2-rope-pushdown',
        name: 'Rope pushdown',
        nameAr: 'ترايسبس كابل بالحبل لأسفل',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=rope+triceps+pushdown',
        videoUrl: '/src/assets/videos/cable-pushdown-64b.mp4',
        posterUrl: '/src/assets/posters/cable-pushdown-64b.jpg',
        motion: 'rope_pushdown',
        primaryMuscles: ['triceps'],
        secondaryMuscles: [],
        cues: [
          'ثبت الكوعين بجانب القفص الصدري ولا تحرك الكتفين',
          'افتح طرفي الحبل للخارج قليلاً عند الفرد الكامل بالأسفل',
          'اصعد حتى زاوية ٩٠ درجة أو أكثر قليلاً للشد المستمر'
        ],
        tempoLabel: 'دفع ١ث · عصر ١ث · صعود ٢ث',
        phases: ['ثني الكوع بأقصى مدى', 'تثبيت المرفق بالجانب', 'فرد كامل لأسفل'],
      },
      {
        id: 'd2-bayesian-curl',
        name: 'Bayesian curl',
        nameAr: 'بايسبس كابل خلفي (Bayesian)',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=bayesian+cable+curl',
        videoUrl: '/src/assets/videos/dumbbell-incline-curl--6i9.mp4',
        posterUrl: '/src/assets/posters/dumbbell-incline-curl--6i9.jpg',
        motion: 'bayesian_curl',
        primaryMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        cues: [
          'تقدم خطوة للأمام بحيث يكون الذراع ممدوداً خلف الجذع',
          'ثبت الكوع خلف الجسم وارفع الساعد دون سحب الكوع للأمام',
          'أحد أقوى التمارين لتضخيم البايسبس في وضع الإطالة'
        ],
        tempoLabel: 'رفع ١ث · نزول ٣ث',
        phases: ['إطالة البايسبس خلف الجسم', 'ثبات الكتف للخلف', 'ثني الساعد للأعلى'],
      },
      {
        id: 'd2-db-curl',
        name: 'DB curl',
        nameAr: 'بايسبس بالدمبل (أداء صارم)',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+bicep+curl+strict',
        videoUrl: '/src/assets/videos/dumbbell-biceps-curl-6hm.mp4',
        posterUrl: '/src/assets/posters/dumbbell-biceps-curl-6hm.jpg',
        motion: 'db_curl',
        primaryMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        cues: [
          'أدر راحة اليد للأعلى (Supination) مع بداية الرفع',
          'حافظ على ثبات الجذع تماماً دون مساعدة من أسفل الضهر',
          'افرد الذراع بالكامل في الأسفل دون إرخاء العضلة'
        ],
        tempoLabel: 'رفع ١ث · نزول ٢-٣ث',
        phases: ['فرد كامل بالأسفل', 'ثبات الجذع', 'ثني مع دوران المعصم'],
      },
      {
        id: 'd2-cable-hammer-curl',
        name: 'Cable hammer curl',
        nameAr: 'هامر كيرل بالحبل على الكابل',
        sets: '1',
        workingSetsCount: 1,
        reps: '10-12',
        rir: '0',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+rope+hammer+curl',
        videoUrl: '/src/assets/videos/cable-hammer-curl-63c.mp4',
        posterUrl: '/src/assets/posters/cable-hammer-curl-63c.jpg',
        motion: 'hammer_curl',
        primaryMuscles: ['biceps', 'forearms'],
        secondaryMuscles: [],
        cues: [
          'امسك الحبل بقبضة متعادلة (الإبهام للأعلى)',
          'مجموعة واحدة عالية الشدة حتى الفشل (RIR 0)',
          'يستهدف عضلة الـ Brachialis التي تعطي سمكاً للذراع'
        ],
        tempoLabel: 'رفع ١ث · نزول ٢ث',
        phases: ['إطالة كاملة بالأسفل', 'قبضة متعادلة ثابتة', 'رفع حتى أقصى انقباض'],
      },
    ],
  },
  {
    dayNumber: 3,
    dayLabel: 'يوم ٣',
    title: 'رجل (هامسترنج وجلوتس)',
    subtitle: 'تعزيز الجلوتس بزيادة الـ Hip Thrust إلى ٣ مجموعات وإضافة الفخذ الخارجي Abductors',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'جهاز الهاك سكوات والأوزان الحديدية في صالة تدريب احترافية',
    estimatedMinutes: 65,
    exercises: [
      {
        id: 'd3-seated-leg-curl',
        name: 'Seated leg curl',
        nameAr: 'ثني ركبة جالس (Seated Leg Curl)',
        sets: '3',
        workingSetsCount: 3,
        reps: '10-12',
        rir: '1',
        restSeconds: 120,
        restLabel: '٢ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=seated+leg+curl+form',
        videoUrl: '/src/assets/videos/lever-seated-leg-curl-11.mp4',
        posterUrl: '/src/assets/posters/lever-seated-leg-curl-11.jpg',
        motion: 'seated_leg_curl',
        primaryMuscles: ['hamstrings'],
        secondaryMuscles: ['calves'],
        cues: [
          'ثبت وسادة الفخذ بإحكام؛ الجلوس يمنح الهامسترنج إطالة فائقة',
          'اسحب الكعبين للأسفل والخلف حتى أقصى ثني',
          'اصعد ببطء مع مقاومة الوزن حتى فرد الركبة تقريباً'
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · عودة ٣ث',
        phases: ['إطالة كاملة بالوضع الجالس', 'ثبات الحوض بالكرسي', 'ثني الركبة للأسفل'],
      },
      {
        id: 'd3-smith-hip-thrust',
        name: 'Smith hip thrust',
        nameAr: 'هيب ثرست على جهاز السميث',
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '1',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=smith+machine+hip+thrust',
        videoUrl: '/src/assets/videos/smith-hip-thrust-8hx.mp4',
        posterUrl: '/src/assets/posters/smith-hip-thrust-8hx.jpg',
        motion: 'smith_hip_thrust',
        primaryMuscles: ['glutes'],
        secondaryMuscles: ['hamstrings', 'quads'],
        cues: [
          'ضع أسفل لوحي الكتف على البنش واضبط الساق بزاوية ٩٠° في الأعلى',
          'ادفع بالكعبين وارفع الحوض مع إمالة الحوض للخلف (Posterior tilt) عند القمة',
          'تمت زيادة المجموعات إلى ٣ لحل ضعف حجم الجلوتس الأسبوعي'
        ],
        tempoLabel: 'دفع ١ث · عصر ١-٢ث · نزول ٢ث',
        phases: ['نزول محكوم بالحوض', 'ذقن مائل قليلاً للأمام', 'دفع الحوض وعصر الجلوتس'],
      },
      {
        id: 'd3-leg-press',
        name: 'Leg press',
        nameAr: 'دفع أرجل (Leg Press)',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-2',
        restSeconds: 180,
        restLabel: '٣ دقائق',
        youtubeUrl: 'https://www.youtube.com/results?search_query=leg+press+form',
        videoUrl: '/src/assets/videos/sled-45-leg-press-1o.mp4',
        posterUrl: '/src/assets/posters/sled-45-leg-press-1o.jpg',
        motion: 'leg_press',
        primaryMuscles: ['quads', 'glutes'],
        secondaryMuscles: ['hamstrings'],
        cues: [
          'ضع القدمين بمستوى متوسط-عريض لخدمة الجلوتس والأماميات معاً',
          'انزل لأقصى عمق دون أن يرتفع أسفل الضهر عن المقعد',
          'لا تقفل الركبتين بالكامل في الأعلى للحفاظ على التوتر'
        ],
        tempoLabel: 'نزول ٣ث · دفع ١ث',
        phases: ['ثني عميق مع ثبات الحوض', 'كعبان ثابتان على المنصة', 'دفع قوي للأعلى'],
      },
      {
        id: 'd3-adductor',
        name: 'Adductor machine',
        nameAr: 'جهاز الضامة (Adductor)',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-15',
        rir: '1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=adductor+machine',
        videoUrl: '/src/assets/videos/lever-seated-hip-adduction-10.mp4',
        posterUrl: '/src/assets/posters/lever-seated-hip-adduction-10.jpg',
        motion: 'adductor',
        primaryMuscles: ['adductors'],
        secondaryMuscles: ['glutes'],
        cues: [
          'افتح الساقين لأقصى مدى مريح في بداية العدة',
          'اضغط للداخل بتركيز على الفخذ الداخلي',
          'تجنب استخدام الزخم عند غلق الفخذين'
        ],
        tempoLabel: 'غلق ١ث · عصر ١ث · فتح ٢-٣ث',
        phases: ['إطالة الفخذ الداخلي', 'ضهر ثابت على المسند', 'ضم الفخذين للداخل'],
      },
      {
        id: 'd3-abductor',
        name: 'Abductor machine',
        nameAr: 'جهاز الفخذ الخارجي (Abductor)',
        sets: '2',
        workingSetsCount: 2,
        reps: '12-15',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=hip+abductor+machine',
        videoUrl: '/src/assets/videos/lever-seated-hip-abduction-19.mp4',
        posterUrl: '/src/assets/posters/lever-seated-hip-abduction-19.jpg',
        motion: 'abductor',
        primaryMuscles: ['glutes'],
        secondaryMuscles: [],
        isNew: true,
        cues: [
          'اجلس مستقيماً أو بميل خفيف للأمام لتفعيل أعلى الجلوتس (Glute Medius)',
          'ادفع بالركبتين للخارج واثبت ثانية عند الفتح',
          'تمرين مضاف لمعالجة العضلات الناقصة وتوازن مفصل الحوض'
        ],
        tempoLabel: 'فتح ١ث · ثبات ١ث · عودة ٢ث',
        phases: ['عودة متحكم بها للداخل', 'تثبيت الحوض', 'فتح الفخذين للخارج'],
      },
      {
        id: 'd3-calf-raises',
        name: 'Smith calf raises',
        nameAr: 'سمانة واقف على السميث',
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=smith+machine+calf+raise',
        videoUrl: '/src/assets/videos/smith-calf-raise-32.mp4',
        posterUrl: '/src/assets/posters/smith-calf-raise-32.jpg',
        motion: 'calf_raise',
        primaryMuscles: ['calves'],
        secondaryMuscles: [],
        cues: [
          'قف على حافة استيب لإتاحة هبوط الكعب لأقصى إطالة بالأسفل',
          'توقف ١-٢ ثانية بالأسفل لإلغاء ارتداد وتر أكيليس',
          'ارتفع على مشط القدم لأقصى انقباض دون ثني الركبة'
        ],
        tempoLabel: 'ثبات أسفل ٢ث · رفع ١ث · عصر ١ث',
        phases: ['إطالة عميقة وتوقف ٢ث', 'ركبة مفرودة وثابتة', 'ارتفاع كامل على المشط'],
      },
      {
        id: 'd3-cable-lateral',
        name: 'Cable lateral raise',
        nameAr: 'رفرفة جانبية بالكابل',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '0-1',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+lateral+raise',
        videoUrl: '/src/assets/videos/cable-one-arm-lateral-raise-64s.mp4',
        posterUrl: '/src/assets/posters/cable-one-arm-lateral-raise-64s.jpg',
        motion: 'lateral_raise',
        primaryMuscles: ['side_delt'],
        secondaryMuscles: [],
        cues: [
          'اضبط البكرة عند مستوى المعصم لتعظيم الشد في وضع الإطالة',
          'ارفع الذراع للخارج مع الحفاظ على مسافة بين الكتف والأذن',
          'يحافظ على حجم الكتف الجانبي مرتفعاً دون إرهاق إضافي للأرجل'
        ],
        tempoLabel: 'رفع ١ث · نزول ٢-٣ث',
        phases: ['شد مستمر أمام الجسم', 'ثبات الجذع', 'رفع جانبي بمستوى الكتف'],
      },
      {
        id: 'd3-torso-rotation',
        name: 'Cable torso rotation',
        nameAr: 'دوران الجذع بالكابل (Woodchopper)',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '1-2',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=cable+woodchopper',
        videoUrl: '/src/assets/videos/cable-twist-6g7.mp4',
        posterUrl: '/src/assets/posters/cable-twist-6g7.jpg',
        motion: 'torso_rotation',
        primaryMuscles: ['abs'],
        secondaryMuscles: ['lower_back'],
        safetyCaution: {
          problem: 'خطر على الفقرات القطنية لو الدوران جاء من أسفل الضهر بدل القفص الصدري والحوض',
          solution: 'الحركة تبقى بطيئة ومتحكم فيها، مع تثبيت البطن وتدوير الجذع العلوي والحوض بتناغم',
        },
        cues: [
          'الذراعان مفرودتان للأمام والكابل بمستوى الصدر',
          'لف القفص الصدري ببطء مع شد عضلات البطن (Core bracing)',
          'تجنب الخطف السريع بالوزن في بداية الحركة'
        ],
        tempoLabel: 'لف ٢ث · ثبات ١ث · عودة ٢ث',
        phases: ['عودة بطيئة ومتحكمة', 'شد عضلات البطن', 'دوران الجذع من الصدر'],
      },
    ],
  },
  {
    dayNumber: 4,
    dayLabel: 'يوم ٤',
    title: 'راحة واستشفاء 🛌',
    subtitle: 'يوم راحة في موضعه الصحيح بعد ٣ أيام متتالية لتعافي الجهاز العصبي والألياف العضلية',
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
        videoUrl: '/src/assets/videos/cat-cow-stretch-9l6.mp4',
        posterUrl: '/src/assets/posters/cat-cow-stretch-9l6.jpg',
        motion: 'mobility_rest',
        primaryMuscles: ['lower_back', 'upper_back'],
        secondaryMuscles: ['glutes', 'hamstrings'],
        cues: [
          'حركات هادئة لفتح مفصل الحوض والعمود الفقري الصدري والكتفين',
          'تنفس عميق وهادئ لتقليل هرمونات التوتر وتسريع الاستشفاء',
          'احرص على شرب ٣ لتر ماء والنوم ٧-٩ ساعات'
        ],
        tempoLabel: 'حركة انسيابية بدون إجهاد',
        phases: ['شهيق عميق وإطالة لطيفة', 'تحريك المفاصل بمدى كامل', 'زفير واسترخاء عضلي'],
      },
    ],
  },
  {
    dayNumber: 5,
    dayLabel: 'يوم ٥',
    title: 'جزء علوي (Upper)',
    subtitle: 'استبدال ضغط السميث بالدمبل لحماية الكتف وإضافة Face Pull للكتف الخلفي والكفة المدورة',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.push,
    coverAlt: 'منطقة تدريب الجزء العلوي مع بنش وأوزان حرة',
    estimatedMinutes: 70,
    exercises: [
      {
        id: 'd5-db-flat-press',
        name: 'DB flat press',
        nameAr: 'بنش دمبل مستوي',
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1',
        restSeconds: 180,
        restLabel: '٣ دقائق',
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+bench+press+form',
        videoUrl: '/src/assets/videos/dumbbell-bench-press-84.mp4',
        posterUrl: '/src/assets/posters/dumbbell-bench-press-84.jpg',
        motion: 'flat_db_press',
        primaryMuscles: ['chest'],
        secondaryMuscles: ['front_delt', 'triceps'],
        cues: [
          'ثبت القدمين بالأرض واجمع لوحي الكتف للخلف والأسفل على البنش',
          'انزل بالدمبل بمحاذاة منتصف الصدر وكوع بزاوية ٤٥°',
          'ادفع للأعلى بسلاسة مع الحفاظ على استقرار المعصم'
        ],
        tempoLabel: 'نزول ٣ث · ثبات ١ث · دفع ١ث',
        phases: ['نزول عميق لخط الصدر', 'لوحا الكتف ثابتان', 'دفع مستقيم للأعلى'],
      },
      {
        id: 'd5-t-bar-row',
        name: 'T-bar row',
        nameAr: 'تجديف T-Bar (مسند صدر)',
        sets: '2',
        workingSetsCount: 2,
        reps: '6-10',
        rir: '1',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=chest+supported+t+bar+row',
        videoUrl: '/src/assets/videos/lever-lying-t-bar-row-3h.mp4',
        posterUrl: '/src/assets/posters/lever-lying-t-bar-row-3h.jpg',
        motion: 't_bar_row',
        primaryMuscles: ['upper_back', 'lats'],
        secondaryMuscles: ['rear_delt', 'biceps'],
        cues: [
          'استخدم قبضة متوسطة-واسعة لاستهداف أعلى الضهر ووسطه',
          'تجنب رفع الصدر عن المسند أثناء السحب',
          'افرد الذراعين بالكامل في الأسفل لإطالة الضهر'
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · نزول ٢-٣ث',
        phases: ['تمدد لوحي الكتف', 'ثبات الصدر على المسند', 'سحب المرفقين للخلف'],
      },
      {
        id: 'd5-db-shoulder-press',
        name: 'DB shoulder press (بدل السميث)',
        nameAr: 'ضغط كتف بالدمبل جالس',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-10',
        rir: '1-2',
        restSeconds: 150,
        restLabel: '٢.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=seated+dumbbell+shoulder+press+form',
        videoUrl: '/src/assets/videos/dumbbell-seated-shoulder-press-6kp.mp4',
        posterUrl: '/src/assets/posters/dumbbell-seated-shoulder-press-6kp.jpg',
        motion: 'db_shoulder_press',
        primaryMuscles: ['front_delt'],
        secondaryMuscles: ['side_delt', 'triceps'],
        safetyCaution: {
          problem: 'جهاز السميث كان بيجبر الكتف يمشي في مسار ثابت مما يسبب احتكاك الكتف (Impingement)',
          solution: 'استخدام الدمبلز مع إمالة الكوع للأمام بزاوية ٣٠ إلى ٤٥ درجة لحركة طبيعية آمنة لمفصل الكتف',
        },
        cues: [
          'اضبط البنش على زاوية ٧٥-٨٠ درجة وليس ٩٠° عمودية تماماً',
          'قدّم الكوعين للأمام ٣٠-٤٥ درجة (مستوى اللوح الكتفي)',
          'انزل حتى مستوى الأذن أو أعلى الكتف ثم ادفع للأعلى'
        ],
        tempoLabel: 'نزول ٢-٣ث · دفع ١ث',
        phases: ['نزول بمستوى الأذن', 'الكوع مائل ٣٠-٤٥° للأمام', 'دفع متزن للأعلى'],
      },
      {
        id: 'd5-close-seated-row',
        name: 'Close grip seated row',
        nameAr: 'تجديف جالس كابل قبضة ضيقة',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1',
        restSeconds: 120,
        restLabel: '٢ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=close+grip+seated+cable+row',
        videoUrl: '/src/assets/videos/cable-low-seated-row-64g.mp4',
        posterUrl: '/src/assets/posters/cable-low-seated-row-64g.jpg',
        motion: 'seated_cable_row',
        primaryMuscles: ['lats', 'upper_back'],
        secondaryMuscles: ['biceps'],
        cues: [
          'اسحب المقبض تجاه البطن/السرة مع ملامسة الكوعين للخصر',
          'حافظ على استقامة الضهر وتجنب التأرجح للخلف كثيراً',
          'ممتاز لتكثيف ألياف المجنص السفلية'
        ],
        tempoLabel: 'سحب ١ث · عصر ١ث · إطالة ٢-٣ث',
        phases: ['إطالة للأمام بضهر مفرود', 'ثبات الجذع', 'سحب تجاه أسفل البطن'],
      },
      {
        id: 'd5-lat-pulldown',
        name: 'Lat pulldown',
        nameAr: 'سحب علوي كابل',
        sets: '1-2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1',
        restSeconds: 120,
        restLabel: '٢ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=lat+pulldown+form',
        videoUrl: '/src/assets/videos/bar-lateral-pulldown-6r.mp4',
        posterUrl: '/src/assets/posters/bar-lateral-pulldown-6r.jpg',
        motion: 'lat_pulldown',
        primaryMuscles: ['lats'],
        secondaryMuscles: ['biceps'],
        cues: [
          'ركز على سحب الكتف لأسفل قبل ثني الكوع',
          'حركة سلسة متحكم فيها دون خطف',
          'يكمل حجم الضهر الأسبوعي مرتين في الأسبوع'
        ],
        tempoLabel: 'سحب ١ث · صعود ٣ث',
        phases: ['إطالة كاملة للأعلى', 'صدر مرفوع وثابت', 'سحب لأعلى الصدر'],
      },
      {
        id: 'd5-lateral-machine',
        name: 'Lateral raise machine',
        nameAr: 'جهاز الرفرفة الجانبية',
        sets: '3',
        workingSetsCount: 3,
        reps: '10-15',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=lateral+raise+machine',
        videoUrl: '/src/assets/videos/lever-lateral-raise-0a.mp4',
        posterUrl: '/src/assets/posters/lever-lateral-raise-0a.jpg',
        motion: 'lateral_raise',
        primaryMuscles: ['side_delt'],
        secondaryMuscles: [],
        cues: [
          'اضغط بالذراعين ضد الوسادات وليس باليدين فقط',
          'حافظ على خفض الكتفين بعيداً عن الأذنين',
          'مقاومة مستمرة طوال المدى الحركي'
        ],
        tempoLabel: 'رفع ١ث · ثبات ١ث · نزول ٢ث',
        phases: ['شد مستمر بالأسفل', 'تثبيت الكتف لأسفل', 'رفع جانبي لمستوى الكتف'],
      },
      {
        id: 'd5-face-pull',
        name: 'Face pull',
        nameAr: 'سحب للوجه بالحبل (Face Pull)',
        sets: '2',
        workingSetsCount: 2,
        reps: '12-15',
        rir: '1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=face+pull+form',
        videoUrl: '/src/assets/videos/cable-standing-rear-delt-row--6fx.mp4',
        posterUrl: '/src/assets/posters/cable-standing-rear-delt-row--6fx.jpg',
        motion: 'face_pull',
        primaryMuscles: ['rear_delt', 'upper_back'],
        secondaryMuscles: [],
        isNew: true,
        cues: [
          'اسحب الحبل تجاه الجبهة مع تدوير الساعدين للخارج (External Rotation)',
          'الكوعان أعلى أو بمستوى الكتف مع فتح اليدين كوضع "Double Biceps"',
          'يحمي الكفة المدورة (Rotator Cuff) ويعالج تقوّس الكتف للأمام'
        ],
        tempoLabel: 'سحب ١ث · ثبات ١-٢ث · عودة ٢ث',
        phases: ['مد الذراعين للأمام', 'مرفقان بمستوى الكتف', 'سحب مع دوران خارجي للكتف'],
      },
      {
        id: 'd5-db-preacher-curl',
        name: 'DB preacher curl',
        nameAr: 'بايسبس ارتكاز بالدمبل (Preacher)',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '1-2',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+preacher+curl',
        videoUrl: '/src/assets/videos/dumbbell-preacher-curl-6js.mp4',
        posterUrl: '/src/assets/posters/dumbbell-preacher-curl-6js.jpg',
        motion: 'preacher_curl',
        primaryMuscles: ['biceps'],
        secondaryMuscles: ['forearms'],
        safetyCaution: {
          problem: 'وتر البايسبس بيكون في أضعف وضع ليه تحت لو وصلت للفشل وفردت دراعك على الآخر بوزن تقيل',
          solution: 'خلي التمرين بـ RIR 1-2 ومتفردش دراعك على الآخر بعنف وانت شايل وزن تقيل',
        },
        cues: [
          'ثبت الإبط والذراع العلوي بالكامل على المسند المائل',
          'انزل ببطء وتوقف قبل الفرد القفلي الكامل للمفصل لحماية الوتر',
          'ارفع بالبايسبس دون رفع الكتف عن المسند'
        ],
        tempoLabel: 'رفع ١ث · نزول ٣ث بحذر',
        phases: ['نزول بطيء بدون قفل عنيف', 'الذراع ثابت على المسند', 'رفع حتى ذروة الانقباض'],
      },
      {
        id: 'd5-rope-pushdown',
        name: 'Rope pushdown',
        nameAr: 'ترايسبس كابل بالحبل لأسفل',
        sets: '2',
        workingSetsCount: 2,
        reps: '10-12',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=rope+triceps+pushdown',
        videoUrl: '/src/assets/videos/cable-pushdown-64b.mp4',
        posterUrl: '/src/assets/posters/cable-pushdown-64b.jpg',
        motion: 'rope_pushdown',
        primaryMuscles: ['triceps'],
        secondaryMuscles: [],
        cues: [
          'حافظ على ثبات الكوعين بجانب الجذع طوال المجموعة',
          'افرد الذراعين بالكامل وباعد طرفي الحبل بالأسفل',
          'تحكم في الرجوع للأعلى لزيادة الزمن تحت التوتر'
        ],
        tempoLabel: 'دفع ١ث · عصر ١ث · صعود ٢ث',
        phases: ['ثني متحكم لأعلى', 'تثبيت الكوعين', 'فرد كامل لأسفل'],
      },
    ],
  },
  {
    dayNumber: 6,
    dayLabel: 'يوم ٦',
    title: 'رجل (كوادز)',
    subtitle: 'البدء بالهاك سكوات ثم الـ RDL بحذر (RIR 2-3)، مع إضافة أسفل الضهر والسمانة الأمامية',
    isRestDay: false,
    coverImage: IMAGES_BY_FOCUS.legs,
    coverAlt: 'جهاز الهاك سكوات المائل والأقراص الحديدية في يوم الأرجل',
    estimatedMinutes: 70,
    exercises: [
      {
        id: 'd6-hack-squat',
        name: 'Hack squat (ابدأ بيه)',
        nameAr: 'هاك سكوات (البداية بالكوادز)',
        sets: '3',
        workingSetsCount: 3,
        reps: '6-10',
        rir: '1-2',
        restSeconds: 180,
        restLabel: '٣ دقائق',
        youtubeUrl: 'https://www.youtube.com/results?search_query=hack+squat+form',
        videoUrl: '/src/assets/videos/sled-hack-squat-1r.mp4',
        posterUrl: '/src/assets/posters/sled-hack-squat-1r.jpg',
        motion: 'hack_squat',
        primaryMuscles: ['quads'],
        secondaryMuscles: ['glutes'],
        safetyCaution: {
          problem: 'ضغط زائد على مفصل الركبة لو كانت القدم منخفضة جداً أو الركبتان متجهتان للداخل',
          solution: 'ضع الرجل في نص المنصة، والركبة تمشي في نفس اتجاه صوابع رجلك، مع البدء به قبل RDL وأسفل الضهر مرتاح',
        },
        cues: [
          'ضهرك وأردافك ملتصقان بالكامل بمسند الجهاز',
          'انزل لأقصى عمق مريح بحيث تغطي عضلة الكوادز السمانة',
          'تم تقديمه قبل RDL لأن البدء بـ RDL للفشل كان يرهق أسفل الضهر'
        ],
        tempoLabel: 'نزول ٣ث · ثبات ١ث · دفع ١ث',
        phases: ['نزول عميق مع ثبات الكعب', 'الركبة بمحاذاة الأصابع', 'دفع قوي بمنتصف القدم'],
      },
      {
        id: 'd6-rdl',
        name: 'RDL (بعد الهاك)',
        nameAr: 'ديدليفت روماني (RDL)',
        sets: '2-3',
        workingSetsCount: 3,
        reps: '8-10',
        rir: '2-3',
        restSeconds: 180,
        restLabel: '٣ دقائق',
        youtubeUrl: 'https://www.youtube.com/results?search_query=romanian+deadlift+form',
        videoUrl: '/src/assets/videos/romanian-deadlift-65.mp4',
        posterUrl: '/src/assets/posters/romanian-deadlift-65.jpg',
        motion: 'rdl',
        primaryMuscles: ['hamstrings', 'glutes'],
        secondaryMuscles: ['lower_back', 'upper_back'],
        safetyCaution: {
          problem: 'أكتر تمرين ممكن يأذي الفقرات القطنية (الديسك L4-L5) لو اتعمل للفشل أو بتقوّس الضهر',
          solution: 'خليه RIR 2-3 (توقف قبل الفشل بـ ٢-٣ عدات)، وضهرك مستقيم، وانزل لحد ما تحس بشد في الهامسترنج بس (عادة منتصف الساق)',
        },
        cues: [
          'ادفع الحوض للخلف كأنك تغلق باباً بمؤخرتك (Hip Hinge)',
          'أبقِ البار أو الدمبل ملاصقاً للفخذين والساقين طوال المسار',
          'توقف فور توقف الحوض عن الرجوع للخلف حتى لا ينثني أسفل الضهر'
        ],
        tempoLabel: 'نزول ٣ث · صعود ١ث',
        phases: ['دفع الحوض للخلف بضهر مستقيم', 'شد الهامسترنج فقط', 'دفع الحوض للأمام للوقوف'],
      },
      {
        id: 'd6-leg-extension',
        name: 'Leg extension',
        nameAr: 'رفرفة أمامي على الماكينة (Leg Extension)',
        sets: '3',
        workingSetsCount: 3,
        reps: '10-15',
        rir: '0',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=leg+extension+form',
        videoUrl: '/src/assets/videos/lever-leg-extension-0b.mp4',
        posterUrl: '/src/assets/posters/lever-leg-extension-0b.jpg',
        motion: 'leg_extension',
        primaryMuscles: ['quads'],
        secondaryMuscles: [],
        cues: [
          'اضبط المسند بحيث يكون محور الدوران بمحاذاة مفصل الركبة',
          'اسحب جسمك لأسفل بمسك المقابض الجانبية بإحكام',
          'تستطيع الوصول للفشل الآمن هنا (RIR 0) لعزل الكوادز'
        ],
        tempoLabel: 'رفع ١ث · عصر ١ث · نزول ٢-٣ث',
        phases: ['ثني الركبة لأقصى إطالة', 'ثبات الفخذين بالمقعد', 'فرد كامل وعصر الكوادز'],
      },
      {
        id: 'd6-lying-leg-curl',
        name: 'Lying leg curl',
        nameAr: 'ثني ركبة نائم (Lying Leg Curl)',
        sets: '2',
        workingSetsCount: 2,
        reps: '8-12',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=lying+leg+curl',
        videoUrl: '/src/assets/videos/lever-lying-leg-curl-0c.mp4',
        posterUrl: '/src/assets/posters/lever-lying-leg-curl-0c.jpg',
        motion: 'lying_leg_curl',
        primaryMuscles: ['hamstrings'],
        secondaryMuscles: ['calves'],
        cues: [
          'اضغط الحوض للأسفل ضد البنش ولا ترفع المؤخرة أثناء السحب',
          'اسحب الكعبين تجاه الجلوتس بسلاسة دون خطف',
          'يكمّل الـ Seated leg curl بتشغيل ألياف أخرى في الهامسترنج'
        ],
        tempoLabel: 'سحب ١ث · نزول ٣ث',
        phases: ['إطالة كاملة بالأسفل', 'تثبيت الحوض على البنش', 'ثني الركبة بالكامل'],
      },
      {
        id: 'd6-back-extension',
        name: 'Back extension 45°',
        nameAr: 'تمديد أسفل الضهر بزاوية ٤٥°',
        sets: '2',
        workingSetsCount: 2,
        reps: '12-15',
        rir: '2',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=45+degree+back+extension',
        videoUrl: '/src/assets/videos/45-degree-hyperextension--6xt.mp4',
        posterUrl: '/src/assets/posters/45-degree-hyperextension--6xt.jpg',
        motion: 'back_extension',
        primaryMuscles: ['lower_back', 'glutes'],
        secondaryMuscles: ['hamstrings'],
        isNew: true,
        cues: [
          'اضبط المسند أسفل عظمة الحوض مباشرة لإتاحة الحركة من الورك',
          'اصعد حتى خط استقامة الجسم فقط دون تقويس زائد للخلف (Hyperextension)',
          'تمرين مضاف لتقوية عضلات أسفل الضهر (Erector Spinae) مباشرة'
        ],
        tempoLabel: 'نزول ٢ث · صعود ١ث',
        phases: ['نزول متحكم من الورك', 'عمود فقري محايد', 'صعود حتى استقامة الجذع'],
      },
      {
        id: 'd6-tibialis-raise',
        name: 'Tibialis raise',
        nameAr: 'رفع مشط القدم للسمانة الأمامية (Tibialis)',
        sets: '2',
        workingSetsCount: 2,
        reps: '15-20',
        rir: '1',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=tibialis+raise',
        videoUrl: '/src/assets/videos/smith-toe-raise-3r.mp4',
        posterUrl: '/src/assets/posters/smith-toe-raise-3r.jpg',
        motion: 'tibialis_raise',
        primaryMuscles: ['tibialis'],
        secondaryMuscles: [],
        isNew: true,
        cues: [
          'اسند ضهرك على الحائط وتقدم بالقدمين للأمام مع فرد الركبتين',
          'ارفع مشط القدمين للأعلى قدر الإمكان ثم انزل ببطء',
          'تمرين مضاف لمعالجة غياب السمانة الأمامية وحماية مفصل الكاحل والركبة'
        ],
        tempoLabel: 'رفع ١ث · عصر ١ث · نزول ٢ث',
        phases: ['فرد المشط للأسفل', 'ثبات الركبتين مفرودتين', 'رفع الأصابع للأعلى بقوة'],
      },
      {
        id: 'd6-calf-raises',
        name: 'Smith calf raises',
        nameAr: 'سمانة واقف على السميث',
        sets: '3',
        workingSetsCount: 3,
        reps: '8-12',
        rir: '0-1',
        restSeconds: 90,
        restLabel: '١.٥ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=smith+machine+calf+raise',
        videoUrl: '/src/assets/videos/smith-calf-raise-32.mp4',
        posterUrl: '/src/assets/posters/smith-calf-raise-32.jpg',
        motion: 'calf_raise',
        primaryMuscles: ['calves'],
        secondaryMuscles: [],
        cues: [
          'توقف ثانيتين بالأسفل في كل عدة لزيادة التضخيم الفعلي',
          'ادفع بمشط القدم الكبير والصغير بتوازن',
          'التكرار مرتين أسبوعياً ممتاز لعضلة السمانة العنيدة'
        ],
        tempoLabel: 'ثبات أسفل ٢ث · رفع ١ث · عصر ١ث',
        phases: ['إطالة عميقة وتوقف ٢ث', 'توازن على الحافة', 'انقباض كامل للأعلى'],
      },
      {
        id: 'd6-wrist-flexion',
        name: 'DB wrist flexion',
        nameAr: 'ثني المعصم بالدمبل للسواعد',
        sets: '2',
        workingSetsCount: 2,
        reps: '12-15',
        rir: '0-1',
        restSeconds: 60,
        restLabel: '١ دقيقة',
        youtubeUrl: 'https://www.youtube.com/results?search_query=dumbbell+wrist+curl',
        videoUrl: '/src/assets/videos/dumbbell-one-arm-wrist-curl-6jk.mp4',
        posterUrl: '/src/assets/posters/dumbbell-one-arm-wrist-curl-6jk.jpg',
        motion: 'wrist_flexion',
        primaryMuscles: ['forearms'],
        secondaryMuscles: [],
        cues: [
          'اسند الساعدين على البنش أو الفخذ مع تدلّي المعصمين للخارج',
          'اسمح للدمبل بالنزول لأطراف الأصابع ثم لفها وثني المعصم للأعلى',
          'تحكم بطيء لتقوية الساعد والقبضة بدون إجهاد الأوتار'
        ],
        tempoLabel: 'رفع ١ث · نزول ٢ث',
        phases: ['بسط المعصم لأطراف الأصابع', 'الساعد ثابت تماماً', 'ثني المعصم للأعلى'],
      },
    ],
  },
  {
    dayNumber: 7,
    dayLabel: 'يوم ٧',
    title: 'راحة، أو مشي ٣٠ دقيقة 🛌',
    subtitle: 'استشفاء نشط خفيف وتجديد الطاقة قبل بداية الأسبوع التدريبي الجديد',
    isRestDay: true,
    restNote: 'يمكن الاكتفاء بالراحة التامة أو مشي خفيف ٣٠ دقيقة + ١٠ دقائق Mobility للجسم كله.',
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
        videoUrl: '/src/assets/videos/walking-on-incline-treadmill-8x5.mp4',
        posterUrl: '/src/assets/posters/walking-on-incline-treadmill-8x5.jpg',
        motion: 'treadmill_walk',
        primaryMuscles: ['quads', 'hamstrings', 'calves'],
        secondaryMuscles: ['glutes'],
        cues: [
          'مشي بوتيرة مريحة يمكنك التحدث خلالها بسهولة',
          'يحسّن الدورة الدموية ويسرّع التخلص من التعب العضلي',
          'اتبعها بـ ١٠ دقائق Mobility للجسم كله'
        ],
        tempoLabel: 'إيقاع ثابت مريح',
        phases: ['خطوة منتظمة', 'تنفس مريح', 'استشفاء نشط'],
      },
    ],
  },
];

export const CARDIO_PROTOCOL = {
  title: 'الكارديو بعد كل تمرين',
  detail: 'مشي على المشاية، سرعة 4 وميل 10، لمدة ٢٠ دقيقة (زي ما الجدول الأصلي قال)',
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
    issue: 'الكتف الخلفي مالوش ولا تمرين',
    details: 'ده أكبر عيب. بيعمل عدم توازن في الكتف، وبيقوّس الكتف لقدام، وبيزوّد احتمال إصابة الـ rotator cuff، خصوصًا إن فيه دفع كتير للصدر',
    fixApplied: 'تمت إضافة Reverse pec deck في يوم ١ وFace pull في يوم ٥',
  },
  {
    issue: 'الصدر قليل',
    details: 'حوالي ٧ مجموعات في الأسبوع، والطبيعي ١٠ لـ ١٤',
    fixApplied: 'تمت إضافة Machine chest press في يوم ٢ لرفع الحجم الأسبوعي',
  },
  {
    issue: 'الجلوتس قليل',
    details: 'مجموعة Hip thrust واحدة بس في الأسبوع',
    fixApplied: 'تمت زيادة Smith hip thrust إلى ٣ مجموعات في يوم ٣',
  },
  {
    issue: 'كل المجموعات للفشل (RIR 0-1)',
    details: 'حتى في الـ RDL والهاك. ده إجهاد كبير على الجهاز العصبي وعلى أسفل الضهر',
    fixApplied: 'تم تعديل الـ RDL لـ RIR 2-3 والهاك لـ RIR 1-2',
  },
  {
    issue: 'الترايسبس مالوش تمرين تقيل',
    details: 'كل تمارينه كابل',
    fixApplied: 'تمت إضافة Dips أو Close grip bench في يوم ٢',
  },
  {
    issue: 'مفيش إحماء حركي ولا إطالات',
    details: 'ولا فيه أي تمرين للـ rotator cuff',
    fixApplied: 'تمت إضافة بروتوكول إحماء متحرك وإطالات ثابتة + Face pull',
  },
  {
    issue: 'ترتيب يوم ١',
    details: 'الـ Kelso shrugs جاية قبل الـ T-bar، وده بيتعب الترابيس والقبضة قبل التمرين الأساسي',
    fixApplied: 'تم نقل T-bar row قبل Kelso shrugs',
  },
  {
    issue: 'عضلات ناقصة',
    details: 'السمانة الأمامية (Tibialis)، والـ Abductors (الفخذ الخارجي)، وأسفل الضهر (مش متدرب لوحده)',
    fixApplied: 'تمت إضافة Abductor يوم ٣، وBack extension 45° وTibialis raise يوم ٦',
  },
  {
    issue: 'ترتيب يوم ٥ / ٦',
    details: 'الـ RDL للفشل قبل الهاك سكوات بيخلّي أسفل الضهر مرهق وإنت داخل التمرين اللي بعده',
    fixApplied: 'تم البدء بـ Hack squat ثم RDL بعده بـ RIR 2-3',
  },
];

export const HIGH_LOAD_WARNINGS = [
  {
    exerciseId: 'd6-rdl',
    dayNumber: 6,
    name: 'RDLs للفشل',
    problem: 'أكتر تمرين ممكن يأذي الفقرات القطنية (الديسك L4-L5)',
    solution: 'خليها RIR 2-3، وضهرك مستقيم، وانزل لحد ما تحس بشد في الهامسترنج بس',
  },
  {
    exerciseId: 'd5-db-shoulder-press',
    dayNumber: 5,
    name: 'Smith incline shoulder press',
    problem: 'السميث بيجبر الكتف يمشي في مسار ثابت، وده ممكن يعمل احتكاك في الكتف (impingement)',
    solution: 'خلي الكوع مايل قدامك بزاوية ٣٠ إلى ٤٥ درجة، أو استخدم دمبلز بدله',
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
    name: 'DB preacher curl للفشل',
    problem: 'وتر البايسبس بيكون في أضعف وضع ليه تحت',
    solution: 'متفردش دراعك على الآخر وانت شايل وزن تقيل',
  },
  {
    exerciseId: 'd6-hack-squat',
    dayNumber: 6,
    name: 'Hack squat',
    problem: 'ضغط على الركبة',
    solution: 'الرجل في نص المنصة، والركبة تمشي في نفس اتجاه صوابع رجلك',
  },
  {
    exerciseId: 'd3-torso-rotation',
    dayNumber: 3,
    name: 'Cable torso rotation',
    problem: 'لو اللف جه من الفقرات بدل الحوض والصدر',
    solution: 'الحركة تبقى بطيئة ومتحكم فيها',
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
  { muscle: 'الصدر', stretch: 'Doorway chest stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=doorway+chest+stretch', videoUrl: '/src/assets/videos/standing-one-arm-chest-stretch-6c1.mp4', posterUrl: '/src/assets/posters/standing-one-arm-chest-stretch-6c1.jpg' },
  { muscle: 'الضهر', stretch: "Child's pose، Lat stretch على العمود", youtubeUrl: 'https://www.youtube.com/results?search_query=lat+stretch+child+pose', videoUrl: '/src/assets/videos/kneeling-lat-stretch-78s.mp4', posterUrl: '/src/assets/posters/kneeling-lat-stretch-78s.jpg' },
  { muscle: 'الكتف', stretch: 'Cross-body shoulder stretch، Sleeper stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=sleeper+stretch+cross+body', videoUrl: '/src/assets/videos/across-chest-shoulder-stretch-7nh.mp4', posterUrl: '/src/assets/posters/across-chest-shoulder-stretch-7nh.jpg' },
  { muscle: 'الترايسبس والبايسبس', stretch: 'Overhead triceps stretch، Wall biceps stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=triceps+biceps+stretch', videoUrl: '/src/assets/videos/overhead-triceps-stretch-6r1.mp4', posterUrl: '/src/assets/posters/overhead-triceps-stretch-6r1.jpg' },
  { muscle: 'الرقبة والترابيس', stretch: 'Upper trap stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=upper+trapezius+stretch', videoUrl: '/src/assets/videos/side-neck-stretch-6t9.mp4', posterUrl: '/src/assets/posters/side-neck-stretch-6t9.jpg' },
  { muscle: 'الهامسترنج', stretch: 'Standing hamstring stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=hamstring+stretch', videoUrl: '/src/assets/videos/hamstring-stretch-724.mp4', posterUrl: '/src/assets/posters/hamstring-stretch-724.jpg' },
  { muscle: 'الكوادز', stretch: 'Standing quad stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=standing+quad+stretch', videoUrl: '/src/assets/videos/all-fours-squad-stretch-72f.mp4', posterUrl: '/src/assets/posters/all-fours-squad-stretch-72f.jpg' },
  { muscle: 'الحوض (مهم جدًا لأسفل الضهر)', stretch: 'Hip flexor lunge stretch، Pigeon stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=hip+flexor+pigeon+stretch', videoUrl: '/src/assets/videos/kneeling-hip-flexor-stretch-6c6.mp4', posterUrl: '/src/assets/posters/kneeling-hip-flexor-stretch-6c6.jpg' },
  { muscle: 'السمانة', stretch: 'Wall calf stretch', youtubeUrl: 'https://www.youtube.com/results?search_query=wall+calf+stretch', videoUrl: '/src/assets/videos/calf-stretch-with-hands-against-wall-793.mp4', posterUrl: '/src/assets/posters/calf-stretch-with-hands-against-wall-793.jpg' },
  { muscle: 'أسفل الضهر', stretch: 'Knee to chest، Cat-cow', youtubeUrl: 'https://www.youtube.com/results?search_query=lower+back+stretch+knee+to+chest', videoUrl: '/src/assets/videos/cat-cow-stretch-9l6.mp4', posterUrl: '/src/assets/posters/cat-cow-stretch-9l6.jpg' },
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
