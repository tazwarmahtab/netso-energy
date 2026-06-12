"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function FinancingCalculatorModal({ open, onClose }) {
  const [monthlyBill, setMonthlyBill] = useState(10000);
  const [systemSize, setSystemSize] = useState(5);
  const [financingOption, setFinancingOption] = useState("upfront");
  
  // Bangladesh-specific calculations
  const electricityRate = 12; // BDT per kWh (average)
  const sunlightHours = 4.5; // Daily average for Bangladesh
  const systemEfficiency = 0.85; // 85% efficiency accounting for losses
  const panelWattage = 550; // Modern solar panel wattage
  
  // Calculations
  const dailyProduction = systemSize * panelWattage * sunlightHours * systemEfficiency / 1000; // kWh
  const monthlyProduction = dailyProduction * 30;
  const monthlySavings = monthlyProduction * electricityRate;
  const yearlySavings = monthlySavings * 12;
  
  // System cost calculations (BDT)
  const costPerWatt = 85; // Average cost in Bangladesh
  const totalSystemCost = systemSize * 1000 * costPerWatt;
  
  // Financing calculations
  let monthlyPayment = 0;
  let totalPayment = totalSystemCost;
  
  if (financingOption === "zeroCAPEX") {
    // Zero CAPEX: Higher total cost, no upfront
    totalPayment = totalSystemCost * 1.8; // 80% premium over 10 years
    monthlyPayment = totalPayment / 120; // 10 years
  } else if (financingOption === "emi") {
    // EMI: 20% down, rest financed
    const downPayment = totalSystemCost * 0.2;
    const financedAmount = totalSystemCost * 0.8;
    const interestRate = 0.09; // 9% annual interest
    const months = 60; // 5 years
    monthlyPayment = (financedAmount * (1 + interestRate * 5)) / months;
    totalPayment = downPayment + (monthlyPayment * months);
  }
  
  // ROI calculations
  const paybackMonths = financingOption === "upfront" 
    ? Math.ceil(totalSystemCost / monthlySavings)
    : Math.ceil((totalPayment - totalPayment * 0.3) / monthlySavings); // Adjusted for financing
  
  const twentyYearSavings = yearlySavings * 20 - totalPayment;
  
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center z-[999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 p-8 rounded-3xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <img
              src="/assets/logo.png"
              alt="Netso Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h2 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
          Solar Savings Calculator
        </h2>

        <div className="space-y-6">
          {/* Monthly Bill Input */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block">
              Monthly Electricity Bill: ৳{monthlyBill.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>৳1,000</span>
              <span>৳50,000</span>
            </div>
          </div>

          {/* System Size Input */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-2 block">
              System Size: {systemSize} kW
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={systemSize}
              onChange={(e) => setSystemSize(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>3 kW</span>
              <span>15 kW</span>
            </div>
          </div>

          {/* Financing Options */}
          <div>
            <label className="text-white/80 text-sm font-medium mb-3 block">
              Financing Option
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "upfront", label: "Upfront", desc: "Best ROI" },
                { value: "emi", label: "EMI", desc: "20% down" },
                { value: "zeroCAPEX", label: "Zero CAPEX", desc: "No down" }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFinancingOption(option.value)}
                  className={`p-3 rounded-xl border transition-all ${
                    financingOption === option.value
                      ? "bg-white/20 border-white/40 text-white"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                  }`}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs opacity-70">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-white/5 rounded-xl p-6 space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Your Solar Results</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Monthly Production</div>
                <div className="text-white font-semibold">{monthlyProduction.toFixed(0)} kWh</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Monthly Savings</div>
                <div className="text-green-400 font-semibold">৳{monthlySavings.toLocaleString()}</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Yearly Savings</div>
                <div className="text-green-400 font-semibold">৳{yearlySavings.toLocaleString()}</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white/60 text-xs mb-1">Payback Period</div>
                <div className="text-white font-semibold">{paybackMonths} months</div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60">System Cost:</span>
                <span className="text-white">৳{totalSystemCost.toLocaleString()}</span>
              </div>
              
              {financingOption !== "upfront" && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60">Monthly Payment:</span>
                  <span className="text-white">৳{monthlyPayment.toFixed(0).toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-white/60">20-Year Savings:</span>
                <span className="text-green-400 font-semibold text-lg">
                  ৳{twentyYearSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="text-green-400 text-sm font-medium mb-1">
              🌟 Environmental Impact
            </div>
            <div className="text-white/80 text-sm">
              Your {systemSize}kW system will reduce {((monthlyProduction * 12 * 0.5) / 1000).toFixed(1)} tons of CO₂ annually
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-full bg-white/20 border border-white/40 text-white font-medium hover:bg-white/30 transition"
        >
          Close Calculator
        </button>
      </motion.div>
    </motion.div>
  );
}
