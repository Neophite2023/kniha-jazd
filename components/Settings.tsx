
import React, { useState } from 'react';
import { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave, onBack }) => {
  // Použijeme stringy pre lokálny stav, aby sme predišli problémom s miznutím desatinných bodiek pri písaní
  const [fuelPriceStr, setFuelPriceStr] = useState(settings.fuelPrice.toString());
  const [consumptionStr, setConsumptionStr] = useState(settings.averageConsumption.toString());
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Konverzia späť na čísla pri ukladaní
    const fuelPrice = parseFloat(fuelPriceStr.replace(',', '.'));
    const averageConsumption = parseFloat(consumptionStr.replace(',', '.'));

    if (isNaN(fuelPrice) || isNaN(averageConsumption)) {
      alert('Zadajte platné číselné údaje.');
      return;
    }

    onSave({
      fuelPrice,
      averageConsumption
    });
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Nastavenia auta</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-blue-800 font-medium">Tieto údaje sa použijú na automatický výpočet nákladov každej novej jazdy.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Cena benzínu (€ / Liter)</label>
            <div className="relative">
              <input 
                type="text" 
                inputMode="decimal"
                required
                value={fuelPriceStr}
                onChange={e => setFuelPriceStr(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg font-bold text-slate-800"
                placeholder="Napr. 1.65"
              />
              <span className="absolute left-4 top-4.5 text-slate-400 font-bold pointer-events-none">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Priemerná spotreba (L / 100km)</label>
            <div className="relative">
              <input 
                type="text" 
                inputMode="decimal"
                required
                value={consumptionStr}
                onChange={e => setConsumptionStr(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-lg font-bold text-slate-800"
                placeholder="Napr. 6.5"
              />
              <span className="absolute left-4 top-4.5 text-slate-400 font-bold pointer-events-none">L</span>
            </div>
          </div>

          <button 
            type="submit"
            className={`w-full py-5 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${isSaved ? 'bg-emerald-500 shadow-emerald-100' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
          >
            {isSaved ? (
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                Uložené!
              </span>
            ) : 'Uložiť nastavenia'}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-slate-400 text-sm">
        Kniha Jázd Pro v1.0 • Vaše dáta sú uložené v prehliadači
      </div>
    </div>
  );
};

export default Settings;
