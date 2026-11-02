import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DailyThoughtCard, DailyThoughtCardRef } from './DailyThoughtCard';
import { QuickCareModal } from './QuickCareModal';
import { BreathingModal } from '../common/BreathingModal';

export interface HomeWellnessHubRef {
  openBreathing: () => void;
  openQuickCare: () => void;
  shuffleThought: () => void;
}

interface HomeWellnessHubProps {
  onOpenCustomize?: () => void;
  showDailyThought?: boolean;
  showBreathingTool?: boolean;
  showQuickCareGuide?: boolean;
}

export const HomeWellnessHub = forwardRef<HomeWellnessHubRef, HomeWellnessHubProps>(
  (
    {
      onOpenCustomize,
      showDailyThought = true,
      showBreathingTool = true,
      showQuickCareGuide = true,
    },
    ref,
  ) => {
    const isDark = useColorScheme() === 'dark';
    const [quickCareVisible, setQuickCareVisible] = useState(false);
    const [breathingVisible, setBreathingVisible] = useState(false);
    const thoughtCardRef = useRef<DailyThoughtCardRef>(null);

    useImperativeHandle(ref, () => ({
      openBreathing: () => setBreathingVisible(true),
      openQuickCare: () => setQuickCareVisible(true),
      shuffleThought: () => thoughtCardRef.current?.shuffle(),
    }));

    const colors = {
      calmCardBg: isDark ? '#1E293B' : '#EFF6FF',
      calmCardBorder: isDark ? '#334155' : '#BFDBFE',
      calmIconBg: isDark ? '#0F172A' : '#DBEAFE',
      calmTitle: isDark ? '#F1F5F9' : '#1E3A8A',
      calmSub: isDark ? '#94A3B8' : '#2563EB',
      calmIcon: isDark ? '#60A5FA' : '#1D4ED8',

      careCardBg: isDark ? '#1E293B' : '#F0FDF4',
      careCardBorder: isDark ? '#334155' : '#BBF7D0',
      careIconBg: isDark ? '#0F172A' : '#DCFCE7',
      careTitle: isDark ? '#F1F5F9' : '#065F46',
      careSub: isDark ? '#94A3B8' : '#059669',
      careIcon: isDark ? '#34D399' : '#15803D',
    };

    const hasAnyAction = showBreathingTool || showQuickCareGuide;
    const hasAnyContent = showDailyThought || hasAnyAction;

    return (
      <View style={styles.container}>
        {/* 1. Daily Thought Card (if enabled) */}
        {showDailyThought && <DailyThoughtCard ref={thoughtCardRef} />}

        {/* 2. Quick Action Cards (if any enabled) */}
        {hasAnyAction && (
          <View style={styles.actionRow}>
            {/* 1-Minute Calm Button */}
            {showBreathingTool && (
              <TouchableOpacity
                onPress={() => setBreathingVisible(true)}
                style={[
                  styles.actionCard,
                  {
                    backgroundColor: colors.calmCardBg,
                    borderColor: colors.calmCardBorder,
                  },
                ]}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Start 1-minute mindful breathing">
                <View style={[styles.iconCircle, { backgroundColor: colors.calmIconBg }]}>
                  <Ionicons name="fitness-outline" size={18} color={colors.calmIcon} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.actionTitle, { color: colors.calmTitle }]}>
                    1-Minute Calm
                  </Text>
                  <Text style={[styles.actionSub, { color: colors.calmSub }]}>
                    Mindful breath
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Quick Care Guide Button */}
            {showQuickCareGuide && (
              <TouchableOpacity
                onPress={() => setQuickCareVisible(true)}
                style={[
                  styles.actionCard,
                  {
                    backgroundColor: colors.careCardBg,
                    borderColor: colors.careCardBorder,
                  },
                ]}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Open quick care guide">
                <View style={[styles.iconCircle, { backgroundColor: colors.careIconBg }]}>
                  <Ionicons name="medical-outline" size={18} color={colors.careIcon} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.actionTitle, { color: colors.careTitle }]}>
                    Quick Care Guide
                  </Text>
                  <Text style={[styles.actionSub, { color: colors.careSub }]}>
                    First-aid & care
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* 3. Interactive Modals (remain mountable for drawer trigger) */}
        <BreathingModal
          visible={breathingVisible}
          onClose={() => setBreathingVisible(false)}
        />

        <QuickCareModal
          visible={quickCareVisible}
          onClose={() => setQuickCareVisible(false)}
          onOpenBreathing={() => setBreathingVisible(true)}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 10,
  },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },
  actionTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  actionSub: {
    fontSize: 11.5,
    fontWeight: '500',
    marginTop: 1,
  },
});
