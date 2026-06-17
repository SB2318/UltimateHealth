import React, { useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SLEEP_TIMER_OPTIONS, SleepTimerOption } from '../constants/playback';
import { PRIMARY_COLOR } from '../helper/Theme';

interface FloatingSleepTimerSelectorProps {
  /** Currently active timer option, or undefined if no timer is set. */
  activeOption: SleepTimerOption | undefined;
  /** Remaining seconds on the active timer, or undefined when inactive. */
  remainingSeconds: number | undefined;
  onSelect: (option: SleepTimerOption) => void;
  onCancel: () => void;
  visible: boolean;
  onClose: () => void;
}

/** Format a seconds count as "Xm Ys" for the countdown badge. */
const formatCountdown = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  }
  return `${s}s`;
};

/** Human-readable label for each option. */
const optionLabel = (option: SleepTimerOption): string => {
  if (option === null) return 'End of episode';
  return `${option} min`;
};

export const FloatingSleepTimerSelector: React.FC<FloatingSleepTimerSelectorProps> = ({
  activeOption,
  remainingSeconds,
  onSelect,
  onCancel,
  visible,
  onClose,
}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  // Close when the screen loses focus
  useEffect(() => {
    if (!visible) return;
    const unsubscribe = navigation.addListener('blur', onClose);
    return unsubscribe;
  }, [navigation, visible, onClose]);

  if (!visible) return null;

  const colors = {
    overlay: 'rgba(0, 0, 0, 0.6)',
    cardBg: isDarkMode ? '#1E293B' : '#FFFFFF',
    text: isDarkMode ? '#F1F5F9' : '#1E293B',
    mutedText: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#334155' : '#E2E8F0',
    itemHoverBg: isDarkMode ? '#334155' : '#F1F5F9',
    cancelBg: isDarkMode ? '#3B1F1F' : '#FEE2E2',
    cancelText: '#EF4444',
    primary: PRIMARY_COLOR,
    countdownBg: isDarkMode ? '#0F2027' : '#E0F7FF',
    countdownText: PRIMARY_COLOR,
  };

  const hasActiveTimer = activeOption !== undefined && remainingSeconds !== undefined;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose} testID="sleep-timer-backdrop">
        <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
          <TouchableWithoutFeedback>
            <View
              style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
              testID="sleep-timer-card">

              {/* Title row */}
              <View style={styles.titleRow}>
                <Ionicons name="moon-outline" size={20} color={colors.primary} style={styles.titleIcon} />
                <Text style={[styles.title, { color: colors.text }]}>Sleep Timer</Text>
              </View>

              {/* Active timer countdown badge */}
              {hasActiveTimer && (
                <View style={[styles.countdownBadge, { backgroundColor: colors.countdownBg }]}>
                  <Ionicons name="timer-outline" size={15} color={colors.countdownText} />
                  <Text style={[styles.countdownText, { color: colors.countdownText }]}>
                    {' '}Stops in {formatCountdown(remainingSeconds!)}
                  </Text>
                </View>
              )}

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              {/* Duration options */}
              {SLEEP_TIMER_OPTIONS.map((option) => {
                const isSelected = activeOption === option;
                return (
                  <TouchableOpacity
                    key={option === null ? 'end-of-episode' : option}
                    style={[
                      styles.item,
                      isSelected && { backgroundColor: colors.itemHoverBg },
                    ]}
                    onPress={() => {
                      onSelect(option);
                      onClose();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Set sleep timer to ${optionLabel(option)}`}
                    accessibilityState={{ selected: isSelected }}
                    testID={`sleep-timer-option-${option}`}>
                    <Text
                      style={[
                        styles.itemText,
                        { color: isSelected ? colors.primary : colors.text },
                        isSelected && styles.selectedText,
                      ]}>
                      {optionLabel(option)}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}

              {/* Cancel timer — only shown when a timer is active */}
              {hasActiveTimer && (
                <>
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  <TouchableOpacity
                    style={[styles.item, styles.cancelItem, { backgroundColor: colors.cancelBg }]}
                    onPress={() => {
                      onCancel();
                      onClose();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel sleep timer"
                    testID="sleep-timer-cancel">
                    <Ionicons name="close-circle-outline" size={18} color={colors.cancelText} style={{ marginRight: 8 }} />
                    <Text style={[styles.itemText, { color: colors.cancelText }]}>
                      Cancel timer
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FloatingSleepTimerSelector;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '80%',
    maxWidth: 320,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  countdownText: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelItem: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 4,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    fontWeight: '700',
  },
});
