import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from "@/src/store/hooks";
import { useGetCharacters } from '../hooks/useGetCharacters';
import { PRIMARY_COLOR } from '../helper/Theme';
import { PersonaLobbyScreenProps, Character } from '../type';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const PersonaLobbyScreen = ({ navigation }: PersonaLobbyScreenProps) => {
  const { isConnected } = useAppSelector((state: any) => state.network);
  const { data: characters, isLoading, error } = useGetCharacters(isConnected);
  const [activeTab, setActiveTab] = useState<'AI' | 'Experts'>('AI');

  const handleCharacterSelect = (character: Character) => {
    navigation.navigate('ChatbotScreen', {
      characterId: character.id,
      characterName: character.name,
      characterAvatar: character.avatarUrl,
    });
  };

  const renderCharacterCard = ({ item }: { item: Character }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleCharacterSelect(item)}
        style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
          <View style={styles.onlineBadge} />
        </View>
        <Text style={styles.characterName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.characterTagline} numberOfLines={2}>
          {item.tagline}
        </Text>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Chat Now</Text>
          <Ionicons name="chatbubble-ellipses" size={14} color={PRIMARY_COLOR} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderComingSoon = () => (
    <View style={styles.comingSoonContainer}>
      <View style={styles.comingSoonIconContainer}>
        <FontAwesome6 name="user-doctor" size={48} color={PRIMARY_COLOR} />
      </View>
      <Text style={styles.comingSoonTitle}>Real Doctors, Real Care</Text>
      <Text style={styles.comingSoonText}>
        Soon you will be able to consult with certified medical experts directly from here. We are onboarding top specialists to provide you with the best care.
      </Text>
      <View style={styles.comingSoonBadge}>
        <Text style={styles.comingSoonBadgeText}>Coming Soon</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Care Team</Text>
        <Text style={styles.headerSubtitle}>
          Expert advice and personalized health insights, whenever you need them.
        </Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'AI' && styles.tabButtonActive]}
            onPress={() => setActiveTab('AI')}>
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
            onPress={() => setActiveTab('Experts')}>
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

      <View style={styles.content}>
        {activeTab === 'Experts' ? (
          renderComingSoon()
        ) : isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
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
            contentContainerStyle={styles.flatListContent}
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
    backgroundColor: PRIMARY_COLOR,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: PRIMARY_COLOR,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 24,
    lineHeight: 22,
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
    color: PRIMARY_COLOR,
  },
  content: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  flatListContent: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    margin: 8,
    alignItems: 'center',
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
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
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
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  characterTagline: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
    height: 36,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${PRIMARY_COLOR}15`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY_COLOR,
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
    backgroundColor: `${PRIMARY_COLOR}15`,
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
    backgroundColor: PRIMARY_COLOR,
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
});

export default PersonaLobbyScreen;
