import React, { useState, useEffect, ComponentProps } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { PRIMARY_COLOR } from '../../lib/ui/Theme';
import { wp, hp, fp } from '../../lib/ui/Metric';
import { useGetNearbyEvents } from '../../hooks/events/useGetNearbyEvents';
import { calculateDistance, formatDistance } from '../../lib/utils/LocationUtils';
import { formatDateShortYear } from '../../lib/utils/dateUtils';
import { BaseEmptyState } from '../../components/common/EmptyStates';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { HealthEvent, RootStackParamList } from '../../schemas/type';
import { StackScreenProps } from '@react-navigation/stack';
import { debugError } from '../../lib/utils/debugLog';

type NearbyHealthEventsScreenProps = StackScreenProps<
  RootStackParamList,
  'NearbyHealthEventsScreen'
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

const RADIUS_OPTIONS = [
  { label: '5 km', value: 5000 },
  { label: '10 km', value: 10000 },
  { label: '25 km', value: 25000 },
  { label: '50 km', value: 50000 },
];

const NearbyHealthEventsScreen = ({ navigation }: NearbyHealthEventsScreenProps) => {
  const isDark = useColorScheme() === 'dark';
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [radius, setRadius] = useState(10000); // Default 10km

  const bg = isDark ? '#111827' : '#F9FAFB';
  const cardBg = isDark ? '#1F2937' : '#FFFFFF';
  const cardBorder = isDark ? '#374151' : '#E5E7EB';
  const textColor = isDark ? '#F9FAFB' : '#111827';
  const subtextColor = isDark ? '#9CA3AF' : '#6B7280';
  const headerBg = isDark ? '#1F2937' : '#FFFFFF';
  const headerBorder = isDark ? '#374151' : '#E5E7EB';

  const requestLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      if (status !== Location.PermissionStatus.GRANTED) {
        setIsLocating(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      debugError('Error requesting location:', error);
      Alert.alert('Error', 'Failed to retrieve your current location. Please make sure location is enabled.');
    } finally {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const {
    data: events,
    isLoading: isQueryLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetNearbyEvents(
    coords ? coords.latitude : null,
    coords ? coords.longitude : null,
    radius,
  );

  const getEventTypeTheme = (type: string): EventTheme => {
    return EVENT_TYPE_THEMES[type] || DEFAULT_EVENT_THEME;
  };

  const renderEventItem = ({ item }: { item: HealthEvent }) => {
    const theme = getEventTypeTheme(item.type);
    let distanceStr = '';
    let meters: number | undefined = undefined;
    if (coords && item.location?.coordinates) {
      const [lng, lat] = item.location.coordinates;
      meters = calculateDistance(coords.latitude, coords.longitude, lat, lng);
      distanceStr = formatDistance(meters);
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('EventDetailsScreen', { event: item, distance: meters })}
        style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}
        accessibilityLabel={`View event details for ${item.title}`}
        accessibilityRole="button"
      >
        <View style={styles.cardHeader}>
          <View style={[styles.typeBadge, { backgroundColor: theme.bg }]}>
            <MaterialCommunityIcons name={theme.icon} size={14} color={theme.text} style={styles.badgeIcon} />
            <Text style={[styles.typeText, { color: theme.text }]}>{item.type}</Text>
          </View>
          {distanceStr ? (
            <View style={styles.distanceBadge}>
              <MaterialIcons name="navigation" size={12} color={PRIMARY_COLOR} />
              <Text style={styles.distanceText}>{distanceStr}</Text>
            </View>
          ) : null}
        </View>

        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={[styles.organizer, { color: subtextColor }]} numberOfLines={1}>
          Organizer: {item.organizer}
        </Text>

        <View style={[styles.divider, { backgroundColor: cardBorder }]} />

        <View style={styles.cardFooter}>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="calendar" size={16} color={subtextColor} />
            <Text style={[styles.footerText, { color: subtextColor }]}>
              {formatDateShortYear(item.date)}
            </Text>
          </View>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={subtextColor} />
            <Text style={[styles.footerText, { color: subtextColor }]}>{item.time}</Text>
          </View>
        </View>

        <View style={[styles.footerItem, { marginTop: hp(0.8) }]}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color={subtextColor} />
          <Text style={[styles.footerText, { color: subtextColor }]} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleRetry = () => {
    if (permissionStatus !== Location.PermissionStatus.GRANTED) {
      requestLocation();
    } else {
      refetch();
    }
  };

  const renderContent = () => {
    if (isLocating) {
      return (
        <LoadingSpinner
          fullScreen
          text="Retrieving your location..."
          subText="Ensuring we look up the right wellness events near you."
        />
      );
    }

    if (permissionStatus === null) {
      return null;
    }

    if (permissionStatus !== Location.PermissionStatus.GRANTED) {
      return (
        <BaseEmptyState
          iconEmoji="🔒"
          title="Location Permission Required"
          description="UltimateHealth needs location access to find blood drives, wellness camps, and fitness drives in your neighborhood."
          actionText="Allow Location Access"
          onAction={requestLocation}
        />
      );
    }

    if (isQueryLoading) {
      return (
        <LoadingSpinner
          fullScreen
          text="Searching for health events..."
          subText="Connecting to the backend to get active drives near you."
        />
      );
    }

    if (isError) {
      return (
        <BaseEmptyState
          iconEmoji="⚠️"
          title="Failed to Load Events"
          description="A network issue occurred while retrieving events. Please check your connection and try again."
          actionText="Try Again"
          onAction={handleRetry}
        />
      );
    }

    if (!events || events.length === 0) {
      return (
        <BaseEmptyState
          iconEmoji="📍"
          title="No Nearby Events"
          description={`We couldn't find any health events within ${radius / 1000} km of your location.`}
          actionText="Refresh"
          onAction={refetch}
        />
      );
    }

    return (
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    );
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
        <Text style={[styles.headerTitle, { color: textColor }]}>Nearby Health Events</Text>
        <View style={{ width: wp(10) }} />
      </View>

      {/* Radius Selector */}
      {permissionStatus === Location.PermissionStatus.GRANTED && !isLocating && (
        <View style={styles.selectorWrapper}>
          <Text style={[styles.selectorLabel, { color: textColor }]}>Search Radius:</Text>
          <View style={styles.pillContainer}>
            {RADIUS_OPTIONS.map((opt) => {
              const active = radius === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  activeOpacity={0.8}
                  onPress={() => setRadius(opt.value)}
                  style={[
                    styles.pill,
                    active && { backgroundColor: PRIMARY_COLOR },
                    !active && { borderColor: cardBorder },
                  ]}
                  accessibilityLabel={`Filter by radius ${opt.label}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    style={[
                      styles.pillText,
                      { color: active ? 'white' : textColor },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}

      {renderContent()}
    </SafeAreaView>
  );
};

export default NearbyHealthEventsScreen;

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
  selectorWrapper: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },
  selectorLabel: {
    fontSize: fp(3.5),
    fontWeight: '600',
    marginBottom: hp(0.8),
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3.5),
    borderRadius: 20,
    borderWidth: 1,
    marginRight: wp(2.5),
  },
  pillText: {
    fontSize: fp(3.2),
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(4),
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: wp(4),
    marginBottom: hp(1.8),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(2.5),
    borderRadius: 12,
  },
  badgeIcon: {
    marginRight: 4,
  },
  typeText: {
    fontSize: fp(3),
    fontWeight: '700',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 191, 255, 0.08)',
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(2.5),
    borderRadius: 12,
  },
  distanceText: {
    fontSize: fp(3),
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginLeft: 3,
  },
  title: {
    fontSize: fp(4.2),
    fontWeight: '700',
    lineHeight: fp(5.2),
    marginBottom: hp(0.5),
  },
  organizer: {
    fontSize: fp(3.2),
    fontWeight: '500',
    marginBottom: hp(1.2),
  },
  divider: {
    height: 1,
    marginVertical: hp(1),
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(6),
  },
  footerText: {
    fontSize: fp(3.2),
    marginLeft: wp(1.5),
    fontWeight: '500',
  },
});
