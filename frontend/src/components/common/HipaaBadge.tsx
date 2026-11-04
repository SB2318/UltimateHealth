import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HipaaBadgeProps {
  variant?: 'compact' | 'standard' | 'pill';
  label?: string;
  onPress?: () => void;
  showInfoIcon?: boolean;
}

export const HipaaBadge: React.FC<HipaaBadgeProps> = ({
  variant = 'compact',
  label,
  onPress,
  showInfoIcon = true,
}) => {
  const isDark = useColorScheme() === 'dark';

  const defaultLabel =
    variant === 'compact'
      ? 'HIPAA Protected'
      : variant === 'pill'
      ? 'HIPAA • Safe Harbor'
      : 'HIPAA Compliant & De-Identified';

  const displayLabel = label || defaultLabel;

  const colors = {
    bg: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
    border: isDark ? 'rgba(16, 185, 129, 0.35)' : '#A7F3D0',
    text: isDark ? '#34D399' : '#065F46',
    icon: isDark ? '#10B981' : '#059669',
  };

  const content = (
    <View
      style={[
        styles.container,
        variant === 'compact' && styles.compact,
        variant === 'pill' && styles.pill,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}>
      <Ionicons name="shield-checkmark" size={variant === 'compact' ? 12 : 14} color={colors.icon} />
      <Text
        style={[
          styles.text,
          variant === 'compact' && styles.compactText,
          { color: colors.text },
        ]}>
        {displayLabel}
      </Text>
      {showInfoIcon && (
        <Ionicons
          name="information-circle-outline"
          size={variant === 'compact' ? 12 : 14}
          color={colors.icon}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${displayLabel}. Tap for HIPAA compliance information`}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  compact: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  compactText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default HipaaBadge;
