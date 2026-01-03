
import React from 'react';
import { Trip } from '../types';

interface TripListProps {
  trips: Trip[];
  onDelete: (id: string) => void;
  onBack: () => void;
}

const TripList: React.FC<TripListProps> = ({ trips, onDelete, onBack }) => {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation(); // Zabráni prebublávaniu eventu
    onDelete(id);
  };

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
                  <div className="hidden sm:flex flex-col items-center justify-center bg-slate-50 p-2 rounded-lg min-w-[70px] border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase">{new Date(trip.date).toLocaleDateString('sk-SK', { month: 'short' })}</span>
                    <span className="text-xl font-black text-slate-700">{new Date(trip.date).getDate()}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-lg font-bold text-slate-900">{trip.distanceKm} km</div>
                    
                    <div className="text-sm text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(trip.date).toLocaleDateString('sk-SK')}
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {trip.startTime} - {trip.endTime}
                      </div>
                    </div>

                    <div className="mt-2 text-xs font-medium text-slate-400 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                      <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{trip.startOdometer} km</span>
                      <span className="text-slate-300">➔</span>
                      <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{trip.endOdometer} km</span>
                    </div>
                    {trip.note && <div className="mt-2 p-2 bg-slate-50 rounded-lg text-sm italic text-slate-600 border-l-2 border-slate-200">{trip.note}</div>}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Cena</div>
                    <div className="text-xl font-bold text-emerald-600">{trip.totalCost.toFixed(2)} €</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400 uppercase font-semibold">Palivo</div>
                    <div className="font-semibold text-slate-700">{trip.fuelConsumed.toFixed(2)} L</div>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => handleDelete(e, trip.id)}
                    className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center justify-center border border-red-100 active:scale-90"
                    title="Odstrániť jazdu"
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
