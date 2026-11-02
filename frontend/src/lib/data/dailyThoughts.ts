export type SupportedThoughtLang =
  | 'en'
  | 'hi'
  | 'bn'
  | 'ta'
  | 'te'
  | 'mr'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur';

export interface DailyThought {
  id: number;
  theme: string;
  en: string;
  hi: string;
  bn?: string;
  ta?: string;
  te?: string;
  mr?: string;
  gu?: string;
  kn?: string;
  ml?: string;
  pa?: string;
  or?: string;
  as?: string;
  ur?: string;
}

export const DAILY_THOUGHTS: DailyThought[] = [
  {
    id: 1,
    theme: 'Hydration',
    en: 'Start your morning with a glass of water. A simple sip brings gentle energy to your day.',
    hi: 'सुबह की शुरुआत एक गिलास पानी से करें। यह आपके शरीर को दिनभर के लिए ताज़गी देता है।',
    bn: 'সকালের শুরুটা এক গ্লাস জল দিয়ে করুন। এটি আপনার শরীরকে সারাদিনের জন্য সতেজতা দেবে।',
  },
  {
    id: 2,
    theme: 'Rest',
    en: 'Rest is not something you have to earn. It is a natural need your body deserves.',
    hi: 'आराम कोई ऐसा इनाम नहीं जिसे कमाना पड़े। यह आपके शरीर की एक स्वाभाविक ज़रूरत है।',
    bn: 'বিশ্রাম এমন কিছু নয় যা অর্জন করতে হয়। এটি আপনার শরীরের একটি স্বাভাবিক প্রয়োজন।',
  },
  {
    id: 3,
    theme: 'Breathing',
    en: 'Take three slow, deep breaths right now. Notice how your shoulders soften.',
    hi: 'अभी तीन धीमी और गहरी सांसें लें। महसूस करें कि आपका तनाव कैसे धीरे-धीरे कम हो रहा है।',
    bn: 'এখনই তিনটি ধীর ও গভীর শ্বাস নিন। অনুভব করুন আপনার মনের চাপ কেমন ধীরে ধীরে কমে আসছে।',
  },
  {
    id: 4,
    theme: 'Movement',
    en: 'A quiet 10-minute walk can clear your mind more than an hour of worrying.',
    hi: '10 मिनट की शांत सैर, एक घंटे की चिंता से कहीं बेहतर मन को हल्का कर देती है।',
    bn: '১০ মিনিটের একটি শান্ত হাঁটা এক ঘণ্টার চিন্তার চেয়ে মনকে অনেক বেশি হালকা করে।',
  },
  {
    id: 5,
    theme: 'Kindness',
    en: 'Be gentle with yourself today. Healing and growth take their own quiet time.',
    hi: 'आज अपने प्रति थोड़ा दयालु रहें। संभलने और आगे बढ़ने में अपना समय लगता है।',
    bn: 'আজ নিজের প্রতি একটু সদয় হোন। সুস্থ হতে এবং এগিয়ে যেতে কিছুটা সময় লাগে।',
  },
  {
    id: 6,
    theme: 'Sleep',
    en: 'Good sleep is the foundation of emotional balance and body repair.',
    hi: 'अच्छी और सुकून भरी नींद मन के संतुलन और शरीर की मरम्मत की सबसे बड़ी नींव है।',
    bn: 'ভালো ও শান্তিময় ঘুম মানসিক ভারসাম্য এবং শারীরিক সুস্থতার মূল ভিত্তি।',
  },
  {
    id: 7,
    theme: 'Mindfulness',
    en: 'Step away from your screen for a few minutes and look at the sky or trees.',
    hi: 'कुछ मिनटों के लिए स्क्रीन से दूर हटें और खिड़की से बाहर आसमान या पेड़ों को देखें।',
    bn: 'কয়েক মিনিটের জন্য স্ক্রিন থেকে দূরে সরে যান এবং জানলা দিয়ে আকাশ বা গাছপালার দিকে তাকান।',
  },
  {
    id: 8,
    theme: 'Listening',
    en: 'Listening patiently to someone is one of the warmest gifts of care you can offer.',
    hi: 'धैर्य से किसी की बात सुनना अपनेपन और देखभाल का सबसे खूबसूरत तोहफा है।',
    bn: 'ধৈর্য ধরে কারও কথা শোনা সহানুভূতি এবং ভালোবাসার অন্যতম সেরা উপহার।',
  },
  {
    id: 9,
    theme: 'Patience',
    en: 'Your wellness journey is personal. Progress, not perfection, is what truly matters.',
    hi: 'आपकी सेहत का सफर आपका अपना है। निरंतरता महत्वपूर्ण है, किसी से तुलना नहीं।',
    bn: 'আপনার সুস্থতার যাত্রা সম্পূর্ণ আপনার নিজস্ব। ধারাবাহিকতাই আসল, কারও সাথে তুলনা নয়।',
  },
  {
    id: 10,
    theme: 'Habits',
    en: 'Small daily choices create lifelong peace and vitality.',
    hi: 'हर दिन की छोटी-छोटी सकारात्मक आदतें जीवनभर की तंदुरुस्ती और शांति बनती हैं।',
    bn: 'প্রতিদিনের ছোট ছোট ইতিবাচক অভ্যাস আজীবন সুস্থতা ও শান্তির ভিত্তি গড়ে তোলে।',
  },
  {
    id: 11,
    theme: 'Posture',
    en: 'Unclench your jaw, relax your shoulders, and let go of the tension you are holding.',
    hi: 'अपने कंधों को ढीला छोड़ें, जबड़े को रिलैक्स करें और अनचाहे तनाव को बह जाने दें।',
    bn: 'কাঁধ শিথিল করুন, মুখের টানটান ভাব কমিয়ে গভীর প্রশান্তি অনুভব করুন।',
  },
  {
    id: 12,
    theme: 'Nutrition',
    en: 'Eat with attention and gratitude. Real nourishment begins with mindful eating.',
    hi: 'भोजन शांत मन और आभार के साथ करें। असली पोषण सुकून से खाने में है।',
    bn: 'শান্ত মনে এবং কৃতজ্ঞতার সাথে আহার করুন। আসল পুষ্টি প্রশান্তির আহারে নিহিত।',
  },
  {
    id: 13,
    theme: 'Empathy',
    en: 'Caregivers also need care. If you are supporting others, remember to refill your own cup.',
    hi: 'दूसरों की देखभाल करने वालों को भी सहारे की ज़रूरत होती है। खुद का ध्यान रखना भी ज़रूरी है।',
    bn: 'অন্যের যত্ন নেওয়া মানুষদেরও যত্নের প্রয়োজন হয়। নিজের যত্ন নিতে ভুলবেন না।',
  },
  {
    id: 14,
    theme: 'Nature',
    en: 'Just five minutes in natural sunlight can lift your mood and reset your clock.',
    hi: 'सुबह की धूप में बिताए सिर्फ पांच मिनट आपके मूड को ताज़ा कर सकते हैं।',
    bn: 'সকালের রোদে কাটানো মাত্র পাঁচ মিনিট আপনার মন ভালো করে দিতে পারে।',
  },
  {
    id: 15,
    theme: 'Simplicity',
    en: 'You do not need an elaborate routine to feel healthy. Simplicity is sustainable.',
    hi: 'स्वस्थ रहने के लिए किसी जटिल नियम की ज़रूरत नहीं। सादगी ही सबसे टिकाऊ है।',
    bn: 'সুস্থ থাকতে কোনো জটিল নিয়মের প্রয়োজন নেই। সাদামাটা অভ্যাসই দীর্ঘস্থায়ী।',
  },
  {
    id: 16,
    theme: 'Calm',
    en: 'When things feel overwhelming, focus only on the next gentle step in front of you.',
    hi: 'जब सब कुछ भारी लगे, तो केवल अपने सामने मौजूद एक छोटे से कदम पर ध्यान दें।',
    bn: 'যখন সবকিছু অতিরিক্ত মনে হয়, তখন কেবল সামনের একটি ছোট পদক্ষেপে মনোযোগ দিন।',
  },
  {
    id: 17,
    theme: 'Gratitude',
    en: 'Notice one small thing that brought you comfort today — a warm drink, a kind word.',
    hi: 'आज किसी एक छोटी सी सुखद बात को याद करें — एक गर्म चाय, या किसी का मुस्कुराना।',
    bn: 'আজ ঘটে যাওয়া কোনো একটি ছোট আনন্দের কথা ভাবুন — এক কাপ গরম চা, বা একটি মিষ্টি হাসি।',
  },
  {
    id: 18,
    theme: 'Movement',
    en: 'Stretch your arms overhead and take a deep breath. Movement brings life back to muscles.',
    hi: 'हाथों को ऊपर फैलाकर अंगड़ाई लें और गहरी सांस लें। थोड़ा सा खिंचाव शरीर को जगा देता है।',
    bn: 'হাত দুটি উপরে তুলে আড়মোড়া ভাঙুন এবং গভীর শ্বাস নিন। শরীর হালকা লাগবে।',
  },
  {
    id: 19,
    theme: 'Boundaries',
    en: 'Saying no to extra stress is a quiet way of saying yes to your health.',
    hi: 'अतिरिक्त तनाव को ना कहना, अपनी सेहत और शांति को हां कहने का एक शांत तरीका है।',
    bn: 'অতিরিক্ত চাপকে না বলা আসলে নিজের স্বাস্থ্য ও শান্তিকে হ্যাঁ বলার সুন্দর উপায়।',
  },
  {
    id: 20,
    theme: 'Sleep',
    en: 'Put your phone away thirty minutes before bed. Give your mind a soft landing.',
    hi: 'सोने से आधा घंटा पहले फोन किनारे रख दें। अपने दिमाग को शांत होने का मौका दें।',
    bn: 'ঘুমানোর আধ ঘণ্টা আগে ফোন দূরে রাখুন। মনকে শান্ত হতে দিন।',
  },
  {
    id: 21,
    theme: 'Compassion',
    en: 'Speak to yourself the way you would speak to a friend who is having a tough day.',
    hi: 'खुद से भी उतनी ही नरमी से बात करें जितनी आप किसी प्यारे दोस्त से करते हैं।',
    bn: 'নিজের সাথেও ততটাই ভালোবাসায় কথা বলুন যতটা আপনি কোনো প্রিয় বন্ধুর সাথে বলেন।',
  },
  {
    id: 22,
    theme: 'Hydration',
    en: 'Water is clarity. Keep a glass nearby as a gentle reminder to stay refreshed.',
    hi: 'पानी मन को ताज़गी देता है। अपने पास पानी की बोतल रखें और बीच-बीच में घूंट लेते रहें।',
    bn: 'জল মন ও শরীরে সজীবতা আনে। কাছে জলের বোতল রাখুন এবং মাঝেমধ্যে পান করুন।',
  },
  {
    id: 23,
    theme: 'Connection',
    en: 'Check in on a friend or neighbor today. A simple message can brighten two lives.',
    hi: 'आज किसी पुराने दोस्त या पड़ोसी का हाल पूछें। एक छोटा संदेश दो जिंदगियों को खुश कर देता है।',
    bn: 'আজ কোনো পুরনো বন্ধু বা প্রতিবেশীর খোঁজ নিন। একটি ছোট্ট বার্তা দুজনেরই মন ভালো করবে।',
  },
  {
    id: 24,
    theme: 'Reflection',
    en: 'Quiet moments are not wasted time; they are where the mind finds clarity.',
    hi: 'शांति के कुछ पल बेकार नहीं होते, वहीं मन को नई समझ और स्पष्टता मिलती है।',
    bn: 'শান্ত নীরব মুহূর্তগুলি বৃথা নয়, সেখানেই মন নতুন স্পষ্টতা ও শান্তি খুঁজে পায়।',
  },
  {
    id: 25,
    theme: 'Acceptance',
    en: 'It is okay to have low-energy days. Even nature rests between seasons.',
    hi: 'हर दिन एक जैसी ऊर्जा नहीं होती, और यह बिल्कुल स्वाभाविक है। प्रकृति भी विश्राम लेती है।',
    bn: 'সবদিন সমান শক্তি থাকে না, এবং এটা স্বাভাবিক। প্রকৃতিও ঋতু পরিবর্তনের মাঝে বিশ্রাম নেয়।',
  },
  {
    id: 26,
    theme: 'Digestion',
    en: 'Chew slowly and savor the flavors. Gentle eating leads to gentle digestion.',
    hi: 'खाने को धीरे-धीरे चबाएं और स्वाद का आनंद लें। सुकून से खाना पाचन को बेहतर बनाता है।',
    bn: 'খাবার আস্তে আস্তে চিবিয়ে খান। শান্তভাবে খাওয়া হজম ভালো রাখে।',
  },
  {
    id: 27,
    theme: 'Eyes',
    en: 'Rest your eyes from screens. Look at something twenty feet away for twenty seconds.',
    hi: 'अपनी आंखों को आराम दें। बीस सेकंड के लिए दूर किसी चीज़ को देखें।',
    bn: 'চোখকে কিছুটা বিশ্রাম দিন। কুড়ি সেকেন্ডের জন্য দূরে তাকান।',
  },
  {
    id: 28,
    theme: 'Joy',
    en: 'Notice one thing that made you smile today, however fleeting it was.',
    hi: 'आज की किसी एक छोटी सी बात को याद करें जिसने आपके चेहरे पर मुस्कान लाई।',
    bn: 'আজকের কোনো একটি আনন্দের মুহূর্ত মনে করুন যা আপনার মুখে হাসি এনেছিল।',
  },
  {
    id: 29,
    theme: 'Fresh Air',
    en: 'Open a window and let fresh air into your room. Fresh breeze brings fresh thoughts.',
    hi: 'कमरे की खिड़की खोलें और ताज़ी हवा को अंदर आने दें। ताज़ी हवा मन को हल्का करती है।',
    bn: 'ঘরের জানলা খুলে দিন এবং তাজা বাতাস ভেতরে আসতে দিন। মন সতেজ হবে।',
  },
  {
    id: 30,
    theme: 'Strength',
    en: 'Resilience is not about never feeling tired; it is about knowing when to pause.',
    hi: 'ताकत कभी न थकने में नहीं, बल्कि यह जानने में है कि कब रुककर सांस लेनी है।',
    bn: 'শক্তি কখনই ক্লান্ত না হওয়ায় নয়, বরং কখন বিশ্রাম নিতে হবে তা বোঝার মধ্যে।',
  },
  {
    id: 31,
    theme: 'Patience',
    en: 'Healing is rarely a straight line. Celebrate the quiet progress you have made.',
    hi: 'सेहत का सुधार हमेशा सीधी रेखा में नहीं होता। अपनी हर छोटी प्रगति पर गर्व करें।',
    bn: 'সুস্থতার পথ সবসময় মসৃণ হয় না। নিজের প্রতিটি ছোট উন্নতিকে সম্মান জানান।',
  },
  {
    id: 32,
    theme: 'Music',
    en: 'Listen to a song or sound that soothes your nervous system.',
    hi: 'कोई ऐसा शांत संगीत या धुन सुनें जो आपके मन को सुकून और ठंडक दे।',
    bn: 'এমন কোনো শান্ত সঙ্গীত শুনুন যা আপনার মন ও স্নায়ুকে প্রশান্তি দেয়।',
  },
  {
    id: 33,
    theme: 'Care',
    en: 'Healthcare begins with self-respect and treating your body like an ally.',
    hi: 'अच्छी सेहत खुद के सम्मान से शुरू होती है। अपने शरीर को अपना सच्चा साथी समझें।',
    bn: 'সুস্থতা শুরু হয় আত্মসম্মান থেকে। নিজের শরীরকে নিজের বন্ধু মনে করুন।',
  },
  {
    id: 34,
    theme: 'Balance',
    en: 'Balance is not about doing everything equally; it is about doing what is needed now.',
    hi: 'संतुलन सब कुछ एक साथ करने में नहीं, बल्कि अभी जो ज़रूरी है उस पर ध्यान देने में है।',
    bn: 'ভারসাম্য মানে সবকিছু একসাথে করা নয়, বরং এই মুহূর্তে যা দরকার তাতে মন দেওয়া।',
  },
  {
    id: 35,
    theme: 'Laughter',
    en: 'Laughter is real medicine for the mind. Share a lighthearted moment with someone.',
    hi: 'हंसी मन की सच्ची दवा है। आज किसी के साथ एक हल्का-फुल्का खुशहाल पल बांटें।',
    bn: 'হাসি মনের সেরা ওষুধ। আজ কারও সাথে একটি নির্মল আনন্দের মুহূর্ত ভাগ করে নিন।',
  },
  {
    id: 36,
    theme: 'Walk',
    en: 'Feel the ground beneath your feet with each step. Walking connects you to the earth.',
    hi: 'चलते समय अपने कदमों के नीचे की ज़मीन को महसूस करें। चलना हमें सहज और शांत करता है।',
    bn: 'হাঁটার সময় মাটির স্পর্শ অনুভব করুন। হাঁটা মনকে বর্তমানের সাথে যুক্ত করে।',
  },
  {
    id: 37,
    theme: 'Peace',
    en: 'You do not have to solve everything today. Give yourself permission to pause.',
    hi: 'आपको आज ही सब कुछ हल करने की ज़रूरत नहीं है। खुद को थोड़ा समय दीजिए।',
    bn: 'আজকেই সবকিছু সমাধান করতে হবে এমন কোনো কথা নেই। নিজেকে একটু সময় দিন।',
  },
  {
    id: 38,
    theme: 'Warmth',
    en: 'A warm shower or a warm cup of herbal tea can reset a tense evening.',
    hi: 'एक गर्म चाय या गुनगुने पानी से नहाना शाम की सारी थकान मिटा सकता है।',
    bn: 'এক কাপ গরম ভেষজ চা বা ঈষদুষ্ণ জলে স্নান সারাদিনের ক্লান্তি দূর করতে পারে।',
  },
  {
    id: 39,
    theme: 'Focus',
    en: 'Do one thing at a time with your full presence. Multitasking often just multiplies stress.',
    hi: 'एक समय में एक ही काम पूरे ध्यान से करें। हर चीज़ एक साथ करने से तनाव बढ़ता है।',
    bn: 'এক সময়ে একটি কাজেই সম্পূর্ণ মনোযোগ দিন। একসাথে অনেক কাজ মানসিক চাপ বাড়ায়।',
  },
  {
    id: 40,
    theme: 'Community',
    en: 'We are healthier when we feel connected. Reach out to someone who brings you peace.',
    hi: 'जब हम अपनों से जुड़े रहते हैं तो मन अधिक स्वस्थ रहता है। सुकून देने वाले लोगों के करीब रहें।',
    bn: 'আপনজনদের সাথে যোগাযোগ মন ভালো রাখে। যারা আপনাকে শান্তি দেয় তাদের কাছে থাকুন।',
  },
  {
    id: 41,
    theme: 'Comfort',
    en: 'Wear comfortable clothes that let you breathe freely and move with ease.',
    hi: 'ऐसे आरामदायक कपड़े पहनें जिनमें आप सहजता से सांस ले सकें और हल्का महसूस करें।',
    bn: 'আরামদায়ক পোশাক পরুন যাতে আপনি সহজে শ্বাস নিতে পারেন এবং স্বাচ্ছন্দ্যবোধ করেন।',
  },
  {
    id: 42,
    theme: 'Gentleness',
    en: 'Treat your mistakes as gentle lessons, not reasons to be harsh on yourself.',
    hi: 'अपनी गलतियों को सीख की तरह देखें, खुद को कोसने की वजह न बनाएं।',
    bn: 'ভুলগুলোকে শিক্ষার মতো করে দেখুন, নিজেকে দোষারোপ করার কারণ হিসেবে নয়।',
  },
  {
    id: 43,
    theme: 'Sunlight',
    en: 'Let morning light touch your face. Natural daylight tells your brain it is time to thrive.',
    hi: 'सुबह की रोशनी को अपने चेहरे पर पड़ने दें। प्राकृतिक रोशनी मन को नई उमंग देती है।',
    bn: 'সকালের নরম রোদ গায়ে লাগান। প্রাকৃতিক আলো মন ও শরীরকে উজ্জীবিত করে।',
  },
  {
    id: 44,
    theme: 'Restoration',
    en: 'Healing happens in the quiet pauses, not during the rush.',
    hi: 'सुधार और सुकून भागदौड़ में नहीं, बल्कि ठहरने और रुकने के पलों में मिलता है।',
    bn: 'সুস্থতা তাড়াহুড়োর মধ্যে আসে না, তা আসে শান্ত নীরব বিরতির মাঝে।',
  },
  {
    id: 45,
    theme: 'Mind',
    en: 'Thoughts are like passing clouds. You do not have to chase or fight every one.',
    hi: 'विचार आसमान में बादलों की तरह हैं। हर विचार के पीछे भागने की ज़रूरत नहीं होती।',
    bn: 'চিন্তাভাবনা আকাশের মেঘের মতো। প্রতিটি চিন্তার পেছনে ছোটার কোনো প্রয়োজন নেই।',
  },
  {
    id: 46,
    theme: 'Nourishment',
    en: 'Add a colorful vegetable or fresh fruit to your plate today.',
    hi: 'आज अपनी थाली में कोई ताज़ा फल या हरी सब्जी शामिल करें।',
    bn: 'আজ আপনার খাবারে একটি তাজা ফল বা রঙিন শাকসবজি যুক্ত করুন।',
  },
  {
    id: 47,
    theme: 'Sleep',
    en: 'A dark and cool room invites deeper, more restorative rest.',
    hi: 'शांत और ठंडा कमरा गहरी और आरामदायक नींद में मदद करता है।',
    bn: 'শান্ত ও শীতল ঘর গভীর এবং আরামদায়ক ঘুমের জন্য আদর্শ।',
  },
  {
    id: 48,
    theme: 'Calm',
    en: 'Notice the rhythm of your natural breath without trying to change it.',
    hi: 'अपनी सांसों की स्वाभाविक लय को महसूस करें, उसे बदलने की कोशिश किए बिना।',
    bn: 'নিজের স্বাভাবিক শ্বাসের ছন্দ অনুভব করুন, তা পরিবর্তনের চেষ্টা না করেই।',
  },
  {
    id: 49,
    theme: 'Healing',
    en: 'Trust your body’s quiet wisdom. It works continuously to take care of you.',
    hi: 'अपने शरीर पर भरोसा रखें। यह हर पल चुपचाप आपकी देखभाल में लगा रहता है।',
    bn: 'নিজের শরীরের ওপর আস্থা রাখুন। এটি প্রতিনিয়ত নিঃশব্দে আপনার যত্ন নিচ্ছে।',
  },
  {
    id: 50,
    theme: 'Energy',
    en: 'When your energy dips in the afternoon, try a glass of cool water and a short stretch.',
    hi: 'दोपहर में थकान महसूस हो तो एक गिलास ठंडा पानी पिएं और थोड़ा सा स्ट्रेच करें।',
    bn: 'দুপুরে ক্লান্তি লাগলে এক গ্লাস ঠান্ডা জল পান করুন এবং শরীর একটু টানটান করুন।',
  },
  {
    id: 51,
    theme: 'Perspective',
    en: 'This moment is manageable. Take it one breath and one minute at a time.',
    hi: 'यह पल संभल सकता है। एक समय में बस एक सांस और एक मिनट पर ध्यान दें।',
    bn: 'এই মুহূর্তটি সামলানো সম্ভব। একবারে একটি শ্বাস এবং একটি মুহূর্তেই মনোযোগ দিন।',
  },
  {
    id: 52,
    theme: 'Gratitude',
    en: 'Acknowledge someone who made your day a little easier today.',
    hi: 'आज किसी ऐसे इंसान को धन्यवाद कहें जिसने आपका काम थोड़ा आसान बनाया।',
    bn: 'আজ এমন কাউকে ধন্যবাদ জানান যিনি আপনার দিনটিকে একটু সহজ করে দিয়েছেন।',
  },
  {
    id: 53,
    theme: 'Relaxation',
    en: 'Drop your tongue from the roof of your mouth and release facial tension.',
    hi: 'अपने चेहरे की मांसपेशियों को ढीला छोड़ें और माथे की सिलवटों को सहज करें।',
    bn: 'মুখের পেশিগুলি শিথিল করুন এবং কপাল থেকে সমস্ত চাপ সরিয়ে দিন।',
  },
  {
    id: 54,
    theme: 'Space',
    en: 'Give yourself permission to do nothing for five quiet minutes.',
    hi: 'दिन में सिर्फ पांच मिनट कुछ न करने और बस शांत बैठने की छूट खुद को दें।',
    bn: 'সারাদিনে মাত্র পাঁচ মিনিট কিছু না করে শুধু শান্ত থাকার অনুমতি নিজেকে দিন।',
  },
  {
    id: 55,
    theme: 'Movement',
    en: 'Gentle stretching before bed can ease physical tension built up through the day.',
    hi: 'सोने से पहले हल्का सा स्ट्रेचिंग पूरे दिन की शारीरिक थकान को पिघला देता है।',
    bn: 'ঘুমানোর আগে হালকা স্ট্রেচিং সারাদিনের শারীরিক ক্লান্তি দূর করে দেয়।',
  },
  {
    id: 56,
    theme: 'Kindness',
    en: 'A kind thought toward yourself changes the way you experience the whole day.',
    hi: 'खुद के प्रति एक अच्छा और प्यार भरा विचार पूरे दिन के अनुभव को बदल देता है।',
    bn: 'নিজের প্রতি একটি সুন্দর ও সহানুভূতিশীল চিন্তা সারাদিনের অনুভূতি বদলে দেয়।',
  },
  {
    id: 57,
    theme: 'Hope',
    en: 'Tomorrow brings a fresh sunrise and a completely new canvas.',
    hi: 'कल की सुबह एक नया सवेरा और एक नई शुरुआत लेकर आएगी।',
    bn: 'আগামীকাল একটি নতুন সূর্যোদয় এবং এক নতুন সূচনা বয়ে আনবে।',
  },
  {
    id: 58,
    theme: 'Care',
    en: 'Caring for your health is the most practical way of showing respect for your life.',
    hi: 'अपनी सेहत का ध्यान रखना, अपनी ज़िंदगी के प्रति आभार जताने का सबसे सुंदर तरीका है।',
    bn: 'নিজের স্বাস্থ্যের যত্ন নেওয়া নিজের জীবনের প্রতি সম্মান জানানোর শ্রেষ্ঠ উপায়।',
  },
  {
    id: 59,
    theme: 'Peace',
    en: 'Breathe in peace, breathe out hurry. You are right where you need to be.',
    hi: 'शांति को अंदर खींचें, जल्दबाज़ी को बाहर छोड़ें। सब कुछ समय के साथ बेहतर होगा।',
    bn: 'শান্তি গ্রহণ করুন, ব্যস্ততা দূরে সরান। সব কিছু সময়ের সাথে সুন্দর হবে।',
  },
];

/**
 * Resolves thought text across all 13 supported languages with graceful regional fallback.
 */
export const resolveThoughtText = (
  item: DailyThought,
  lang = 'en',
): string => {
  const code = (lang || 'en').toLowerCase().split('-')[0];
  const direct = (item as any)[code];
  if (direct && typeof direct === 'string' && direct.trim().length > 0) {
    return direct;
  }
  // Regional script fallbacks:
  if (code === 'as' && item.bn) return item.bn;
  if (code !== 'en' && item.hi) return item.hi;
  return item.en;
};

/**
 * Returns today's thought based on the day of year or optional random seed.
 */
export const getDailyThought = (date = new Date(), lang = 'en'): {
  thought: string;
  theme: string;
  id: number;
} => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = Math.abs(dayOfYear % DAILY_THOUGHTS.length);
  const item = DAILY_THOUGHTS[index] || DAILY_THOUGHTS[0];

  return {
    id: item.id,
    theme: item.theme,
    thought: resolveThoughtText(item, lang),
  };
};

/**
 * Returns a random thought from the 59 thoughts list.
 */
export const getRandomThought = (lang = 'en'): {
  thought: string;
  theme: string;
  id: number;
} => {
  const randomIndex = Math.floor(Math.random() * DAILY_THOUGHTS.length);
  const item = DAILY_THOUGHTS[randomIndex];

  return {
    id: item.id,
    theme: item.theme,
    thought: resolveThoughtText(item, lang),
  };
};
