export interface Shortcut {
  key: string;
  action: string;
  actionBn: string;
  actionAr: string;
  category: 'General' | 'Editing' | 'Formatting' | 'Navigation' | 'Selection' | 'Data' | 'Review';
}

export interface OfficeApp {
  id: string;
  name: string;
  nameBn: string;
  nameAr: string;
  iconName: string;
  color: string;
  description: string;
  descriptionBn: string;
  descriptionAr: string;
  shortcuts: Shortcut[];
}

export const officeApps: OfficeApp[] = [
  {
    id: 'word',
    name: 'Microsoft Word',
    nameBn: 'মাইক্রোসফট ওয়ার্ড',
    nameAr: 'ميكروسوفت وورد',
    iconName: 'FileText',
    color: '#2b579a',
    description: 'Document processing and creation.',
    descriptionBn: 'ডকুমেন্ট প্রসেসিং এবং তৈরির জন্য।',
    descriptionAr: 'معالجة المستندات وإنشاؤها.',
    shortcuts: [
      { key: 'Ctrl + N', action: 'Create a new document', actionBn: 'নতুন ডকুমেন্ট খুলুন', actionAr: 'إنشاء مستند جديد', category: 'General' },
      { key: 'Ctrl + O', action: 'Open an existing document', actionBn: 'বিদ্যমান ডকুমেন্ট ওপেন করুন', actionAr: 'فتح مستند موجود', category: 'General' },
      { key: 'Ctrl + S', action: 'Save the document', actionBn: 'ডকুমেন্ট সেভ করুন', actionAr: 'حفظ المستند', category: 'General' },
      { key: 'Ctrl + P', action: 'Print the document', actionBn: 'প্রিন্ট করুন', actionAr: 'طباعة المستند', category: 'General' },
      { key: 'F12', action: 'Save As', actionBn: 'সেভ অ্যাজ (Save As)', actionAr: 'حفظ باسم', category: 'General' },
      { key: 'Ctrl + W', action: 'Close the document', actionBn: 'ডকুমেন্ট বন্ধ করুন', actionAr: 'إغلاق المستند', category: 'General' },
      { key: 'Ctrl + Z', action: 'Undo', actionBn: 'আনডু (Undo)', actionAr: 'تراجع', category: 'Editing' },
      { key: 'Ctrl + Y', action: 'Redo', actionBn: 'রিডু (Redo)', actionAr: 'إعادة', category: 'Editing' },
      { key: 'Ctrl + F', action: 'Find text', actionBn: 'টেক্সট খুঁজুন', actionAr: 'البحث عن نص', category: 'Editing' },
      { key: 'Ctrl + H', action: 'Replace text', actionBn: 'টেক্সট রিপ্লেস করুন', actionAr: 'استبدال النص', category: 'Editing' },
      { key: 'Ctrl + X', action: 'Cut selected content', actionBn: 'সিলেক্ট করা অংশ কাট করুন', actionAr: 'قص المحتوى المحدد', category: 'Editing' },
      { key: 'Ctrl + C', action: 'Copy selected content', actionBn: 'সিলেক্ট করা অংশ কপি করুন', actionAr: 'نسخ المحتوى المحدد', category: 'Editing' },
      { key: 'Ctrl + V', action: 'Paste content', actionBn: 'পেস্ট করুন', actionAr: 'لصق المحتوى', category: 'Editing' },
      { key: 'Ctrl + A', action: 'Select all content', actionBn: 'সবকিছু সিলেক্ট করুন', actionAr: 'تحديد الكل', category: 'Selection' },
      { key: 'Ctrl + B', action: 'Apply bold formatting', actionBn: 'বোল্ড (Bold) করুন', actionAr: 'تطبيق تنسيق غامق', category: 'Formatting' },
      { key: 'Ctrl + I', action: 'Apply italic formatting', actionBn: 'ইটালিক (Italic) করুন', actionAr: 'تطبيق تنسيق مائل', category: 'Formatting' },
      { key: 'Ctrl + U', action: 'Apply underline formatting', actionBn: 'আন্ডারলাইন করুন', actionAr: 'تطبيق التسطير', category: 'Formatting' },
      { key: 'Ctrl + ]', action: 'Increase font size', actionBn: 'ফন্ট সাইজ বাড়ান', actionAr: 'زيادة حجم الخط', category: 'Formatting' },
      { key: 'Ctrl + [', action: 'Decrease font size', actionBn: 'ফন্ট সাইজ কমান', actionAr: 'تقليل حجم الخط', category: 'Formatting' },
      { key: 'Ctrl + L', action: 'Left align text', actionBn: 'লেফট অ্যালাইন করুন', actionAr: 'محاذاة النص لليسار', category: 'Formatting' },
      { key: 'Ctrl + E', action: 'Center align text', actionBn: 'সেন্টার অ্যালাইন করুন', actionAr: 'توسيط النص', category: 'Formatting' },
      { key: 'Ctrl + R', action: 'Right align text', actionBn: 'রাইট অ্যালাইন করুন', actionAr: 'محاذاة النص لليمين', category: 'Formatting' },
      { key: 'Ctrl + J', action: 'Justify align text', actionBn: 'জাস্টিফাই অ্যালাইন করুন', actionAr: 'ضبط النص', category: 'Formatting' },
      { key: 'Ctrl + K', action: 'Insert Hyperlink', actionBn: 'হাইপারলিঙ্ক যোগ করুন', actionAr: 'إدراج ارتباط تشعبي', category: 'General' },
      { key: 'Shift + F3', action: 'Change Case', actionBn: 'কেস পরিবর্তন (Change Case)', actionAr: 'تغيير حالة الأحرف', category: 'Formatting' },
      { key: 'Ctrl + Enter', action: 'Insert page break', actionBn: 'পেজ ব্রেক দিন', actionAr: 'إدراج فاصل صفحات', category: 'Navigation' },
      { key: 'Ctrl + Home', action: 'Go to start of document', actionBn: 'ডকুমেন্টের শুরুতে যান', actionAr: 'انتقال إلى بداية المستند', category: 'Navigation' },
      { key: 'Ctrl + End', action: 'Go to end of document', actionBn: 'ডকুমেন্টের শেষে যান', actionAr: 'انتقال إلى نهاية المستند', category: 'Navigation' },
      { key: 'Ctrl + Alt + 1', action: 'Apply Heading 1', actionBn: 'হেডিং ১ ব্যবহার করুন', actionAr: 'تطبيق العنوان 1', category: 'Formatting' },
      { key: 'Ctrl + F1', action: 'Expand/Collapse Ribbon', actionBn: 'রিবন দেখান বা লুকান', actionAr: 'إظهار أو إخفاء الشريط', category: 'General' },
      { key: 'F7', action: 'Spelling & Grammar check', actionBn: 'বানান ও ব্যাকরণ পরীক্ষা', actionAr: 'تدقيق إملائي ونحوي', category: 'Review' },
    ]
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    nameBn: 'মাইক্রোসফট এক্সেল',
    nameAr: 'ميكروسوفت إكسل',
    iconName: 'Table',
    color: '#217346',
    description: 'Spreadsheets and data analysis.',
    descriptionBn: 'স্প্রেডশিট এবং ডেটা বিশ্লেষণের জন্য।',
    descriptionAr: 'جداول البيانات وتحليل البيانات.',
    shortcuts: [
      { key: 'F2', action: 'Edit the active cell', actionBn: 'সক্রিয় সেল এডিট করুন', actionAr: 'تحرير الخلية النشطة', category: 'Editing' },
      { key: 'F4', action: 'Repeat last action / Absolute ref', actionBn: 'শেষ কাজ রিপিট করুন', actionAr: 'تكرار الإجراء الأخير', category: 'Editing' },
      { key: 'Ctrl + F1', action: 'Show or hide the ribbon', actionBn: 'রিবন দেখান বা লুকান', actionAr: 'إظهار أو إخفاء الشريط', category: 'General' },
      { key: 'Alt + H + O + I', action: 'Auto-fit column width', actionBn: 'কলাম উইডথ অটো-ফিট করুন', actionAr: 'ملاءمة عرض العمود تلقائيًا', category: 'Formatting' },
      { key: 'Ctrl + Shift + $', action: 'Apply Currency format', actionBn: 'কারেন্সি ফরম্যাট অ্যাপ্লাই করুন', actionAr: 'تطبيق تنسيق العملة', category: 'Formatting' },
      { key: 'Ctrl + Shift + %', action: 'Apply Percentage format', actionBn: 'পার্সেন্টেজ ফরম্যাট অ্যাপ্লাই করুন', actionAr: 'تطبيق تنسيق النسبة المئوية', category: 'Formatting' },
      { key: 'Alt + =', action: 'Insert AutoSum formula', actionBn: 'অটোসাম ফর্মুলা যুক্ত করুন', actionAr: 'إدراج صيغة الجمع التلقائي', category: 'Data' },
      { key: 'Ctrl + ;', action: 'Insert current date', actionBn: 'বর্তমান তারিখ বসান', actionAr: 'إدراج التاريخ الحالي', category: 'Data' },
      { key: 'Ctrl + Shift + :', action: 'Insert current time', actionBn: 'বর্তমান সময় বসান', actionAr: 'إدراج الوقت الحالي', category: 'Data' },
      { key: 'Ctrl + PgDn', action: 'Switch to next worksheet', actionBn: 'পরবর্তী ওয়ার্কশিটে যান', actionAr: 'التبديل إلى ورقة العمل التالية', category: 'Navigation' },
      { key: 'Ctrl + PgUp', action: 'Switch to previous worksheet', actionBn: 'পূর্ববর্তী ওয়ার্কশিটে যান', actionAr: 'التبديل إلى ورقة العمل السابقة', category: 'Navigation' },
      { key: 'Alt + Enter', action: 'Start a new line in same cell', actionBn: 'একই সেলে নতুন লাইন শুরু করুন', actionAr: 'بدء سطر جديد في نفس الخلية', category: 'Editing' },
      { key: 'Ctrl + D', action: 'Fill Down', actionBn: 'নিচের সেলে ফিল করুন', actionAr: 'تعبئة للأسفل', category: 'Editing' },
      { key: 'Ctrl + R', action: 'Fill Right', actionBn: 'ডানে ফিল করুন', actionAr: 'تعبئة لليمين', category: 'Editing' },
      { key: 'Ctrl + Shift + L', action: 'Toggle AutoFilter', actionBn: 'অটোফিল্টার টগল করুন', actionAr: 'تبديل التصفية التلقائية', category: 'Data' },
      { key: 'Ctrl + T', action: 'Create a Table', actionBn: 'টেবিল তৈরি করুন', actionAr: 'إنشاء جدول', category: 'General' },
      { key: 'Ctrl + 9', action: 'Hide selected rows', actionBn: 'রো হাইড করুন', actionAr: 'إخفاء الصفوف', category: 'Formatting' },
      { key: 'Ctrl + 0', action: 'Hide selected columns', actionBn: 'কলাম হাইড করুন', actionAr: 'إخفاء الأعمدة', category: 'Formatting' },
      { key: 'F11', action: 'Create chart from data', actionBn: 'চার্ট তৈরি করুন', actionAr: 'إنشاء مخطط', category: 'Data' },
      { key: 'Alt + H + B', action: 'Add border to cells', actionBn: 'বর্ডার যুক্ত করুন', actionAr: 'إضافة حدود', category: 'Formatting' },
    ]
  },
  {
    id: 'powerpoint',
    name: 'Microsoft PowerPoint',
    nameBn: 'মাইক্রোসফট পাওয়ারপয়েন্ট',
    nameAr: 'ميكروسوفت باوربوينت',
    iconName: 'Layout',
    color: '#d24726',
    description: 'Presentation and slides.',
    descriptionBn: 'প্রেজেন্টেশন এবং স্লাইড তৈরির জন্য।',
    descriptionAr: 'العروض التقديمية والشرائح.',
    shortcuts: [
      { key: 'Ctrl + M', action: 'Insert a new slide', actionBn: 'নতুন স্লাইড যোগ করুন', actionAr: 'إدراج شريحة جديدة', category: 'General' },
      { key: 'Ctrl + D', action: 'Duplicate selected slide', actionBn: 'স্লাইড ডুপ্লিকেট করুন', actionAr: 'تكرار الشريحة المختارة', category: 'Editing' },
      { key: 'F5', action: 'Start slide show from beginning', actionBn: 'শুরু থেকে স্লাইড শো শুরু করুন', actionAr: 'بدء عرض الشرائح من البداية', category: 'Navigation' },
      { key: 'Shift + F5', action: 'Start slide show from current slide', actionBn: 'বর্তমান স্লাইড থেকে স্লাইড শো শুরু করুন', actionAr: 'بدء عرض الشرائح من الشريحة الحالية', category: 'Navigation' },
      { key: 'Esc', action: 'End the slide show', actionBn: 'স্লাইড শো বন্ধ করুন', actionAr: 'إنهاء عرض الشرائح', category: 'Navigation' },
      { key: 'Ctrl + G', action: 'Group objects', actionBn: 'অবজেক্ট গ্রুপ করুন', actionAr: 'تجميع الكائنات', category: 'Editing' },
      { key: 'Ctrl + Shift + G', action: 'Ungroup objects', actionBn: 'আনগ্রুপ করুন', actionAr: 'فك تجميع الكائنات', category: 'Editing' },
      { key: 'Shift + F9', action: 'Toggle gridlines', actionBn: 'গ্রিডলাইন দেখান/লুকান', actionAr: 'تبديل خطوط الشبكة', category: 'General' },
      { key: 'Alt + Shift + C', action: 'Copy animation', actionBn: 'অ্যানিমেশন কপি করুন', actionAr: 'نسخ الحركة', category: 'Editing' },
      { key: 'Alt + Shift + V', action: 'Paste animation', actionBn: 'অ্যানিমেশন পেস্ট করুন', actionAr: 'لصق الحركة', category: 'Editing' },
    ]
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    nameBn: 'মাইক্রোসফট আউটলুক',
    nameAr: 'ميكروسوفت أوتلوك',
    iconName: 'Mail',
    color: '#0078d4',
    description: 'Email and calendar management.',
    descriptionBn: 'ইমেল এবং ক্যালেন্ডার ব্যবস্থাপনার জন্য।',
    descriptionAr: 'إدارة البريد الإلكتروني والتقويم.',
    shortcuts: [
      { key: 'Ctrl + R', action: 'Reply to an email', actionBn: 'ইমেলের উত্তর দিন', actionAr: 'الرد على البريد الإلكتروني', category: 'General' },
      { key: 'Ctrl + Shift + R', action: 'Reply all to an email', actionBn: 'সবাইকে উত্তর দিন', actionAr: 'الرد على الكل', category: 'General' },
      { key: 'Ctrl + F', action: 'Forward an email', actionBn: 'ইমেল ফরওয়ার্ড করুন', actionAr: 'إعادة توجيه البريد الإلكترونی', category: 'General' },
      { key: 'Ctrl + 1', action: 'Switch to Mail view', actionBn: 'মেইল ভিউতে যান', actionAr: 'التبديل إلى عرض البريد', category: 'Navigation' },
      { key: 'Ctrl + 2', action: 'Switch to Calendar view', actionBn: 'ক্যালেন্ডার ভিউতে যান', actionAr: 'التبديل إلى عرض التقويم', category: 'Navigation' },
      { key: 'Ctrl + N', action: 'Create new item', actionBn: 'নতুন কিছু তৈরি করুন', actionAr: 'إنشاء عنصر جديد', category: 'General' },
      { key: 'Ctrl + Shift + M', action: 'New message', actionBn: 'নতুন মেসেজ', actionAr: 'رسالة جديدة', category: 'General' },
      { key: 'Ctrl + E', action: 'Search', actionBn: 'খুঁজুন', actionAr: 'بحث', category: 'Navigation' },
    ]
  },
  {
    id: 'access',
    name: 'Microsoft Access',
    nameBn: 'মাইক্রোসফট অ্যাক্সেস',
    nameAr: 'ميكروسوفت أكسس',
    iconName: 'Database',
    color: '#a4373a',
    description: 'Database management system.',
    descriptionBn: 'ডেটাবেস ম্যানেজমেন্ট সিস্টেম।',
    descriptionAr: 'نظام إدارة قواعد البيانات.',
    shortcuts: [
      { key: 'F11', action: 'Show/Hide Navigation Pane', actionBn: 'ন্যাভিগেশন প্যান দেখান/লুকান', actionAr: 'إظهار/إخفاء جزء التنقل', category: 'General' },
      { key: 'Ctrl + F', action: 'Find records', actionBn: 'রেকর্ড খুঁজুন', actionAr: 'البحث عن السجلات', category: 'Data' },
      { key: 'Ctrl + Grave (`)', action: 'Toggle Datasheet/Design view', actionBn: 'ডিজাইন/ডেটাশিট ভিউ টগল করুন', actionAr: 'تبديل عرض ورقة البيانات/التصميم', category: 'Navigation' },
      { key: 'Shift + Enter', action: 'Save current record', actionBn: 'রেকর্ড সেভ করুন', actionAr: 'حفظ السجل الحالي', category: 'General' },
      { key: 'Ctrl + P', action: 'Print object', actionBn: 'প্রিন্ট করুন', actionAr: 'طباعة', category: 'General' },
    ]
  },
  {
    id: 'onenote',
    name: 'Microsoft OneNote',
    nameBn: 'মাইক্রোসফট ওয়াননোট',
    nameAr: 'ميكروسوفت ون نوت',
    iconName: 'BookOpen',
    color: '#7719aa',
    description: 'Digital note-taking app.',
    descriptionBn: 'ডিজিটাল নোট নেওয়ার জন্য।',
    descriptionAr: 'تطبيق تدوين המلاحظات الرقمية.',
    shortcuts: [
      { key: 'Ctrl + N', action: 'Create a new page', actionBn: 'নতুন পেজ তৈরি করুন', actionAr: 'إنشاء صفحة جديدة', category: 'General' },
      { key: 'Ctrl + Alt + N', action: 'Create a new section', actionBn: 'নতুন সেকশন তৈরি করুন', actionAr: 'إنشاء قسم جديد', category: 'General' },
      { key: 'Ctrl + Shift + N', action: 'Create a new notebook', actionBn: 'নতুন নোটবুক তৈরি করুন', actionAr: 'إنشاء دفتر ملاحظات جديد', category: 'General' },
      { key: 'Ctrl + K', action: 'Insert a link', actionBn: 'লিঙ্ক যোগ করুন', actionAr: 'إدراج رابط', category: 'Editing' },
      { key: 'Alt + Shift + D', action: 'Insert current date', actionBn: 'বর্তমান তারিখ দিন', actionAr: 'إدراج التاريخ الحالي', category: 'Data' },
      { key: 'Ctrl + E', action: 'Search all notebooks', actionBn: 'সব নোটবুক খুঁজুন', actionAr: 'البحث في جميع دفاتر الملاحظات', category: 'General' },
      { key: 'Ctrl + G', action: 'Switch notebooks', actionBn: 'নোটবুক পরিবর্তন করুন', actionAr: 'تبديل دفاتر الملاحظات', category: 'Navigation' },
    ]
  }
];
