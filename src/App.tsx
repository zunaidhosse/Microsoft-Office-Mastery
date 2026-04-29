import { useState, useMemo, useEffect, FormEvent } from 'react';
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
  Monitor,
  Menu,
  Info,
  ExternalLink,
  Share2,
  X,
  Globe,
  LifeBuoy,
  StickyNote,
  Plus,
  Trash2,
  Settings
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
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

type Language = 'en' | 'bn' | 'ar';

export default function App() {
  const [selectedApp, setSelectedApp] = useState<OfficeApp | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<Language>('bn');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [showCustomShortcuts, setShowCustomShortcuts] = useState(false);
  const [customShortcuts, setCustomShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('office_mastery_custom');
    return saved ? JSON.parse(saved) : [];
  });
  const [newShortcut, setNewShortcut] = useState({ key: '', action: '', category: 'General' });

  useEffect(() => {
    localStorage.setItem('office_mastery_custom', JSON.stringify(customShortcuts));
  }, [customShortcuts]);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('office_mastery_install_dismissed');
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!hasSeenPopup) {
        setShowInstallPopup(true);
      }
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPopup(false);
      }
    }
  };

  const dismissInstall = () => {
    setShowInstallPopup(false);
    localStorage.setItem('office_mastery_install_dismissed', 'true');
  };

  const handleAddCustom = (e: FormEvent) => {
    e.preventDefault();
    if (!newShortcut.key || !newShortcut.action) return;
    const sc: Shortcut = {
      key: newShortcut.key,
      action: newShortcut.action,
      actionBn: newShortcut.action,
      actionAr: newShortcut.action,
      category: newShortcut.category as any
    };
    setCustomShortcuts([sc, ...customShortcuts]);
    setNewShortcut({ key: '', action: '', category: 'General' });
  };

  const handleDeleteCustom = (idx: number) => {
    setCustomShortcuts(customShortcuts.filter((_, i) => i !== idx));
  };

  const t = {
    en: {
      title: 'Office Mastery',
      subtitle: 'Complete Office Shortcuts',
      search: 'Search shortcuts...',
      shortcuts: 'Shortcuts',
      back: 'Back to Apps',
      guide: 'Shortcut Guide',
      results: 'results showing',
      noResults: 'No results found',
      tryAnother: 'Try searching with another name',
      copyright: 'Office Mastery © 2026',
      footerDesc: 'Use this app to make your office work faster and easier. Stay tuned for regular updates.',
      menu: {
        lang: 'Change Language',
        help: 'Help Line',
        share: 'Share App',
        install: 'Install Application',
        myShortcuts: 'My Shortcuts'
      },
      installPopup: {
        title: 'Install Office Mastery',
        desc: 'Install this app on your device for a faster, offline experience and easy access.',
        btn: 'Download & Install',
        later: 'Maybe Later'
      },
      custom: {
        addTitle: 'Add New Shortcut',
        keyLabel: 'Key (e.g. Ctrl + T)',
        actionLabel: 'Action Description',
        categoryLabel: 'Category',
        saveBtn: 'Save Shortcut',
        noCustom: 'No custom shortcuts yet',
        delete: 'Delete'
      },
      shareTitle: 'Scan to Share',
      close: 'Close'
    },
    bn: {
      title: 'Office Mastery',
      subtitle: 'অফিস মাস্টার',
      search: 'শর্টকাট খুঁজুন...',
      shortcuts: 'শর্টকাট',
      back: 'সব অ্যাপের তালিকা',
      guide: 'শর্টকাট গাইড',
      results: 'টি ফলাফল দেখাচ্ছে',
      noResults: 'কোন ফলাফল পাওয়া যায়নি',
      tryAnother: 'অন্য কোনো নাম দিয়ে সার্চ করে দেখুন',
      copyright: 'Office Mastery © 2026',
      footerDesc: 'আপনার অফিসিয়াল কাজকে আরও দ্রুত এবং সহজ করতে এই অ্যাপটি ব্যবহার করুন। নিয়মিত আপডেট পেতে সাথেই থাকুন।',
      menu: {
        lang: 'ভাষা পরিবর্তন করুন',
        help: 'হেল্প লাইন',
        share: 'অ্যাপ শেয়ার করুন',
        install: 'অ্যাপ ইন্সটল করুন',
        myShortcuts: 'আমার শর্টকাট'
      },
      installPopup: {
        title: 'অফিস মাস্টার ইনস্টল করুন',
        desc: 'দ্রুত এবং অফলাইন ব্যবহারের জন্য অ্যাপটি আপনার ফোনে ইনস্টল করুন।',
        btn: 'ডাউনলোড এবং ইনস্টল',
        later: 'পরে করব'
      },
      custom: {
        addTitle: 'নতুন শর্টকাট যোগ করুন',
        keyLabel: 'কি (যেমনঃ Ctrl + T)',
        actionLabel: 'কাজ বর্ণনা করুন',
        categoryLabel: 'ক্যাটাগরি',
        saveBtn: 'সেভ করুন',
        noCustom: 'এখনও কোনো শর্টকাট যোগ করা হয়নি',
        delete: 'মুছে ফেলুন'
      },
      shareTitle: 'শেয়ার করতে স্ক্যান করুন',
      close: 'বন্ধ করুন'
    },
    ar: {
      title: 'إتقان المكتب',
      subtitle: 'اختصارات المكتب الكاملة',
      search: 'البحث عن الاختصارات...',
      shortcuts: 'اختصارات',
      back: 'العودة إلى التطبيقات',
      guide: 'دليل الاختصار',
      results: 'النتائج تظهر',
      noResults: 'لم يتم العثور على نتائج',
      tryAnother: 'حاول البحث باسم آخر',
      copyright: 'Office Mastery © 2026',
      footerDesc: 'استخدم هذا التطبيق لجعل عملك المكتبي أسرع وأسهل. ابقوا متابعين للتحديثات المنتظمة.',
      menu: {
        lang: 'تغيير اللغة',
        help: 'خط المساعدة',
        share: 'شارك التطبيق',
        install: 'تثبيت التطبيق',
        myShortcuts: 'اختصاراتي'
      },
      installPopup: {
        title: 'تثبيت অফিস মাস্টার',
        desc: 'قم بتثبيت هذا التطبيق على جهازك للحصول على تجربة أسرع للوصول السهل.',
        btn: 'تنزيل وتثبيت',
        later: 'ربما لاحقا'
      },
      custom: {
        addTitle: 'إضافة اختصار جديد',
        keyLabel: 'المفتاح (مثلاً Ctrl + T)',
        actionLabel: 'وصف الإجراء',
        categoryLabel: 'الفئة',
        saveBtn: 'حفظ الاختصار',
        noCustom: 'لا توجد اختصارات مخصصة بعد',
        delete: 'حذف'
      },
      shareTitle: 'مسح للمشاركة',
      close: 'إغلاق'
    }
  }[language];

  const filteredApps = useMemo(() => {
    if (!searchQuery) return officeApps;
    return officeApps.filter(app => {
      const matchName = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        app.nameBn.includes(searchQuery) ||
                        app.nameAr.includes(searchQuery);
      const matchShortcuts = app.shortcuts.some(s => 
        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.actionBn.includes(searchQuery) ||
        s.actionAr.includes(searchQuery) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchName || matchShortcuts;
    });
  }, [searchQuery]);

  const filteredShortcuts = useMemo(() => {
    if (showCustomShortcuts) {
      if (!searchQuery) return customShortcuts;
      return customShortcuts.filter(s => 
        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (!selectedApp) return [];
    if (!searchQuery) return selectedApp.shortcuts;
    return selectedApp.shortcuts.filter(s => 
      s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.actionBn.includes(searchQuery) ||
      s.actionAr.includes(searchQuery) ||
      s.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedApp, searchQuery]);

  const getAppName = (app: OfficeApp) => {
    if (language === 'bn') return app.nameBn;
    if (language === 'ar') return app.nameAr;
    return app.name;
  };

  const getAppDesc = (app: OfficeApp) => {
    if (language === 'bn') return app.descriptionBn;
    if (language === 'ar') return app.descriptionAr;
    return app.description;
  };

  const getShortcutAction = (sc: Shortcut) => {
    if (language === 'bn') return sc.actionBn;
    if (language === 'ar') return sc.actionAr;
    return sc.action;
  };

  return (
    <div className={cn("min-h-screen bg-neutral-100 flex flex-col font-sans", language === 'ar' && "rtl")}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Menu Drawer Button */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
                title="Menu"
              >
                <Menu size={22} />
              </button>
            </div>

            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { setSelectedApp(null); setShowCustomShortcuts(false); setSearchQuery(''); }}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Command size={22} />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg leading-tight tracking-tight text-neutral-900">
                  {t.title}
                </h1>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-neutral-400", language === 'ar' ? 'right-3' : 'left-3')} size={18} />
            <input 
              type="text"
              placeholder={t.search}
              className={cn(
                "w-full bg-neutral-100 border-none rounded-full py-2 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none",
                language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'
              )}
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
            <Search className={cn("absolute top-1/2 -translate-y-1/2 text-neutral-400", language === 'ar' ? 'right-3' : 'left-3')} size={18} />
            <input 
              type="text"
              placeholder={t.search}
              className={cn(
                "w-full bg-neutral-200 border-none rounded-full py-2 pr-4 text-sm outline-none",
                language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedApp && !showCustomShortcuts ? (
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
                      className={cn(
                        "absolute top-0 w-32 h-32 -mt-16 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700",
                        language === 'ar' ? '-left-16 ml-0' : '-right-16 mr-0'
                      )}
                      style={{ backgroundColor: app.color }}
                    />
                    
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: app.color }}
                    >
                      <Icon size={28} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-neutral-900 mb-1">{language === 'en' ? app.name : getAppName(app)}</h2>
                    <h3 className="text-sm font-medium text-neutral-500 mb-4">{language === 'en' ? app.nameBn : app.name}</h3>
                    
                    <p className="text-neutral-600 text-sm mb-6 line-clamp-2">
                       {getAppDesc(app)}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        {app.shortcuts.length} {t.shortcuts}
                      </span>
                      <div className={cn(
                        "w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors",
                        language === 'ar' && "rotate-180"
                      )}>
                        <ArrowLeft className="rotate-180" size={16} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* My Shortcuts Entry Card */}
              <motion.div
                onClick={() => setShowCustomShortcuts(true)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg bg-green-600 group-hover:scale-110 transition-transform">
                  <StickyNote size={28} />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{t.menu.myShortcuts}</h2>
                <h3 className="text-sm font-medium text-neutral-500 mb-4">{t.shortcuts}</h3>
                <p className="text-neutral-600 text-sm mb-6 line-clamp-2">
                  {t.custom.noCustom}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {customShortcuts.length} {t.shortcuts}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Plus size={16} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : selectedApp ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden"
            >
              {/* App Detail Header */}
              <div 
                className={cn("p-8 sm:p-12 text-white relative overflow-hidden", language === 'ar' && "text-right")}
                style={{ backgroundColor: selectedApp.color }}
              >
                <div className="absolute top-0 right-0 w-96 h-96 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-black/10 rounded-full blur-3xl" />
                
                <button 
                  onClick={() => setSelectedApp(null)}
                  className={cn(
                    "mb-8 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all w-fit",
                    language === 'ar' && "flex-row-reverse"
                  )}
                >
                  <ArrowLeft size={18} className={cn(language === 'ar' && "rotate-180")} />
                  <span className="text-sm font-semibold">{t.back}</span>
                </button>

                <div className={cn("flex flex-col sm:flex-row gap-6 relative z-10", language === 'ar' ? 'sm:flex-row-reverse sm:items-end' : 'sm:items-end')}>
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center ring-4 ring-white/10 shadow-2xl">
                    {(() => {
                      const Icon = iconMap[selectedApp.iconName];
                      return <Icon size={48} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                       {language === 'en' ? selectedApp.name : getAppName(selectedApp)}
                    </h2>
                    <p className="text-xl font-medium text-white/80">
                      {language === 'en' ? selectedApp.nameBn : selectedApp.name} • {selectedApp.shortcuts.length} {t.shortcuts}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shortcuts Table */}
              <div className="p-4 sm:p-8">
                <div className={cn("flex items-center justify-between mb-8", language === 'ar' && "flex-row-reverse")}>
                  <h3 className={cn("text-xl font-bold text-neutral-900 pl-4", language === 'ar' ? 'pr-4 pl-0 border-r-4 border-blue-600' : 'border-l-4 border-blue-600')}>
                    {t.guide}
                  </h3>
                  <div className="text-sm text-neutral-500 font-medium">
                    {filteredShortcuts.length} {t.results}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredShortcuts.map((sc, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        "group bg-neutral-50 hover:bg-neutral-100 p-5 rounded-2xl border border-neutral-200 transition-all flex items-start justify-between gap-4",
                        language === 'ar' && "flex-row-reverse text-right"
                      )}
                    >
                      <div className="flex-1">
                        <div className={cn("flex items-center gap-2 mb-1", language === 'ar' && "flex-row-reverse")}>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            {sc.category}
                          </span>
                        </div>
                        <p className={cn("text-neutral-900 font-bold text-lg mb-1 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1")}>
                          {getShortcutAction(sc)}
                        </p>
                        <p className="text-neutral-500 text-sm font-medium">
                          {language === 'ar' ? sc.action : sc.action}
                        </p>
                      </div>
                      <div className={cn("flex flex-wrap gap-1.5 content-start max-w-[140px]", language === 'ar' ? 'justify-start' : 'justify-end')}>
                        {sc.key.split(' + ').map((k, i) => (
                          <span key={i} className="shortcut-key whitespace-nowrap">
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
                      <h4 className="text-lg font-bold text-neutral-900">{t.noResults}</h4>
                      <p className="text-neutral-500 text-sm">{t.tryAnother}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="custom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden"
            >
              <div className="p-8 sm:p-12 text-white bg-green-600 relative overflow-hidden">
                <button 
                  onClick={() => setShowCustomShortcuts(false)}
                  className={cn(
                    "mb-8 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all w-fit",
                    language === 'ar' && "flex-row-reverse"
                  )}
                >
                  <ArrowLeft size={18} className={cn(language === 'ar' && "rotate-180")} />
                  <span className="text-sm font-semibold">{t.back}</span>
                </button>
                <div className={cn("flex flex-col sm:flex-row gap-6 relative z-10", language === 'ar' ? 'sm:flex-row-reverse sm:items-end' : 'sm:items-end')}>
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center ring-4 ring-white/10 shadow-2xl">
                    <StickyNote size={48} />
                  </div>
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                       {t.menu.myShortcuts}
                    </h2>
                    <p className="text-xl font-medium text-white/80">
                      {customShortcuts.length} {t.shortcuts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                <form onSubmit={handleAddCustom} className="mb-12 bg-neutral-50 p-6 rounded-[2rem] border border-neutral-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-green-600" /> {t.custom.addTitle}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-400 px-1">{t.custom.keyLabel}</label>
                      <input 
                        required
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono text-sm"
                        value={newShortcut.key}
                        onChange={e => setNewShortcut({...newShortcut, key: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1 lg:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-neutral-400 px-1">{t.custom.actionLabel}</label>
                      <input 
                        required
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                        value={newShortcut.action}
                        onChange={e => setNewShortcut({...newShortcut, action: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-neutral-400 px-1">{t.custom.categoryLabel}</label>
                      <select 
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
                        value={newShortcut.category}
                        onChange={e => setNewShortcut({...newShortcut, category: e.target.value})}
                      >
                        <option>General</option>
                        <option>Editing</option>
                        <option>Formatting</option>
                        <option>Navigation</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="mt-6 w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {t.custom.saveBtn}
                  </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredShortcuts.map((sc, idx) => (
                    <motion.div 
                      key={idx}
                      className={cn(
                        "group bg-neutral-50 hover:bg-neutral-100 p-5 rounded-2xl border border-neutral-200 transition-all flex items-start justify-between gap-4",
                        language === 'ar' && "flex-row-reverse text-right"
                      )}
                    >
                      <div className="flex-1">
                        <div className={cn("flex items-center gap-2 mb-1", language === 'ar' && "flex-row-reverse")}>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            {sc.category}
                          </span>
                        </div>
                        <p className="text-neutral-900 font-bold text-lg mb-1 leading-tight group-hover:text-green-600 transition-colors">
                          {sc.action}
                        </p>
                        <button 
                          onClick={() => handleDeleteCustom(idx)}
                          className="text-[10px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1 mt-2 uppercase tracking-widest transition-colors"
                        >
                          <Trash2 size={12} /> {t.custom.delete}
                        </button>
                      </div>
                      <div className={cn("flex flex-wrap gap-1.5 content-start max-w-[140px]", language === 'ar' ? 'justify-start' : 'justify-end')}>
                        {sc.key.split(' + ').map((k, i) => (
                          <span key={i} className="shortcut-key whitespace-nowrap">
                            {k}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredShortcuts.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full text-neutral-400 mb-4">
                        <StickyNote size={32} />
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900">{t.custom.noCustom}</h4>
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
            {t.copyright}
          </p>
          <p className="text-neutral-500 text-sm max-w-md mx-auto leading-relaxed">
            {t.footerDesc}
          </p>
        </div>
      </footer>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowShareModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl text-center"
            >
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
                <Share2 size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">{t.shareTitle}</h3>
              <p className="text-neutral-500 text-sm mb-8">
                Scan this code to open the app on another device.
              </p>
              
              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm inline-block mb-8">
                <QRCodeCanvas 
                  value="https://microsoft-office-mastery.vercel.app/"
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <button 
                onClick={() => setShowShareModal(false)}
                className="w-full bg-neutral-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all"
              >
                {t.close}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col p-8 overflow-hidden max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                    <Command size={26} />
                  </div>
                  <div>
                    <span className="font-black text-xl block leading-none">{t.title}</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{t.subtitle}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors bg-neutral-50"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 -mr-2 overflow-x-hidden custom-scrollbar">
                <div className="mb-6">
                  <p className="px-1 py-3 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe size={14} className="text-blue-500" /> {t.menu.lang}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {(['en', 'bn', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setIsMenuOpen(false); }}
                        className={cn(
                          "flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all border-2",
                          language === lang 
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                            : "border-neutral-100 bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
                        )}
                      >
                        <span className="text-sm">{lang === 'en' ? 'English' : lang === 'bn' ? 'বাংলা' : 'العربية'}</span>
                        {language === lang && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="px-1 py-3 text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info size={14} className="text-purple-500" /> {t.menu.help}
                  </p>
                  
                  <button 
                    onClick={() => { setShowCustomShortcuts(true); setSelectedApp(null); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent"
                  >
                    <div className="p-2 bg-green-100 rounded-xl text-green-600">
                      <StickyNote size={20} />
                    </div>
                    <span>{t.menu.myShortcuts}</span>
                  </button>

                  {deferredPrompt && (
                    <button 
                      onClick={() => { handleInstall(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-4 px-6 py-5 text-sm font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Monitor size={22} />
                      {t.menu.install}
                    </button>
                  )}

                  <a 
                    href="https://zunaidhosse.github.io/My-contact/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                      <LifeBuoy size={20} />
                    </div>
                    <span>{t.menu.help}</span>
                    <ExternalLink size={18} className={cn("opacity-40", language === 'ar' ? 'mr-auto' : 'ml-auto')} />
                  </a>
                  
                  <button 
                    onClick={() => { setShowShareModal(true); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent"
                  >
                    <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                      <Share2 size={20} />
                    </div>
                    <span>{t.menu.share}</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 text-[11px] text-neutral-400 text-center font-bold tracking-widest uppercase mb-2">
                Version 1.2.0
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Installation Popup */}
      <AnimatePresence>
        {showInstallPopup && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={dismissInstall}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-8 text-center"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 animate-bounce-slow">
                <Command size={44} />
              </div>
              <h2 className="text-2xl font-black text-neutral-900 mb-3">{t.installPopup.title}</h2>
              <p className="text-neutral-500 text-sm font-medium mb-8 leading-relaxed">
                {t.installPopup.desc}
              </p>
              <div className="space-y-3">
                <button 
                  onClick={handleInstall}
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <Monitor size={20} />
                  {t.installPopup.btn}
                </button>
                <button 
                  onClick={dismissInstall}
                  className="w-full py-4 text-neutral-400 font-bold hover:text-neutral-900 transition-colors text-sm"
                >
                  {t.installPopup.later}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
