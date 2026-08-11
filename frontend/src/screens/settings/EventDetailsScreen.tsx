import React, { ComponentProps } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { PRIMARY_COLOR } from '../../lib/ui/Theme';
import { wp, hp, fp } from '../../lib/ui/Metric';
import { formatDateShortYear } from '../../lib/utils/dateUtils';
import { formatDistance } from '../../lib/utils/LocationUtils';
import { safeOpenUrl } from '../../lib/utils/safeOpenUrl';
import { HealthEvent, RootStackParamList } from '../../schemas/type';
import { StackScreenProps } from '@react-navigation/stack';

type EventDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'EventDetailsScreen'
>;

type EventTheme = {
  bg: string;
  text: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
};

const EVENT_TYPE_THEMES: Record<string, EventTheme> = {
  'Blood Donation Drive': { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', icon: 'water' },
  'Health Camp': { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6', icon: 'hospital-box' },
  'Yoga / Wellness Meetup': { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', icon: 'spa' },
  'Community Health Event': { bg: 'rgba(139, 92, 246, 0.1)', text: '#8B5CF6', icon: 'account-group' },
};

const DEFAULT_EVENT_THEME: EventTheme = {
  bg: 'rgba(107, 114, 128, 0.1)',
  text: '#6B7280',
  icon: 'calendar',
};

const EventDetailsScreen = ({ route, navigation }: EventDetailsScreenProps) => {
  const { event, distance } = route.params;
  const isDark = useColorScheme() === 'dark';

  const bg = isDark ? '#111827' : '#F9FAFB';
  const cardBg = isDark ? '#1F2937' : '#FFFFFF';
  const cardBorder = isDark ? '#374151' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#111827';
  const subtextColor = isDark ? '#9CA3AF' : '#6B7280';
  const headerBg = isDark ? '#1F2937' : '#FFFFFF';
  const headerBorder = isDark ? '#374151' : '#E5E7EB';

  const getEventTypeTheme = (type: string): EventTheme => {
    return EVENT_TYPE_THEMES[type] || DEFAULT_EVENT_THEME;
  };

  const theme = getEventTypeTheme(event.type);

  const handleOpenMaps = async () => {
    const coords = event.location?.coordinates;
    if (!coords || !Array.isArray(coords) || coords.length !== 2) return;
    const [longitude, latitude] = coords;
    if (typeof longitude !== 'number' || typeof latitude !== 'number' || !isFinite(longitude) || !isFinite(latitude)) return;

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    await safeOpenUrl(mapUrl, {
      errorMessage: 'Could not open maps on your device.',
      errorTitle: 'Directions Unavailable',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBg, borderBottomColor: headerBorder }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <FontAwesome6 name="arrow-left" size={18} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Event Details</Text>
        <View style={{ width: wp(10) }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Event Classification Tag */}
        <View style={[styles.typeBadge, { backgroundColor: theme.bg, borderColor: theme.text }]}>
          <MaterialCommunityIcons name={theme.icon} size={18} color={theme.text} style={styles.badgeIcon} />
          <Text style={[styles.typeText, { color: theme.text }]}>{event.type}</Text>
        </View>

        {/* Event Title */}
        <Text style={[styles.title, { color: textColor }]}>{event.title}</Text>

        {/* Organizer Section */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={styles.organizerRow}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 10, 96, 0.06)' }]}>
              <FontAwesome6 name="user-tie" size={16} color={PRIMARY_COLOR} />
            </View>
            <View style={styles.organizerDetails}>
              <Text style={[styles.infoLabel, { color: subtextColor }]}>ORGANIZER</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>{event.organizer}</Text>
            </View>
          </View>
        </View>

        {/* Event Schedule Info */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Schedule & Location</Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar-range" size={20} color={PRIMARY_COLOR} style={styles.infoIcon} />
            <View style={styles.infoTextWrapper}>
              <Text style={[styles.infoLabel, { color: subtextColor }]}>DATE</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>
                {formatDateShortYear(event.date)}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: cardBorder }]} />

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-time-four-outline" size={20} color={PRIMARY_COLOR} style={styles.infoIcon} />
            <View style={styles.infoTextWrapper}>
              <Text style={[styles.infoLabel, { color: subtextColor }]}>TIME</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>{event.time}</Text>
            </View>
          </View>

          {distance !== undefined ? (
            <>
              <View style={[styles.divider, { backgroundColor: cardBorder }]} />
              <View style={styles.infoRow}>
                <MaterialIcons name="navigation" size={20} color={PRIMARY_COLOR} style={styles.infoIcon} />
                <View style={styles.infoTextWrapper}>
                  <Text style={[styles.infoLabel, { color: subtextColor }]}>DISTANCE</Text>
                  <Text style={[styles.infoValue, { color: textColor }]}>
                    {formatDistance(distance)} away
                  </Text>
                </View>
              </View>
            </>
          ) : null}

          <View style={[styles.divider, { backgroundColor: cardBorder }]} />

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker-radius" size={20} color={PRIMARY_COLOR} style={styles.infoIcon} />
            <View style={styles.infoTextWrapper}>
              <Text style={[styles.infoLabel, { color: subtextColor }]}>ADDRESS</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>{event.address}</Text>
            </View>
          </View>

          {event.location?.coordinates ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenMaps}
              style={[styles.directionsButton, { backgroundColor: PRIMARY_COLOR }]}
              accessibilityLabel="Get directions in Google Maps"
              accessibilityRole="button"
            >
              <MaterialCommunityIcons name="google-maps" size={20} color="white" style={{ marginRight: 6 }} />
              <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Description Section */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>About the Event</Text>
          <Text style={[styles.description, { color: textColor }]}>{event.description}</Text>
        </View>

        {/* Safe Footnote */}
        <View style={styles.footnoteWrapper}>
          <MaterialIcons name="security" size={14} color={subtextColor} />
          <Text style={[styles.footnote, { color: subtextColor }]}>
            Verified event listed on UltimateHealth platform.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
  },
  backButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fp(5.2),
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(6),
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: hp(1.5),
  },
  badgeIcon: {
    marginRight: 6,
  },
  typeText: {
    fontSize: fp(3.2),
    fontWeight: '700',
  },
  title: {
    fontSize: fp(5.6),
    fontWeight: '800',
    lineHeight: fp(7),
    marginBottom: hp(2.2),
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: wp(4.5),
    marginBottom: hp(2),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  organizerDetails: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: fp(4.2),
    fontWeight: '700',
    marginBottom: hp(1.8),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp(1),
  },
  infoIcon: {
    marginRight: wp(3.5),
    marginTop: 2,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fp(2.8),
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: fp(3.8),
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: hp(0.5),
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.5),
    borderRadius: 12,
    marginTop: hp(2),
  },
  directionsText: {
    color: 'white',
    fontSize: fp(3.8),
    fontWeight: '700',
  },
  description: {
    fontSize: fp(3.8),
    lineHeight: fp(5.6),
    fontWeight: '400',
  },
  footnoteWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  footnote: {
    fontSize: fp(2.8),
    fontWeight: '500',
    marginLeft: wp(1.5),
  },
});
