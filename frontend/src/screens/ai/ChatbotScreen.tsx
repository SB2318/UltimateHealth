/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {BUTTON_COLOR} from '../../lib/ui/Theme';
import {useAppSelector} from '../../store/hooks';
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Share,
  Keyboard,
  useColorScheme,
  Clipboard,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Tts from 'react-native-tts';
import {GET_STORAGE_DATA, CLEAR_CHAT_API, EXPORT_CHAT_API} from '../../lib/api/APIUtils';
import authAxios from '../../lib/api/authAxios';
import HipaaComplianceModal from '../../components/common/HipaaComplianceModal';
import {ChatBotScreenProps, Message} from '../../schemas/type';
import {hp} from '../../lib/ui/Metric';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';
import {useGetProfile} from '../../hooks/profile/useGetProfile';
import {useSendMessageToGemini} from '../../hooks/ai/useSendMessageToGemini';
import {useLoadAIConversations} from '../../hooks/ai/useLoadAIChats';
import Snackbar from 'react-native-snackbar';
import {verifyChatbotResponse} from '../../../plugins/api/chatbot-response-verification';
import {
  getCharacterDailyUsage,
  incrementCharacterDailyUsage,
  MAX_DAILY_MESSAGES_PER_CHARACTER,
  checkAndResetDailyChatSession,
  isMessageFromToday,
  FALLBACK_WELCOME_MESSAGE,
  getFallbackQuotaExceededMessage,
} from '../../lib/storage/aiUsageStorage';

// interface ChatbotResponse {
//   id: string;
//   created: number;
//   model: string;
//   choices: Choice[];
//   usage: Usage;
// }

// interface Usage {
//   prompt_tokens: number;
//   completion_tokens: number;
//   total_tokens: number;
// }

const ASSISTANT_USER_ID = 2;

const useSafeTopInset = () => {
  try {
    return useSafeAreaInsets().top;
  } catch {
    return 0;
  }
};

const ChatbotScreen = ({navigation, route}: ChatBotScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const chatBg = isDarkMode ? '#0A0F1D' : '#f9fafb';
  const headerBg = isDarkMode ? '#0F172A' : BUTTON_COLOR;
  const leftBubbleBg = isDarkMode ? '#1E293B' : '#ffffff';
  const leftTextColor = isDarkMode ? '#F8FAFC' : '#1e293b';
  const inputToolbarBg = isDarkMode ? '#1E293B' : '#ffffff';
  const modalBg = isDarkMode ? '#1E293B' : '#ffffff';
  const modalTextColor = isDarkMode ? '#F8FAFC' : '#111827';
  const topInset = useSafeTopInset();
  // When rendered inside the AI tab, keep the composer above the floating tab bar
  const tabBarHeight = React.useContext(BottomTabBarHeightContext) ?? 0;
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  React.useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const s = Keyboard.addListener(showEvt, () => setKeyboardOpen(true));
    const h = Keyboard.addListener(hideEvt, () => setKeyboardOpen(false));
    return () => {
      s.remove();
      h.remove();
    };
  }, []);
  const bottomSpacing = keyboardOpen ? 0 : tabBarHeight;
  const {isConnected} = useAppSelector((state: any) => state.network);
  
  const { characterId, characterName, characterAvatar } = route.params || {};

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState<boolean>(false);
  const [showQuotaModal, setShowQuotaModal] = useState<boolean>(false);
  const [remainingMessages, setRemainingMessages] = useState<number>(MAX_DAILY_MESSAGES_PER_CHARACTER);
  const [showHipaaModal, setShowHipaaModal] = useState<boolean>(false);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const isMountedRef = useRef(true);

  const safeSetMessages = useCallback(
    (updater: React.SetStateAction<IMessage[]>) => {
      if (isMountedRef.current) {
        setMessages(updater);
      }
    },
    [],
  );



  useEffect(() => {
    let isMounted = true;
    checkAndResetDailyChatSession();
    getCharacterDailyUsage(characterId).then(usage => {
      if (isMounted) {
        setRemainingMessages(usage.remaining);
        if (usage.remaining <= 0) {
          setIsQuotaExceeded(true);
          safeSetMessages(prev => {
            const hasQuotaMsg = prev.some(
              m => typeof m._id === 'string' && m._id.startsWith('quota-fallback'),
            );
            if (hasQuotaMsg) return prev;
            return GiftedChat.append(prev, [
              {
                _id: `quota-fallback-${Date.now()}`,
                text: getFallbackQuotaExceededMessage(characterName),
                createdAt: new Date(),
                user: {
                  _id: ASSISTANT_USER_ID,
                  avatar:
                    characterAvatar ||
                    'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
                },
              },
            ]);
          });
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [characterId, characterAvatar, characterName, safeSetMessages]);
  const {data: user} = useGetProfile();

  const [activeSpeakingId, setActiveSpeakingId] = useState<string | number | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | number | null>(null);
  const availableVoicesRef = useRef<any[]>([]);

  const detectLanguageScript = (text: string): string => {
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi, Marathi, Sanskrit, Nepali
    if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali / Assamese
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
    if (/[\u0600-\u06FF]/.test(text)) return 'ar'; // Arabic / Urdu
    if (/[\u0400-\u04FF]/.test(text)) return 'ru'; // Russian / Cyrillic
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'; // Chinese
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja'; // Japanese
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko'; // Korean
    if (/[\u00C0-\u00FF]/.test(text)) return 'es'; // Spanish / European accents
    return 'en';
  };

  const copyToClipboard = useCallback((text: string, id: string | number) => {
    if (!text) return;
    try {
      Clipboard.setString(text);
      setCopiedMessageId(id);
      Snackbar.show({
        text: 'Message copied to clipboard',
        duration: Snackbar.LENGTH_SHORT,
      });
      setTimeout(() => {
        if (isMountedRef.current) {
          setCopiedMessageId(prev => (prev === id ? null : prev));
        }
      }, 2000);
    } catch (e) {
      console.warn('Failed to copy to clipboard', e);
    }
  }, []);

  const initTts = async () => {
    try {
      await Tts.getInitStatus();
      const voices = await Tts.voices();
      const availableVoices = (voices || []).filter(
        (v: any) => !v.networkConnectionRequired && !v.notInstalled,
      );
      availableVoicesRef.current = availableVoices;
      if (availableVoices && availableVoices.length > 0) {
        const defaultVoice =
          availableVoices.find((v: any) => v.language?.startsWith('en')) ||
          availableVoices[0];
        if (defaultVoice) {
          try {
            await Tts.setDefaultLanguage(defaultVoice.language);
          } catch (err) {
            console.warn(`Failed to set TTS language to ${defaultVoice.language}`, err);
          }
          await Tts.setDefaultVoice(defaultVoice.id);
        }
      }
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1.0);
    } catch (error) {
      console.warn('Failed to initialize TTS voices in ChatbotScreen', error);
    }
  };

  useEffect(() => {
    initTts();

    const onStart = () => {};
    const onFinish = () => { setActiveSpeakingId(null); };
    const onCancel = () => { setActiveSpeakingId(null); };
    const onError  = () => { setActiveSpeakingId(null); };

    const startSub = Tts.addEventListener('tts-start',  onStart) as any;
    const finishSub = Tts.addEventListener('tts-finish', onFinish) as any;
    const cancelSub = Tts.addEventListener('tts-cancel', onCancel) as any;
    const errorSub = Tts.addEventListener('tts-error',  onError) as any;

    return () => {
      Tts.stop();
      try { startSub?.remove?.(); } catch (e) {}
      try { finishSub?.remove?.(); } catch (e) {}
      try { cancelSub?.remove?.(); } catch (e) {}
      try { errorSub?.remove?.(); } catch (e) {}
    };
  }, []);

  const toggleSpeech = useCallback(async (message: IMessage) => {
    if (activeSpeakingId === message._id) {
      Tts.stop();
      setActiveSpeakingId(null);
    } else {
      Tts.stop();
      if (message.text) {
        setActiveSpeakingId(message._id);
        const langCode = detectLanguageScript(message.text);
        const matchingVoice = availableVoicesRef.current.find((v: any) =>
          v.language?.toLowerCase().startsWith(langCode.toLowerCase()),
        );
        if (matchingVoice) {
          try {
            await Tts.setDefaultLanguage(matchingVoice.language);
            await Tts.setDefaultVoice(matchingVoice.id);
          } catch (err) {
            console.warn(`Failed to switch TTS voice for language ${langCode}`, err);
          }
        }
        Tts.speak(message.text);
      }
    }
  }, [activeSpeakingId]);

  //console.log("User Token", user_token);

  const {mutate: sendMessageToAI, isPending: messageProcessPending} =
    useSendMessageToGemini();
  const isPending = messageProcessPending || isLoading;
  const {data: conversations, isLoading: _conversationLoading} =
    useLoadAIConversations(isConnected, characterId);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);



  const safeSetIsTyping = useCallback((typing: boolean) => {
    if (isMountedRef.current) {
      setIsTyping(typing);
    }
  }, []);

  const convertToGiftedFormat = useCallback((items: Message[]): IMessage[] => {
    return items.map(m => ({
      _id: m._id,
      text: m.text,
      createdAt: new Date(m.timestamp),
      user: {
        _id: m.role === 'user' ? 1 : ASSISTANT_USER_ID,
        avatar: m.profileImage
          ? `${GET_STORAGE_DATA}/${m.profileImage}`
          : m.role === 'assistant'
            ? (characterAvatar || 'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg')
            : undefined,
      },
    }));
  }, [characterAvatar]);

  useEffect(() => {
    if (conversations) {
      // Retain and load all previous conversations from the server history
      const refined = convertToGiftedFormat(conversations);
      safeSetMessages([
        {
          _id: 'welcome-msg',
          text: FALLBACK_WELCOME_MESSAGE,
          createdAt: new Date(),
          user: {
            _id: ASSISTANT_USER_ID,
            avatar:
              characterAvatar ||
              'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
          },
        },
        ...refined.reverse(),
      ]);

      safeSetIsTyping(false);
    }
  }, [conversations, safeSetIsTyping, safeSetMessages, convertToGiftedFormat, characterAvatar]);


  const performSendMessage = useCallback((prompt: string) => {
    if (!isConnected) {
      const errorId = `error-${Date.now()}`;
      safeSetMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: errorId,
            text: 'Unable to connect. Please check your internet connection and try again.',
            createdAt: new Date(),
            user: {
              _id: ASSISTANT_USER_ID,
              avatar: characterAvatar || 'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
            },
            customError: true,
            originalPrompt: prompt,
          } as any,
        ]),
      );
      Snackbar.show({
        text: 'Please check your internet connection and try again!',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    setIsLoading(true);

    const detectedLang = detectLanguageScript(prompt);
    sendMessageToAI({ text: prompt, character: characterId, language: detectedLang }, {
      onSuccess: (responseData: Message) => {
        setIsLoading(false);
        const verification = verifyChatbotResponse(responseData.text);
        safeSetMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: responseData._id,
              text: responseData.text,
              createdAt: new Date(),
              user: {
                _id: ASSISTANT_USER_ID,
                avatar: characterAvatar || 'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
              },
              metadata: {
                status: verification.status,
                confidence: verification.confidence,
              },
            } as any,
          ]),
        );
      },
      onError: (error: any) => {
        setIsLoading(false);
        if (!isMountedRef.current) {
          return;
        }
        console.log('Error', error);
        let errorMsg = 'Something went wrong. Please try again.';
        if (error.response) {
          const statusCode = error.response.status;
          switch (statusCode) {
            case 401:
              errorMsg = 'Unauthorized access. Please log in again.';
              break;
            case 422:
              errorMsg = 'Invalid request. Please check your input.';
              break;
            case 429:
              errorMsg = 'Daily quota exceeded for this character. Come back tomorrow for more advice!';
              setIsQuotaExceeded(true);
              setShowQuotaModal(true);
              break;
            case 500:
              errorMsg = 'An internal server error occurred. Please try again later.';
              break;
            case 503:
              errorMsg = '⚠️ AI service is temporarily unavailable. Please try again later.';
              break;
              

            default:
              errorMsg = 'An unexpected error occurred. Please try again later.';
          }
        } else {
          if (error.message === 'Network Error') {
            errorMsg = 'Unable to connect. Please check your internet connection and try again.';
          }
        }

        safeSetMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: `error-${Date.now()}`,
              text: errorMsg,
              createdAt: new Date(),
              user: {
                _id: ASSISTANT_USER_ID,
                avatar: characterAvatar || 'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
              },
              customError: true,
              originalPrompt: prompt,
            } as any,
          ]),
        );
      },
    });
  }, [isConnected, safeSetMessages, sendMessageToAI, setIsLoading, characterId]);

  // A failed message can only be resent once the device is back online and no
  // other request is in flight; until then the retry control stays inert.
  const canRetry = isConnected && !isPending;

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    if (isPending) {
      return;
    }
    if (remainingMessages <= 0) {
      setIsQuotaExceeded(true);
      setShowQuotaModal(true);
      Snackbar.show({
        text: `Daily limit reached for ${characterName || 'this character'} (/ messages).`,
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    const prompt = newMessages[0]?.text ?? 'AI in health within 100 words';
    
    // Decrement local counter and save usage
    incrementCharacterDailyUsage(characterId).then(usage => {
      if (isMountedRef.current) {
        setRemainingMessages(usage.remaining);
        if (usage.remaining <= 0) {
          setIsQuotaExceeded(true);
          setShowQuotaModal(true);
          safeSetMessages(prev =>
            GiftedChat.append(prev, [
              {
                _id: `quota-fallback-${Date.now()}`,
                text: getFallbackQuotaExceededMessage(characterName),
                createdAt: new Date(),
                user: {
                  _id: ASSISTANT_USER_ID,
                  avatar:
                    characterAvatar ||
                    'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
                },
              },
            ]),
          );
        }
      }
    });

    safeSetMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    performSendMessage(prompt);
  }, [isPending, remainingMessages, characterId, characterName, safeSetMessages, performSendMessage]);

  const handleRetry = useCallback((failedMessage: any) => {
    if (isPending) {
      return;
    }
    // Retrying while still offline would only swap the failure card for an
    // identical one, so the prompt is held until the connection is back.
    if (!isConnected) {
      Snackbar.show({
        text: 'Still offline. Your message will be ready to send once you reconnect.',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    safeSetMessages(previousMessages =>
      previousMessages.filter(m => m._id !== failedMessage._id)
    );

    performSendMessage(failedMessage.originalPrompt);
  }, [isPending, isConnected, safeSetMessages, performSendMessage]);

  const handleExportChat = useCallback(async () => {
    if (!isConnected) {
      Snackbar.show({
        text: 'You are offline. Reconnect to export your chat transcripts.',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    setIsExporting(true);
    try {
      const res = await authAxios.get(EXPORT_CHAT_API);
      const data = res?.data;
      const disclaimer =
        data?.disclaimer || 'Educational wellness guidance only. Not medical advice. For emergencies, call 911.';
      const notice = data?.complianceNotice || 'HIPAA Right of Access Export (45 CFR § 164.524)';
      const timestamp = new Date().toLocaleString();

      const transcriptLines = (messages || [])
        .slice()
        .reverse()
        .map(m => {
          const sender = m.user?._id === 1 ? 'Patient' : (characterName || 'Care Companion AI');
          const time = m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : '';
          return `[${time}] ${sender}:\n${m.text}`;
        })
        .join('\n\n');

      const fullShareText = `=== ULTIMATEHEALTH HIPAA CHAT TRANSCRIPT ===\n${notice}\nExported: ${timestamp}\nCare Persona: ${characterName || 'Care Companion AI'}\n\nClinical Notice: ${disclaimer}\n\n=== CONVERSATION LOGS ===\n\n${transcriptLines}`;

      await Share.share({
        title: 'UltimateHealth Chat History (HIPAA § 164.524)',
        message: fullShareText,
      });

      Snackbar.show({
        text: 'Chat history exported successfully under HIPAA § 164.524',
        duration: Snackbar.LENGTH_LONG,
      });
    } catch {
      Snackbar.show({
        text: 'Unable to export chat transcript at this time.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setIsExporting(false);
      setShowMenuModal(false);
    }
  }, [isConnected, messages, characterName]);

  const handleClearChat = useCallback(() => {
    Alert.alert(
      'Clear Conversation',
      `Under HIPAA 45 CFR § 164.526 (Right to Amend & Clear), all messages with ${characterName || 'this assistant'} will be permanently removed from server records.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Permanently',
          style: 'destructive',
          onPress: async () => {
            setIsClearing(true);
            try {
              const url = characterId
                ? `${CLEAR_CHAT_API}?character=${characterId}`
                : `${CLEAR_CHAT_API}`;
              await authAxios.delete(url);

              safeSetMessages([
                {
                  _id: 1,
                  text: FALLBACK_WELCOME_MESSAGE,
                  createdAt: new Date(),
                  user: {
                    _id: ASSISTANT_USER_ID,
                    avatar:
                      characterAvatar ||
                      'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg',
                  },
                },
              ]);

              Snackbar.show({
                text: 'Chat history permanently purged (HIPAA § 164.526)',
                duration: Snackbar.LENGTH_LONG,
              });
            } catch {
              Snackbar.show({
                text: 'Failed to clear conversation on server. Please try again.',
                duration: Snackbar.LENGTH_SHORT,
              });
            } finally {
              setIsClearing(false);
              setShowMenuModal(false);
            }
          },
        },
      ],
    );
  }, [characterId, characterName, characterAvatar, safeSetMessages]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fafb'}} edges={[]}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: topInset + 12,
          paddingBottom: 16,
          zIndex: 1,
          backgroundColor: headerBg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: {
              elevation: 4,
            },
          }),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'rgba(255,255,255,0.5)',
            }}>
            <Image
              source={{ uri: characterAvatar || 'https://static.vecteezy.com/system/resources/previews/026/309/247/non_2x/robot-chat-or-chat-bot-logo-modern-conversation-automatic-technology-logo-design-template-vector.jpg' }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6}}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#ffffff', flex: 1}} numberOfLines={1}>
              {characterName || 'Care Companion AI'}
            </Text>
            {/* Daily Usage Counter Badge */}
            <View
              style={{
                backgroundColor: remainingMessages > 0 ? 'rgba(255,255,255,0.22)' : 'rgba(239,68,68,0.3)',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                borderWidth: 1,
                borderColor: remainingMessages > 0 ? 'rgba(255,255,255,0.35)' : 'rgba(239,68,68,0.5)',
              }}>
              <Ionicons
                name={remainingMessages > 0 ? 'chatbubble-ellipses' : 'lock-closed'}
                size={11}
                color="#ffffff"
              />
              <Text style={{color: '#ffffff', fontSize: 11, fontWeight: '700'}}>
                {remainingMessages}/{MAX_DAILY_MESSAGES_PER_CHARACTER} left
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2}}>
            <Text style={{fontSize: 12, color: 'rgba(255,255,255,0.85)'}}>
              {isPending ? 'Generating response...' : isTyping ? 'Typing...' : 'Online'}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <TouchableOpacity
                onPress={() => setShowHipaaModal(true)}
                testID="hipaa-header-badge"
                accessibilityRole="button"
                accessibilityLabel="HIPAA Compliance & Rights"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.25)',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                  borderWidth: 1,
                  borderColor: 'rgba(52, 211, 153, 0.45)',
                }}>
                <Ionicons name="shield-checkmark" size={11} color="#34D399" />
                <Text style={{color: '#ffffff', fontSize: 10, fontWeight: '700'}}>
                  HIPAA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowMenuModal(true)}
                testID="chat-menu-btn"
                accessibilityRole="button"
                accessibilityLabel="Chat and HIPAA Options"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="ellipsis-vertical" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* HIPAA Safe Harbor & Clinical Notice Banner */}
      <View
        style={{
          backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF',
          paddingVertical: 6,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? '#334155' : '#DBEAFE',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1}}>
          <Ionicons name="shield-checkmark" size={13} color="#10B981" />
          <Text
            style={{
              fontSize: 11,
              color: isDarkMode ? '#94A3B8' : '#1E40AF',
              fontWeight: '500',
              flex: 1,
            }}
            numberOfLines={1}>
            PHI de-identified under Safe Harbor. In emergencies, call 911.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowHipaaModal(true)}
          accessibilityRole="button"
          accessibilityLabel="Read HIPAA Privacy Rights">
          <Text
            style={{
              fontSize: 11,
              color: '#2563EB',
              fontWeight: '700',
              marginLeft: 6,
            }}>
            Rights
          </Text>
        </TouchableOpacity>
      </View>


      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={{flex: 1, backgroundColor: chatBg, paddingBottom: bottomSpacing}}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            onLongPress={(context, message) => {
              if (message?.text) {
                copyToClipboard(message.text, message._id);
              }
            }}
            user={{
              _id: 1,
              avatar:
                user && user?.Profile_image
                  ? `${GET_STORAGE_DATA}/${user?.Profile_image}`
                  : 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png',
            }}
            isTyping={isTyping || isPending}
            //alwaysShowSend={true}
            //keyboardShouldPersistTaps="handled"
            minInputToolbarHeight={52}
            maxComposerHeight={110}
            //bottomOffset={Platform.OS === "ios" ? 12 : 0}
            //messagesContainerStyle={{ paddingTop: 10 }}
            messagesContainerStyle={{
              paddingTop: 10,
              paddingBottom: 20,
            }}
            textInputProps={{
              editable: !isPending && !isQuotaExceeded && remainingMessages > 0,
              placeholder:
                remainingMessages > 0 && !isQuotaExceeded
                  ? `Ask ${characterName || 'the AI'} in any language... (${remainingMessages}/${MAX_DAILY_MESSAGES_PER_CHARACTER} left today)`
                  : `Daily limit reached (${MAX_DAILY_MESSAGES_PER_CHARACTER}/${MAX_DAILY_MESSAGES_PER_CHARACTER}). Resets tomorrow.`,
            }}
            renderBubble={props => {
              const currentMessage = props.currentMessage as any;
              if (currentMessage?.customError) {
                return (
                  <View style={{
                    backgroundColor: '#fee2e2',
                    borderColor: '#fca5a5',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    marginVertical: 4,
                    maxWidth: '85%',
                    alignSelf: 'flex-start',
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Ionicons name="alert-circle" size={20} color="#dc2626" />
                      <Text style={{ color: '#dc2626', fontWeight: '600', fontSize: 15 }}>
                        Failed to send message
                      </Text>
                    </View>
                    <Text style={{ color: '#7f1d1d', fontSize: 15, marginTop: 4, lineHeight: 22 }}>
                      {currentMessage.text}
                    </Text>
                    {currentMessage.originalPrompt && (
                      <TouchableOpacity
                        onPress={() => handleRetry(currentMessage)}
                        disabled={!canRetry}
                        accessibilityRole="button"
                        accessibilityState={{disabled: !canRetry}}
                        accessibilityLabel={
                          canRetry
                            ? 'Retry sending message'
                            : 'Retry unavailable, waiting for a network connection'
                        }
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: canRetry ? '#dc2626' : '#f3f4f6',
                          borderWidth: canRetry ? 0 : 1,
                          borderColor: '#d1d5db',
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          marginTop: 10,
                          alignSelf: 'flex-start',
                          gap: 6,
                        }}
                      >
                        <Ionicons
                          name={isConnected ? 'refresh' : 'cloud-offline-outline'}
                          size={16}
                          color={canRetry ? 'white' : '#4b5563'}
                        />
                        <Text
                          style={{
                            color: canRetry ? 'white' : '#4b5563',
                            fontWeight: '600',
                            fontSize: 14,
                          }}>
                          {isConnected ? 'Retry' : 'Waiting for connection'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }
              const isAssistant = currentMessage.user?._id === ASSISTANT_USER_ID;
              const isSpeaking = activeSpeakingId === currentMessage._id;
              const isCopied = copiedMessageId === currentMessage._id;
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {!isAssistant && (
                    <TouchableOpacity
                      onPress={() => copyToClipboard(currentMessage.text, currentMessage._id)}
                      style={{
                        padding: 6,
                        marginRight: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      activeOpacity={0.7}
                      accessibilityLabel={isCopied ? 'Copied' : 'Copy message to clipboard'}
                    >
                      <Ionicons
                        name={isCopied ? 'checkmark-circle' : 'copy-outline'}
                        size={18}
                        color={isCopied ? '#10b981' : isDarkMode ? '#94A3B8' : '#6b7280'}
                      />
                    </TouchableOpacity>
                  )}
                  <Bubble
                    {...props}
                    onLongPress={() => copyToClipboard(currentMessage.text, currentMessage._id)}
                    wrapperStyle={{
                      left: {
                        backgroundColor: leftBubbleBg,
                        borderBottomLeftRadius: 4,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        padding: 4,
                        ...Platform.select({
                          ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
                          android: { elevation: 2 },
                        }),
                      },
                      right: {
                        backgroundColor: BUTTON_COLOR,
                        borderBottomRightRadius: 4,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        padding: 4,
                        ...Platform.select({
                          ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
                          android: { elevation: 2 },
                        }),
                      },
                    }}
                    textStyle={{
                      left: { color: leftTextColor, fontSize: 16, lineHeight: 24 },
                      right: { color: '#ffffff', fontSize: 16, lineHeight: 24 },
                    }}
                  />
                  {isAssistant && (
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 4}}>
                      <TouchableOpacity
                        onPress={() => toggleSpeech(currentMessage)}
                        style={{
                          padding: 6,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        activeOpacity={0.7}
                        accessibilityLabel={isSpeaking ? 'Stop speaking message' : 'Listen to message'}
                      >
                        <Ionicons
                          name={isSpeaking ? 'stop-circle' : 'volume-medium'}
                          size={22}
                          color={isSpeaking ? BUTTON_COLOR : isDarkMode ? '#94A3B8' : '#6b7280'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => copyToClipboard(currentMessage.text, currentMessage._id)}
                        style={{
                          padding: 6,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        activeOpacity={0.7}
                        accessibilityLabel={isCopied ? 'Copied' : 'Copy message to clipboard'}
                      >
                        <Ionicons
                          name={isCopied ? 'checkmark-circle' : 'copy-outline'}
                          size={18}
                          color={isCopied ? '#10b981' : isDarkMode ? '#94A3B8' : '#6b7280'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
            renderInputToolbar={props => (
              <InputToolbar
                {...props}
                containerStyle={{
                  backgroundColor: inputToolbarBg,
                  borderTopWidth: 0,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  justifyContent: 'center',
                  ...Platform.select({
                    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 8 },
                    android: { elevation: 4 },
                  }),
                }}
                primaryStyle={{ alignItems: 'center' }}
              />
            )}
            renderSend={props => (
              <Send
                {...props}
                containerStyle={{justifyContent: 'center'}}
              >
                <View style={{marginRight: 12, marginBottom: 8}}>
                  <Ionicons
                    name={remainingMessages <= 0 ? 'lock-closed' : 'send'}
                    size={remainingMessages <= 0 ? 20 : 26}
                    color={
                      props.text?.trim().length && !isPending && remainingMessages > 0
                        ? BUTTON_COLOR
                        : '#9ca3af'
                    }
                  />
                </View>
              </Send>
            )}
          />
        </View>
      </KeyboardAvoidingView>

      <Modal visible={showQuotaModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{ backgroundColor: modalBg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, alignItems: 'center' }}>
            <View style={{ width: 48, height: 4, backgroundColor: '#e5e7eb', borderRadius: 2, marginBottom: 24 }} />
            <Ionicons name="time-outline" size={48} color="#f59e0b" style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 20, fontWeight: '700', color: modalTextColor, marginBottom: 8, textAlign: 'center' }}>
              Daily Limit Reached
            </Text>
            <Text style={{ fontSize: 15, color: isDarkMode ? '#94A3B8' : '#4b5563', textAlign: 'center', marginBottom: 24, lineHeight: 22 }}>
              {"You've"} used your daily messages for {characterName || 'this character'} today. Your limit resets automatically at midnight. Please come back tomorrow for more advice!
            </Text>
            <TouchableOpacity
              onPress={() => setShowQuotaModal(false)}
              style={{ backgroundColor: BUTTON_COLOR, paddingVertical: 14, width: '100%', borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* HIPAA Compliance & Patient Privacy Modal */}
      <HipaaComplianceModal
        visible={showHipaaModal}
        onClose={() => setShowHipaaModal(false)}
        onExportChat={handleExportChat}
        showExportActions={true}
      />

      {/* Quick Actions & HIPAA Tasks Menu */}
      <Modal
        visible={showMenuModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenuModal(false)}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}
          activeOpacity={1}
          onPress={() => setShowMenuModal(false)}>
          <View
            style={{
              backgroundColor: modalBg,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              gap: 12,
            }}>
            <View style={{ width: 44, height: 4, backgroundColor: '#e5e7eb', borderRadius: 2, alignSelf: 'center', marginBottom: 4 }} />
            <Text style={{ fontSize: 18, fontWeight: '700', color: modalTextColor }}>
              Chat & HIPAA Privacy Tasks
            </Text>

            <TouchableOpacity
              testID="action-export-chat"
              onPress={handleExportChat}
              disabled={isExporting}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? '#334155' : '#f1f5f9',
              }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(15,82,186,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="cloud-download-outline" size={20} color={BUTTON_COLOR} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: modalTextColor }}>
                  Export Chat Transcript
                </Text>
                <Text style={{ fontSize: 12, color: isDarkMode ? '#94A3B8' : '#6b7280' }}>
                  HIPAA Right of Access (45 CFR § 164.524)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              testID="action-clear-chat"
              onPress={handleClearChat}
              disabled={isClearing}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: isDarkMode ? '#334155' : '#f1f5f9',
              }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(239,68,68,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="trash-outline" size={20} color="#dc2626" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#dc2626' }}>
                  Clear Conversation
                </Text>
                <Text style={{ fontSize: 12, color: isDarkMode ? '#94A3B8' : '#6b7280' }}>
                  HIPAA Right to Amend & Clear (45 CFR § 164.526)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              testID="action-hipaa-info"
              onPress={() => {
                setShowMenuModal(false);
                setShowHipaaModal(true);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 12,
              }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(16,185,129,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#10b981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: modalTextColor }}>
                  HIPAA Notice & Privacy Rights
                </Text>
                <Text style={{ fontSize: 12, color: isDarkMode ? '#94A3B8' : '#6b7280' }}>
                  Safe Harbor De-Identification & Technical Safeguards
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowMenuModal(false)}
              style={{
                backgroundColor: isDarkMode ? '#334155' : '#f3f4f6',
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: 'center',
                marginTop: 6,
              }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: modalTextColor }}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatbotScreen;
