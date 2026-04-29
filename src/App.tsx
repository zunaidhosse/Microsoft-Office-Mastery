import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Table, 
  Layout, 
  Mail, 
  Database, 
  BookOpen, 
  Search, 
  ArrowLeft,
  Command,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { officeApps, OfficeApp, Shortcut } from './data/officeApps';
import { cn } from './lib/utils';

const iconMap: Record<string, any> = {
  FileText,
  Table,
  Layout,
  Mail,
  Database,
  BookOpen
};

export default function App() {
  const [selectedApp, setSelectedApp] = useState<OfficeApp | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = useMemo(() => {
    if (!searchQuery) return officeApps;
    return officeApps.filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.nameBn.includes(searchQuery) ||
      app.shortcuts.some(s => 
        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.actionBn.includes(searchQuery) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const filteredShortcuts = useMemo(() => {
    if (!selectedApp) return [];
    if (!searchQuery) return selectedApp.shortcuts;
    return selectedApp.shortcuts.filter(s => 
      s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.actionBn.includes(searchQuery) ||
      s.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedApp, searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setSelectedApp(null); setSearchQuery(''); }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Command size={22} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight text-neutral-900">
                Office Mastery
              </h1>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                অফিস মাস্টার
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search shortcuts..."
              className="w-full bg-neutral-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors">
              <Monitor size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="px-4 pb-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search shortcuts..."
              className="w-full bg-neutral-200 border-none rounded-full py-2 pl-10 pr-4 text-sm outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedApp ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredApps.map((app) => {
                const Icon = iconMap[app.iconName];
                return (
                  <motion.div
                    key={app.id}
                    layoutId={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative"
                  >
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700"
                      style={{ backgroundColor: app.color }}
                    />
                    
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: app.color }}
                    >
                      <Icon size={28} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-neutral-900 mb-1">{app.name}</h2>
                    <h3 className="text-sm font-medium text-neutral-500 mb-4">{app.nameBn}</h3>
                    
                    <p className="text-neutral-600 text-sm mb-6 line-clamp-2">
                       {app.descriptionBn}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        {app.shortcuts.length} Shortcuts
                      </span>
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ArrowLeft className="rotate-180" size={16} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden"
            >
              {/* App Detail Header */}
              <div 
                className="p-8 sm:p-12 text-white relative overflow-hidden"
                style={{ backgroundColor: selectedApp.color }}
              >
                <div className="absolute top-0 right-0 w-96 h-96 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-black/10 rounded-full blur-3xl" />
                
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="mb-8 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all"
                >
                  <ArrowLeft size={18} />
                  <span className="text-sm font-semibold">সব অ্যাপের তালিকা</span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-end gap-6 relative z-10">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center ring-4 ring-white/10 shadow-2xl">
                    {(() => {
                      const Icon = iconMap[selectedApp.iconName];
                      return <Icon size={48} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                      {selectedApp.name}
                    </h2>
                    <p className="text-xl font-medium text-white/80">
                      {selectedApp.nameBn} • {selectedApp.shortcuts.length}টি শর্টকাট
                    </p>
                  </div>
                </div>
              </div>

              {/* Shortcuts Table */}
              <div className="p-4 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 border-l-4 border-blue-600 pl-4">
                    শর্টকাট গাইড
                  </h3>
                  <div className="text-sm text-neutral-500 font-medium">
                    {filteredShortcuts.length} টি ফলাফল দেখাচ্ছে
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredShortcuts.map((sc, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group bg-neutral-50 hover:bg-neutral-100 p-5 rounded-2xl border border-neutral-200 transition-all flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            {sc.category}
                          </span>
                        </div>
                        <p className="text-neutral-900 font-bold text-lg mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                          {sc.actionBn}
                        </p>
                        <p className="text-neutral-500 text-sm font-medium">
                          {sc.action}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end content-start max-w-[140px]">
                        {sc.key.split(' + ').map((k, i) => (
                          <span key={i} className="shortcut-key">
                            {k}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredShortcuts.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full text-neutral-400 mb-4">
                        <Search size={32} />
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900">কোন ফলাফল পাওয়া যায়নি</h4>
                      <p className="text-neutral-500 text-sm">অন্য কোনো নাম দিয়ে সার্চ করে দেখুন</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-top border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">
            Office Mastery © 2026
          </p>
          <p className="text-neutral-500 text-sm max-w-md mx-auto leading-relaxed">
            আপনার অফিসিয়াল কাজকে আরও দ্রুত এবং সহজ করতে এই অ্যাপটি ব্যবহার করুন। নিয়মিত আপডেট পেতে সাথেই থাকুন।
          </p>
        </div>
      </footer>
    </div>
  );
}
