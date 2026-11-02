import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../store/hooks';
import { useGetCharacters } from '../../hooks/ai/useGetCharacters';
import { BUTTON_COLOR } from '../../lib/ui/Theme';
import { PersonaLobbyScreenProps, Character } from '../../schemas/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import {
  getAllCharactersRemaining,
  MAX_DAILY_MESSAGES_PER_CHARACTER,
} from '../../lib/storage/aiUsageStorage';




const PersonaLobbyScreen = ({ navigation }: PersonaLobbyScreenProps) => {
  const { isConnected } = useAppSelector((state: any) => state.network);
  const { data: characters, isLoading, error } = useGetCharacters(isConnected);
  const [activeTab, setActiveTab] = useState<'AI' | 'Experts'>('AI');
  const [remainingMap, setRemainingMap] = useState<Record<string, number>>({});
  // Floating tab bar overlays content; reserve space so last cards stay visible
  const tabBarHeight = React.useContext(BottomTabBarHeightContext) ?? 0;

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      getAllCharactersRemaining().then(map => {
        if (isMounted) {
          setRemainingMap(map);
        }
      });
      return () => {
        isMounted = false;
      };
    }, []),
  );


  const handleCharacterSelect = (character: Character) => {
    navigation.navigate('ChatbotScreen', {
      characterId: character.id,
      characterName: character.name,
      characterAvatar: character.avatarUrl,
    });
  };


  const renderCharacterCard = ({ item }: { item: Character }) => {
    const remaining = remainingMap[String(item.id)] ?? MAX_DAILY_MESSAGES_PER_CHARACTER;
    const isExhausted = remaining <= 0;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleCharacterSelect(item)}
        style={styles.cardContainer}
        accessibilityRole="button"
        accessibilityLabel={`Chat with ${item.name}`}
        accessibilityHint={`Opens a chat with ${item.name}`}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          <View style={styles.onlineBadge} />
        </View>

        {/* Daily limit counter badge */}
        <View style={[styles.counterBadge, isExhausted && styles.counterBadgeExhausted]}>
          <Ionicons
            name={isExhausted ? 'lock-closed' : 'chatbubble-ellipses'}
            size={11}
            color={isExhausted ? '#DC2626' : '#2563EB'}
          />
          <Text style={[styles.counterBadgeText, isExhausted && styles.counterBadgeTextExhausted]}>
            {remaining}/{MAX_DAILY_MESSAGES_PER_CHARACTER} left today
          </Text>
        </View>

        <Text style={styles.characterName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.characterTagline} numberOfLines={2}>
          {item.tagline}
        </Text>
        <View style={[styles.actionButton, isExhausted && styles.actionButtonDisabled]}>
          <Text style={[styles.actionButtonText, isExhausted && styles.actionButtonTextDisabled]}>
            {isExhausted ? 'Limit Reached' : 'Chat Now'}
          </Text>
          <Ionicons
            name={isExhausted ? 'time-outline' : 'chatbubble-ellipses'}
            size={14}
            color={isExhausted ? '#64748B' : BUTTON_COLOR}
          />
        </View>
      </TouchableOpacity>
    );
  };


  const renderComingSoon = () => (
    <View style={styles.comingSoonContainer}>
      <View style={styles.comingSoonIconContainer}>
        <FontAwesome6 name="user-doctor" size={48} color={BUTTON_COLOR} />
      </View>
      <Text style={styles.comingSoonTitle}>Real Doctors, Real Care</Text>
      <Text style={styles.comingSoonText}>
        Soon you will be able to connect with verified doctors directly from here. We are onboarding dedicated professionals to support your care.
      </Text>
      <View style={styles.comingSoonBadge}>
        <Text style={styles.comingSoonBadgeText}>Coming Soon</Text>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerIcon}>
            <Ionicons name="sparkles" size={20} color="#ffffff" />
          </View>
          <Text style={styles.headerTitle}>Your Care Team</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Helpful guidance and personalized wellness insights, whenever you need them.
        </Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'AI' && styles.tabButtonActive]}
            onPress={() => setActiveTab('AI')}
            accessibilityRole="tab"
            accessibilityLabel="AI Assistants"
            accessibilityState={{ selected: activeTab === 'AI' }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'AI' && styles.tabTextActive,
              ]}>
              AI Assistants
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Experts' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Experts')}
            accessibilityRole="tab"
            accessibilityLabel="Consult Experts"
            accessibilityState={{ selected: activeTab === 'Experts' }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Experts' && styles.tabTextActive,
              ]}>
              Consult Experts
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={[styles.content, { paddingBottom: tabBarHeight }]}>
        {activeTab === 'Experts' ? (
          renderComingSoon()
        ) : isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={BUTTON_COLOR} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color="#ef4444"
              style={{ marginBottom: 16 }}
            />
            <Text style={styles.errorText}>
              Oops! We couldn't load your health team. Please check your connection and try again.
            </Text>
          </View>
        ) : (
          <FlatList
            data={characters}
            keyExtractor={(item: any) => item.id}
            renderItem={renderCharacterCard}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContent}
            ListHeaderComponent={
              <Text style={styles.sectionLabel}>Choose an assistant to start chatting</Text>
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="chatbubbles-outline" size={44} color="#94A3B8" style={{ marginBottom: 12 }} />
                <Text style={styles.emptyTitle}>No Assistants Available</Text>
                <Text style={styles.emptySubtitle}>
                  Health assistants are temporarily unavailable. Please check back shortly.
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BUTTON_COLOR,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: BUTTON_COLOR,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 18,
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  tabTextActive: {
    color: BUTTON_COLOR,
  },
  content: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  flatListContent: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  cardContainer: {
    flex: 1,
    maxWidth: '48.5%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eef2f7',
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#f1f5f9',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22c55e',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  characterName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  characterTagline: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 18,
    minHeight: 36,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: `${BUTTON_COLOR}15`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: BUTTON_COLOR,
  },
  actionButtonDisabled: {
    backgroundColor: '#F1F5F9',
  },
  actionButtonTextDisabled: {
    color: '#94A3B8',
  },
  counterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  counterBadgeExhausted: {
    backgroundColor: '#FEF2F2',
  },
  counterBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  counterBadgeTextExhausted: {
    color: '#DC2626',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  comingSoonIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${BUTTON_COLOR}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  comingSoonBadge: {
    backgroundColor: BUTTON_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  comingSoonBadgeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    padding: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});


export default PersonaLobbyScreen;