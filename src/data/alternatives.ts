import type { MotionPattern } from './workoutData';

/** A substitute way to train the same muscle when the planned machine is busy / missing. */
export interface ExerciseAlternative {
  name: string;
  nameAr: string;
  /** Equipment needed, shown as a small tag (دمبل / كابل / ماكينة / بار / وزن الجسم / أستك). */
  equipment: string;
  note?: string;
  youtubeUrl: string;
  /** Optional local demo clip. When missing, the YouTube link is the demo. */
  videoUrl?: string;
  posterUrl?: string;
}

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${q} form`)}`;

/** Local demo clip + poster by asset slug. */
const clip = (slug: string) => ({
  videoUrl: `src/assets/videos/${slug}.mp4`,
  posterUrl: `src/assets/posters/${slug}.jpg`,
});

const alt = (
  name: string,
  nameAr: string,
  equipment: string,
  extra: { note?: string; slug?: string } = {}
): ExerciseAlternative => ({
  name,
  nameAr,
  equipment,
  note: extra.note,
  youtubeUrl: yt(name),
  ...(extra.slug ? clip(extra.slug) : {}),
});

const VERTICAL_PULL = [
  alt('Lat pulldown (neutral / close grip)', 'سحب علوي قبضة ضيقة أو متوازية', 'كابل', { slug: 'bar-lateral-pulldown-6r' }),
  alt('Wide grip lat pulldown', 'سحب علوي قبضة واسعة', 'كابل', { slug: 'cable-wide-grip-lat-pulldown--7v7' }),
  alt('Pull-ups', 'عقلة', 'وزن الجسم', { note: 'لو مش قادر تكمّل التكرارات استخدم أستك مساعد أو جهاز العقلة المساعد' }),
  alt('Assisted pull-up machine', 'جهاز العقلة المساعد', 'ماكينة'),
  alt('Single arm cable pulldown', 'سحب علوي بدراع واحد على الكابل', 'كابل', { note: 'ممتاز لو الجهاز الأساسي مشغول، استخدم أي بكرة عالية' }),
  alt('Resistance band lat pulldown', 'سحب علوي بالأستك', 'أستك'),
];

const HORIZONTAL_ROW = [
  alt('T-bar row machine', 'تجديف T-Bar على الماكينة', 'ماكينة', { slug: 'lever-t-bar-row-1f' }),
  alt('Chest supported T-bar row', 'تجديف T-Bar بصدر مسنود', 'ماكينة', { slug: 'lever-lying-t-bar-row-3h' }),
  alt('Seated cable row', 'تجديف كابل جالس', 'كابل', { slug: 'cable-low-seated-row-64g' }),
  alt('Chest supported dumbbell row', 'تجديف دمبل على بنش مايل (صدر مسنود)', 'دمبل', { note: 'أأمن بديل لأسفل الضهر' }),
  alt('One arm dumbbell row', 'تجديف دمبل بدراع واحد', 'دمبل'),
  alt('Barbell bent over row', 'تجديف بار منحني', 'بار', { note: 'خلي ضهرك مستقيم ووزن متوسط' }),
  alt('Machine row', 'ماكينة التجديف (Seated row machine)', 'ماكينة'),
];

const PULLOVER = [
  alt('Cable straight arm pulldown', 'سحب كابل بدراع مفرود', 'كابل', { slug: 'cable-straight-arm-pulldown-6fc' }),
  alt('Dumbbell pullover', 'بلوفر دمبل على البنش', 'دمبل'),
  alt('Rope straight arm pulldown', 'سحب بالحبل بدراع مفرود', 'كابل'),
  alt('Band straight arm pulldown', 'سحب بالأستك بدراع مفرود', 'أستك'),
];

const SCAP_RETRACTION = [
  alt('Kelso shrug (incline dumbbell)', 'شراجز كيلسو بالدمبل على بنش مايل', 'دمبل', { slug: 'dumbbell-incline-shrug-6il' }),
  alt('Chest supported machine shrug', 'ضم لوحي الكتف على ماكينة التجديف', 'ماكينة', { note: 'دراعك مفرود، الحركة من لوح الكتف بس' }),
  alt('Barbell bent over Kelso shrug', 'كيلسو شراج بالبار منحني', 'بار'),
  alt('Cable scapular retraction', 'ضم لوحي الكتف على الكابل', 'كابل'),
];

const REAR_DELT = [
  alt('Reverse pec deck', 'فراشة عكسي على الماكينة', 'ماكينة', { slug: 'lever-seated-reverse-fly-12' }),
  alt('Face pull', 'فيس بول بالحبل', 'كابل', { slug: 'cable-standing-rear-delt-row--6fx' }),
  alt('Cable reverse fly', 'فراشة عكسي على الكابل (كروس)', 'كابل'),
  alt('Bent over dumbbell reverse fly', 'رفرفة خلفي بالدمبل منحني', 'دمبل'),
  alt('Incline bench dumbbell reverse fly', 'رفرفة خلفي دمبل على بنش مايل', 'دمبل', { note: 'صدرك مسنود فبتعزل الكتف الخلفي أحسن' }),
  alt('Band pull apart', 'فتح الأستك للخلف', 'أستك'),
];

const Y_RAISE = [
  alt('Cable Y raise', 'رفرفة Y على الكابل', 'كابل', { slug: 'cable-y-raise-8o6' }),
  alt('Incline bench dumbbell Y raise', 'رفرفة Y بالدمبل على بنش مايل', 'دمبل'),
  alt('Dumbbell lateral raise', 'رفرفة جانبي بالدمبل', 'دمبل', { slug: 'lateral-raise-96' }),
  alt('Band Y raise', 'رفرفة Y بالأستك', 'أستك'),
];

const LATERAL_RAISE = [
  alt('Dumbbell lateral raise', 'رفرفة جانبي بالدمبل', 'دمبل', { slug: 'lateral-raise-96' }),
  alt('Cable one arm lateral raise', 'رفرفة جانبي كابل بدراع واحد', 'كابل', { slug: 'cable-one-arm-lateral-raise-64s' }),
  alt('Lateral raise machine', 'ماكينة الرفرفة الجانبي', 'ماكينة', { slug: 'lever-lateral-raise-0a' }),
  alt('Lean away dumbbell lateral raise', 'رفرفة جانبي دمبل وانت مايل (ماسك عمود)', 'دمبل'),
  alt('Band lateral raise', 'رفرفة جانبي بالأستك', 'أستك'),
];

const REVERSE_CURL = [
  alt('Cable reverse curl', 'باي عكسي على الكابل', 'كابل', { slug: 'cable-reverse-curl-6f6' }),
  alt('EZ bar reverse curl', 'باي عكسي بالبار الزجزاج', 'بار'),
  alt('Dumbbell reverse curl', 'باي عكسي بالدمبل', 'دمبل'),
  alt('Cable rope hammer curl', 'هامر كيرل بالحبل', 'كابل', { slug: 'cable-hammer-curl-63c' }),
];

const CRUNCH = [
  alt('Cable kneeling crunch', 'كرانش كابل على الركب', 'كابل', { slug: 'cable-kneeling-crunch-641' }),
  alt('Ab crunch machine', 'ماكينة البطن', 'ماكينة'),
  alt('Decline bench crunch', 'كرانش على بنش مقلوب', 'بنش'),
  alt('Hanging knee raise', 'رفع ركب وانت متعلق', 'وزن الجسم'),
  alt('Floor crunch', 'كرانش أرضي', 'وزن الجسم'),
];

const INCLINE_PRESS = [
  alt('Dumbbell incline press', 'ضغط دمبل مايل', 'دمبل', { slug: 'dumbbell-incline-bench-press-6i6' }),
  alt('Incline smith press', 'ضغط مايل على السميث', 'سميث'),
  alt('Incline barbell press', 'ضغط بار مايل', 'بار'),
  alt('Incline machine chest press', 'ماكينة ضغط صدر مايل', 'ماكينة'),
  alt('Feet elevated push-ups', 'ضغط برجل مرفوعة', 'وزن الجسم'),
];

const FLAT_PRESS = [
  alt('Dumbbell bench press', 'بنش دمبل مستوي', 'دمبل', { slug: 'dumbbell-bench-press-84' }),
  alt('Machine chest press', 'ماكينة ضغط الصدر', 'ماكينة', { slug: 'lever-chest-press-0t' }),
  alt('Barbell bench press', 'بنش بار مستوي', 'بار'),
  alt('Smith bench press', 'بنش على السميث', 'سميث'),
  alt('Push-ups (weighted)', 'ضغط أرضي (بوزن على الضهر لو سهل)', 'وزن الجسم'),
];

const CHEST_FLY = [
  alt('Pec deck fly', 'فراشة صدر على الماكينة', 'ماكينة', { slug: 'lever-pec-deck-fly-2s' }),
  alt('Cable crossover fly', 'كروس أوفر كابل', 'كابل'),
  alt('Low to high cable fly', 'كروس كابل من تحت لفوق', 'كابل'),
  alt('Dumbbell fly', 'تفتيح دمبل على البنش', 'دمبل', { note: 'متنزلش أوطى من مستوى الكتف' }),
];

const HEAVY_TRICEPS = [
  alt('Close grip bench press', 'بنش قبضة ضيقة', 'بار', { slug: 'close-grip-bench-press-0' }),
  alt('Parallel bar dips', 'متوازي (Dips)', 'وزن الجسم', { note: 'جسمك مفرود عشان التركيز يبقى على الترايسبس' }),
  alt('Smith close grip press', 'ضغط قبضة ضيقة على السميث', 'سميث'),
  alt('Bench dips', 'ديبس على البنش', 'وزن الجسم'),
  alt('Diamond push-ups', 'ضغط دايموند', 'وزن الجسم'),
];

const OVERHEAD_TRICEPS = [
  alt('Cable overhead triceps extension', 'ترايسبس خلف الرأس بالكابل', 'كابل', { slug: 'cable-overhead-triceps-extension--64u' }),
  alt('Seated dumbbell overhead extension', 'ترايسبس خلف الرأس بالدمبل (جالس)', 'دمبل'),
  alt('EZ bar skull crusher', 'سكال كراشر بالبار الزجزاج', 'بار', { note: 'نزّل البار ورا راسك شوية لإطالة أكبر' }),
  alt('Band overhead triceps extension', 'ترايسبس خلف الرأس بالأستك', 'أستك'),
];

const PUSHDOWN = [
  alt('Rope pushdown', 'ترايسبس حبل', 'كابل', { slug: 'cable-pushdown-64b' }),
  alt('Straight bar pushdown', 'ترايسبس بالبار المستقيم', 'كابل'),
  alt('V-bar pushdown', 'ترايسبس بالبار V', 'كابل'),
  alt('Dumbbell kickback', 'كيك باك بالدمبل', 'دمبل'),
  alt('Band triceps pushdown', 'ترايسبس بالأستك', 'أستك'),
];

const STRETCH_CURL = [
  alt('Incline dumbbell curl', 'باي دمبل على بنش مايل', 'دمبل', { slug: 'dumbbell-incline-curl--6i9' }),
  alt('Bayesian cable curl', 'باي بايزيان على الكابل (ضهرك للكابل)', 'كابل'),
  alt('Dumbbell biceps curl', 'باي دمبل واقف', 'دمبل', { slug: 'dumbbell-biceps-curl-6hm' }),
];

const CURL = [
  alt('Dumbbell biceps curl', 'باي دمبل واقف', 'دمبل', { slug: 'dumbbell-biceps-curl-6hm' }),
  alt('EZ bar curl', 'باي بالبار الزجزاج', 'بار'),
  alt('Cable curl (straight bar)', 'باي على الكابل بالبار', 'كابل'),
  alt('Barbell curl', 'باي بالبار المستقيم', 'بار'),
  alt('Band curl', 'باي بالأستك', 'أستك'),
];

const HAMMER = [
  alt('Cable rope hammer curl', 'هامر كيرل بالحبل', 'كابل', { slug: 'cable-hammer-curl-63c' }),
  alt('Dumbbell hammer curl', 'هامر كيرل بالدمبل', 'دمبل'),
  alt('Cross body hammer curl', 'هامر كيرل عرضي', 'دمبل'),
];

const PREACHER = [
  alt('Dumbbell preacher curl', 'باي ارتكاز بالدمبل', 'دمبل', { slug: 'dumbbell-preacher-curl-6js' }),
  alt('Machine preacher curl', 'ماكينة الباي (ارتكاز)', 'ماكينة'),
  alt('EZ bar preacher curl', 'باي ارتكاز بالبار الزجزاج', 'بار'),
  alt('Cable preacher curl', 'باي ارتكاز على الكابل', 'كابل'),
  alt('Concentration curl', 'باي تركيز', 'دمبل'),
];

const LEG_CURL = [
  alt('Seated leg curl', 'رجل خلفي جالس', 'ماكينة', { slug: 'lever-seated-leg-curl-11' }),
  alt('Lying leg curl', 'رجل خلفي نايم', 'ماكينة', { slug: 'lever-lying-leg-curl-0c' }),
  alt('Standing single leg curl', 'رجل خلفي واقف برجل واحدة', 'ماكينة'),
  alt('Cable leg curl (ankle strap)', 'رجل خلفي على الكابل بالحزام', 'كابل'),
  alt('Dumbbell lying leg curl', 'رجل خلفي بالدمبل نايم على البنش', 'دمبل'),
  alt('Nordic hamstring curl', 'نورديك كيرل', 'وزن الجسم', { note: 'صعب جدًا، ابدأ بالنزول البطيء بس' }),
];

const HIP_THRUST = [
  alt('Smith hip thrust', 'هيب ثرست على السميث', 'سميث', { slug: 'smith-hip-thrust-8hx' }),
  alt('Barbell hip thrust', 'هيب ثرست بالبار', 'بار'),
  alt('Hip thrust machine', 'ماكينة الهيب ثرست', 'ماكينة'),
  alt('Dumbbell glute bridge', 'جلوت بريدج بالدمبل', 'دمبل'),
  alt('Cable pull through', 'سحب كابل بين الرجلين', 'كابل'),
];

const SQUAT_PATTERN = [
  alt('Hack squat', 'هاك سكوات', 'ماكينة', { slug: 'sled-hack-squat-1r' }),
  alt('Leg press 45°', 'دفع رجل ٤٥ درجة', 'ماكينة', { slug: 'sled-45-leg-press-1o' }),
  alt('Smith machine squat', 'سكوات على السميث', 'سميث'),
  alt('Barbell back squat', 'سكوات بالبار', 'بار'),
  alt('Pendulum squat', 'بندولم سكوات', 'ماكينة'),
  alt('Goblet squat', 'جوبلت سكوات بالدمبل', 'دمبل'),
  alt('Bulgarian split squat', 'بلغاري سبليت سكوات', 'دمبل'),
];

const ADDUCTOR = [
  alt('Hip adduction machine', 'ماكينة الضامة', 'ماكينة', { slug: 'lever-seated-hip-adduction-10' }),
  alt('Cable hip adduction', 'ضامة على الكابل بالحزام', 'كابل'),
  alt('Dumbbell sumo squat', 'سومو سكوات بالدمبل', 'دمبل'),
  alt('Copenhagen plank', 'كوبنهاجن بلانك', 'وزن الجسم'),
];

const ABDUCTOR = [
  alt('Hip abduction machine', 'ماكينة الفخذ الخارجي', 'ماكينة', { slug: 'lever-seated-hip-abduction-19' }),
  alt('Cable hip abduction', 'فخذ خارجي على الكابل بالحزام', 'كابل'),
  alt('Band seated abduction', 'فتح الرجل بالأستك جالس', 'أستك'),
  alt('Side lying hip abduction', 'رفع الرجل جانبي وانت نايم على جنبك', 'وزن الجسم'),
];

const CALF = [
  alt('Smith calf raise', 'سمانة على السميث', 'سميث', { slug: 'smith-calf-raise-32' }),
  alt('Standing calf raise machine', 'ماكينة السمانة واقف', 'ماكينة'),
  alt('Leg press calf raise', 'سمانة على جهاز الليج برس', 'ماكينة'),
  alt('Seated calf raise', 'سمانة جالس', 'ماكينة'),
  alt('Single leg dumbbell calf raise', 'سمانة برجل واحدة بالدمبل على سلمة', 'دمبل'),
];

const ROTATION = [
  alt('Cable torso rotation', 'لف الجذع على الكابل', 'كابل', { slug: 'cable-twist-6g7' }),
  alt('Pallof press', 'بالوف برس (مقاومة اللف)', 'كابل', { note: 'أأمن على الفقرات من اللف نفسه' }),
  alt('Band woodchopper', 'وود تشوبر بالأستك', 'أستك'),
  alt('Landmine rotation', 'لاندماين روتيشن', 'بار'),
];

const SHOULDER_PRESS = [
  alt('Seated dumbbell shoulder press', 'ضغط كتف دمبل جالس', 'دمبل', { slug: 'dumbbell-seated-shoulder-press-6kp' }),
  alt('Machine shoulder press', 'ماكينة ضغط الكتف', 'ماكينة'),
  alt('Smith shoulder press', 'ضغط كتف على السميث', 'سميث', { note: 'الكوع قدامك ٣٠-٤٥ درجة' }),
  alt('Arnold press', 'أرنولد برس', 'دمبل'),
  alt('Landmine press', 'لاندماين برس', 'بار', { note: 'ألطف بديل على الكتف' }),
];

const PRESS_FROM_FLAT = FLAT_PRESS;

const RDL_PATTERN = [
  alt('Romanian deadlift', 'رومانيان ديدلفت بالبار', 'بار', { slug: 'romanian-deadlift-65' }),
  alt('Dumbbell Romanian deadlift', 'رومانيان ديدلفت بالدمبل', 'دمبل'),
  alt('Smith Romanian deadlift', 'رومانيان ديدلفت على السميث', 'سميث'),
  alt('Cable pull through', 'سحب كابل بين الرجلين', 'كابل', { note: 'أخف بكتير على أسفل الضهر' }),
  alt('45° back extension (hamstring focus)', 'ظهر ٤٥ درجة بتركيز على الخلفيات', 'ماكينة', { slug: '45-degree-hyperextension--6xt' }),
];

const LEG_EXTENSION = [
  alt('Leg extension', 'رجل أمامي', 'ماكينة', { slug: 'lever-leg-extension-0b' }),
  alt('Cable leg extension (ankle strap)', 'رجل أمامي على الكابل بالحزام', 'كابل'),
  alt('Assisted sissy squat', 'سيسي سكوات بمساعدة', 'وزن الجسم'),
  alt('Reverse Nordic', 'ريفرس نورديك', 'وزن الجسم'),
];

const BACK_EXT = [
  alt('45° back extension', 'ظهر ٤٥ درجة', 'ماكينة', { slug: '45-degree-hyperextension--6xt' }),
  alt('Reverse hyperextension', 'ريفرس هايبر', 'ماكينة'),
  alt('Floor superman', 'سوبرمان على الأرض', 'وزن الجسم'),
  alt('Bird dog', 'بيرد دوج', 'وزن الجسم'),
];

const TIBIALIS = [
  alt('Smith toe raise', 'رفع مشط القدم على السميث', 'سميث', { slug: 'smith-toe-raise-3r' }),
  alt('Wall tibialis raise', 'رفع مشط القدم وضهرك على الحيطة', 'وزن الجسم'),
  alt('Dumbbell tibialis raise (seated)', 'رفع مشط القدم بدمبل بين الرجلين جالس', 'دمبل'),
  alt('Band dorsiflexion', 'شد مشط القدم بالأستك', 'أستك'),
];

const WRIST = [
  alt('Dumbbell wrist curl', 'سواعد دمبل', 'دمبل', { slug: 'dumbbell-one-arm-wrist-curl-6jk' }),
  alt('Barbell wrist curl', 'سواعد بالبار', 'بار'),
  alt('Cable wrist curl', 'سواعد على الكابل', 'كابل'),
  alt('Behind the back barbell wrist curl', 'سواعد بالبار من ورا الضهر', 'بار'),
];

const CARDIO = [
  alt('Incline treadmill walk', 'مشي على مشاية مايلة', 'مشاية', { slug: 'walking-on-incline-treadmill-8x5' }),
  alt('Stationary bike', 'عجلة ثابتة', 'عجلة'),
  alt('Elliptical', 'إليبتيكال (أوبتيكال)', 'ماكينة'),
  alt('Outdoor brisk walk', 'مشي سريع برا', 'بدون أدوات'),
];

const MOBILITY = [
  alt('Cat cow', 'كات كاو', 'بدون أدوات', { slug: 'cat-cow-stretch-9l6' }),
  alt('Full body yoga flow', 'يوجا خفيفة للجسم كله', 'بدون أدوات'),
  alt('Foam rolling routine', 'فوم رولر للجسم كله', 'فوم رولر'),
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
  machine_chest_press: PRESS_FROM_FLAT,
  flat_db_press: PRESS_FROM_FLAT,
  pec_deck_fly: CHEST_FLY,
  close_grip_bench: HEAVY_TRICEPS,
  overhead_rope_ext: OVERHEAD_TRICEPS,
  rope_pushdown: PUSHDOWN,
  bayesian_curl: STRETCH_CURL,
  db_curl: CURL,
  hammer_curl: HAMMER,
  preacher_curl: PREACHER,
  seated_leg_curl: LEG_CURL,
  lying_leg_curl: LEG_CURL,
  smith_hip_thrust: HIP_THRUST,
  leg_press: SQUAT_PATTERN,
  hack_squat: SQUAT_PATTERN,
  adductor: ADDUCTOR,
  abductor: ABDUCTOR,
  calf_raise: CALF,
  torso_rotation: ROTATION,
  db_shoulder_press: SHOULDER_PRESS,
  rdl: RDL_PATTERN,
  leg_extension: LEG_EXTENSION,
  back_extension: BACK_EXT,
  tibialis_raise: TIBIALIS,
  wrist_flexion: WRIST,
  treadmill_walk: CARDIO,
  mobility_rest: MOBILITY,
};

/** Alternatives for an exercise, excluding the one that is the exercise itself (same demo clip). */
export function getAlternatives(motion: MotionPattern, ownVideoUrl: string): ExerciseAlternative[] {
  return (ALTERNATIVES_BY_MOTION[motion] || []).filter((a) => a.videoUrl !== ownVideoUrl);
}
