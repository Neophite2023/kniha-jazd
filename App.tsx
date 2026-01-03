
import React, { useState, useEffect, useMemo } from 'react';
import { Trip, AppSettings, HistoryStats } from './types';
import { getDrivingInsights } from './services/geminiService';
import TripForm from './components/TripForm';
import TripList from './components/TripList';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';

const STORAGE_KEY_TRIPS = 'kniha_jazd_trips_v1';
const STORAGE_KEY_SETTINGS = 'kniha_jazd_settings_v1';

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    fuelPrice: 1.65,
    averageConsumption: 6.5,
  });
  const [view, setView] = useState<'dashboard' | 'add' | 'history' | 'settings'>('dashboard');
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  // Load data from LocalStorage
  useEffect(() => {
    const storedTrips = localStorage.getItem(STORAGE_KEY_TRIPS);
    const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
    
    if (storedTrips) setTrips(JSON.parse(storedTrips));
    if (storedSettings) setSettings(JSON.parse(storedSettings));
  }, []);

  // Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const stats: HistoryStats = useMemo(() => {
    const totalDistance = trips.reduce((acc, t) => acc + t.distanceKm, 0);
    const totalCost = trips.reduce((acc, t) => acc + t.totalCost, 0);
    const totalFuel = trips.reduce((acc, t) => acc + t.fuelConsumed, 0);
    return {
      totalDistance,
      totalCost,
      totalFuel,
      averageTripDistance: trips.length > 0 ? totalDistance / trips.length : 0,
    };
  }, [trips]);

  const handleAddTrip = (newTrip: Trip) => {
    setTrips(prev => [newTrip, ...prev]);
    setView('dashboard');
  };

  const handleDeleteTrip = (id: string) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  };

  const handleFetchInsight = async () => {
    setIsInsightLoading(true);
    const insight = await getDrivingInsights(trips, settings);
    setAiInsight(insight);
    setIsInsightLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Kniha Jázd Pro
          </h1>
          <button 
            onClick={() => setView('settings')}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6 mb-20">
        {view === 'dashboard' && (
          <Dashboard 
            stats={stats} 
            recentTrips={trips.slice(0, 3)} 
            onViewAll={() => setView('history')}
            onAddTrip={() => setView('add')}
            aiInsight={aiInsight}
            onFetchInsight={handleFetchInsight}
            isInsightLoading={isInsightLoading}
          />
        )}
        {view === 'add' && (
          <TripForm 
            settings={settings} 
            onSave={handleAddTrip} 
            onCancel={() => setView('dashboard')} 
          />
        )}
        {view === 'history' && (
          <TripList 
            trips={trips} 
            onDelete={handleDeleteTrip} 
            onBack={() => setView('dashboard')}
          />
        )}
        {view === 'settings' && (
          <Settings 
            settings={settings} 
            onSave={setSettings} 
            onBack={() => setView('dashboard')}
          />
        )}
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 flex justify-around items-center shadow-lg md:hidden">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center ${view === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-xs mt-1">Domov</span>
        </button>
        <button onClick={() => setView('add')} className={`flex flex-col items-center p-3 bg-blue-600 rounded-full -mt-10 border-4 border-slate-50 shadow-blue-200 shadow-xl text-white`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
        <button onClick={() => setView('history')} className={`flex flex-col items-center ${view === 'history' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-xs mt-1">História</span>
        </button>
      </nav>

      {/* Desktop Quick Nav Hint */}
      <div className="hidden md:flex fixed right-8 bottom-8 flex-col gap-4">
        {view !== 'add' && (
          <button 
            onClick={() => setView('add')}
            className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95"
            title="Pridať jazdu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
