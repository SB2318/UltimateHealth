import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { AccessibilityControlsProps } from './types';
import {
  ProfessionalColors,
  Spacing,
  Typography,
  BorderRadius,
} from '../../styles/GlassStyles';
import { PRIMARY_COLOR } from '../../helper/Theme';
import LoadingSpinner from '../LoadingSpinner';

/**
 * AccessibilityControls
 *
 * A compact horizontal toolbar providing:
 *   - Font size decrease / increase (A- / A+)
 *   - Text-to-speech play / pause / stop
 *   - Speech speed cycling
 *
 * All controls are fully keyboard accessible (accessibilityRole, accessibilityLabel,
 * hitSlop) and comply with WCAG AA tap-target size (≥ 44 × 44 dp).
 *
 * The TTS section only renders if onTTSPlay is provided, making the bar
 * usable as a standalone font-size control when TTS isn't wired up yet.
 *
 * Architecture note:
 *   This component is intentionally stateless — all values come from props.
 *   The parent screen owns state so the same controls can drive both the in-line
 *   content and any future floating player without duplicating logic.
 */
export const AccessibilityControls = ({
  fontScale,
  onDecrease,
  onIncrease,
  isPlaying = false,
  isPaused = false,
  playerVisible = false,
  onTTSPlay,
  onTTSPause,
  onTTSStop,
  speechRate = 1.0,
  speedLabel,
  onSpeedChange,
  isDarkMode = false,
}: AccessibilityControlsProps) => {
  const bg = isDarkMode ? ProfessionalColors.gray800 : ProfessionalColors.gray50;
  const borderColor = isDarkMode ? ProfessionalColors.gray700 : ProfessionalColors.gray200;
  const labelColor = isDarkMode ? ProfessionalColors.gray400 : ProfessionalColors.gray500;
  const btnBg = isDarkMode ? ProfessionalColors.gray700 : ProfessionalColors.white;
  const btnText = isDarkMode ? ProfessionalColors.gray100 : ProfessionalColors.gray700;
  const activeBtnBg = isDarkMode
    ? ProfessionalColors.primaryGlass
    : ProfessionalColors.accentDark;

  const hasTTS = !!onTTSPlay;
  const ttsActive = isPlaying || isPaused;

  const displaySpeed = speedLabel ?? `${speechRate}x`;

  return (
    <View
      style={[styles.wrapper, { backgroundColor: bg, borderColor }]}
      accessibilityRole="toolbar"
      accessibilityLabel="Reading controls"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {/* ── Font size ──────────────────────────────────────── */}
        <Text style={[styles.sectionLabel, { color: labelColor }]}>
          Text size
        </Text>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: btnBg }]}
          onPress={onDecrease}
          accessibilityRole="button"
          accessibilityLabel="Decrease font size"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.fontBtnText, { color: btnText }]}>A−</Text>
        </TouchableOpacity>

        <View
          style={[styles.scaleIndicator, { borderColor }]}
          accessibilityLabel={`Current font scale: ${Math.round(fontScale * 100)}%`}
          accessibilityRole="text"
        >
          <Text style={[styles.scaleText, { color: btnText }]}>
            {Math.round(fontScale * 100)}%
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: btnBg }]}
          onPress={onIncrease}
          accessibilityRole="button"
          accessibilityLabel="Increase font size"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.fontBtnText, { color: btnText }]}>A+</Text>
        </TouchableOpacity>

        {/* ── Divider ────────────────────────────────────────── */}
        {hasTTS && (
          <View style={[styles.vertDivider, { backgroundColor: borderColor }]} />
        )}

        {/* ── TTS controls ───────────────────────────────────── */}
        {hasTTS && (
          <>
            <Text style={[styles.sectionLabel, { color: labelColor }]}>
              Listen
            </Text>

            {/* Play / Pause button */}
            {!playerVisible ? (
              // Not playing yet — show Play button
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: btnBg }]}
                onPress={onTTSPlay}
                accessibilityRole="button"
                accessibilityLabel="Play text-to-speech"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="play" size={16} color={PRIMARY_COLOR} />
                <Text style={[styles.ttsLabel, { color: btnText }]}>Play</Text>
              </TouchableOpacity>
            ) : (
              <>
                {/* Pause / Resume */}
                <TouchableOpacity
                  style={[
                    styles.btn,
                    { backgroundColor: ttsActive ? activeBtnBg : btnBg },
                  ]}
                  onPress={onTTSPause}
                  disabled={!isPlaying && !isPaused}
                  accessibilityRole="button"
                  accessibilityLabel={isPaused ? 'Resume reading' : 'Pause reading'}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <FontAwesome5
                    name={isPaused ? 'play' : 'pause'}
                    size={14}
                    color={PRIMARY_COLOR}
                  />
                  <Text style={[styles.ttsLabel, { color: btnText }]}>
                    {isPaused ? 'Resume' : 'Pause'}
                  </Text>
                </TouchableOpacity>

                {/* Stop */}
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: btnBg }]}
                  onPress={onTTSStop}
                  accessibilityRole="button"
                  accessibilityLabel="Stop reading"
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <FontAwesome5 name="stop" size={14} color="#EF4444" />
                  <Text style={[styles.ttsLabel, { color: btnText }]}>Stop</Text>
                </TouchableOpacity>

                {/* Speed selector */}
                {onSpeedChange && (
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.speedBtn,
                      { backgroundColor: PRIMARY_COLOR },
                    ]}
                    onPress={onSpeedChange}
                    accessibilityRole="button"
                    accessibilityLabel={`Playback speed ${displaySpeed}. Tap to change.`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text style={styles.speedText}>{displaySpeed}</Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            {/* Status indicator */}
            {isPlaying && (
              <View style={styles.statusDot} accessibilityRole="none">
                <LoadingSpinner size={14} />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
    paddingHorizontal: 2,
  },
  sectionLabel: {
    ...Typography.caption,
    fontWeight: '600',
    marginRight: 2,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.md,
    minHeight: 36,
    minWidth: 44,
    justifyContent: 'center',
  },
  fontBtnText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  scaleIndicator: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    minWidth: 44,
    alignItems: 'center',
  },
  scaleText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  vertDivider: {
    width: 1,
    height: 24,
    marginHorizontal: Spacing.xs,
  },
  ttsLabel: {
    ...Typography.caption,
    fontWeight: '600',
  },
  speedBtn: {
    paddingHorizontal: Spacing.md,
  },
  speedText: {
    color: ProfessionalColors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  statusDot: {
    marginLeft: 2,
  },
});
