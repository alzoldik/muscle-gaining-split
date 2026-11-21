import React, { useEffect, useState } from 'react';
import { Minus, Pause, Play, Plus, RotateCcw, Timer, X } from 'lucide-react';

interface RestTimerBarProps {
  initialSeconds: number;
  label: string;
  triggerId: number;
  onClose: () => void;
}

export const RestTimerBar: React.FC<RestTimerBarProps> = ({
  initialSeconds,
  label,
  triggerId,
  onClose,
}) => {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [total, setTotal] = useState(initialSeconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setRemaining(initialSeconds);
    setTotal(initialSeconds);
    setRunning(true);
  }, [initialSeconds, triggerId]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const pct = total > 0 ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 0;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[360px] z-50 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-[#141925]/95 backdrop-blur-md shadow-xl overflow-hidden"
    >
      <div className="h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full transition-all duration-300 ${
            remaining === 0 ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="p-3.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Timer className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white">
              {formatted}
            </span>
            {remaining === 0 && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                انتهت الراحة — ابدأ المجموعة
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              setRemaining((r) => Math.max(0, r - 15));
            }}
            aria-label="طرح 15 ثانية"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setRemaining((r) => r + 15);
              setTotal((t) => Math.max(t, remaining + 15));
            }}
            aria-label="إضافة 15 ثانية"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setRunning((v) => !v)}
            aria-label={running ? 'إيقاف المؤقت' : 'تشغيل المؤقت'}
            className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setRemaining(initialSeconds);
              setTotal(initialSeconds);
              setRunning(true);
            }}
            aria-label="إعادة ضبط المؤقت"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق المؤقت"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
