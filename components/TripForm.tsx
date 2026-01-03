
import React, { useState, useEffect } from 'react';
import { Trip, AppSettings, ActiveTrip } from '../types';

interface TripFormProps {
  settings: AppSettings;
  activeTrip: ActiveTrip | null;
  onStart: (trip: ActiveTrip) => void;
  onSave: (trip: Trip) => void;
  onCancel: () => void;
  lastTripEndOdometer: number;
}

const TripForm: React.FC<TripFormProps> = ({ 
  settings, 
  activeTrip, 
  onStart, 
  onSave, 
  onCancel,
  lastTripEndOdometer 
}) => {
  const [odometer, setOdometer] = useState<string>(
    activeTrip ? '' : (lastTripEndOdometer > 0 ? lastTripEndOdometer.toString() : '')
  );
  const [note, setNote] = useState<string>(activeTrip?.note || '');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('sk-SK'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const startVal = parseFloat(odometer);
    if (isNaN(startVal) || startVal < 0) {
      alert('Zadajte platný stav tachometra (nezáporné číslo)');
      return;
    }

    const now = new Date();
    onStart({
      startDate: now.toISOString().split('T')[0],
      startTime: now.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' }),
      startOdometer: startVal,
      note: note,
    });
  };

  const handleEnd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip) return;

    const endVal = parseFloat(odometer);
    if (isNaN(endVal)) {
      alert('Zadajte cieľový stav tachometra');
      return;
    }
    
    if (endVal <= activeTrip.startOdometer) {
      alert(`Stav tachometra v cieli (${endVal} km) musí byť vyšší ako pri štarte (${activeTrip.startOdometer} km)`);
      return;
    }

    const distance = endVal - activeTrip.startOdometer;
    const fuelConsumed = (distance / 100) * settings.averageConsumption;
    const totalCost = fuelConsumed * settings.fuelPrice;
    
    const now = new Date();
    const endTimeStr = now.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' });

    const newTrip: Trip = {
      id: generateId(),
      date: activeTrip.startDate,
      startTime: activeTrip.startTime,
      endTime: endTimeStr,
      distanceKm: parseFloat(distance.toFixed(2)),
      startOdometer: activeTrip.startOdometer,
      endOdometer: endVal,
      fuelPriceAtTime: settings.fuelPrice,
      consumptionAtTime: settings.averageConsumption,
      fuelConsumed: parseFloat(fuelConsumed.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      note: note.trim() || activeTrip.note,
    };

    onSave(newTrip);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {activeTrip ? 'Ukončenie jazdy' : 'Začiatok jazdy'}
        </h2>
        <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${activeTrip ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
          Krok {activeTrip ? '2/2' : '1/2'}
        </div>
      </div>
      
      <div className="mb-8 p-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
        <div className="text-4xl font-black text-slate-800 tabular-nums">{currentTime || '--:--'}</div>
        <div className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-widest">{currentDate || '...'}</div>
      </div>

      {activeTrip && (
        <div className="mb-6 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-xl">
          <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Priebeh jazdy</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-slate-500">Štart:</span>
              <span className="ml-2 font-bold text-slate-700">{activeTrip.startTime}</span>
            </div>
            <div>
              <span className="text-slate-500">Tacho:</span>
              <span className="ml-2 font-bold text-slate-700">{activeTrip.startOdometer} km</span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={activeTrip ? handleEnd : handleStart} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Stav tachometra {activeTrip ? 'v cieli' : 'pri štarte'} (km)
          </label>
          <div className="relative">
            <input 
              type="number" 
              inputMode="decimal"
              step="any"
              required
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              className="w-full pl-4 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-xl font-bold text-slate-800"
              placeholder="Zadajte km..."
            />
            <span className="absolute right-4 top-4.5 text-slate-400 font-bold">km</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Poznámka</label>
          <textarea 
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none resize-none transition-all text-slate-800"
            placeholder="Napr. Smer Bratislava..."
          />
        </div>

        <div className="pt-2 flex flex-col gap-3">
          {activeTrip ? (
            <button 
              type="submit"
              className="w-full py-5 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ukončiť a uložiť jazdu
            </button>
          ) : (
            <button 
              type="submit"
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Začať jazdu teraz
            </button>
          )}
          
          <button 
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-slate-400 font-semibold hover:text-slate-600 transition-colors"
          >
            Zatvoriť
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
