/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const pdmImage = require('../../../assets/images/p_d_m.jpg');

// ─── Particle dot component ───────────────────────────────────────────────────
const FloatingDot = ({
  delay,
  size,
  x,
  color,
}: {
  delay: number;
  size: number;
  x: number;
  color: string;
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 3000 + Math.random() * 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 3000 + Math.random() * 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [anim, delay]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.8, 0.3],
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        bottom: 20,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
};

// ─── Quote card ───────────────────────────────────────────────────────────────
const QuoteCard = ({ text, delay }: { text: string; delay: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [delay, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.quoteCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}>
      <MaterialCommunityIcon
        name="format-quote-open"
        size={22}
        color="#7C3AED"
        style={{ marginBottom: 4 }}
      />
      <Text style={styles.quoteText}>{text}</Text>
    </Animated.View>
  );
};

// ─── Insight Pill ─────────────────────────────────────────────────────────────
const InsightPill = ({
  icon,
  label,
  delay,
}: {
  icon: keyof typeof MaterialCommunityIcon.glyphMap;
  label: string;
  delay: number;
}) => {
  const scale = useRef(new Animated.Value(0.6)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
      Animated.timing(fade, {
        toValue: 1,
        delay,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, fade, scale]);

  return (
    <Animated.View
      style={[styles.pill, { opacity: fade, transform: [{ scale }] }]}>
      <MaterialCommunityIcon name={icon} size={16} color="#7C3AED" />
      <Text style={styles.pillLabel}>{label}</Text>
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const RespectGiverScreen = ({ navigation }: { navigation: any }) => {
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.85)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const badgeFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFade, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(heroScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 7,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(ringAnim, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(glowPulse, {
          toValue: 0.6,
          duration: 1800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();

    Animated.spring(badgeFade, {
      toValue: 1,
      delay: 800,
      useNativeDriver: true,
      tension: 100,
      friction: 6,
    }).start();
  }, [badgeFade, glowPulse, heroFade, heroScale, ringAnim]);

  const ringRotate = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dots = [
    { delay: 0, size: 5, x: SCREEN_W * 0.12, color: '#A855F7' },
    { delay: 600, size: 4, x: SCREEN_W * 0.28, color: '#818CF8' },
    { delay: 300, size: 6, x: SCREEN_W * 0.45, color: '#EC4899' },
    { delay: 900, size: 4, x: SCREEN_W * 0.62, color: '#A855F7' },
    { delay: 150, size: 5, x: SCREEN_W * 0.78, color: '#8B5CF6' },
    { delay: 750, size: 4, x: SCREEN_W * 0.9, color: '#EC4899' },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />

      {/* Navigation header */}
      <View style={styles.navHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen">
          <MaterialIcons name="arrow-back-ios" size={18} color="#4C1D95" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Respect Giver</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        {/* ── HERO SECTION ──────────────────────────────────────────────── */}
        <View style={styles.heroSection}>
          {dots.map((d, i) => (
            <FloatingDot key={i} {...d} />
          ))}

          <Animated.View style={[styles.glowBg, { opacity: glowPulse }]} />

          <Animated.View
            style={[styles.spinRing, { transform: [{ rotate: ringRotate }] }]}
          />
          <Animated.View
            style={[
              styles.spinRingInner,
              { transform: [{ rotate: ringRotate }] },
            ]}
          />

          <Animated.View
            style={[
              styles.imageWrapper,
              { opacity: heroFade, transform: [{ scale: heroScale }] },
            ]}>
            <Image source={pdmImage} style={styles.heroImage} />
            <LinearGradient
              colors={['transparent', 'rgba(124, 58, 237, 0.2)']}
              style={styles.imageOverlay}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.respectBadge,
              { opacity: badgeFade, transform: [{ scale: badgeFade }] },
            ]}>
            <MaterialCommunityIcon name="shield-star" size={13} color="#fff" />
            <Text style={styles.badgeText}>RESPECT GIVER</Text>
          </Animated.View>

          <Animated.View style={[styles.heroMeta, { opacity: heroFade }]}>
            <Text style={styles.heroName}>Moumita Debnath</Text>
            <Text style={styles.heroTagline}>
              Justice is not a destination — it is a direction.
            </Text>
          </Animated.View>
        </View>

        {/* ── PILLS ─────────────────────────────────────────────────────── */}
        <View style={styles.pillRow}>
          <InsightPill icon="hand-heart" label="Empathy" delay={200} />
          <InsightPill icon="scale-balance" label="Justice" delay={400} />
          <InsightPill icon="lightbulb-on" label="Hope" delay={600} />
          <InsightPill icon="account-heart" label="Dignity" delay={800} />
        </View>

        {/* ── CHAIN REACTION ────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Chain Reaction</Text>
          <Text style={styles.sectionBody}>
            Justice and injustice are not isolated events.{'\n\n'}
            They move through people like water through earth — quietly,
            invisibly, unstoppably.{'\n\n'}
            When one person is treated with dignity, they carry it forward. They
            raise their children with it. They protect strangers with it. They
            build communities shaped by it.{'\n\n'}
            The same is true of its opposite.{'\n\n'}
            Which chain are we choosing to continue?
          </Text>
        </View>

        {/* ── QUOTES ────────────────────────────────────────────────────── */}
        <View style={styles.quotesSection}>
          <QuoteCard
            text="If we can restore dignity to even one soul, we plant a seed that outlives us all."
            delay={100}
          />
          <QuoteCard
            text="No one is truly selfish at their core. People who have been seen — truly seen — know how to see others."
            delay={250}
          />
          <QuoteCard
            text="Hope is not naïve. Hope is what happens when someone refuses to let the chain of injustice end with them."
            delay={400}
          />
        </View>

        {/* ── RESPECT POINT OF VIEW ─────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>On Respect & Why It Matters</Text>

          <LinearGradient
            colors={['rgba(139, 92, 246, 0.08)', 'rgba(236, 72, 153, 0.04)']}
            style={styles.highlightBox}>
            <MaterialCommunityIcon
              name="alert-circle-outline"
              size={20}
              color="#7C3AED"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.highlightText}>
              Every act of violation — every attempt to destroy someone's
              dignity — begins with a single belief:{' '}
              <Text style={styles.highlightEmphasis}>
                that this person does not deserve respect.
              </Text>
            </Text>
          </LinearGradient>

          <Text style={styles.sectionBody}>
            When we glorify power over people, when we celebrate silence over
            truth, when we let cruelty pass quietly — we feed that belief.
            {'\n\n'}
            But here's what we know:{' '}
            <Text style={styles.bodyEmphasis}>
              a person who is truly respected rarely needs to take it from
              another.
            </Text>
            {'\n\n'}
            The antidote is not anger. It is not shame. It is something far more
            powerful — it is the act of seeing someone as fully human, fully
            worthy, before they have to earn it.{'\n\n'}
            That is what Respect Givers do.{'\n\n'}
            They break the chain — not with force, but with recognition.
          </Text>
        </View>

        {/* ── CLOSING ───────────────────────────────────────────────────── */}
        <View style={styles.closingSection}>
          <MaterialCommunityIcon
            name="hand-heart-outline"
            size={32}
            color="#7C3AED"
          />
          <Text style={styles.closingText}>
            UltimateHealth stands for health in its fullest sense — body, mind,
            and dignity.
          </Text>
          <Text style={styles.closingSubText}>
            Because you cannot heal a person you do not respect.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RespectGiverScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFE',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.12)',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    color: '#1E1B4B',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  scroll: {
    paddingBottom: 60,
  },
  heroSection: {
    height: SCREEN_H * 0.44,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#F3E8FF',
  },
  glowBg: {
    position: 'absolute',
    top: -40,
    width: SCREEN_W * 0.85,
    height: SCREEN_W * 0.85,
    borderRadius: SCREEN_W * 0.425,
    backgroundColor: 'rgba(192, 132, 252, 0.25)',
  },
  spinRing: {
    position: 'absolute',
    top: '8%',
    width: SCREEN_W * 0.6,
    height: SCREEN_W * 0.6,
    borderRadius: SCREEN_W * 0.3,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 58, 237, 0.25)',
    borderStyle: 'dashed',
  },
  spinRingInner: {
    position: 'absolute',
    top: '14%',
    width: SCREEN_W * 0.48,
    height: SCREEN_W * 0.48,
    borderRadius: SCREEN_W * 0.24,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.2)',
    borderStyle: 'dotted',
  },
  imageWrapper: {
    position: 'absolute',
    top: '6%',
    width: SCREEN_W * 0.5,
    height: SCREEN_W * 0.5,
    borderRadius: SCREEN_W * 0.25,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  respectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#7C3AED',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroMeta: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heroName: {
    color: '#1E1B4B',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  heroTagline: {
    color: '#6B21A8',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
  pillRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  pillLabel: {
    color: '#6B21A8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  section: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.1)',
  },
  sectionTitle: {
    color: '#1E1B4B',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  sectionBody: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '400',
  },
  bodyEmphasis: {
    color: '#7C3AED',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  highlightBox: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  highlightText: {
    color: '#1E1B4B',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
  },
  highlightEmphasis: {
    color: '#BE185D',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  quotesSection: {
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 12,
  },
  quoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 3.5,
    borderLeftColor: '#7C3AED',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  quoteText: {
    color: '#1E293B',
    fontSize: 14.5,
    lineHeight: 23,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  closingSection: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.1)',
  },
  closingText: {
    color: '#581C87',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  closingSubText: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});
