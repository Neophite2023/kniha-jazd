
import React from 'react';
import { Trip } from '../types';

interface TripListProps {
  trips: Trip[];
  onDelete: (id: string) => void;
  onBack: () => void;
}

const TripList: React.FC<TripListProps> = ({ trips, onDelete, onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-400">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-900">História jázd</h2>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400">História je prázdna.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex flex-col items-center justify-center bg-slate-50 p-2 rounded-lg min-w-[70px]">
                    <span className="text-xs font-bold text-slate-400 uppercase">{new Date(trip.date).toLocaleDateString('sk-SK', { month: 'short' })}</span>
                    <span className="text-xl font-black text-slate-700">{new Date(trip.date).getDate()}</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">{trip.distanceKm} km</div>
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {trip.startTime} - {trip.endTime}
                    </div>
                    {trip.note && <div className="mt-1 text-sm italic text-slate-400">{trip.note}</div>}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Cena za jazdu</div>
                    <div className="text-xl font-bold text-emerald-600">{trip.totalCost.toFixed(2)} €</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-sm text-slate-400">Spotreba</div>
                    <div className="font-semibold text-slate-700">{trip.fuelConsumed.toFixed(2)} L</div>
                  </div>
                  <button 
                    onClick={() => onDelete(trip.id)}
                    className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Odstrániť jazdu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  {/* Mobile delete button always visible */}
                  <button 
                    onClick={() => onDelete(trip.id)}
                    className="sm:hidden p-2 text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripList;
