import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from '../../localization';

const { width: SCREEN_W } = Dimensions.get('window');
const DRAWER_W = Math.min(SCREEN_W * 0.86, 360);

const appIcon = require('../../../assets/images/icon.png');

interface HomeDrawerModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenThought: () => void;
  onOpenBreathing: () => void;
  onOpenQuickCare: () => void;
  onOpenCustomize: () => void;
  navigation: any;
}

export const HomeDrawerModal: React.FC<HomeDrawerModalProps> = ({
  visible,
  onClose,
  onOpenThought,
  onOpenBreathing,
  onOpenQuickCare,
  onOpenCustomize,
  navigation,
}) => {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const colors = {
    overlay: isDark ? 'rgba(0, 0, 0, 0.78)' : 'rgba(15, 23, 42, 0.58)',
    drawerBg: isDark ? '#0F172A' : '#FFFFFF',
    border: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    headerBg: isDark ? '#1E293B' : '#F8FAFC',
    title: isDark ? '#F8FAFC' : '#0F172A',
    subtitle: isDark ? '#94A3B8' : '#64748B',
    sectionTitle: isDark ? '#94A3B8' : '#475569',
    itemBg: isDark ? '#1E293B' : '#F8FAFC',
    itemBorder: isDark ? '#334155' : '#E2E8F0',
    itemText: isDark ? '#F1F5F9' : '#1E293B',
    itemSub: isDark ? '#94A3B8' : '#64748B',
    badgeBg: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 82, 186, 0.08)',
    badgeText: isDark ? '#38BDF8' : '#0F52BA',
    accentGreen: isDark ? '#34D399' : '#059669',
    accentPink: isDark ? '#F472B6' : '#DB2777',
    accentBlue: isDark ? '#60A5FA' : '#2563EB',
    accentPurple: isDark ? '#C084FC' : '#7C3AED',
    calmCardBg: isDark ? '#172554' : '#EFF6FF',
    calmCardBorder: isDark ? '#1E40AF' : '#BFDBFE',
  };

  const handleAction = (action: () => void) => {
    onClose();
    setTimeout(() => {
      action();
    }, 150);
  };

  const handleNavigate = (screenName: string, params?: any) => {
    onClose();
    setTimeout(() => {
      navigation.navigate(screenName, params);
    }, 150);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        {/* Backdrop touch to dismiss */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
          accessibilityLabel="Close navigation menu"
        />

        {/* Drawer Container (slides from left) */}
        <View
          style={[
            styles.drawer,
            {
              width: DRAWER_W,
              backgroundColor: colors.drawerBg,
              paddingTop: insets.top > 0 ? insets.top + 8 : 16,
              paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 20,
            },
          ]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Image source={appIcon} style={styles.appLogo} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.appName, { color: colors.title }]}>
                UltimateHealth
              </Text>
              <Text style={[styles.appTagline, { color: colors.subtitle }]}>
                Better health, made simple
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: colors.itemBg }]}
              accessibilityRole="button"
              accessibilityLabel="Close menu">
              <Ionicons name="close" size={20} color={colors.subtitle} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* ── SECTION 1: DAILY WELLNESS & TOOLS ─────────────────── */}
            <Text style={[styles.sectionHeader, { color: colors.sectionTitle }]}>
              DAILY WELLNESS & TOOLS
            </Text>

            {/* Featured 1-Minute Breath Check Card */}
            <TouchableOpacity
              onPress={() => handleAction(onOpenBreathing)}
              style={[
                styles.featuredCard,
                {
                  backgroundColor: colors.calmCardBg,
                  borderColor: colors.calmCardBorder,
                },
              ]}
              activeOpacity={0.8}>
              <View
                style={[
                  styles.iconWrapFeatured,
                  { backgroundColor: isDark ? '#1E3A8A' : '#DBEAFE' },
                ]}>
                <Ionicons name="fitness-outline" size={22} color={colors.accentBlue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.featuredTitle, { color: isDark ? '#DBEAFE' : '#1E3A8A' }]}>
                  1-Minute Breath Check
                </Text>
                <Text style={[styles.featuredSub, { color: isDark ? '#93C5FD' : '#2563EB' }]}>
                  Mindful box-breathing to calm your mind
                </Text>
              </View>
              <Ionicons
                name="arrow-forward-circle"
                size={22}
                color={colors.accentBlue}
              />
            </TouchableOpacity>

            {/* Random Thoughts */}
            <TouchableOpacity
              onPress={() => handleAction(onOpenThought)}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(56, 189, 248, 0.15)' },
                ]}>
                <Ionicons name="sparkles" size={20} color={colors.accentBlue} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  Random Thoughts
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  Gentle daily reminders & reflections
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>

            {/* Quick Care Guides */}
            <TouchableOpacity
              onPress={() => handleAction(onOpenQuickCare)}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(52, 211, 153, 0.15)' },
                ]}>
                <Ionicons name="medical-outline" size={20} color={colors.accentGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  Quick Care Guides
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  Practical first-aid & care steps for common symptoms
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>

            {/* Wellness Dashboard & Logs */}
            <TouchableOpacity
              onPress={() => handleNavigate('Wellness')}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(236, 72, 153, 0.15)' },
                ]}>
                <MaterialCommunityIcons name="heart-pulse" size={22} color={colors.accentPink} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  Wellness & Daily Log
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  Track daily habits, vitals, sleep & hydration
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>

            {/* ── SECTION 2: CUSTOMIZATION & PREFERENCES ─────────────── */}
            <Text style={[styles.sectionHeader, { color: colors.sectionTitle, marginTop: 20 }]}>
              PREFERENCES & DISPLAY
            </Text>

            {/* Customize Homepage */}
            <TouchableOpacity
              onPress={() => handleAction(onOpenCustomize)}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(124, 58, 237, 0.15)' },
                ]}>
                <Ionicons name="color-palette-outline" size={20} color={colors.accentPurple} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  Customize Homepage
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  Feed layout, display mode & category filters
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>

            {/* Settings & Languages */}
            <TouchableOpacity
              onPress={() => handleNavigate('Settings')}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(100, 116, 139, 0.15)' },
                ]}>
                <Ionicons name="settings-outline" size={20} color={colors.title} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  Settings & Languages
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  13 Indian languages, theme & notifications
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>

            {/* ── SECTION 3: COMMUNITY & ABOUT ──────────────────────── */}
            <Text style={[styles.sectionHeader, { color: colors.sectionTitle, marginTop: 20 }]}>
              COMMUNITY & INITIATIVE
            </Text>

            {/* About UltimateHealth */}
            <TouchableOpacity
              onPress={() => handleNavigate('AboutScreen')}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
                ]}>
                <Ionicons name="information-circle-outline" size={20} color={colors.accentGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  About UltimateHealth
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  Non-profit mission, open source & privacy pledge
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>

            {/* Honoring Healers (Tribute) */}
            <TouchableOpacity
              onPress={() => handleNavigate('RespectGiverScreen')}
              style={[
                styles.menuItem,
                { backgroundColor: colors.itemBg, borderColor: colors.itemBorder },
              ]}
              activeOpacity={0.75}>
              <View
                style={[
                  styles.iconWrap,
                  { backgroundColor: 'rgba(236, 72, 153, 0.15)' },
                ]}>
                <Ionicons name="heart-outline" size={20} color={colors.accentPink} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuTitle, { color: colors.itemText }]}>
                  Honoring Healers
                </Text>
                <Text style={[styles.menuSub, { color: colors.itemSub }]}>
                  Dr. Moumita Debnath dedication & caregiver safety
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.subtitle} />
            </TouchableOpacity>
          </ScrollView>

          {/* Drawer Footer */}
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
              <Ionicons name="shield-checkmark-outline" size={13} color={colors.badgeText} />
              <Text style={[styles.badgeText, { color: colors.badgeText }]}>
                NON-PROFIT · 100% FREE · NO ADS
              </Text>
            </View>
            <Text style={[styles.footerText, { color: colors.subtitle }]}>
              Zero Trackers · 100% Offline-Ready
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawer: {
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  appLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  appName: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  appTagline: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
  },
  sectionHeader: {
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 10,
    gap: 12,
  },
  iconWrapFeatured: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  featuredSub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 13,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 9,
    gap: 12,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 15.5,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  menuSub: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16.5,
    marginTop: 1.5,
  },
  footer: {
    paddingHorizontal: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 4.5,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
