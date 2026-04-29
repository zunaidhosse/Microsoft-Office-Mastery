import { useState, useMemo, useEffect, FormEvent, ChangeEvent } from 'react';
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
  Settings,
  Star,
  Copy,
  Check,
  TrendingUp,
  Award,
  LayoutTemplate,
  Users
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
  BookOpen,
  LayoutTemplate,
  Users,
  Monitor,
  Globe
};

type Language = 'en' | 'bn' | 'ar';

export default function App() {
  const [selectedApp, setSelectedApp] = useState<OfficeApp | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [showCustomShortcuts, setShowCustomShortcuts] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('office_mastery_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [revealPractice, setRevealPractice] = useState(false);
  const [customShortcuts, setCustomShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('office_mastery_custom');
    return saved ? JSON.parse(saved) : [];
  });
  const [newShortcut, setNewShortcut] = useState({ key: '', action: '', category: 'General' });

  useEffect(() => {
    localStorage.setItem('office_mastery_custom', JSON.stringify(customShortcuts));
  }, [customShortcuts]);

  useEffect(() => {
    localStorage.setItem('office_mastery_favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const toggleFavorite = (shortcutKey: string) => {
    setFavorites(prev => 
      prev.includes(shortcutKey) 
        ? prev.filter(k => k !== shortcutKey) 
        : [...prev, shortcutKey]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
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

  const handleDeleteCustom = (index: number) => {
    setCustomShortcuts(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExport = () => {
    const data = {
      favorites,
      customShortcuts
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'office_mastery_backup.json';
    a.click();
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.favorites) setFavorites(data.favorites);
        if (data.customShortcuts) setCustomShortcuts(data.customShortcuts);
        alert('Data imported successfully!');
      } catch (err) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const t = {
    en: {
      title: 'Office Mastery',
      subtitle: 'Complete Office Shortcuts',
      search: 'Search shortcuts...',
      shortcuts: 'Shortcuts',
      back: 'Back to Apps',
      guide: 'Shortcut Guide',
      favTitle: 'My Favorite Shortcuts',
      favEmpty: 'No favorites yet. Star some shortcuts to see them here!',
      practice: 'Practice Mode',
      practiceDesc: 'Test your knowledge!',
      reveal: 'Reveal Shortcut',
      next: 'Next Question',
      score: 'Score',
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
        myShortcuts: 'My Shortcuts',
        favorites: 'Favorites',
        all: 'All Categories',
        categories: 'Filter by Category',
        stats: 'My Mastery',
        export: 'Backup Data',
        import: 'Restore Data',
        darkMode: 'Dark Mode',
        masteryLevel: 'Level',
        pinned: 'Pinned'
      },
      categories_map: {
        All: 'All Categories',
        General: 'General',
        Editing: 'Editing',
        Formatting: 'Formatting',
        Navigation: 'Navigation',
        Review: 'Review',
        View: 'View',
        Data: 'Data',
        Selection: 'Selection'
      },
      installPopup: {
        title: 'Install Office Mastery',
        desc: 'Install this app on your device for a faster, offline experience and easy access.',
        btn: 'Download & Install',
        later: 'Maybe Later'
      },
      common: {
        copied: 'Copied!',
        copy: 'Copy',
        added: 'Added to favorites',
        removed: 'Removed from favorites'
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
      favTitle: 'আমার প্রিয় শর্টকাট',
      favEmpty: 'এখনও কোনো ফেভারিট নেই। শর্টকাট সেভ করতে স্টার বাটনে ক্লিক করুন।',
      practice: 'প্র্যাকটিস মোড',
      practiceDesc: 'আপনার দক্ষতা পরীক্ষা করুন!',
      reveal: 'শর্টকাট দেখুন',
      next: 'পরবর্তী প্রশ্ন',
      score: 'স্কোর',
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
        myShortcuts: 'আমার শর্টকাট',
        favorites: 'প্রিয় শর্টকাট',
        all: 'সব ক্যাটাগরি',
        categories: 'ক্যাটাগরি অনুযায়ী দেখুন',
        stats: 'আমার দক্ষতা',
        export: 'ব্যাকআপ নিন',
        import: 'রিস্টোর করুন',
        darkMode: 'ডার্ক মোড',
        masteryLevel: 'লেভেল',
        pinned: 'পিন করা'
      },
      categories_map: {
        All: 'সব ক্যাটাগরি',
        General: 'সাধারণ',
        Editing: 'এডিটিং',
        Formatting: 'ফরম্যাটিং',
        Navigation: 'নেভিগেশন',
        Review: 'রিভিউ',
        View: 'ভিউ',
        Data: 'ডেটা',
        Selection: 'সিলেকশন'
      },
      installPopup: {
        title: 'অফিস মাস্টার ইনস্টল করুন',
        desc: 'দ্রুত এবং অফলাইন ব্যবহারের জন্য অ্যাপটি আপনার ফোনে ইনস্টল করুন।',
        btn: 'ডাউনলোড এবং ইনস্টল',
        later: 'পরে করব'
      },
      common: {
        copied: 'কপি হয়েছে!',
        copy: 'কপি',
        added: 'ফেভারিটে যোগ হয়েছে',
        removed: 'ফেভারিট থেকে সরানো হয়েছে'
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
      favTitle: 'الاختصارات المفضلة',
      favEmpty: 'لا يوجد مفضلات بعد. ابدأ بنجمة بعض الاختصارات!',
      practice: 'وضع الممارسة',
      practiceDesc: 'اختبر معلوماتك!',
      reveal: 'كشف الاختصار',
      next: 'السؤال التالي',
      score: 'نتيجة',
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
        myShortcuts: 'اختصاراتي',
        favorites: 'المفضلات',
        all: 'جميع الفئات',
        categories: 'تصفية حسب الفئة',
        stats: 'إتقاني',
        export: 'نسخ احتياطي',
        import: 'استعادة البيانات',
        masteryLevel: 'مستوى',
        darkMode: 'الوضع الداكن',
        pinned: 'مثبت'
      },
      categories_map: {
        All: 'جميع الفئات',
        General: 'عام',
        Editing: 'تحرير',
        Formatting: 'تنسيق',
        Navigation: 'تنقل',
        Review: 'مراجعة',
        View: 'عرض',
        Data: 'بيانات',
        Selection: 'تحديد'
      },
      installPopup: {
        title: 'تثبيت إتقان المكتب',
        desc: 'قم بتثبيت هذا التطبيق على جهازك للحصول على تجربة أسرع للوصول السهل.',
        btn: 'تنزيل وتثبيت',
        later: 'ربما لاحقا'
      },
      common: {
        copied: 'نسخ!',
        copy: 'نسخ',
        added: 'تمت الإضافة للمفضلة',
        removed: 'تمت الإزالة من المفضلة'
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

  const favoriteShortcuts = useMemo(() => {
    const allShortcuts = officeApps.flatMap(app => app.shortcuts);
    return allShortcuts.filter(s => favorites.includes(s.key));
  }, [favorites]);

  const filteredShortcuts = useMemo(() => {
    if (showFavorites) {
      if (!searchQuery) return favoriteShortcuts;
      return favoriteShortcuts.filter(s => 
        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.actionBn.includes(searchQuery) ||
        s.actionAr.includes(searchQuery) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (showCustomShortcuts) {
      if (!searchQuery) return customShortcuts;
      return customShortcuts.filter(s => 
        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.actionBn.includes(searchQuery) ||
        s.actionAr.includes(searchQuery) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (!selectedApp) return [];
    let list = selectedApp.shortcuts;
    
    if (activeCategory !== 'All') {
      list = list.filter(s => s.category === activeCategory);
    }

    if (!searchQuery) return list;
    return list.filter(s => 
      s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.actionBn.includes(searchQuery) ||
      s.actionAr.includes(searchQuery) ||
      s.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedApp, searchQuery, activeCategory]);

  const categories = useMemo(() => {
    if (!selectedApp) return [];
    const cats = new Set(selectedApp.shortcuts.map(s => s.category));
    return ['All', ...Array.from(cats)];
  }, [selectedApp]);

  const practiceShortcut = useMemo(() => {
    const allShortcuts = officeApps.flatMap(app => app.shortcuts);
    if (allShortcuts.length === 0) return null;
    return allShortcuts[practiceIndex % allShortcuts.length];
  }, [practiceIndex]);

  const nextPractice = () => {
    setRevealPractice(false);
    setPracticeIndex(prev => prev + 1);
  };

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
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={cn("min-h-screen bg-neutral-100 flex flex-col font-sans", language === 'ar' && "rtl")}
    >
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
              onClick={() => { 
                setSelectedApp(null); 
                setShowCustomShortcuts(false); 
                setShowFavorites(false); 
                setShowPractice(false);
                setSearchQuery(''); 
              }}
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
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
                title="Search (Ctrl+K)"
              >
                <Search size={22} />
              </button>
              <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors hidden sm:block">
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
              {/* Mastery Stats Card */}
              <motion.div
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-xl text-white col-span-full relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-2 text-blue-100">
                      {t.menu.stats}
                    </h3>
                    <h2 className="text-4xl font-black mb-4 flex items-center gap-3">
                      {t.menu.masteryLevel} {Math.floor((favorites.length + customShortcuts.length) / 5) + 1}
                      <TrendingUp size={32} className="text-green-300" />
                    </h2>
                    <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (favorites.length + customShortcuts.length) * 10)}%` }}
                        className="bg-white h-full rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      />
                    </div>
                    <p className="mt-3 text-xs font-bold text-blue-100 uppercase tracking-widest text-center sm:text-left">
                      {favorites.length + customShortcuts.length} {t.shortcuts}
                    </p>
                  </div>
                  <div className="flex gap-4 sm:flex-col lg:flex-row">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
                      <Star size={20} className="mx-auto mb-2 text-amber-300" fill="currentColor" />
                      <div className="text-2xl font-black">{favorites.length}</div>
                      <div className="text-[10px] uppercase font-black opacity-60 tracking-widest">{t.menu.favorites}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
                      <Plus size={20} className="mx-auto mb-2 text-green-300" />
                      <div className="text-2xl font-black">{customShortcuts.length}</div>
                      <div className="text-[10px] uppercase font-black opacity-60 tracking-widest">{t.menu.myShortcuts}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

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
                onClick={() => setShowFavorites(true)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg bg-amber-500 group-hover:scale-110 transition-transform">
                  <Star size={28} fill="currentColor" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{t.menu.favorites}</h2>
                <h3 className="text-sm font-medium text-neutral-500 mb-4">{t.shortcuts}</h3>
                <p className="text-neutral-600 text-sm mb-6 line-clamp-2">
                  {favorites.length > 0 ? "Your pinned critical shortcuts." : t.favEmpty}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {favorites.length} {t.shortcuts}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <ArrowLeft className="rotate-180" size={16} />
                  </div>
                </div>
              </motion.div>

              {/* Practice Entry Card */}
              <motion.div
                onClick={() => setShowPractice(true)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg bg-indigo-600 group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{t.practice}</h2>
                <h3 className="text-sm font-medium text-neutral-500 mb-4">{t.subtitle}</h3>
                <p className="text-neutral-600 text-sm mb-6 line-clamp-2">
                  {t.practiceDesc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    All Apps Supported
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ArrowLeft className="rotate-180" size={16} />
                  </div>
                </div>
              </motion.div>

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
                  <div className="flex-1">
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                       {language === 'en' ? selectedApp.name : getAppName(selectedApp)}
                    </h2>
                    <p className="text-xl font-medium text-white/80">
                      {language === 'en' ? selectedApp.nameBn : selectedApp.name} • {selectedApp.shortcuts.length} {t.shortcuts}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Chips */}
              <div className="px-4 sm:px-8 py-6 bg-neutral-50/50 border-b border-neutral-100 overflow-x-auto no-scrollbar">
                <div className={cn("flex items-center gap-2", language === 'ar' && "flex-row-reverse")}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                        activeCategory === cat 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : "bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
                      )}
                    >
                      {(t as any).categories_map[cat] || cat}
                    </button>
                  ))}
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
                            {(t as any).categories_map[sc.category] || sc.category}
                          </span>
                        </div>
                        <p className={cn("text-neutral-900 font-bold text-lg mb-1 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1")}>
                          {getShortcutAction(sc)}
                        </p>
                        <p className="text-neutral-500 text-sm font-medium">
                          {language === 'ar' ? sc.action : sc.action}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <button 
                            onClick={() => toggleFavorite(sc.key)}
                            className={cn(
                              "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors",
                              favorites.includes(sc.key) ? "text-amber-500" : "text-neutral-400 hover:text-amber-500"
                            )}
                          >
                            <Star size={14} fill={favorites.includes(sc.key) ? "currentColor" : "none"} />
                            {favorites.includes(sc.key) ? 'Favorite' : 'Star'}
                          </button>
                          <button 
                            onClick={() => copyToClipboard(sc.key)}
                            className={cn(
                              "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors",
                              copiedKey === sc.key ? "text-green-500" : "text-neutral-400 hover:text-blue-500"
                            )}
                          >
                            {copiedKey === sc.key ? <Check size={14} /> : <Copy size={14} />}
                            {copiedKey === sc.key ? t.common.copied : t.common.copy}
                          </button>
                        </div>
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
          ) : showPractice ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden"
            >
              <div className="p-8 sm:p-12 text-white bg-indigo-600 relative overflow-hidden">
                <button 
                  onClick={() => setShowPractice(false)}
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
                    <Award size={48} />
                  </div>
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                       {t.practice}
                    </h2>
                    <p className="text-xl font-medium text-white/80 uppercase tracking-widest">
                      {t.practiceDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={practiceIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full max-w-lg text-center"
                  >
                    <div className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                      {(t as any).categories_map[practiceShortcut?.category || 'General'] || practiceShortcut?.category}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-12 leading-tight">
                      {practiceShortcut ? getShortcutAction(practiceShortcut) : '...'}
                    </h3>

                    <div className="min-h-[100px] mb-12">
                      {revealPractice ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-wrap justify-center gap-3"
                        >
                          {practiceShortcut?.key.split(' + ').map((k, i) => (
                            <span key={i} className="px-6 py-4 bg-neutral-900 text-white rounded-2xl text-2xl font-black shadow-xl ring-4 ring-neutral-100">
                              {k}
                            </span>
                          ))}
                        </motion.div>
                      ) : (
                        <div className="flex justify-center gap-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-16 h-16 bg-neutral-100 rounded-2xl animate-pulse" />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {!revealPractice ? (
                        <button 
                          onClick={() => setRevealPractice(true)}
                          className="px-12 py-5 bg-neutral-900 text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-lg"
                        >
                          {t.reveal}
                        </button>
                      ) : (
                        <button 
                          onClick={nextPractice}
                          className="px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all text-lg flex items-center gap-3"
                        >
                          {t.next}
                          <ArrowLeft className="rotate-180" size={20} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : showFavorites ? (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden"
            >
              <div className="p-8 sm:p-12 text-white bg-amber-500 relative overflow-hidden">
                <button 
                  onClick={() => setShowFavorites(false)}
                  className={cn(
                    "mb-8 flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all w-fit",
                    language === 'ar' && "flex-row-reverse"
                  )}
                >
                  <ArrowLeft size={18} className={cn(language === 'ar' && "rotate-180")} />
                  <span className="text-sm font-semibold">{t.back}</span>
                </button>
                <div className={cn("flex flex-col sm:flex-row gap-6 relative z-10", language === 'ar' ? 'sm:flex-row-reverse sm:items-end' : 'sm:items-end')}>
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center ring-4 ring-white/10 shadow-2xl text-white">
                    <Star size={48} fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                       {t.favTitle}
                    </h2>
                    <p className="text-xl font-medium text-white/80">
                      {favorites.length} {t.shortcuts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteShortcuts.map((sc, idx) => (
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
                             {(t as any).categories_map[sc.category] || sc.category}
                          </span>
                        </div>
                        <p className="text-neutral-900 font-bold text-lg mb-1 leading-tight group-hover:text-amber-600 transition-colors">
                          {getShortcutAction(sc)}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <button 
                            onClick={() => toggleFavorite(sc.key)}
                            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500 transition-colors"
                          >
                            <Star size={14} fill="currentColor" />
                            {t.menu.favorites}
                          </button>
                          <button 
                            onClick={() => copyToClipboard(sc.key)}
                            className={cn(
                              "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors",
                              copiedKey === sc.key ? "text-green-500" : "text-neutral-400 hover:text-blue-500"
                            )}
                          >
                            {copiedKey === sc.key ? <Check size={14} /> : <Copy size={14} />}
                            {copiedKey === sc.key ? t.common.copied : t.common.copy}
                          </button>
                        </div>
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
                  
                  {favoriteShortcuts.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full text-neutral-400 mb-4">
                        <Star size={32} />
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900">{t.favEmpty}</h4>
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
                        <option value="General">{(t as any).categories_map['General']}</option>
                        <option value="Editing">{(t as any).categories_map['Editing']}</option>
                        <option value="Formatting">{(t as any).categories_map['Formatting']}</option>
                        <option value="Navigation">{(t as any).categories_map['Navigation']}</option>
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
                            {(t as any).categories_map[sc.category] || sc.category}
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
      
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-start justify-center p-4 sm:p-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-neutral-100 flex items-center gap-4">
                <Search size={24} className="text-blue-600" />
                <input 
                  autoFocus
                  type="text"
                  placeholder={t.search}
                  className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-neutral-900 placeholder:text-neutral-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-xl text-neutral-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                {searchQuery ? (
                  <div className="grid grid-cols-1 gap-2">
                    {officeApps.flatMap(app => 
                      app.shortcuts.filter(s => 
                        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.key.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((s, i) => (
                        <div 
                          key={`${app.id}-${i}`}
                          className="flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 rounded-2xl border border-neutral-200 transition-all group cursor-pointer"
                          onClick={() => {
                            setSelectedApp(app);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                              style={{ backgroundColor: app.color }}
                            >
                              {(() => {
                                const Icon = iconMap[app.iconName];
                                return <Icon size={20} />;
                              })()}
                            </div>
                            <div>
                              <div className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-0.5">
                                {app.name} • {(t as any).categories_map[s.category] || s.category}
                              </div>
                              <div className="text-neutral-900 font-bold group-hover:text-blue-600 transition-colors">
                                {getShortcutAction(s)}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {s.key.split(' + ').map((k, i) => (
                              <span key={i} className="px-2 py-1 bg-white border border-neutral-200 rounded-lg text-[10px] font-black shadow-sm">
                                {k}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                    {officeApps.flatMap(app => 
                      app.shortcuts.filter(s => 
                        s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.key.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    ).length === 0 && (
                      <div className="py-12 text-center text-neutral-500 font-bold">
                        {t.noResults}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-50 rounded-full text-neutral-300 mb-4">
                      <Search size={32} />
                    </div>
                    <p className="text-neutral-400 font-bold">{t.search}</p>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-300 mt-2">
                       Type to find shortcuts
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded-md text-neutral-500 shadow-sm">ESC</kbd> to close
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded-md text-neutral-500 shadow-sm">Selection</kbd> to jump
                  </span>
                </div>
                <div>
                   Office Mastery v2.0
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    onClick={() => { setShowCustomShortcuts(true); setSelectedApp(null); setShowFavorites(false); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent"
                  >
                    <div className="p-2 bg-green-100 rounded-xl text-green-600">
                      <StickyNote size={20} />
                    </div>
                    <span>{t.menu.myShortcuts}</span>
                  </button>

                  <button 
                    onClick={() => { setShowPractice(true); setSelectedApp(null); setShowCustomShortcuts(false); setShowFavorites(false); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent"
                  >
                    <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                      <Award size={20} />
                    </div>
                    <span>{t.practice}</span>
                  </button>

                  <div className="h-px bg-neutral-200 my-4" />

                  <button 
                    onClick={handleExport}
                    className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent"
                  >
                    <div className="p-2 bg-gray-100 rounded-xl text-gray-600">
                      <Copy size={20} />
                    </div>
                    <span>{t.menu.export}</span>
                  </button>

                  <label className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-2xl transition-all border-2 border-transparent cursor-pointer">
                    <div className="p-2 bg-gray-100 rounded-xl text-gray-600">
                      <Plus size={20} />
                    </div>
                    <span>{t.menu.import}</span>
                    <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                  </label>

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
