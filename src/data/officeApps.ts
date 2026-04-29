export interface Shortcut {
  key: string;
  action: string;
  actionBn: string;
  category: 'General' | 'Editing' | 'Formatting' | 'Navigation' | 'Selection' | 'Data' | 'Review';
}

export interface OfficeApp {
  id: string;
  name: string;
  nameBn: string;
  iconName: string;
  color: string;
  description: string;
  descriptionBn: string;
  shortcuts: Shortcut[];
}

export const officeApps: OfficeApp[] = [
  {
    id: 'word',
    name: 'Microsoft Word',
    nameBn: 'মাইক্রোসফট ওয়ার্ড',
    iconName: 'FileText',
    color: '#2b579a',
    description: 'Document processing and creation.',
    descriptionBn: 'ডকুমেন্ট প্রসেসিং এবং তৈরির জন্য।',
    shortcuts: [
      { key: 'Ctrl + N', action: 'Create a new document', actionBn: 'নতুন ডকুমেন্ট খুলুন', category: 'General' },
      { key: 'Ctrl + O', action: 'Open an existing document', actionBn: 'বিদ্যমান ডকুমেন্ট ওপেন করুন', category: 'General' },
      { key: 'Ctrl + S', action: 'Save the document', actionBn: 'ডকুমেন্ট সেভ করুন', category: 'General' },
      { key: 'Ctrl + P', action: 'Print the document', actionBn: 'প্রিন্ট করুন', category: 'General' },
      { key: 'F12', action: 'Save As', actionBn: 'সেভ অ্যাজ (Save As)', category: 'General' },
      { key: 'Ctrl + W', action: 'Close the document', actionBn: 'ডকুমেন্ট বন্ধ করুন', category: 'General' },
      { key: 'Ctrl + Z', action: 'Undo', actionBn: 'আনডু (Undo)', category: 'Editing' },
      { key: 'Ctrl + Y', action: 'Redo', actionBn: 'রিডু (Redo)', category: 'Editing' },
      { key: 'Ctrl + F', action: 'Find text', actionBn: 'টেক্সট খুঁজুন', category: 'Editing' },
      { key: 'Ctrl + H', action: 'Replace text', actionBn: 'টেক্সট রিপ্লেস করুন', category: 'Editing' },
      { key: 'Ctrl + X', action: 'Cut selected content', actionBn: 'সিলেক্ট করা অংশ কাট করুন', category: 'Editing' },
      { key: 'Ctrl + C', action: 'Copy selected content', actionBn: 'সিলেক্ট করা অংশ কপি করুন', category: 'Editing' },
      { key: 'Ctrl + V', action: 'Paste content', actionBn: 'পেস্ট করুন', category: 'Editing' },
      { key: 'Ctrl + A', action: 'Select all content', actionBn: 'সবকিছু সিলেক্ট করুন', category: 'Selection' },
      { key: 'Ctrl + B', action: 'Apply bold formatting', actionBn: 'বোল্ড (Bold) করুন', category: 'Formatting' },
      { key: 'Ctrl + I', action: 'Apply italic formatting', actionBn: 'ইটালিক (Italic) করুন', category: 'Formatting' },
      { key: 'Ctrl + U', action: 'Apply underline formatting', actionBn: 'আন্ডারলাইন করুন', category: 'Formatting' },
      { key: 'Ctrl + ]', action: 'Increase font size', actionBn: 'ফন্ট সাইজ বাড়ান', category: 'Formatting' },
      { key: 'Ctrl + [', action: 'Decrease font size', actionBn: 'ফন্ট সাইজ কমান', category: 'Formatting' },
      { key: 'Ctrl + L', action: 'Left align text', actionBn: 'লেফট অ্যালাইন করুন', category: 'Formatting' },
      { key: 'Ctrl + E', action: 'Center align text', actionBn: 'সেন্টার অ্যালাইন করুন', category: 'Formatting' },
      { key: 'Ctrl + R', action: 'Right align text', actionBn: 'রাইট অ্যালাইন করুন', category: 'Formatting' },
      { key: 'Ctrl + J', action: 'Justify align text', actionBn: 'জাস্টিফাই অ্যালাইন করুন', category: 'Formatting' },
    ]
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    nameBn: 'মাইক্রোসফট এক্সেল',
    iconName: 'Table',
    color: '#217346',
    description: 'Spreadsheets and data analysis.',
    descriptionBn: 'স্প্রেডশিট এবং ডেটা বিশ্লেষণের জন্য।',
    shortcuts: [
      { key: 'F2', action: 'Edit the active cell', actionBn: 'সক্রিয় সেল এডিট করুন', category: 'Editing' },
      { key: 'F4', action: 'Repeat last action / Absolute ref', actionBn: 'শেষ কাজ রিপিট করুন', category: 'Editing' },
      { key: 'Ctrl + F1', action: 'Show or hide the ribbon', actionBn: 'রিবন দেখান বা লুকান', category: 'General' },
      { key: 'Alt + H + O + I', action: 'Auto-fit column width', actionBn: 'কলাম উইডথ অটো-ফিট করুন', category: 'Formatting' },
      { key: 'Ctrl + Shift + $', action: 'Apply Currency format', actionBn: 'কারেন্সি ফরম্যাট অ্যাপ্লাই করুন', category: 'Formatting' },
      { key: 'Ctrl + Shift + %', action: 'Apply Percentage format', actionBn: 'পার্সেন্টেজ ফরম্যাট অ্যাপ্লাই করুন', category: 'Formatting' },
      { key: 'Alt + =', action: 'Insert AutoSum formula', actionBn: 'অটোসাম ফর্মুলা যুক্ত করুন', category: 'Data' },
      { key: 'Ctrl + ;', action: 'Insert current date', actionBn: 'বর্তমান তারিখ বসান', category: 'Data' },
      { key: 'Ctrl + Shift + :', action: 'Insert current time', actionBn: 'বর্তমান সময় বসান', category: 'Data' },
      { key: 'Ctrl + PgDn', action: 'Switch to next worksheet', actionBn: 'পরবর্তী ওয়ার্কশিটে যান', category: 'Navigation' },
      { key: 'Ctrl + PgUp', action: 'Switch to previous worksheet', actionBn: 'পূর্ববর্তী ওয়ার্কশিটে যান', category: 'Navigation' },
      { key: 'Alt + Enter', action: 'Start a new line in same cell', actionBn: 'একই সেলে নতুন লাইন শুরু করুন', category: 'Editing' },
      { key: 'Ctrl + D', action: 'Fill Down', actionBn: 'নিচের সেলে ফিল করুন', category: 'Editing' },
      { key: 'Ctrl + R', action: 'Fill Right', actionBn: 'ডানে ফিল করুন', category: 'Editing' },
    ]
  },
  {
    id: 'powerpoint',
    name: 'Microsoft PowerPoint',
    nameBn: 'মাইক্রোসফট পাওয়ারপয়েন্ট',
    iconName: 'Layout',
    color: '#d24726',
    description: 'Presentation and slides.',
    descriptionBn: 'প্রেজেন্টেশন এবং স্লাইড তৈরির জন্য।',
    shortcuts: [
      { key: 'Ctrl + M', action: 'Insert a new slide', actionBn: 'নতুন স্লাইড যোগ করুন', category: 'General' },
      { key: 'Ctrl + D', action: 'Duplicate selected slide', actionBn: 'স্লাইড ডুপ্লিকেট করুন', category: 'Editing' },
      { key: 'F5', action: 'Start slide show from beginning', actionBn: 'শুরু থেকে স্লাইড শো শুরু করুন', category: 'Navigation' },
      { key: 'Shift + F5', action: 'Start slide show from current slide', actionBn: 'বর্তমান স্লাইড থেকে স্লাইড শো শুরু করুন', category: 'Navigation' },
      { key: 'Esc', action: 'End the slide show', actionBn: 'স্লাইড শো বন্ধ করুন', category: 'Navigation' },
      { key: 'Ctrl + G', action: 'Group objects', actionBn: 'অবজেক্ট গ্রুপ করুন', category: 'Editing' },
      { key: 'Ctrl + Shift + G', action: 'Ungroup objects', actionBn: 'আনগ্রুপ করুন', category: 'Editing' },
    ]
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    nameBn: 'মাইক্রোসফট আউটলুক',
    iconName: 'Mail',
    color: '#0078d4',
    description: 'Email and calendar management.',
    descriptionBn: 'ইমেল এবং ক্যালেন্ডার ব্যবস্থাপনার জন্য।',
    shortcuts: [
      { key: 'Ctrl + R', action: 'Reply to an email', actionBn: 'ইমেলের উত্তর দিন', category: 'General' },
      { key: 'Ctrl + Shift + R', action: 'Reply all to an email', actionBn: 'সবাইকে উত্তর দিন', category: 'General' },
      { key: 'Ctrl + F', action: 'Forward an email', actionBn: 'ইমেল ফরওয়ার্ড করুন', category: 'General' },
      { key: 'Ctrl + 1', action: 'Switch to Mail view', actionBn: 'মেইল ভিউতে যান', category: 'Navigation' },
      { key: 'Ctrl + 2', action: 'Switch to Calendar view', actionBn: 'ক্যালেন্ডার ভিউতে যান', category: 'Navigation' },
      { key: 'Ctrl + N', action: 'Create new item (email, appt, etc.)', actionBn: 'নতুন কিছু তৈরি করুন', category: 'General' },
    ]
  },
  {
    id: 'access',
    name: 'Microsoft Access',
    nameBn: 'মাইক্রোসফট অ্যাক্সেস',
    iconName: 'Database',
    color: '#a4373a',
    description: 'Database management system.',
    descriptionBn: 'ডেটাবেস ম্যানেজমেন্ট সিস্টেম।',
    shortcuts: [
      { key: 'F11', action: 'Show/Hide Navigation Pane', actionBn: 'ন্যাভিগেশন প্যান দেখান/লুকান', category: 'General' },
      { key: 'Ctrl + F', action: 'Find records', actionBn: 'রেকর্ড খুঁজুন', category: 'Data' },
      { key: 'Ctrl + Grave (`)', action: 'Toggle Datasheet/Design view', actionBn: 'ডিজাইন/ডেটাশিট ভিউ টগল করুন', category: 'Navigation' },
      { key: 'Shift + Enter', action: 'Save changes to current record', actionBn: 'রেকর্ড সেভ করুন', category: 'General' },
    ]
  },
  {
    id: 'onenote',
    name: 'Microsoft OneNote',
    nameBn: 'মাইক্রোসফট ওয়াননোট',
    iconName: 'BookOpen',
    color: '#7719aa',
    description: 'Digital note-taking app.',
    descriptionBn: 'ডিজিটাল নোট নেওয়ার জন্য।',
    shortcuts: [
      { key: 'Ctrl + N', action: 'Create a new page', actionBn: 'নতুন পেজ তৈরি করুন', category: 'General' },
      { key: 'Ctrl + Alt + N', action: 'Create a new section', actionBn: 'নতুন সেকশন তৈরি করুন', category: 'General' },
      { key: 'Ctrl + Shift + N', action: 'Create a new notebook', actionBn: 'নতুন নোটবুক তৈরি করুন', category: 'General' },
      { key: 'Ctrl + K', action: 'Insert a link', actionBn: 'লিঙ্ক যোগ করুন', category: 'Editing' },
      { key: 'Alt + Shift + D', action: 'Insert current date', actionBn: 'বর্তমান তারিখ দিন', category: 'Data' },
    ]
  }
];
