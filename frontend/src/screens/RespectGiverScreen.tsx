// @ts-nocheck
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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const pdmImage = require('../../assets/images/p_d_m.jpg');

// ─── Particle dot component ───────────────────────────────────────────────────
const FloatingDot = ({ delay, size, x, color }: any) => {
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
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 0.9, 0.3] });

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
  }, []);

  return (
    <Animated.View
      style={[
        styles.quoteCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}>
      <MaterialCommunityIcon name="format-quote-open" size={22} color="#C084FC" style={{ marginBottom: 4 }} />
      <Text style={styles.quoteText}>{text}</Text>
    </Animated.View>
  );
};

// ─── Insight Pill ─────────────────────────────────────────────────────────────
const InsightPill = ({ icon, label, delay }: any) => {
  const scale = useRef(new Animated.Value(0.6)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, delay, useNativeDriver: true, tension: 80, friction: 8 }),
      Animated.timing(fade, { toValue: 1, delay, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.pill, { opacity: fade, transform: [{ scale }] }]}>
      <MaterialCommunityIcon name={icon} size={16} color="#C084FC" />
      <Text style={styles.pillLabel}>{label}</Text>
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const RespectGiverScreen = ({ navigation }: { navigation: any }) => {
  // Hero animations
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.85)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const badgeFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero entrance
    Animated.parallel([
      Animated.timing(heroFade, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.spring(heroScale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 7 }),
    ]).start();

    // Ring spin
    Animated.loop(
      Animated.timing(ringAnim, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 1800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(glowPulse, { toValue: 0.6, duration: 1800, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ]),
    ).start();

    // Badge pop
    Animated.spring(badgeFade, { toValue: 1, delay: 800, useNativeDriver: true, tension: 100, friction: 6 }).start();
  }, []);

  const ringRotate = ringAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const dots = [
    { delay: 0, size: 5, x: SCREEN_W * 0.12, color: '#C084FC' },
    { delay: 600, size: 3, x: SCREEN_W * 0.28, color: '#818CF8' },
    { delay: 300, size: 7, x: SCREEN_W * 0.45, color: '#F472B6' },
    { delay: 900, size: 4, x: SCREEN_W * 0.62, color: '#C084FC' },
    { delay: 150, size: 6, x: SCREEN_W * 0.78, color: '#A78BFA' },
    { delay: 750, size: 3, x: SCREEN_W * 0.9, color: '#F472B6' },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />

      {/* Navigation header */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#E2E8F0" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Respect Giver</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {/* ── HERO SECTION ──────────────────────────────────────────────── */}
        <View style={styles.heroSection}>
          {/* Floating particles */}
          {dots.map((d, i) => <FloatingDot key={i} {...d} />)}

          {/* Background glow */}
          <Animated.View style={[styles.glowBg, { opacity: glowPulse }]} />

          {/* Spinning ring */}
          <Animated.View style={[styles.spinRing, { transform: [{ rotate: ringRotate }] }]} />
          <Animated.View style={[styles.spinRingInner, { transform: [{ rotate: ringRotate }] }]} />

          {/* Profile image */}
          <Animated.View style={[styles.imageWrapper, { opacity: heroFade, transform: [{ scale: heroScale }] }]}>
            <Image source={pdmImage} style={styles.heroImage} />
            <LinearGradient
              colors={['transparent', 'rgba(88, 28, 135, 0.55)']}
              style={styles.imageOverlay}
            />
          </Animated.View>

          {/* Respect badge */}
          <Animated.View style={[styles.respectBadge, { opacity: badgeFade, transform: [{ scale: badgeFade }] }]}>
            <MaterialCommunityIcon name="shield-star" size={13} color="#fff" />
            <Text style={styles.badgeText}>RESPECT GIVER</Text>
          </Animated.View>

          {/* Name & tagline */}
          <Animated.View style={[styles.heroMeta, { opacity: heroFade }]}>
            <Text style={styles.heroName}>Moumita Debnath</Text>
            <Text style={styles.heroTagline}>Justice is not a destination — it is a direction.</Text>
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
            They move through people like water through earth — quietly, invisibly, unstoppably.{'\n\n'}
            When one person is treated with dignity, they carry it forward. They raise their children with it.
            They protect strangers with it. They build communities shaped by it.{'\n\n'}
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
            colors={['rgba(139, 92, 246, 0.12)', 'rgba(236, 72, 153, 0.08)']}
            style={styles.highlightBox}>
            <MaterialCommunityIcon name="alert-circle-outline" size={20} color="#C084FC" style={{ marginBottom: 8 }} />
            <Text style={styles.highlightText}>
              Every act of violation — every attempt to destroy someone's dignity — begins with a single belief:{' '}
              <Text style={styles.highlightEmphasis}>that this person does not deserve respect.</Text>
            </Text>
          </LinearGradient>

          <Text style={styles.sectionBody}>
            When we glorify power over people, when we celebrate silence over truth, when we let cruelty pass
            quietly — we feed that belief.{'\n\n'}
            But here's what we know:{' '}
            <Text style={styles.bodyEmphasis}>
              a person who is truly respected rarely needs to take it from another.
            </Text>
            {'\n\n'}
            The antidote is not anger. It is not shame. It is something far more powerful —
            it is the act of seeing someone as fully human, fully worthy, before they have to earn it.{'\n\n'}
            That is what Respect Givers do.{'\n\n'}
            They break the chain — not with force, but with recognition.
          </Text>
        </View>

        {/* ── COMING SOON CARD ──────────────────────────────────────────── */}
        <View style={styles.comingSoonCard}>
          <LinearGradient
            colors={['#1E0F3A', '#2D1B69', '#1A103A']}
            style={styles.comingSoonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>

            {/* Stars decoration */}
            {[...Array(6)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.star,
                  {
                    top: `${15 + i * 12}%`,
                    left: `${8 + i * 14}%`,
                    width: i % 2 === 0 ? 3 : 2,
                    height: i % 2 === 0 ? 3 : 2,
                  },
                ]}
              />
            ))}

            <MaterialCommunityIcon name="clock-time-eight-outline" size={34} color="#C084FC" style={{ marginBottom: 12 }} />
            <Text style={styles.comingSoonLabel}>Story Coming Soon</Text>
            <Text style={styles.comingSoonSub}>
              Moumita's story — of courage, of survival, of becoming a light — will be told here.
              {'\n'}In her own words. In her own time.
            </Text>

            <View style={styles.comingSoonDivider} />

            <Text style={styles.comingSoonHint}>
              This page is a promise. To her. To every person whose story deserves to be told with the full weight of their humanity.
            </Text>
          </LinearGradient>
        </View>

        {/* ── CLOSING ───────────────────────────────────────────────────── */}
        <View style={styles.closingSection}>
          <MaterialCommunityIcon name="hand-heart-outline" size={32} color="rgba(192, 132, 252, 0.6)" />
          <Text style={styles.closingText}>
            UltimateHealth stands for health in its fullest sense — body, mind, and dignity.
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
    backgroundColor: '#0D0620',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
    backgroundColor: 'rgba(13, 6, 32, 0.95)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    color: '#E2E8F0',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  scroll: {
    paddingBottom: 60,
  },

  // ── HERO ──────────────────────────────────────────
  heroSection: {
    height: SCREEN_H * 0.48,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#0D0620',
  },
  glowBg: {
    position: 'absolute',
    top: -40,
    width: SCREEN_W * 0.85,
    height: SCREEN_W * 0.85,
    borderRadius: SCREEN_W * 0.425,
    backgroundColor: 'transparent',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
    elevation: 0,
  },
  spinRing: {
    position: 'absolute',
    top: '8%',
    width: SCREEN_W * 0.6,
    height: SCREEN_W * 0.6,
    borderRadius: SCREEN_W * 0.3,
    borderWidth: 1.5,
    borderColor: 'rgba(192, 132, 252, 0.25)',
    borderStyle: 'dashed',
  },
  spinRingInner: {
    position: 'absolute',
    top: '14%',
    width: SCREEN_W * 0.48,
    height: SCREEN_W * 0.48,
    borderRadius: SCREEN_W * 0.24,
    borderWidth: 1,
    borderColor: 'rgba(244, 114, 182, 0.2)',
    borderStyle: 'dotted',
  },
  imageWrapper: {
    position: 'absolute',
    top: '5%',
    width: SCREEN_W * 0.52,
    height: SCREEN_W * 0.52,
    borderRadius: SCREEN_W * 0.26,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: 'rgba(167, 139, 250, 0.6)',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 16,
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
    backgroundColor: 'rgba(124, 58, 237, 0.85)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(192, 132, 252, 0.5)',
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
    color: '#F3E8FF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  heroTagline: {
    color: 'rgba(196, 181, 253, 0.85)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },

  // ── PILLS ──────────────────────────────────────────
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
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  pillLabel: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // ── SECTIONS ──────────────────────────────────────
  section: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.1)',
  },
  sectionTitle: {
    color: '#E9D5FF',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  sectionBody: {
    color: 'rgba(203, 213, 225, 0.85)',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '400',
  },
  bodyEmphasis: {
    color: '#C084FC',
    fontWeight: '700',
    fontStyle: 'italic',
  },

  highlightBox: {
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(192, 132, 252, 0.2)',
  },
  highlightText: {
    color: 'rgba(233, 213, 255, 0.9)',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
  },
  highlightEmphasis: {
    color: '#F472B6',
    fontWeight: '700',
    fontStyle: 'italic',
  },

  // ── QUOTES ────────────────────────────────────────
  quotesSection: {
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 12,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.15)',
    marginBottom: 4,
  },
  quoteText: {
    color: 'rgba(226, 232, 240, 0.88)',
    fontSize: 14.5,
    lineHeight: 23,
    fontStyle: 'italic',
    fontWeight: '400',
  },

  // ── COMING SOON ───────────────────────────────────
  comingSoonCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  comingSoonGradient: {
    padding: 28,
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'rgba(192, 132, 252, 0.5)',
  },
  comingSoonLabel: {
    color: '#E9D5FF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonSub: {
    color: 'rgba(196, 181, 253, 0.85)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  comingSoonDivider: {
    width: 60,
    height: 1,
    backgroundColor: 'rgba(167, 139, 250, 0.3)',
    marginVertical: 18,
  },
  comingSoonHint: {
    color: 'rgba(203, 213, 225, 0.7)',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
  },

  // ── CLOSING ───────────────────────────────────────
  closingSection: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 28,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.1)',
  },
  closingText: {
    color: 'rgba(196, 181, 253, 0.85)',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  closingSubText: {
    color: 'rgba(148, 163, 184, 0.7)',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});
