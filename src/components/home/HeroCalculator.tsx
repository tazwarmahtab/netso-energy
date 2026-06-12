import React, { useState } from 'react';
import { 
  Sun, 
  Battery, 
  DollarSign, 
  TrendingUp, 
  ArrowRight, 
  Calculator
} from 'lucide-react';
import { useLanguage } from '../../lib/i18n';
import { useSiteCopy } from '../../lib/site-copy';

export function HeroCalculator() {
  const { language } = useLanguage();
  const copy = useSiteCopy();
  
  // Calculator State
  const [monthlyBill, setMonthlyBill] = useState(8000); // in BDT
  const [solarProductionRatio, setSolarProductionRatio] = useState(0.85); // 85% default
  
  // Coefficients
  const averageSavingsRate = 0.88; // Netso saves 88% on utility bills
  const avgSunHours = 4.5;
  const carbonOffsetFactor = 0.62; // kg CO2 saved per kWh (Dhaka yield)

  // Calculated Metrics
  const systemSize = (monthlyBill / 1200) * 1.2; // roughly 1.2kW per 1200 BDT bill
  const estimatedCost = systemSize * 85000; // 85,000 BDT per kW
  const incentives = estimatedCost * 0.10; // 10% average incentive/subsidy
  const netCost = estimatedCost - incentives;

  // Monthly Savings: (monthlyBill * solarProductionRatio * averageSavingsRate)
  const monthlySavings = monthlyBill * solarProductionRatio * averageSavingsRate;

  // ROI calculation: (estimatedCost - incentives) / (monthlySavings * 12)
  const paybackYears = netCost / (monthlySavings * 12);

  // Carbon offset calculation: (systemSize * avgSunHours * 365 * carbonOffsetFactor)
  const annualCarbonOffset = systemSize * avgSunHours * 365 * carbonOffsetFactor;
  const equivalentTrees = annualCarbonOffset / 22; // 1 tree absorbs ~22kg CO2 per year

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-[#DCD6CD] bg-[#F5F2EB]/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      {/* Subtle glowing design accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-primary/8 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#1F1914] font-aeonik">
                {language === 'en' ? 'Solar Savings Calculator' : 'সোলার সাশ্রয় ক্যালকুলেটর'}
              </h3>
            </div>
            <p className="text-sm text-[#5C544D]">
              {language === 'en' 
                ? 'Estimate your system capacity, investment and savings instantly.' 
                : 'আপনার সিস্টেমের সক্ষমতা, বিনিয়োগ এবং সাশ্রয় তাৎক্ষণিকভাবে হিসেব করুন।'}
            </p>
          </div>

          {/* Input: Monthly Bill */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="monthly-bill-range" className="text-sm font-medium text-[#1F1914]">
                {language === 'en' ? 'Current Monthly Electricity Bill' : 'বর্তমান মাসিক বিদ্যুৎ বিল'}
              </label>
              <span className="text-base font-bold text-primary font-mono">
                ৳{monthlyBill.toLocaleString()}
              </span>
            </div>
            <input 
              id="monthly-bill-range"
              type="range" 
              min="2000" 
              max="50000" 
              step="1000"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#E6E1D8] accent-primary"
            />
            <div className="flex justify-between text-xs text-[#8C837A] font-mono">
              <span>৳2,000</span>
              <span>৳50,000</span>
            </div>
          </div>

          {/* Input: Solar Production Ratio */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="solar-ratio-range" className="text-sm font-medium text-[#1F1914]">
                {language === 'en' ? 'Target Energy Coverage' : 'টার্গেট এনার্জি কাভারেজ'}
              </label>
              <span className="text-base font-bold text-primary font-mono">
                {Math.round(solarProductionRatio * 100)}%
              </span>
            </div>
            <input 
              id="solar-ratio-range"
              type="range" 
              min="0.5" 
              max="1.0" 
              step="0.05"
              value={solarProductionRatio}
              onChange={(e) => setSolarProductionRatio(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#E6E1D8] accent-primary"
            />
            <div className="flex justify-between text-xs text-[#8C837A] font-mono">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl border border-[#DCD6CD] p-6 space-y-6 shadow-sm">
          <h4 className="text-sm font-bold text-[#8C837A] tracking-wider uppercase">
            {language === 'en' ? 'Estimated Results' : 'অনুমিত ফলাফল'}
          </h4>

          <div className="space-y-4">
            {/* Output: System Size */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
              <div className="flex items-center gap-2 text-sm text-[#5C544D]">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{language === 'en' ? 'Required System Size' : 'প্রয়োজনীয় সিস্টেম সাইজ'}</span>
              </div>
              <span className="text-lg font-bold text-[#1F1914] font-mono">
                {systemSize.toFixed(1)} kWp
              </span>
            </div>

            {/* Output: Cost */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
              <div className="flex items-center gap-2 text-sm text-[#5C544D]">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{language === 'en' ? 'Est. Net Investment' : 'অনুমিত নিট বিনিয়োগ'}</span>
              </div>
              <span className="text-lg font-bold text-[#1F1914] font-mono">
                ৳{netCost.toLocaleString(undefined, {maximumFractionDigits: 0})}
              </span>
            </div>

            {/* Output: Monthly Savings */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
              <div className="flex items-center gap-2 text-sm text-[#5C544D]">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>{language === 'en' ? 'Est. Monthly Savings' : 'অনুমিত মাসিক সাশ্রয়'}</span>
              </div>
              <span className="text-lg font-bold text-primary font-mono">
                ৳{monthlySavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
              </span>
            </div>

            {/* Output: ROI */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D8]">
              <div className="flex items-center gap-2 text-sm text-[#5C544D]">
                <Battery className="w-4 h-4 text-[#8C837A]" />
                <span>{language === 'en' ? 'Payback Period (ROI)' : 'বিনিয়োগ উঠে আসার সময়'}</span>
              </div>
              <span className="text-lg font-bold text-[#1F1914] font-mono">
                {paybackYears.toFixed(1)} {language === 'en' ? 'Years' : 'বছর'}
              </span>
            </div>

            {/* Output: Carbon Offset */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-sm text-[#5C544D]">
                <span className="text-base" role="img" aria-label="tree">🌱</span>
                <span>{language === 'en' ? 'Est. Carbon Offset' : 'অনুমিত কার্বন সাশ্রয়'}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-emerald-600 font-mono block">
                  {Math.round(annualCarbonOffset).toLocaleString()} kg/yr
                </span>
                <span className="text-xs text-[#8C837A] font-medium block">
                  {language === 'en' 
                    ? `≈ ${Math.round(equivalentTrees)} trees planted` 
                    : `≈ ${Math.round(equivalentTrees)}টি গাছ রোপণ`}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
            <span>{language === 'en' ? 'Book Feasibility Assessment' : 'ফিজিবিলিটি অ্যাসেসমেন্ট বুক করুন'}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
