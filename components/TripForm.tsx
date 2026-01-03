
import React, { useState } from 'react';
import { Trip, AppSettings } from '../types';

interface TripFormProps {
  settings: AppSettings;
  onSave: (trip: Trip) => void;
  onCancel: () => void;
}

const TripForm: React.FC<TripFormProps> = ({ settings, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '08:30',
    distanceKm: '',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const distance = parseFloat(formData.distanceKm);
    if (isNaN(distance) || distance <= 0) return alert('Zadajte platnú vzdialenosť');

    const fuelConsumed = (distance / 100) * settings.averageConsumption;
    const totalCost = fuelConsumed * settings.fuelPrice;

    const newTrip: Trip = {
      id: crypto.randomUUID(),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      distanceKm: distance,
      fuelPriceAtTime: settings.fuelPrice,
      consumptionAtTime: settings.averageConsumption,
      fuelConsumed,
      totalCost,
      note: formData.note,
    };

    onSave(newTrip);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Nová jazda</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Dátum</label>
          <input 
            type="date" 
            required
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Čas štartu</label>
            <input 
              type="time" 
              required
              value={formData.startTime}
              onChange={e => setFormData({...formData, startTime: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Čas konca</label>
            <input 
              type="time" 
              required
              value={formData.endTime}
              onChange={e => setFormData({...formData, endTime: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Ubehnuté kilometre (km)</label>
          <input 
            type="number" 
            step="0.1"
            placeholder="Napr. 15.5"
            required
            value={formData.distanceKm}
            onChange={e => setFormData({...formData, distanceKm: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Poznámka (voliteľné)</label>
          <textarea 
            rows={2}
            placeholder="Napr. Služobná cesta do BA"
            value={formData.note}
            onChange={e => setFormData({...formData, note: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
          >
            Uložiť jazdu
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-slate-500 font-semibold hover:text-slate-700 transition-colors"
          >
            Zrušiť
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
