'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Mic2,
  Bot,
  Layers,
  Rocket,
  X,
  ChevronRight,
  ChevronLeft,
  User,
  Stethoscope,
  Code2,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Award,
  GraduationCap,
  Radio,
  Headphones,
  Brain,
  MessageCircle,
  Star,
  Globe,
  FlaskConical,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { withBasePath } from '@/lib/basePath';

// Web Audio API Sound Synthesizer for High-Tech SFX
const playNeonSFX = (frequency = 600, duration = 0.08, type: OscillatorType = 'sine') => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore if audio policy blocks
  }
};

interface TourStep {
  id: string;
  stepNum: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  bullets: { title: string; desc: string; icon?: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }> }[];
  accentColor: string;
  glowColor: string;
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  portalCta?: boolean;
}

const getTourSteps = (locale: string): TourStep[] => {
  if (locale === 'hi') {
    return [
      {
        id: 'step-moumita-research',
        stepNum: '01',
        tabLabel: 'प्रेरणा और दृष्टिकोण',
        badge: 'रोगी सेवा के प्रति समर्पण',
        title: 'डॉ. मौमिता देबनाथ: जीवन और प्रेरणा',
        subtitle: 'आर.जी. कर मेडिकल कॉलेज में चेस्ट मेडिसिन की समर्पित स्नातकोत्तर प्रशिक्षु, जिनकी करुणा और मानवीय दृष्टिकोण ने इस परियोजना को प्रेरित किया।',
        quote: 'स्वास्थ्य सेवा की शुरुआत पूरे इंसान को देखने से होती है — शरीर, मन और सम्मान। सच्ची देखभाल मानवीय आदर से ही संभव है।',
        author: 'डॉ. मौमिता देबनाथ की स्मृति में',
        accentColor: '#ff007f',
        glowColor: 'rgba(255, 0, 127, 0.35)',
        icon: Heart,
        bullets: [
          {
            title: 'चेस्ट व श्वसन रोग प्रशिक्षु',
            desc: 'श्वसन स्वास्थ्य और रोगियों के उपचार व निदान के लिए निरंतर समर्पित रहीं।',
            icon: Stethoscope,
          },
          {
            title: 'स्वास्थ्य सेवा में संवेदना',
            desc: 'उनका दृढ़ विश्वास था कि हर मरीज स्पष्ट संवाद और गरिमामय देखभाल का हकदार है।',
            icon: Heart,
          },
          {
            title: 'अल्टीमेटहेल्थ की प्रेरणा',
            desc: 'उनकी स्मृति में शुरू की गई एक ओपन-सोर्स पहल ताकि स्वास्थ्य ज्ञान सभी के लिए सुलभ हो।',
            icon: Award,
          },
        ],
      },
      {
        id: 'step-curated-library',
        stepNum: '02',
        tabLabel: 'लेख और शब्दावली',
        badge: 'ओपन स्वास्थ्य ज्ञान',
        title: 'स्वास्थ्य लेख और चिकित्सा शब्दावली',
        subtitle: 'कई भाषाओं में समुदाय द्वारा लिखे गए कल्याण मार्गदर्शिकाओं और सरल चिकित्सा शब्दावली का संग्रह।',
        quote: 'स्वास्थ्य ज्ञान समझने योग्य, सुलभ और किसी भी बाधा से मुक्त होना चाहिए।',
        author: 'अल्टीमेटहेल्थ ज्ञान केंद्र',
        accentColor: '#00f0ff',
        glowColor: 'rgba(0, 240, 255, 0.35)',
        icon: BookOpen,
        bullets: [
          {
            title: 'समुदाय स्वास्थ्य लेख',
            desc: 'दैनिक स्वास्थ्य, रोकथाम, मानसिक कल्याण और स्वस्थ जीवनशैली पर उपयोगी लेख।',
            icon: BookOpen,
          },
          {
            title: 'चिकित्सा शब्दावली',
            desc: 'जटिल चिकित्सा शब्दों के सरल अर्थ खोजें ताकि स्वास्थ्य जानकारी समझना आसान हो।',
            icon: Sparkles,
          },
          {
            title: 'भारतीय और वैश्विक भाषाएँ',
            desc: 'हिन्दी और बंगाली सहित अंग्रेजी, जर्मन, स्पैनिश और फ्रेंच में उपलब्ध।',
            icon: Globe,
          },
        ],
      },
      {
        id: 'step-community-podcasts',
        stepNum: '03',
        tabLabel: 'ऑडियो और पॉडकास्ट',
        badge: 'समुदाय ऑडियो',
        title: 'समुदाय पॉडकास्ट और कहानियाँ',
        subtitle: 'वेब पर समुदाय के सदस्यों द्वारा साझा किए गए स्वास्थ्य अनुभवों और कल्याण बातचीत को सुनें।',
        quote: 'स्वास्थ्य अनुभवों को साझा करने से लोगों को सहयोग और ज्ञान मिलता है।',
        author: 'समुदाय ऑडियो अनुभाग',
        accentColor: '#ffea00',
        glowColor: 'rgba(255, 234, 0, 0.35)',
        icon: Mic2,
        bullets: [
          {
            title: 'पॉडकास्ट सुनें',
            desc: 'वेबसाइट पर सीधे स्वास्थ्य चर्चाएं और व्यक्तिगत अनुभव सुनें।',
            icon: Headphones,
          },
          {
            title: 'मोबाइल ऐप पर रिकॉर्ड करें',
            desc: 'पॉडकास्ट रिकॉर्डिंग और अपलोड अल्टीमेटहेल्थ एंड्रॉइड मोबाइल ऐप पर उपलब्ध है।',
            icon: Radio,
          },
          {
            title: 'सरल वेब स्ट्रीमिंग',
            desc: 'बिना किसी रुकावट या विज्ञापन के आसानी से ऑडियो स्ट्रीम करें।',
            icon: Volume2,
          },
        ],
      },
      {
        id: 'step-ai-assistant',
        stepNum: '04',
        tabLabel: 'एआई सहायक',
        badge: 'एआई कल्याण मार्गदर्शन',
        title: 'एआई स्वास्थ्य सहायक और मार्गदर्शन',
        subtitle: 'सामान्य स्वास्थ्य प्रश्नों, लक्षणों को समझने और दैनिक कल्याण सुझावों के लिए एआई टूल।',
        quote: 'एआई आपको डॉक्टर से परामर्श करने से पहले आवश्यक प्रश्न तैयार करने में मदद कर सकता है।',
        author: 'एआई स्वास्थ्य साथी',
        accentColor: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.35)',
        icon: Bot,
        bullets: [
          {
            title: 'दैनिक स्वास्थ्य प्रश्न',
            desc: 'सामान्य स्वास्थ्य और जीवनशैली से जुड़े सवाल पूछें और सरल भाषा में उत्तर पाएं।',
            icon: Brain,
          },
          {
            title: 'शैक्षणिक व गैर-नैदानिक',
            desc: 'यह शैक्षणिक सहायता और प्राथमिक सुझाव प्रदान करता है — डॉक्टर की सलाह का विकल्प नहीं है।',
            icon: MessageCircle,
          },
          {
            title: 'गोपनीय और निःशुल्क',
            desc: 'पूर्णतः सुरक्षित और बिना किसी व्यक्तिगत डेटा ट्रैकिंग के उपयोग करें।',
            icon: CheckCircle2,
          },
        ],
      },
      {
        id: 'step-portals-features',
        stepNum: '05',
        tabLabel: 'मंच एक्सप्लोर करें',
        badge: 'ओपन सोर्स समुदाय',
        title: 'अल्टीमेटहेल्थ से जुड़ें और एक्सप्लोर करें',
        subtitle: 'गिटहब पर समुदाय द्वारा निर्मित एक ओपन-सोर्स प्लेटफॉर्म। आगे बढ़ने के लिए अपना अनुभाग चुनें।',
        quote: 'सभी के लिए खुला — डॉक्टर, छात्र, डेवलपर्स और आम लोग समान रूप से जुड़ सकते हैं।',
        author: 'अल्टीमेटहेल्थ समुदाय',
        accentColor: '#c084fc',
        glowColor: 'rgba(192, 132, 252, 0.35)',
        icon: Rocket,
        portalCta: true,
        bullets: [
          {
            title: 'डॉक्टर सुइट और समीक्षा',
            desc: 'डॉक्टरों और मेडिकल छात्रों के लिए स्वास्थ्य सामग्री की समीक्षा करने का मंच।',
            icon: Stethoscope,
          },
          {
            title: 'गिटहब पर ओपन सोर्स',
            desc: 'डेवलपर्स, अनुवादक और लेखक गिटहब पर कोड या लेख जोड़कर सहयोग कर सकते हैं।',
            icon: Code2,
          },
          {
            title: 'पोर्टल्स देखें',
            desc: 'लेख पढ़ने, शब्दावली देखने या गिटहब पर योगदान देने के लिए नीचे दिए गए लिंक पर क्लिक करें।',
            icon: Rocket,
          },
        ],
      },
    ];
  }

  if (locale === 'bn') {
    return [
      {
        id: 'step-moumita-research',
        stepNum: '01',
        tabLabel: 'অনুপ্রেরণা ও দৃষ্টিভঙ্গি',
        badge: 'রোগী সেবায় উৎসর্গ',
        title: 'ডাঃ মৌমিতা দেবনাথ: জীবন ও অনুপ্রেরণা',
        subtitle: 'আর.জি. কর মেডিকেল কলেজের বক্ষব্যাধি বিভাগের নিবেদিতপ্রাণ স্নাতকোত্তর গবেষক, যাঁর মানবিক দৃষ্টিভঙ্গি এই প্রকল্পকে অনুপ্রাণিত করেছে।',
        quote: 'চিকিৎসা সেবার সূচনা হয় একজন মানুষকে সম্পূর্ণভাবে জানার মাধ্যমে — দেহ, মন এবং মানবিক মর্যাদা দিয়ে।',
        author: 'ডাঃ মৌমিতা দেবনাথের স্মরণে',
        accentColor: '#ff007f',
        glowColor: 'rgba(255, 0, 127, 0.35)',
        icon: Heart,
        bullets: [
          {
            title: 'বক্ষব্যাধি ও শ্বাসযন্ত্র বিশেষজ্ঞ',
            desc: 'শ্বাসযন্ত্রের স্বাস্থ্য ও রোগীদের সঠিক রোগ নির্ণয়ে নিরলস সেবা প্রদান করেছিলেন।',
            icon: Stethoscope,
          },
          {
            title: 'চিকিৎসায় সহানুভূতি ও শ্রদ্ধা',
            desc: 'বিশ্বাস করতেন যে প্রতিটি রোগী পূর্ণ মর্যাদা ও স্পষ্ট যোগাযোগের অধিকার রাখেন।',
            icon: Heart,
          },
          {
            title: 'আল্টিমেটহেলথের অনুপ্রেরণা',
            desc: 'তাঁর স্মরণে সৃষ্ট উন্মুক্ত স্বাস্থ্য উদ্যোগ যা সবার জন্য জ্ঞান সহজলভ্য করে।',
            icon: Award,
          },
        ],
      },
      {
        id: 'step-curated-library',
        stepNum: '02',
        tabLabel: 'নিবন্ধ ও পরিভাষা',
        badge: 'উন্মুক্ত স্বাস্থ্য জ্ঞান',
        title: 'স্বাস্থ্য নিবন্ধ ও চিকিৎসা পরিভাষা',
        subtitle: 'সহজ ভাষায় লেখা স্বাস্থ্য ও সুস্থতা নির্দেশিকা এবং চিকিৎসা পরিভাষার বিশাল সংগ্রহ।',
        quote: 'স্বাস্থ্য তথ্য সহজবোধ্য, অবাধ এবং সবার জন্য উন্মুক্ত হওয়া উচিত।',
        author: 'আল্টিমেটহেলথ জ্ঞান কেন্দ্র',
        accentColor: '#00f0ff',
        glowColor: 'rgba(0, 240, 255, 0.35)',
        icon: BookOpen,
        bullets: [
          {
            title: 'কমিউনিটি স্বাস্থ্য নিবন্ধ',
            desc: 'দৈনন্দিন স্বাস্থ্য, মানসিক সুস্থতা এবং প্রতিরোধমূলক ব্যবস্থার নির্দেশিকা।',
            icon: BookOpen,
          },
          {
            title: 'অনুসন্ধানযোগ্য পরিভাষা',
            desc: 'জটিল চিকিৎসা শব্দের সহজ অর্থ ও ব্যাখ্যা জানুন।',
            icon: Sparkles,
          },
          {
            title: 'ভারতীয় ও আন্তর্জাতিক ভাষা',
            desc: 'বাংলা ও হিন্দির পাশাপাশি ইংরেজি, জার্মান, স্প্যানিশ এবং ফরাসি ভাষায় উপলব্ধ।',
            icon: Globe,
          },
        ],
      },
      {
        id: 'step-community-podcasts',
        stepNum: '03',
        tabLabel: 'অডিও ও পডকাস্ট',
        badge: 'কমিউনিটি অডিও',
        title: 'কমিউনিটি পডকাস্ট ও গল্প',
        subtitle: 'ওয়েবে সরাসরি শুনুন কমিউনিটির সদস্যদের শেয়ার করা স্বাস্থ্য পরামর্শ ও অভিজ্ঞতা।',
        quote: 'স্বাস্থ্য সচেতনতা ও অভিজ্ঞতা ভাগ করে নিলে সবাই উপকৃত হয়।',
        author: 'কমিউনিটি অডিও বিভাগ',
        accentColor: '#ffea00',
        glowColor: 'rgba(255, 234, 0, 0.35)',
        icon: Mic2,
        bullets: [
          {
            title: 'পডকাস্ট শুনুন',
            desc: 'ওয়েবসাইটে সরাসরি পডকাস্ট এবং সুস্থতার আলোচনা শুনুন।',
            icon: Headphones,
          },
          {
            title: 'মোবাইল অ্যাপে রেকর্ড করুন',
            desc: 'পডকাস্ট তৈরি এবং আপলোড করার সুবিধা রয়েছে আল্টিমেটহেলথ অ্যান্ড্রয়েড অ্যাপে।',
            icon: Radio,
          },
          {
            title: 'সহজ ওয়েব স্ট্রিমিং',
            desc: 'কোনো বিজ্ঞাপন বা জটিলতা ছাড়াই তাৎক্ষণিক অডিও শুনুন।',
            icon: Volume2,
          },
        ],
      },
      {
        id: 'step-ai-assistant',
        stepNum: '04',
        tabLabel: 'এআই সহায়ক',
        badge: 'এআই স্বাস্থ্য পরামর্শ',
        title: 'এআই স্বাস্থ্য সহায়ক ও নির্দেশিকা',
        subtitle: 'সাধারণ স্বাস্থ্য প্রশ্ন ও সুস্থতার পরামর্শের জন্য বুদ্ধিমত্তা ভিত্তিক সহায়ক।',
        quote: 'এআই চিকিৎসকের সাথে পরামর্শ করার আগে আপনাকে সঠিক প্রশ্ন তৈরি করতে সাহায্য করে।',
        author: 'এআই স্বাস্থ্য সঙ্গী',
        accentColor: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.35)',
        icon: Bot,
        bullets: [
          {
            title: 'দৈনন্দিন স্বাস্থ্য জিজ্ঞাসা',
            desc: 'সাধারণ স্বাস্থ্য ও জীবনযাত্রার বিষয়ে প্রশ্ন করে পরিষ্কার উত্তর পান।',
            icon: Brain,
          },
          {
            title: 'শিক্ষামূলক ও প্রাথমিক',
            desc: 'প্রাথমিক ধারণা ও পরামর্শ দেয় — তবে চিকিৎসকের বিকল্প নয়।',
            icon: MessageCircle,
          },
          {
            title: 'সম্পূর্ণ নিরাপদ ও উন্মুক্ত',
            desc: 'ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করে বিনামূল্যে ব্যবহার করুন।',
            icon: CheckCircle2,
          },
        ],
      },
      {
        id: 'step-portals-features',
        stepNum: '05',
        tabLabel: 'প্ল্যাটফর্ম অন্বেষণ',
        badge: 'ওপেন সোর্স কমিউনিটি',
        title: 'আল্টিমেটহেলথ ঘুরে দেখুন ও যুক্ত হন',
        subtitle: 'গিটহাবে উন্মুক্তভাবে তৈরি একটি স্বাস্থ্য উদ্যোগ। আপনার পছন্দের বিভাগ বেছে নিন।',
        quote: 'সবার জন্য উন্মুক্ত — চিকিৎসক, শিক্ষার্থী, ডেভেলপার এবং সাধারণ মানুষ।',
        author: 'আল্টিমেটহেলথ কমিউনিটি',
        accentColor: '#c084fc',
        glowColor: 'rgba(192, 132, 252, 0.35)',
        icon: Rocket,
        portalCta: true,
        bullets: [
          {
            title: 'ডাক্তার স্যুট ও পর্যালোচনা',
            desc: 'চিকিৎসকদের জন্য স্বাস্থ্য বিষয়ক তথ্যের নির্ভুলতা যাচাইয়ের সুযোগ।',
            icon: Stethoscope,
          },
          {
            title: 'গিটহাবে ওপেন সোর্স',
            desc: 'উন্মুক্ত প্রযুক্তি তৈরিতে ডেভেলপার এবং অনুবাদকরা গিটহাবে যোগ দিতে পারেন।',
            icon: Code2,
          },
          {
            title: 'পোর্টাল নির্বাচন করুন',
            desc: 'নিবন্ধ পড়তে বা অবদান রাখতে নিচে দেওয়া বিভাগগুলোতে ক্লিক করুন।',
            icon: Rocket,
          },
        ],
      },
    ];
  }

  if (locale === 'ta') {
    return [
      {
        id: 'step-moumita-research',
        stepNum: '01',
        tabLabel: 'ஊக்கம் & பார்வை',
        badge: 'நோயாளி சேவைக்கான அர்ப்பணிப்பு',
        title: 'டாக்டர் மௌமிதா தேப்நாத்: வாழ்க்கை & ஊக்கம்',
        subtitle: 'ஆர்.ஜி. கர் மருத்துவக் கல்லூரியின் மார்பு மருத்துவப் பிரிவு முதுகலை பயிற்சியாளர், இவரது மனிதநேயமும் அர்ப்பணிப்பும் இந்தத் திட்டத்திற்கு உந்துசக்தியாக அமைந்தது.',
        quote: 'சுகாதார சேவை என்பது ஒரு மனிதனை முழுமையாகப் பார்ப்பதில் தொடங்குகிறது — உடல், மனம் மற்றும் கண்ணியம். உண்மையான கவனிப்புக்கு அசைக்க முடியாத அர்ப்பணிப்பும் மனித மரியாதையும் தேவை.',
        author: 'டாக்டர் மௌமிதா தேப்நாத் அவர்களின் நினைவாக',
        accentColor: '#ff007f',
        glowColor: 'rgba(255, 0, 127, 0.35)',
        icon: Heart,
        bullets: [
          {
            title: 'மார்பு மற்றும் சுவாச நோய் பயிற்சியாளர்',
            desc: 'சுவாச நல்வாழ்வு மற்றும் நோயாளிகளின் நோய் கண்டறிதல் மற்றும் சிகிச்சைக்குத் தன்னை அர்ப்பணித்தவர்.',
            icon: Stethoscope,
          },
          {
            title: 'சுகாதாரத்தில் பரிவும் மனித மரியாதையும்',
            desc: 'ஒவ்வொரு நோயாளியும் தெளிவான தகவல் தொடர்பு மற்றும் கண்ணியமான கவனிப்பிற்கு தகுதியானவர் என்பதில் உறுதியான நம்பிக்கை கொண்டிருந்தார்.',
            icon: Heart,
          },
          {
            title: 'அல்டிமேட்ஹெல்த் உருவான உந்துதல்',
            desc: 'அனைவருக்கும் மருத்துவ அறிவு எளிய முறையில் கிடைக்க அவரது நினைவாகத் தொடங்கப்பட்ட திறந்த மூல முன்முயற்சி.',
            icon: Award,
          },
        ],
      },
      {
        id: 'step-curated-library',
        stepNum: '02',
        tabLabel: 'கட்டுரைகள் & சொல்லகராதி',
        badge: 'திறந்த சுகாதார அறிவு',
        title: 'சுகாதாரக் கட்டுரைகள் மற்றும் மருத்துவச் சொல்லகராதி',
        subtitle: 'சமூகத்தால் உருவாக்கப்பட்ட நல்வாழ்வு வழிகாட்டிகள் மற்றும் எளிய மருத்துவ விளக்கங்களின் தொகுப்பு.',
        quote: 'சுகாதாரத் தகவல்கள் கட்டணங்களின்றி, எளிய மொழியில் அனைவருக்கும் எளிதில் கிடைக்க வேண்டும்.',
        author: 'அல்டிமேட்ஹெல்த் அறிவு மையம்',
        accentColor: '#00f0ff',
        glowColor: 'rgba(0, 240, 255, 0.35)',
        icon: BookOpen,
        bullets: [
          {
            title: 'சமூக சுகாதாரக் கட்டுரைகள்',
            desc: 'அன்றாட நல்வாழ்வு, நோய் தடுப்பு, மன ஆரோக்கியம் மற்றும் ஆரோக்கியமான வாழ்க்கை முறை பற்றிய பயனுள்ள கட்டுரைகள்.',
            icon: BookOpen,
          },
          {
            title: 'மருத்துவச் சொல்லகராதி',
            desc: 'கடினமான மருத்துவச் சொற்களுக்கான எளிய விளக்கங்களைத் தேடி உடனடியாகப் புரிந்து கொள்ளுங்கள்.',
            icon: Sparkles,
          },
          {
            title: 'தமிழ் மற்றும் பிற மொழிகள்',
            desc: 'தமிழ், இந்தி, வங்கம், ஒடியா உட்பட ஆங்கிலம், ஜெர்மன், ஸ்பானிஷ் மற்றும் பிரெஞ்சு மொழிகளில் கிடைக்கிறது.',
            icon: Globe,
          },
        ],
      },
      {
        id: 'step-community-podcasts',
        stepNum: '03',
        tabLabel: 'ஆடியோ & பாட்காஸ்ட்',
        badge: 'சமூக ஆடியோ',
        title: 'சமூக பாட்காஸ்ட்கள் மற்றும் ஆடியோ கதைகள்',
        subtitle: 'வலைத்தளத்தில் சமூக உறுப்பினர்களால் பகிரப்பட்ட நல்வாழ்வு உரையாடல்கள் மற்றும் சுகாதார அனுபவங்களைக் கேளுங்கள்.',
        quote: 'சுகாதார அனுபவங்களைப் பகிர்வது மக்களுக்கு ஆதரவையும் புரிதலையும் வழங்குகிறது.',
        author: 'சமூக ஆடியோ பகுதி',
        accentColor: '#ffea00',
        glowColor: 'rgba(255, 234, 0, 0.35)',
        icon: Mic2,
        bullets: [
          {
            title: 'பாட்காஸ்ட் கேளுங்கள்',
            desc: 'வலைத்தளத்தில் நேரடியாக சுகாதார விவாதங்கள் மற்றும் தனிப்பட்ட மீட்புக் கதைகளைக் கேளுங்கள்.',
            icon: Headphones,
          },
          {
            title: 'மொபைல் செயலியில் பதிவு செய்யுங்கள்',
            desc: 'பாட்காஸ்ட் பதிவு செய்தல் மற்றும் பதிவேற்றம் அல்டிமேட்ஹெல்த் ஆண்ட்ராய்டு மொபைல் செயலியில் கிடைக்கிறது.',
            icon: Radio,
          },
          {
            title: 'எளிய ஸ்ட்ரீமிங்',
            desc: 'விளம்பரங்கள் அல்லது தடைகள் ஏதுமின்றி உலாவியில் நேரடியாக ஆடியோ கேளுங்கள்.',
            icon: Volume2,
          },
        ],
      },
      {
        id: 'step-ai-assistant',
        stepNum: '04',
        tabLabel: 'AI உதவியாளர்',
        badge: 'AI நல்வாழ்வு வழிகாட்டுதல்',
        title: 'AI சுகாதார உதவியாளர் மற்றும் வழிகாட்டுதல்',
        subtitle: 'பொதுவான சுகாதாரக் கேள்விகள் மற்றும் அன்றாட நல்வாழ்வு ஆலோசனைகளுக்கான உரையாடல் AI கருவி.',
        quote: 'மருத்துவரைச் சந்திக்கும் முன் தேவையான கேள்விகளைத் தயார் செய்ய AI உங்களுக்கு உதவும்.',
        author: 'AI சுகாதார தோழன்',
        accentColor: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.35)',
        icon: Bot,
        bullets: [
          {
            title: 'அன்றாட சுகாதாரக் கேள்விகள்',
            desc: 'வாழ்க்கை முறை மற்றும் நல்வாழ்வு கேள்விகளைக் கேட்டு தெளிவான விளக்கங்களைப் பெறுங்கள்.',
            icon: Brain,
          },
          {
            title: 'கல்வி மற்றும் தகவல் நோக்கம்',
            desc: 'இது கல்வி வழிகாட்டுதலை மட்டுமே வழங்குகிறது — மருத்துவ சிகிச்சைக்கு மாற்றாகாது.',
            icon: MessageCircle,
          },
          {
            title: 'பாதுகாப்பானது & இலவசம்',
            desc: 'எந்தவொரு தனிப்பட்ட தரவு கண்காணிப்பும் இல்லாமல் முற்றிலும் இலவசமாகப் பயன்படுத்துங்கள்.',
            icon: CheckCircle2,
          },
        ],
      },
      {
        id: 'step-portals-features',
        stepNum: '05',
        tabLabel: 'தளத்தை ஆராயுங்கள்',
        badge: 'திறந்த மூல சமூகம்',
        title: 'அல்டிமேட்ஹெல்த்தில் இணையுங்கள் & ஆராயுங்கள்',
        subtitle: 'GitHub இல் திறந்த முறையில் கட்டமைக்கப்பட்ட சுகாதார முன்முயற்சி. உங்கள் பகுதியைத் தேர்வுசெய்யவும்.',
        quote: 'அனைவருக்கும் திறந்தது — மருத்துவர்கள், மாணவர்கள், டெவலப்பர்கள் மற்றும் பொதுமக்கள்.',
        author: 'அல்டிமேட்ஹெல்த் சமூகம்',
        accentColor: '#c084fc',
        glowColor: 'rgba(192, 132, 252, 0.35)',
        icon: Rocket,
        portalCta: true,
        bullets: [
          {
            title: 'மருத்துவர் தளம் & ஆய்வு',
            desc: 'மருத்துவர்கள் மற்றும் மாணவர்கள் சுகாதாரத் தகவல்களை மதிப்பாய்வு செய்ய ஒரு தளம்.',
            icon: Stethoscope,
          },
          {
            title: 'GitHub-ல் திறந்த மூலம்',
            desc: 'டெவலப்பர்கள் மற்றும் மொழிபெயர்ப்பாளர்கள் GitHub வழியாக பங்களிக்கலாம்.',
            icon: Code2,
          },
          {
            title: 'பிரிவுகளைத் தேர்வுசெய்க',
            desc: 'கட்டுரைகளைப் படிக்க அல்லது பங்களிக்க கீழே உள்ள இணைப்புகளைக் கிளிக் செய்யவும்.',
            icon: Rocket,
          },
        ],
      },
    ];
  }

  if (locale === 'or') {
    return [
      {
        id: 'step-moumita-research',
        stepNum: '01',
        tabLabel: 'ପ୍ରେରଣା ଓ ଦୃଷ୍ଟିକୋଣ',
        badge: 'ରୋଗୀ ସେବା ପ୍ରତି ସମର୍ପଣ',
        title: 'ଡାକ୍ତର ମୌମିତା ଦେବନାଥ: ଜୀବନ ଓ ପ୍ରେରଣା',
        subtitle: 'ଆର୍.ଜି. କର ମେଡିକାଲ କଲେଜର ଛାତି ରୋଗ ବିଭାଗର ନିଷ୍ଠାପର ସ୍ନାତକୋତ୍ତର ଗବେଷକ, ଯାହାଙ୍କର ମାନବିକ ଦୃଷ୍ଟିକୋଣ ଏହି ପ୍ରକଳ୍ପକୁ ପ୍ରେରିତ କରିଛି।',
        quote: 'ସ୍ୱାସ୍ଥ୍ୟସେବାର ଆରମ୍ଭ ଜଣେ ବ୍ୟକ୍ତିଙ୍କୁ ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ଦେଖିବାରୁ ଆରମ୍ଭ ହୁଏ — ଶରୀର, ମନ ଏବଂ ସମ୍ମାନ। ପ୍ରକୃତ ସେବା ପାଇଁ ଅତୁଳନୀୟ ସମର୍ପଣ ଏବଂ ମାନବିକ ଆଦର ଆବଶ୍ୟକ।',
        author: 'ଡାକ୍ତର ମୌମିତା ଦେବନାଥଙ୍କ ସ୍ମୃତିରେ',
        accentColor: '#ff007f',
        glowColor: 'rgba(255, 0, 127, 0.35)',
        icon: Heart,
        bullets: [
          {
            title: 'ଛାତି ଓ ଶ୍ୱାସରୋଗ ପ୍ରଶିକ୍ଷାର୍ଥୀ',
            desc: 'ଶ୍ୱାସକ୍ରିୟା ସ୍ୱାସ୍ଥ୍ୟ ଓ ରୋଗୀଙ୍କ ସଠିକ୍ ରୋଗ ନିର୍ଣ୍ଣୟ ପାଇଁ ନିରନ୍ତର ସେବା ପ୍ରଦାନ କରିଥିଲେ।',
            icon: Stethoscope,
          },
          {
            title: 'ଚିକିତ୍ସାରେ ସହାନୁଭୂତି ଓ ସମ୍ମାନ',
            desc: 'ଦୃଢ଼ ବିଶ୍ୱାସ ଥିଲା ଯେ ପ୍ରତ୍ୟେକ ରୋଗୀ ସ୍ପଷ୍ଟ ସୂଚନା ଓ ମର୍ଯ୍ୟାଦାପୂର୍ଣ୍ଣ ସେବା ପାଇବାକୁ ଯୋଗ୍ୟ।',
            icon: Heart,
          },
          {
            title: 'ଅଲ୍ଟିମେଟ୍‌ହେଲ୍‌ଥ୍‌ର ପ୍ରେରଣା',
            desc: 'ତାଙ୍କ ସ୍ମୃତିରେ ସୃଷ୍ଟ ଏକ ଓପନ୍ ସୋର୍ସ୍ ପଦକ୍ଷେପ ଯାହା ସମସ୍ତଙ୍କ ପାଇଁ ସ୍ୱାସ୍ଥ୍ୟ ଜ୍ଞାନକୁ ସହଜଲଭ୍ୟ କରେ।',
            icon: Award,
          },
        ],
      },
      {
        id: 'step-curated-library',
        stepNum: '02',
        tabLabel: 'ପ୍ରବନ୍ଧ ଓ ଶବ୍ଦକୋଷ',
        badge: 'ମୁକ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ଜ୍ଞାନ',
        title: 'ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରବନ୍ଧ ଏବଂ ଚିକିତ୍ସା ଶବ୍ଦକୋଷ',
        subtitle: 'ଏକାଧିକ ଭାଷାରେ ସମ୍ପ୍ରଦାୟ ଦ୍ୱାରା ଲିଖିତ ସ୍ୱାସ୍ଥ୍ୟ ଗାଇଡ୍ ଏବଂ ସରଳ ମେଡିକାଲ ଶବ୍ଦକୋଷର ଭଣ୍ଡାର।',
        quote: 'ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ସରଳ, ସୁଲଭ ଏବଂ କୌଣସି ଶୁଳ୍କ ବିନା ସମସ୍ତଙ୍କ ନିକଟରେ ପହଞ୍ଚିବା ଉଚିତ।',
        author: 'ଅଲ୍ଟିମେଟ୍‌ହେଲ୍‌ଥ୍ ଜ୍ଞାନ କେନ୍ଦ୍ର',
        accentColor: '#00f0ff',
        glowColor: 'rgba(0, 240, 255, 0.35)',
        icon: BookOpen,
        bullets: [
          {
            title: 'ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରବନ୍ଧ',
            desc: 'ଦୈନନ୍ଦିନ ସ୍ୱାସ୍ଥ୍ୟ, ପ୍ରତିଷେଧକ ଅଭ୍ୟାସ ଏବଂ ମାନସିକ ସୁସ୍ଥତା ଉପରେ ଉପଯୋଗୀ ଲେଖା।',
            icon: BookOpen,
          },
          {
            title: 'ଚିକିତ୍ସା ଶବ୍ଦକୋଷ',
            desc: 'ଜଟିଳ ଡାକ୍ତରୀ ଶବ୍ଦଗୁଡ଼ିକର ସରଳ ଓଡ଼ିଆ ଅର୍ଥ ଖୋଜି ସହଜରେ ବୁଝନ୍ତୁ।',
            icon: Sparkles,
          },
          {
            title: 'ଓଡ଼ିଆ ଓ ଅନ୍ୟାନ୍ୟ ଭାଷା',
            desc: 'ଓଡ଼ିଆ, ତାମିଲ, ହିନ୍ଦୀ, ବଙ୍ଗଳା ଏବଂ ବିଶ୍ୱସ୍ତରୀୟ ଭାଷାରେ ଉପଲବ୍ଧ।',
            icon: Globe,
          },
        ],
      },
      {
        id: 'step-community-podcasts',
        stepNum: '03',
        tabLabel: 'ଅଡିଓ ଓ ପଡ଼କାଷ୍ଟ',
        badge: 'କମ୍ୟୁନିଟି ଅଡିଓ',
        title: 'କମ୍ୟୁନିଟି ପଡ଼କାଷ୍ଟ ଓ ଅନୁଭୂତି',
        subtitle: 'ୱେବ୍‌ରେ ସଦସ୍ୟମାନଙ୍କ ଦ୍ୱାରା ସେୟାର୍ ହୋଇଥିବା ସ୍ୱାସ୍ଥ୍ୟ ଆଲୋଚନା ଓ ଅନୁଭୂତି ଶୁଣନ୍ତୁ।',
        quote: 'ସ୍ୱାସ୍ଥ୍ୟ ଅନୁଭୂତି ବାଣ୍ଟିବା ଦ୍ୱାରା ଲୋକମାନଙ୍କୁ ସହଯୋଗ ଓ ପ୍ରେରଣା ମିଳେ।',
        author: 'କମ୍ୟୁନିଟି ଅଡିଓ ବିଭାଗ',
        accentColor: '#ffea00',
        glowColor: 'rgba(255, 234, 0, 0.35)',
        icon: Mic2,
        bullets: [
          {
            title: 'ପଡ଼କାଷ୍ଟ ଶୁଣନ୍ତୁ',
            desc: 'ୱେବସାଇଟ୍‌ରେ ସିଧାସଳଖ ସ୍ୱାସ୍ଥ୍ୟ ବାର୍ତ୍ତାଳାପ ଓ ଅନୁଭୂତି ଶୁଣନ୍ତୁ।',
            icon: Headphones,
          },
          {
            title: 'ମୋବାଇଲ୍ ଆପ୍‌ରେ ରେକର୍ଡ କରନ୍ତୁ',
            desc: 'ପଡ଼କାଷ୍ଟ ରେକର୍ଡିଂ ଏବଂ ଅପଲୋଡ୍ ଅଲ୍ଟିମେଟ୍‌ହେଲ୍‌ଥ୍ ଆଣ୍ଡ୍ରଏଡ୍ ମୋବାଇଲ୍ ଆପ୍‌ରେ ଉପଲବ୍ଧ।',
            icon: Radio,
          },
          {
            title: 'ସହଜ ୱେବ୍ ଷ୍ଟ୍ରିମିଂ',
            desc: 'ବିନା କୌଣସି ବିଜ୍ଞାପନ ବା ବାଧାରେ ସହଜରେ ଅଡିଓ ଷ୍ଟ୍ରିମ୍ କରନ୍ତୁ।',
            icon: Volume2,
          },
        ],
      },
      {
        id: 'step-ai-assistant',
        stepNum: '04',
        tabLabel: 'AI ସହାୟକ',
        badge: 'AI ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ',
        title: 'AI ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ ଓ ପରାମର୍ଶ',
        subtitle: 'ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ ଓ ଦୈନନ୍ଦିନ ୱେଲନେସ୍ ପରାମର୍ଶ ପାଇଁ AI ଟୁଲ୍।',
        quote: 'ଡାକ୍ତରଙ୍କ ସହିତ ପରାମର୍ଶ ପୂର୍ବରୁ ଆବଶ୍ୟକ ପ୍ରଶ୍ନ ପ୍ରସ୍ତୁତ କରିବାରେ AI ସାହାଯ୍ୟ କରେ।',
        author: 'AI ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ',
        accentColor: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.35)',
        icon: Bot,
        bullets: [
          {
            title: 'ଦୈନନ୍ଦିନ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ',
            desc: 'ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ ଏବଂ ସରଳ ଭାଷାରେ ଉତ୍ତର ପାଆନ୍ତୁ।',
            icon: Brain,
          },
          {
            title: 'ଶିକ୍ଷଣୀୟ ଓ ସୂଚନାଧାରିତ',
            desc: 'ଏହା କେବଳ ସୂଚନା ଏବଂ ସଚେତନତା ପାଇଁ — ଡାକ୍ତରଙ୍କ ଚିକିତ୍ସାର ବିକଳ୍ପ ନୁହେଁ।',
            icon: MessageCircle,
          },
          {
            title: 'ସୁରକ୍ଷିତ ଓ ମାଗଣା',
            desc: 'କୌଣସି ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ସଂଗ୍ରହ ବିନା ସମ୍ପୂର୍ଣ୍ଣ ମାଗଣାରେ ବ୍ୟବହାର କରନ୍ତୁ।',
            icon: CheckCircle2,
          },
        ],
      },
      {
        id: 'step-portals-features',
        stepNum: '05',
        tabLabel: 'ପ୍ଲାଟଫର୍ମ ଦେଖନ୍ତୁ',
        badge: 'ଓପନ୍ ସୋର୍ସ୍ ସମ୍ପ୍ରଦାୟ',
        title: 'ଅଲ୍ଟିମେଟ୍‌ହେଲ୍‌ଥ୍ ଅନ୍ୱେଷଣ କରନ୍ତୁ ଓ ଯୋଡ଼ି ହୁଅନ୍ତୁ',
        subtitle: 'GitHub ରେ ମୁକ୍ତ ଭାବରେ ନିର୍ମିତ ଏକ ସ୍ୱାସ୍ଥ୍ୟ ଉଦ୍ୟମ। ଆପଣଙ୍କ ପସନ୍ଦର ବିଭାଗ ବାଛନ୍ତୁ।',
        quote: 'ସମସ୍ତଙ୍କ ପାଇଁ ଉନ୍ମୁକ୍ତ — ଡାକ୍ତର, ଛାତ୍ର, ଡେଭଲପର୍ ଏବଂ ସାଧାରଣ ନାଗରିକ।',
        author: 'ଅଲ୍ଟିମେଟ୍‌ହେଲ୍‌ଥ୍ ସମ୍ପ୍ରଦାୟ',
        accentColor: '#c084fc',
        glowColor: 'rgba(192, 132, 252, 0.35)',
        icon: Rocket,
        portalCta: true,
        bullets: [
          {
            title: 'ଡାକ୍ତର ସୁଇଟ୍ ଓ ସମୀକ୍ଷା',
            desc: 'ଡାକ୍ତରମାନଙ୍କ ପାଇଁ ସ୍ୱାସ୍ଥ୍ୟ ତଥ୍ୟ ଯାଞ୍ଚ କରିବାର ଏକ ମୁକ୍ତ ମଞ୍ଚ।',
            icon: Stethoscope,
          },
          {
            title: 'GitHub ରେ ଓପନ୍ ସୋର୍ସ୍',
            desc: 'ଡେଭଲପର୍ ଏବଂ ଅନୁବାଦକମାନେ GitHub ରେ ଯୋଗଦାନ କରିପାରିବେ।',
            icon: Code2,
          },
          {
            title: 'ବିଭାଗ ଚୟନ କରନ୍ତୁ',
            desc: 'ପ୍ରବନ୍ଧ ପଢ଼ିବା କିମ୍ବା ଯୋଗଦାନ କରିବାକୁ ତଳ ଲିଙ୍କ୍‌ରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
            icon: Rocket,
          },
        ],
      },
    ];
  }

  // Default English (and fallback)
  return [
    {
      id: 'step-moumita-research',
      stepNum: '01',
      tabLabel: 'Inspiration & Vision',
      badge: 'DEDICATION TO PATIENT CARE',
      title: 'Dr. Moumita Debnath: Life & Inspiration',
      subtitle: 'Junior doctor and postgraduate trainee in Chest Medicine at R.G. Kar Medical College, whose dedication to empathetic care and patient dignity inspired this project.',
      quote:
        'Healthcare begins with seeing the whole human being — body, mind, and dignity. True care requires uncompromised dedication and genuine human respect.',
      author: 'In Memory of Dr. Moumita Debnath',
      accentColor: '#ff007f',
      glowColor: 'rgba(255, 0, 127, 0.35)',
      icon: Heart,
      bullets: [
        {
          title: 'Chest & Respiratory Medicine Trainee',
          desc: 'Trained in pulmonary care, respiratory health, and dedicated her hospital hours to patient diagnosis and treatment.',
          icon: Stethoscope,
        },
        {
          title: 'Empathy & Respect in Healthcare',
          desc: 'Believed that every patient deserves clear communication, patient listening, and dignified medical attention.',
          icon: Heart,
        },
        {
          title: 'Inspiration for UltimateHealth',
          desc: 'A community open-source initiative created in her honor to make health information accessible, transparent, and respectful for all.',
          icon: Award,
        },
      ],
    },
    {
      id: 'step-curated-library',
      stepNum: '02',
      tabLabel: 'Articles & Glossary',
      badge: 'OPEN HEALTH KNOWLEDGE',
      title: 'Health Articles & Medical Glossary',
      subtitle: 'A growing collection of community-written wellness guides and a plain-language medical dictionary in multiple languages.',
      quote:
        'Health information should be understandable, freely accessible, and free from paywalls or confusing jargon.',
      author: 'UltimateHealth Knowledge Hub',
      accentColor: '#00f0ff',
      glowColor: 'rgba(0, 240, 255, 0.35)',
      icon: BookOpen,
      bullets: [
        {
          title: 'Community Health Articles',
          desc: 'Informative guides on everyday wellness topics, preventive habits, mental health, and general wellbeing.',
          icon: BookOpen,
        },
        {
          title: 'Searchable Medical Glossary',
          desc: 'Look up common medical words and clinical terms to get plain-language explanations when reading health topics.',
          icon: Sparkles,
        },
        {
          title: 'Indian & Global Languages',
          desc: 'Access health guides in Indian regional languages including Hindi and Bengali, alongside English, German, Spanish, and French.',
          icon: Globe,
        },
      ],
    },
    {
      id: 'step-community-podcasts',
      stepNum: '03',
      tabLabel: 'Audio & Podcasts',
      badge: 'COMMUNITY AUDIO',
      title: 'Community Podcasts & Audio Stories',
      subtitle: 'Stream and listen to wellness conversations, personal recovery stories, and health tips shared by community contributors.',
      quote:
        'Sharing real health experiences and practical wellness conversations helps people learn and feel supported.',
      author: 'Community Audio Section',
      accentColor: '#ffea00',
      glowColor: 'rgba(255, 234, 0, 0.35)',
      icon: Mic2,
      bullets: [
        {
          title: 'Listen to Community Episodes',
          desc: 'Stream audio health episodes and recovery stories directly on the web with our simple built-in audio player.',
          icon: Headphones,
        },
        {
          title: 'Record on Mobile App',
          desc: 'Podcast creation, recording, and episode uploading are supported via the UltimateHealth Android mobile app.',
          icon: Radio,
        },
        {
          title: 'Simple Web Streaming',
          desc: 'Listen anytime on the web with seamless in-browser audio playback, zero ads, and no sign-up barriers.',
          icon: Volume2,
        },
      ],
    },
    {
      id: 'step-ai-assistant',
      stepNum: '04',
      tabLabel: 'AI Assistant',
      badge: 'AI WELLNESS GUIDANCE',
      title: 'AI Health Assistant & Guidance',
      subtitle: 'Conversational AI tool for general health questions, symptom exploration, and everyday wellness suggestions.',
      quote:
        'AI can help you prepare questions and understand basic concepts before you consult a licensed medical professional.',
      author: 'AI Health Companion',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.35)',
      icon: Bot,
      bullets: [
        {
          title: 'Everyday Health Questions',
          desc: 'Ask general wellness and lifestyle questions and receive informative, clear explanations in natural language.',
          icon: Brain,
        },
        {
          title: 'Educational & Non-Diagnostic',
          desc: 'Provides educational background and self-care tips — never a substitute for an actual doctor’s diagnosis.',
          icon: MessageCircle,
        },
        {
          title: 'Private & Accessible',
          desc: 'Completely free to use with no tracking of personal health identifiers or selling of data.',
          icon: CheckCircle2,
        },
      ],
    },
    {
      id: 'step-portals-features',
      stepNum: '05',
      tabLabel: 'Explore Platform',
      badge: 'OPEN SOURCE COMMUNITY',
      title: 'Explore UltimateHealth & Get Involved',
      subtitle: 'An open-source, community-driven project built on GitHub. Choose an area to start exploring.',
      quote:
        'Built by open-source contributors and open to everyone — doctors, students, developers, and patients alike.',
      author: 'UltimateHealth Community',
      accentColor: '#c084fc',
      glowColor: 'rgba(192, 132, 252, 0.35)',
      icon: Rocket,
      portalCta: true,
      bullets: [
        {
          title: 'Doctor Suite & Moderator Protocol',
          desc: 'An open space welcoming doctors and medical trainees to volunteer, review articles, and sign moderation agreements.',
          icon: Stethoscope,
        },
        {
          title: '100% Open Source on GitHub',
          desc: 'Everything is built openly — developers, translators, and writers can contribute code, UI fixes, or articles.',
          icon: Code2,
        },
        {
          title: 'Explore Portals',
          desc: 'Click any link below to visit health articles, check glossary terms, or view open-source contribution guides.',
          icon: Rocket,
        },
      ],
    },
  ];
};

interface TourUiLabels {
  startTour: string;
  back: string;
  nextStage: string;
  completeTour: string;
  stageBadge: string;
  patientHub: string;
  patientHubDesc: string;
  doctorSuite: string;
  doctorSuiteDesc: string;
  openSquad: string;
  openSquadDesc: string;
}

const getTourUiLabels = (locale: string): TourUiLabels => {
  switch (locale) {
    case 'hi':
      return {
        startTour: 'टूर शुरू करें',
        back: 'पीछे',
        nextStage: 'अगला चरण',
        completeTour: 'टूर समाप्त करें',
        stageBadge: 'चरण',
        patientHub: 'रोगी केंद्र',
        patientHubDesc: 'लेख और शब्दावली',
        doctorSuite: 'डॉक्टर सुइट',
        doctorSuiteDesc: 'समीक्षा और प्रोटोकॉल',
        openSquad: 'ओपन स्क्वाड',
        openSquadDesc: 'गिटहब ओपन सोर्स',
      };
    case 'bn':
      return {
        startTour: 'ট্যুর শুরু করুন',
        back: 'পেছনে',
        nextStage: 'পরবর্তী ধাপ',
        completeTour: 'ট্যুর সম্পন্ন করুন',
        stageBadge: 'ধাপ',
        patientHub: 'রোগী কেন্দ্র',
        patientHubDesc: 'নিবন্ধ ও পরিভাষা',
        doctorSuite: 'ডাক্তার স্যুট',
        doctorSuiteDesc: 'পর্যালোচনা ও প্রোটোকল',
        openSquad: 'ওপেন স্কোয়াড',
        openSquadDesc: 'গিটহাব ওপেন সোর্স',
      };
    case 'ta':
      return {
        startTour: 'டூர் தொடங்கு',
        back: 'பின்னால்',
        nextStage: 'அடுத்த நிலை',
        completeTour: 'டூர் முடிக்க',
        stageBadge: 'நிலை',
        patientHub: 'நோயாளி மையம்',
        patientHubDesc: 'கட்டுரைகள் & சொல்லகராதி',
        doctorSuite: 'மருத்துவர் தளம்',
        doctorSuiteDesc: 'மதிப்பாய்வு & நெறிமுறைகள்',
        openSquad: 'திறந்த படை',
        openSquadDesc: 'GitHub திறந்த மூலம்',
      };
    case 'or':
      return {
        startTour: 'ଟୁର୍ ଆରମ୍ଭ କରନ୍ତୁ',
        back: 'ପଛକୁ',
        nextStage: 'ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟ',
        completeTour: 'ଟୁର୍ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
        stageBadge: 'ପର୍ଯ୍ୟାୟ',
        patientHub: 'ରୋଗୀ କେନ୍ଦ୍ର',
        patientHubDesc: 'ପ୍ରବନ୍ଧ ଓ ଶବ୍ଦକୋଷ',
        doctorSuite: 'ଡାକ୍ତର ସୁଇଟ୍',
        doctorSuiteDesc: 'ସମୀକ୍ଷା ଓ ପ୍ରୋଟୋକଲ୍',
        openSquad: 'ଓପନ୍ ସ୍କ୍ୱାଡ୍',
        openSquadDesc: 'GitHub ଓପନ୍ ସୋର୍ସ୍',
      };
    case 'de':
      return {
        startTour: 'Tour starten',
        back: 'Zurück',
        nextStage: 'Nächste Stufe',
        completeTour: 'Tour beenden',
        stageBadge: 'STUFE',
        patientHub: 'Patienten-Hub',
        patientHubDesc: 'Artikel & Glossar',
        doctorSuite: 'Ärzte-Suite',
        doctorSuiteDesc: 'Überprüfung & Protokolle',
        openSquad: 'Open Squad',
        openSquadDesc: 'GitHub Open Source',
      };
    case 'es':
      return {
        startTour: 'Iniciar tour',
        back: 'Atrás',
        nextStage: 'Siguiente etapa',
        completeTour: 'Finalizar tour',
        stageBadge: 'ETAPA',
        patientHub: 'Centro del Paciente',
        patientHubDesc: 'Artículos y Glosario',
        doctorSuite: 'Suite Médica',
        doctorSuiteDesc: 'Revisión y Protocolos',
        openSquad: 'Escuadrón Abierto',
        openSquadDesc: 'Código Abierto GitHub',
      };
    case 'fr':
      return {
        startTour: 'Démarrer le tour',
        back: 'Retour',
        nextStage: 'Étape suivante',
        completeTour: 'Terminer le tour',
        stageBadge: 'ÉTAPE',
        patientHub: 'Pôle Patient',
        patientHubDesc: 'Articles & Glossaire',
        doctorSuite: 'Espace Médecin',
        doctorSuiteDesc: 'Revue & Protocoles',
        openSquad: 'Équipe Ouverte',
        openSquadDesc: 'Open Source sur GitHub',
      };
    case 'hr':
      return {
        startTour: 'Pokreni vodič',
        back: 'Natrag',
        nextStage: 'Sljedeća faza',
        completeTour: 'Završi vodič',
        stageBadge: 'FAZA',
        patientHub: 'Centar za Pacijente',
        patientHubDesc: 'Članci i Rječnik',
        doctorSuite: 'Liječnički Kutak',
        doctorSuiteDesc: 'Pregled i Protokoli',
        openSquad: 'Otvoreni Tim',
        openSquadDesc: 'GitHub Otvoreni Kod',
      };
    default:
      return {
        startTour: 'START TOUR',
        back: 'Back',
        nextStage: 'Next Stage',
        completeTour: 'Complete Tour',
        stageBadge: 'STAGE',
        patientHub: 'Patient Hub',
        patientHubDesc: 'Articles & Glossary',
        doctorSuite: 'Doctor Suite',
        doctorSuiteDesc: 'Review & Protocols',
        openSquad: 'Open Squad',
        openSquadDesc: 'GitHub Open Source',
      };
  }
};

export default function OnboardingModalWeb() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const TOUR_STEPS = getTourSteps(locale);
  const ui = getTourUiLabels(locale);

  const openTour = useCallback(() => {
    setActiveStepIndex(0);
    setIsOpen(true);
    if (soundEnabled) playNeonSFX(880, 0.12, 'sine');
  }, [soundEnabled]);

  const closeTour = useCallback(() => {
    sessionStorage.setItem('uh_onboarding_seen', 'true');
    setIsOpen(false);
  }, []);

  // Listen for custom trigger event from Hero or Navbar
  useEffect(() => {
    const handleTrigger = () => openTour();
    window.addEventListener('open-uh-tour', handleTrigger);
    return () => window.removeEventListener('open-uh-tour', handleTrigger);
  }, [openTour]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 't' || e.key === 'T') && !isOpen) {
        const activeTag = (document.activeElement?.tagName || '').toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          openTour();
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') closeTour();
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const step = TOUR_STEPS[activeStepIndex];
  const StepIcon = step.icon;

  const handleNext = () => {
    if (activeStepIndex < TOUR_STEPS.length - 1) {
      if (soundEnabled) playNeonSFX(600 + activeStepIndex * 70, 0.08, 'triangle');
      setActiveStepIndex((prev) => prev + 1);
    } else {
      if (soundEnabled) playNeonSFX(980, 0.15, 'sine');
      closeTour();
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      if (soundEnabled) playNeonSFX(500, 0.08, 'sine');
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  const handleSelectStep = (index: number) => {
    if (soundEnabled) playNeonSFX(720, 0.06, 'sine');
    setActiveStepIndex(index);
  };

  return (
    <>
      <style>{`
        .uh-tour-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.03);
        }
        .uh-tour-scrollbar::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }
        .uh-tour-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }
        .uh-tour-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.22);
          border-radius: 8px;
        }
        .uh-tour-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>

      {/* ── Persistent Floating HUD Launcher (Bottom-Left) ── */}
      <aside aria-label="Tour Quick Launcher" className="fixed bottom-6 left-6 z-40">
        <button
          onClick={openTour}
          className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#090914]/90 hover:bg-[#121226] border border-[#00f0ff]/50 hover:border-[#ff007f] text-white shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,127,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Start UltimateHealth Tour (Press T)"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff]"></span>
          </span>
          <span className="text-xs font-black tracking-widest uppercase bg-gradient-to-r from-[#00f0ff] via-purple-300 to-[#ff007f] bg-clip-text text-transparent">
            {ui.startTour}
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-mono text-cyan-300">
            T
          </span>
        </button>
      </aside>

      {/* ── Fullscreen Backdrop & Centered Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(24px)',
              overflow: 'hidden',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-dialog-title"
          >
            {/* Ambient Aura */}
            <div
              style={{
                position: 'absolute',
                width: 520,
                height: 520,
                borderRadius: '50%',
                filter: 'blur(140px)',
                pointerEvents: 'none',
                opacity: 0.22,
                backgroundColor: step.accentColor,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                transition: 'background-color 0.5s',
              }}
            />

            {/* ── Modal Container ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 980,
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 20,
                background: '#0e0e1a',
                border: '1px solid #26263e',
                boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
                overflow: 'hidden',
                fontFamily: 'inherit',
              }}
            >
              {/* Grid overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  opacity: 0.03,
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Progress bar */}
              <div style={{ height: 3, background: '#1e293b', flexShrink: 0 }}>
                <motion.div
                  style={{
                    height: '100%',
                    width: `${((activeStepIndex + 1) / TOUR_STEPS.length) * 100}%`,
                    backgroundColor: step.accentColor,
                    boxShadow: `0 0 12px ${step.accentColor}`,
                    transition: 'width 0.3s ease, background-color 0.4s',
                  }}
                />
              </div>

              {/* ── Header Bar ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 28px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(13,13,28,0.92)',
                  flexShrink: 0,
                  zIndex: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: '0.12em',
                      padding: '4px 10px',
                      borderRadius: 6,
                      color: step.accentColor,
                      background: `${step.accentColor}18`,
                      border: `1px solid ${step.accentColor}44`,
                    }}
                  >
                    {ui.stageBadge} {step.stepNum} / 05
                  </span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#64748b',
                      textTransform: 'uppercase',
                    }}
                  >
                    {step.badge}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    onClick={() => setSoundEnabled((v) => !v)}
                    style={{
                      padding: '6px',
                      borderRadius: 10,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: soundEnabled ? '#22d3ee' : '#64748b',
                      display: 'flex',
                    }}
                    title={soundEnabled ? 'Mute' : 'Unmute'}
                  >
                    {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                  <button
                    onClick={closeTour}
                    style={{
                      padding: '6px',
                      borderRadius: 10,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748b',
                      display: 'flex',
                    }}
                    aria-label="Close Tour"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* ── Tab Navigation ── */}
              <div
                className="uh-tour-scrollbar"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 28px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: '#0a0a16',
                  overflowX: 'auto',
                  flexShrink: 0,
                  zIndex: 10,
                }}
              >
                {TOUR_STEPS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStep(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 14px',
                      borderRadius: 12,
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      flexShrink: 0,
                      border: `1px solid ${idx === activeStepIndex ? s.accentColor : 'transparent'}`,
                      background: idx === activeStepIndex ? `${s.accentColor}20` : 'transparent',
                      color: idx === activeStepIndex ? '#fff' : '#64748b',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: idx === activeStepIndex ? s.accentColor : '#475569',
                        flexShrink: 0,
                      }}
                    />
                    {s.stepNum}. {s.tabLabel}
                  </button>
                ))}
              </div>

              {/* ── Main Body: Smooth Styled Scroll Container ── */}
              <div
                className="uh-tour-scrollbar"
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  padding: '24px 28px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 24,
                  alignItems: 'start',
                  zIndex: 10,
                }}
              >
                {/* Left Card */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 16,
                    padding: '28px',
                    background: 'linear-gradient(160deg, #111124 0%, #0a0a14 100%)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    minHeight: 340,
                  }}
                >
                  {/* Glow blob */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -40,
                      right: -40,
                      width: 130,
                      height: 130,
                      borderRadius: '50%',
                      background: step.accentColor,
                      filter: 'blur(50px)',
                      opacity: 0.35,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top content */}
                  <div style={{ position: 'relative' }}>
                    {/* Icon */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                        background: `linear-gradient(135deg, ${step.accentColor}33, ${step.accentColor}11)`,
                        border: `1.5px solid ${step.accentColor}77`,
                        boxShadow: `0 0 20px ${step.glowColor}`,
                      }}
                    >
                      <StepIcon style={{ width: 20, height: 20, color: step.accentColor }} />
                    </div>

                    {/* Badge */}
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: 'monospace',
                        fontSize: 9,
                        fontWeight: 900,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: 5,
                        marginBottom: 12,
                        color: step.accentColor,
                        background: `${step.accentColor}18`,
                        border: `1px solid ${step.accentColor}44`,
                      }}
                    >
                      {step.badge}
                    </span>

                    {/* Title */}
                    <h2
                      id="tour-dialog-title"
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: '#fff',
                        lineHeight: 1.28,
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.title}
                    </h2>

                    {/* Subtitle */}
                    <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.65, margin: 0 }}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Quote Footer */}
                  <div
                    style={{
                      marginTop: 24,
                      paddingTop: 20,
                      borderTop: '1px solid rgba(255,255,255,0.09)',
                      position: 'relative',
                    }}
                  >
                    {/* Step 1 portrait */}
                    {activeStepIndex === 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/assets/moumita-debnath.jpg`}
                          alt="Dr. Moumita Debnath"
                          style={{
                            width: 52,
                            height: 60,
                            borderRadius: 10,
                            objectFit: 'cover',
                            objectPosition: 'top',
                            border: '1.5px solid rgba(236,72,153,0.5)',
                            flexShrink: 0,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                          }}
                        />
                        <div>
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: '#fff',
                              display: 'block',
                              marginBottom: 2,
                            }}
                          >
                            Dr. Moumita Debnath
                          </span>
                          <span style={{ fontSize: 11, color: '#94a3b8', display: 'block' }}>
                            MD Chest Medicine · Respiratory Care &amp; Research
                          </span>
                        </div>
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: 12,
                        color: '#cbd5e1',
                        fontStyle: 'italic',
                        lineHeight: 1.65,
                        margin: '0 0 8px',
                      }}
                    >
                      &ldquo;{step.quote}&rdquo;
                    </p>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#64748b',
                        display: 'block',
                      }}
                    >
                      &mdash; {step.author}
                    </span>
                  </div>
                </div>

                {/* Right Column: Key Pillars & Interactive Capabilities */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Section heading */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Sparkles style={{ width: 14, height: 14, color: step.accentColor, flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                      }}
                    >
                      HIGHLIGHTS &amp; CAPABILITIES
                    </span>
                  </div>

                  {/* Bullet cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                    {step.bullets.map((b, i) => {
                      const BulletIcon = b.icon || CheckCircle2;
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 14,
                            padding: '14px 16px',
                            borderRadius: 12,
                            background: 'rgba(255,255,255,0.025)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: 1,
                              background: `${step.accentColor}1a`,
                              color: step.accentColor,
                            }}
                          >
                            <BulletIcon size={15} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
                              {b.title}
                            </h4>
                            <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                              {b.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 5 Portal CTA */}
                  {step.portalCta && (
                    <div>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#fbbf24',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          display: 'block',
                          marginBottom: 10,
                        }}
                      >
                        🚀 CHOOSE YOUR DESTINATION PORTAL:
                      </span>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                          gap: 10,
                        }}
                      >
                        <Link
                          href="/articles"
                          onClick={closeTour}
                          style={{
                            padding: '12px',
                            borderRadius: 12,
                            background: '#0e0e1e',
                            border: '1px solid rgba(34,211,238,0.35)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <User size={14} style={{ color: '#22d3ee' }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{ui.patientHub}</span>
                          </div>
                          <span style={{ fontSize: 11, color: '#64748b' }}>{ui.patientHubDesc}</span>
                        </Link>

                        <Link
                          href="/admin-agreement"
                          onClick={closeTour}
                          style={{
                            padding: '12px',
                            borderRadius: 12,
                            background: '#0e0e1e',
                            border: '1px solid rgba(16,185,129,0.35)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Stethoscope size={14} style={{ color: '#10b981' }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{ui.doctorSuite}</span>
                          </div>
                          <span style={{ fontSize: 11, color: '#64748b' }}>{ui.doctorSuiteDesc}</span>
                        </Link>

                        <Link
                          href="/contribute"
                          onClick={closeTour}
                          style={{
                            padding: '12px',
                            borderRadius: 12,
                            background: '#0e0e1e',
                            border: '1px solid rgba(255,0,127,0.35)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Code2 size={14} style={{ color: '#ff007f' }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{ui.openSquad}</span>
                          </div>
                          <span style={{ fontSize: 11, color: '#64748b' }}>{ui.openSquadDesc}</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Bottom Controls Bar ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 28px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  background: '#090918',
                  flexShrink: 0,
                  zIndex: 20,
                  borderRadius: '0 0 20px 20px',
                }}
              >
                {/* Step dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {TOUR_STEPS.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectStep(idx)}
                      style={{
                        height: 10,
                        width: idx === activeStepIndex ? 32 : 10,
                        borderRadius: 999,
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        background: idx === activeStepIndex ? s.accentColor : '#334155',
                        transition: 'all 0.3s',
                        boxShadow: idx === activeStepIndex ? `0 0 10px ${s.accentColor}` : 'none',
                      }}
                      title={`${ui.stageBadge} ${s.stepNum}: ${s.tabLabel}`}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {activeStepIndex > 0 && (
                    <button
                      onClick={handlePrev}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '12px 22px',
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.18)',
                        background: 'rgba(255,255,255,0.05)',
                        color: '#e2e8f0',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <ChevronLeft size={16} />
                      {ui.back}
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 26px',
                      borderRadius: 12,
                      border: 'none',
                      background: step.accentColor,
                      boxShadow: `0 0 20px ${step.glowColor}`,
                      color: '#000',
                      fontSize: 14,
                      fontWeight: 900,
                      fontFamily: 'monospace',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'transform 0.15s',
                    }}
                  >
                    {activeStepIndex === TOUR_STEPS.length - 1 ? ui.completeTour : ui.nextStage}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
