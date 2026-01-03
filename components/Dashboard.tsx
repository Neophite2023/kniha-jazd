
import React from 'react';
import { Trip, HistoryStats } from '../types';

interface DashboardProps {
  stats: HistoryStats;
  recentTrips: Trip[];
  onViewAll: () => void;
  onAddTrip: () => void;
  aiInsight: string;
  onFetchInsight: () => void;
  isInsightLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  stats, 
  recentTrips, 
  onViewAll, 
  onAddTrip, 
  aiInsight, 
  onFetchInsight, 
  isInsightLoading 
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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

      {/* AI Insight Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-lg font-semibold uppercase tracking-wider">AI Analýza jázd</h3>
          </div>
          <button 
            onClick={onFetchInsight} 
            disabled={isInsightLoading}
            className={`px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium transition-all flex items-center gap-2 ${isInsightLoading ? 'opacity-50' : ''}`}
          >
            {isInsightLoading ? (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : null}
            {aiInsight ? 'Aktualizovať' : 'Analyzovať jazdy'}
          </button>
        </div>
        <p className="text-indigo-100 leading-relaxed italic">
          {aiInsight || "Nechajte umelú inteligenciu zanalyzovať váš štýl jazdy a náklady. Stačí kliknúť na tlačidlo vyššie."}
        </p>
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
              Pridať prvú jazdu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
