import React, { useState } from 'react';
import { Calculator, CheckCircle2, Info } from 'lucide-react';
import { NUTRITION_TIPS } from '../data/workoutData';

type Goal = 'bulk' | 'cut' | 'maintain';
type InjuryFocus = 'none' | 'knee' | 'lower_back' | 'shoulder';

export const NutritionCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(78);
  const [height, setHeight] = useState<number>(176);
  const [age, setAge] = useState<number>(25);
  const [goal, setGoal] = useState<Goal>('bulk');
  const [injury, setInjury] = useState<InjuryFocus>('none');

  // Mifflin-St Jeor estimate with moderate-high training activity (4-5x gym + 20m walk = ~1.55)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const tdee = Math.round(bmr * 1.55);
  const targetCalories =
    goal === 'bulk' ? tdee + 300 : goal === 'cut' ? Math.max(1500, tdee - 400) : tdee;

  const proteinMin = Math.round(weight * 1.6);
  const proteinMax = Math.round(weight * 2.2);
  const waterLiters = ((weight * 38) / 1000).toFixed(1);

  const injuryAdvice: Record<InjuryFocus, { title: string; points: string[] }> = {
    none: {
      title: 'بدون إصابات — نفّذ الجدول المعدّل كما هو',
      points: [
        'التزم بـ RIR 1-2 في التمارين المركبة وRIR 2-3 في الـ RDL',
        'اعمل أسبوع Deload كل ٦-٨ أسابيع بنص المجموعات',
      ],
    },
    knee: {
      title: 'تعديل لحماية الركبة',
      points: [
        'في الـ Hack Squat وLeg Press: ضع القدمين في أعلى/منتصف المنصة واتجه بالركبة في نفس اتجاه أصابع القدم',
        'ابدأ بـ Seated Leg Curl قبل التمارين المركبة لتدفئة مفصل الركبة وتقليل الضغط',
        'ركز على Tibialis Raise يوم ٦ لأنه يقوّي العضلة الأمامية الساندة للركبة',
      ],
    },
    lower_back: {
      title: 'تعديل لحماية أسفل الضهر (الفقرات القطنية L4-L5)',
      points: [
        'أبقِ RDL بـ RIR 2-3 وتوقف فور الإحساس بشد في الهامسترنج بدون تقوّس الضهر',
        'اعتمد على T-Bar وMachine Chest-Supported Row بدل التجديف الحر',
        'نفّذ Cable Torso Rotation ببطء وتحكم من الصدر والحوض، ولا تُهمل إطالة الحوض بعد التمرين',
      ],
    },
    shoulder: {
      title: 'تعديل لحماية الكتف والكفة المدورة (Rotator Cuff)',
      points: [
        'استبدل ضغط السميث بالدمبل مع إمالة الكوع ٣٠-٤٥° للأمام (مطبق بالفعل في يوم ٥)',
        'لا تهمل Band External Rotation في إحماء أيام الجزء العلوي، وFace Pull + Reverse Pec Deck',
        'في Low Incline DB Press استخدم زاوية ١٥° فقط وتجنب النزول المبالغ فيه لو ظهر ألم أمامي',
      ],
    },
  };

  return (
    <section id="nutrition" className="py-12 border-t border-slate-200 dark:border-slate-800/80">
      <div className="mb-8">
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          سادسًا · التغذية والاستشفاء وتخصيص الأرقام
        </p>
        <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          نصايح تغذية وتعافي سريعة
        </h2>
      </div>

      {/* 6 Core Guidelines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {NUTRITION_TIPS.map((tip) => (
          <div
            key={tip.title}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{tip.title}</h3>
              <span className="text-xs font-semibold font-mono-num text-amber-600 dark:text-amber-400 shrink-0">
                {tip.metric}
              </span>
            </div>
            <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {tip.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Personal Calculator */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>احسب أرقامك الشخصية للتغذية وتعديل الإصابات</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              أدخل وزنك وطولك وهدفك وإذا كان لديك إصابة قديمة لعرض الأرقام والتعديلات المناسبة فوراً
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          {/* Inputs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  الوزن (كجم)
                </span>
                <input
                  type="number"
                  min={40}
                  max={200}
                  value={weight}
                  onChange={(e) => setWeight(Math.max(40, Math.min(200, Number(e.target.value) || 70)))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm font-mono-num text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  الطول (سم)
                </span>
                <input
                  type="number"
                  min={130}
                  max={230}
                  value={height}
                  onChange={(e) => setHeight(Math.max(130, Math.min(230, Number(e.target.value) || 175)))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm font-mono-num text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  العمر (سنة)
                </span>
                <input
                  type="number"
                  min={15}
                  max={80}
                  value={age}
                  onChange={(e) => setAge(Math.max(15, Math.min(80, Number(e.target.value) || 25)))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-sm font-mono-num text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
                الهدف الحالي
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bulk' as Goal, label: 'تضخيم صافي' },
                  { id: 'cut' as Goal, label: 'تنشيف وحرق' },
                  { id: 'maintain' as Goal, label: 'ثبات وبناء' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoal(opt.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors min-h-[40px] whitespace-nowrap ${
                      goal === opt.id
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
                هل توجد إصابة سابقة؟
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none' as InjuryFocus, label: 'لا يوجد' },
                  { id: 'knee' as InjuryFocus, label: 'الركبة' },
                  { id: 'lower_back' as InjuryFocus, label: 'أسفل الضهر' },
                  { id: 'shoulder' as InjuryFocus, label: 'الكتف' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setInjury(opt.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors min-h-[40px] whitespace-nowrap ${
                      injury === opt.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculated Outputs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">السعرات المقترحة</div>
                <div className="mt-1 text-lg font-bold font-mono-num text-amber-600 dark:text-amber-400">
                  {targetCalories}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">سعرة / يوم</div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">البروتين اليومي</div>
                <div className="mt-1 text-lg font-bold font-mono-num text-slate-900 dark:text-white">
                  {proteinMin}-{proteinMax}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">جم (٣-٥ وجبات)</div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">احتياج الماء</div>
                <div className="mt-1 text-lg font-bold font-mono-num text-slate-900 dark:text-white">
                  {waterLiters}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">لتر / يوم</div>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">الكرياتين</div>
                <div className="mt-1 text-lg font-bold font-mono-num text-slate-900 dark:text-white">
                  3-5
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">جم يومياً</div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Info className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{injuryAdvice[injury].title}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {injuryAdvice[injury].points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
