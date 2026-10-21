import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Droplet, Thermometer, Sliders, CheckCircle2 } from 'lucide-react';
import { BREW_METHODS } from '../data/mockCoffeeData';
import { BrewMethod } from '../types/coffee';

interface BrewCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrewCalculator: React.FC<BrewCalculatorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedMethodId, setSelectedMethodId] = useState<string>('v60');
  const activeMethod: BrewMethod = BREW_METHODS.find((m) => m.id === selectedMethodId) || BREW_METHODS[0];

  const [coffeeDose, setCoffeeDose] = useState<number>(activeMethod.defaultDose);
  const [ratio, setRatio] = useState<number>(activeMethod.defaultRatio);

  // Timer states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  // Reset values when switching methods
  const handleSelectMethod = (method: BrewMethod) => {
    setSelectedMethodId(method.id);
    setCoffeeDose(method.defaultDose);
    setRatio(method.defaultRatio);
    setIsRunning(false);
    setSeconds(0);
  };

  const totalWater = Math.round(coffeeDose * ratio);

  // Timer tick effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Determine active step based on accumulated step durations
  let accumulatedTime = 0;
  let activeStepIndex = 0;
  for (let i = 0; i < activeMethod.steps.length; i++) {
    accumulatedTime += activeMethod.steps[i].durationSec;
    if (seconds < accumulatedTime) {
      activeStepIndex = i;
      break;
    }
    if (i === activeMethod.steps.length - 1) {
      activeStepIndex = activeMethod.steps.length - 1;
    }
  }

  const isCompleted = seconds >= accumulatedTime && seconds > 0;

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">
              Sanubari Barista Guide
            </div>
            <h2 className="text-lg font-bold text-[#0f172a] font-serif-luxury">
              Kalkulator Rasio & Timer Seduh Presisi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-[#cbd5e1] text-[#334155] hover:bg-[#dbeafe] transition-colors cursor-pointer"
            aria-label="Tutup kalkulator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Method Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
              Pilih Metode Seduh Kopi:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BREW_METHODS.map((method) => {
                const isActive = method.id === selectedMethodId;
                return (
                  <button
                    key={method.id}
                    onClick={() => handleSelectMethod(method)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0b192c] border-[#0b192c] text-white shadow-sm'
                        : 'bg-white border-[#cbd5e1] text-[#334155] hover:border-[#93c5fd] hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="font-bold text-xs">{method.name}</div>
                    <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-[#93c5fd]' : 'text-[#64748b]'}`}>
                      Rasio 1:{method.defaultRatio}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#475569] italic pt-1">{activeMethod.tagline}</p>
          </div>

          {/* Interactive Sliders: Dose & Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f0f6fc] p-4 rounded-xl border border-[#cbd5e1]">
            
            {/* Coffee Dose Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0f172a]">Takaran Kopi (Dose):</span>
                <span className="font-extrabold text-[#2563eb] text-sm tabular-nums">
                  {coffeeDose} gram
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="1"
                value={coffeeDose}
                onChange={(e) => {
                  setCoffeeDose(Number(e.target.value));
                  setSeconds(0);
                  setIsRunning(false);
                }}
                className="w-full accent-[#2563eb] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748b]">
                <span>10g (Single Cup)</span>
                <span>30g (Sharing)</span>
                <span>60g (Batch)</span>
              </div>
            </div>

            {/* Brew Ratio Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#0f172a]">Rasio Kopi : Air:</span>
                <span className="font-extrabold text-[#2563eb] text-sm tabular-nums">
                  1 : {ratio}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                step="1"
                value={ratio}
                onChange={(e) => {
                  setRatio(Number(e.target.value));
                  setSeconds(0);
                  setIsRunning(false);
                }}
                className="w-full accent-[#2563eb] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748b]">
                <span>1:10 (Cold Brew / Bold)</span>
                <span>1:15 (Standar V60)</span>
                <span>1:18 (Delicate)</span>
              </div>
            </div>

          </div>

          {/* Recipe Computed Summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white border border-[#cbd5e1] text-center shadow-xs">
              <Droplet className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
              <div className="text-[10px] text-[#64748b] uppercase font-bold">Kebutuhan Air</div>
              <div className="text-base font-extrabold text-[#0f172a] tabular-nums">{totalWater} ml</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#cbd5e1] text-center shadow-xs">
              <Thermometer className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
              <div className="text-[10px] text-[#64748b] uppercase font-bold">Suhu Air</div>
              <div className="text-base font-extrabold text-[#0f172a] tabular-nums">{activeMethod.tempC}°C</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#cbd5e1] text-center shadow-xs">
              <Sliders className="w-4 h-4 text-[#2563eb] mx-auto mb-1" />
              <div className="text-[10px] text-[#64748b] uppercase font-bold">Grind Size</div>
              <div className="text-xs font-bold text-[#0f172a] line-clamp-1">{activeMethod.grindGuide.split('(')[0]}</div>
            </div>
          </div>

          {/* Interactive Step-by-Step Timer Container */}
          <div className="bg-[#0b192c] text-white p-5 rounded-2xl shadow-inner space-y-4 border border-blue-900/50">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#38bdf8] font-semibold">
                  Stopwatch & Panduan Tuang
                </span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-white mt-0.5">
                  {formatTimer(seconds)}
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isRunning 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md shadow-blue-900/50'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Jeda
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Mulai Seduh
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsRunning(false);
                    setSeconds(0);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#cbd5e1] transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step list indicator */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              {activeMethod.steps.map((step, idx) => {
                const isCurrent = idx === activeStepIndex && !isCompleted && isRunning;
                const isPast = seconds >= accumulatedTime && idx <= activeStepIndex;
                const targetWaterForStep = step.targetWater(coffeeDose, ratio);

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isCurrent
                        ? 'bg-white/15 border-[#38bdf8] text-white'
                        : isPast
                        ? 'bg-white/5 border-white/10 text-white/60'
                        : 'bg-transparent border-white/5 text-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2">
                        {isPast ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-[#38bdf8] animate-ping' : 'bg-white/20'}`} />
                        )}
                        <span>{step.phase}</span>
                      </div>
                      <div className="text-right text-[#93c5fd] font-mono tabular-nums">
                        Target: {targetWaterForStep} ml
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] text-white/80 leading-snug">
                      {step.instruction}
                    </p>
                  </div>
                );
              })}
            </div>

            {isCompleted && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-xl text-center text-xs text-emerald-200 font-semibold">
                🎉 Seduhan Selesai! Angkat dripper dan aduk kopi perlahan sebelum dinikmati.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
