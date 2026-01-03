
import React from 'react';
import { Trip, HistoryStats, ActiveTrip } from '../types';

interface DashboardProps {
  stats: HistoryStats;
  recentTrips: Trip[];
  activeTrip: ActiveTrip | null;
  onViewAll: () => void;
  onAddTrip: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  stats, 
  recentTrips, 
  activeTrip,
  onViewAll, 
  onAddTrip
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Active Trip Banner */}
      {activeTrip && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-orange-900 leading-tight">Jazda prebieha...</div>
              <div className="text-sm text-orange-700">Začiatok: {activeTrip.startTime} • Tachometer: {activeTrip.startOdometer} km</div>
            </div>
          </div>
          <button 
            onClick={onAddTrip}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl font-bold shadow-sm hover:bg-orange-700 transition-colors"
          >
            Ukončiť
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 text-sm font-medium">Celkom km</span>
          <span className="text-2xl font-bold text-slate-900">{stats.totalDistance.toLocaleString()} km</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 text-sm font-medium">Celkové náklady</span>
          <span className="text-2xl font-bold text-emerald-600">{stats.totalCost.toFixed(2)} €</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 text-sm font-medium">Spotrebované</span>
          <span className="text-2xl font-bold text-blue-600">{stats.totalFuel.toFixed(1)} L</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <span className="text-slate-500 text-sm font-medium">Priemer / jazda</span>
          <span className="text-2xl font-bold text-slate-900">{stats.averageTripDistance.toFixed(1)} km</span>
        </div>
      </div>

      {/* Recent Trips Header */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-bold text-slate-800">Posledné jazdy</h3>
        <button onClick={onViewAll} className="text-blue-600 text-sm font-semibold hover:underline">Zobraziť všetky</button>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {recentTrips.length > 0 ? (
          recentTrips.map(trip => (
            <div key={trip.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900">{trip.distanceKm} km</div>
                  <div className="text-sm text-slate-500">{new Date(trip.date).toLocaleDateString('sk-SK')} • {trip.startTime} - {trip.endTime}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-600">-{trip.totalCost.toFixed(2)} €</div>
                <div className="text-xs text-slate-400">{trip.fuelConsumed.toFixed(2)} L spotrebované</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 mb-4">Zatiaľ ste nezaznamenali žiadne jazdy.</p>
            <button 
              onClick={onAddTrip}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Začať prvú jazdu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
