import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDailyThought, getRandomThought, DailyThought } from '../../lib/data/dailyThoughts';
import { useTranslation } from '../../localization';

export interface DailyThoughtCardRef {
  shuffle: () => void;
}

interface DailyThoughtCardProps {
  onPressTheme?: (theme: string) => void;
}

export const DailyThoughtCard = forwardRef<DailyThoughtCardRef, DailyThoughtCardProps>(
  ({ onPressTheme }, ref) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { currentLanguage } = useTranslation();

    const [currentThought, setCurrentThought] = useState(() =>
      getDailyThought(new Date(), currentLanguage),
    );

    const [fadeAnim] = useState(new Animated.Value(1));

    const handleNextThought = useCallback(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        setCurrentThought(getRandomThought(currentLanguage));
      }, 140);
    }, [currentLanguage, fadeAnim]);

    useImperativeHandle(ref, () => ({
      shuffle: handleNextThought,
    }));

    const colors = {
      bg: isDarkMode ? '#172033' : '#F0F9FF',
      border: isDarkMode ? '#1E293B' : '#BAE6FD',
      quoteText: isDarkMode ? '#F1F5F9' : '#0369A1',
      headerText: isDarkMode ? '#94A3B8' : '#0284C7',
      badgeBg: isDarkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)',
      badgeText: isDarkMode ? '#38BDF8' : '#0284C7',
      shuffleBtnBg: isDarkMode ? '#1E293B' : '#E0F2FE',
    };

    // Nicely format the theme label (e.g. "Posture" -> "Posture Check")
    const formatTheme = (theme: string) => {
      if (!theme) return 'Daily Reflection';
      const clean = theme.trim().toLowerCase();
      const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
      if (clean === 'posture') return 'Posture Check';
      if (clean === 'breathing') return 'Mindful Breath';
      if (clean === 'hydration') return 'Hydration Check';
      return capitalized;
    };

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.bg, borderColor: colors.border },
        ]}>
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
            <Ionicons
              name="sparkles"
              size={12}
              color={colors.badgeText}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.badgeText, { color: colors.badgeText }]}>
              {formatTheme(currentThought.theme)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleNextThought}
            style={[styles.shuffleButton, { backgroundColor: colors.shuffleBtnBg }]}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Read another gentle thought"
            accessibilityHint="Shows another daily wellness reminder">
            <Ionicons name="sync-outline" size={13} color={colors.headerText} />
            <Text style={[styles.shuffleText, { color: colors.headerText }]}>
              Another Thought
            </Text>
          </TouchableOpacity>
        </View>

        {/* Thought Content */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.thoughtText, { color: colors.quoteText }]}>
            {currentThought.thought}
          </Text>
        </Animated.View>

        {/* Gentle Footer */}
        <View style={styles.footerRow}>
          <Text style={[styles.footerText, { color: colors.headerText }]}>
            Daily Pause · Take a mindful breath
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  shuffleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  thoughtText: {
    fontSize: 15.5,
    lineHeight: 23,
    fontWeight: '500',
    fontStyle: 'normal',
    marginVertical: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.75,
  },
});
