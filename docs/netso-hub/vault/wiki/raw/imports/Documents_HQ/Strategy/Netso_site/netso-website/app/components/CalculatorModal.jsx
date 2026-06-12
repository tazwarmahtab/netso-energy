"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CalculatorModal({ open, onClose }) {
  const [currentBill, setCurrentBill] = useState(5000);
  const [solarCapacity, setSolarCapacity] = useState(5);
  const [savings, setSavings] = useState({
    monthly: 0,
    yearly: 0,
    co2Reduction: 0,
  });

  useEffect(() => {
    // Calculate savings based on inputs
    const monthlySavings = (currentBill * 0.7).toFixed(0); // 70% savings estimate
    const yearlySavings = (monthlySavings * 12).toFixed(0);
    const co2Reduction = (solarCapacity * 1.5).toFixed(1); // Tons per year

    setSavings({
      monthly: monthlySavings,
      yearly: yearlySavings,
      co2Reduction,
    });
  }, [currentBill, solarCapacity]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Savings Calculator</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close calculator"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>
            <p className="mt-1 text-white/60">
              See how much you can save with Netso Solar
            </p>
          </div>

          {/* Calculator Form */}
          <div className="p-6 space-y-6">
            {/* Current Bill Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-white/80">
                  Current Monthly Bill
                </label>
                <span className="text-white font-medium">
                  ৳{currentBill.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={currentBill}
                onChange={(e) => setCurrentBill(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-xs text-white/50">
                <span>৳1,000</span>
                <span>৳20,000+</span>
              </div>
            </div>

            {/* Solar Capacity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-white/80">
                  Solar System Size
                </label>
                <span className="text-white font-medium">
                  {solarCapacity} kW
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={solarCapacity}
                onChange={(e) => setSolarCapacity(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-xs text-white/50">
                <span>1 kW</span>
                <span>20+ kW</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-sm text-white/60">Monthly Savings</p>
                <p className="text-2xl font-bold text-yellow-400">
                  ৳{savings.monthly}
                </p>
                <p className="text-xs text-white/40 mt-1">Up to 70% savings</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-sm text-white/60">Yearly Savings</p>
                <p className="text-2xl font-bold text-yellow-400">
                  ৳{savings.yearly}
                </p>
                <p className="text-xs text-white/40 mt-1">Potential annual savings</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-sm text-white/60">CO₂ Reduction</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {savings.co2Reduction} tons
                </p>
                <p className="text-xs text-white/40 mt-1">Per year</p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full mt-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors duration-300 transform hover:scale-[1.02]">
              Get Your Custom Quote
            </button>

            <p className="text-xs text-center text-white/50 mt-4">
              *Estimates are based on average energy production and consumption patterns.
              Actual savings may vary.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
