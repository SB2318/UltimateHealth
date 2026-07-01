import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { PRIMARY_COLOR } from '../helper/Theme';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /**
   * Content to display inside the badge.
   * Accepts a plain string or any ReactNode (icons, elements, components).
   * String values are automatically uppercased; ReactNode is rendered as-is.
   */
  label: ReactNode;

  /** Visual style variant. Defaults to 'default'. */
  variant?: BadgeVariant;

  /** Size of the badge. Defaults to 'md'. */
  size?: BadgeSize;

  /** Additional styles for the outer container. */
  style?: StyleProp<ViewStyle>;

  /** testID for automated testing. */
  testID?: string;
}

// ─── Colour map ───────────────────────────────────────────────────────────────

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; border: string; text: string }> = {
  default: {
    bg: 'rgba(0, 191, 255, 0.12)',
    border: 'rgba(0, 191, 255, 0.35)',
    text: PRIMARY_COLOR,
  },
  primary: {
    bg: PRIMARY_COLOR,
    border: PRIMARY_COLOR,
    text: '#FFFFFF',
  },
  success: {
    bg: 'rgba(34, 197, 94, 0.15)',
    border: 'rgba(34, 197, 94, 0.40)',
    text: '#16a34a',
  },
  warning: {
    bg: 'rgba(234, 179, 8, 0.15)',
    border: 'rgba(234, 179, 8, 0.40)',
    text: '#ca8a04',
  },
  danger: {
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.40)',
    text: '#dc2626',
  },
  outline: {
    bg: 'transparent',
    border: PRIMARY_COLOR,
    text: PRIMARY_COLOR,
  },
};

// ─── Size map ─────────────────────────────────────────────────────────────────

const SIZE_STYLES: Record<
  BadgeSize,
  { paddingVertical: number; paddingHorizontal: number; fontSize: number; borderRadius: number }
> = {
  sm: { paddingVertical: 2, paddingHorizontal: 7, fontSize: 9, borderRadius: 4 },
  md: { paddingVertical: 4, paddingHorizontal: 10, fontSize: 11, borderRadius: 6 },
  lg: { paddingVertical: 6, paddingHorizontal: 14, fontSize: 13, borderRadius: 8 },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
  testID = 'badge',
}) => {
  const colors = VARIANT_COLORS[variant];
  const sizeStyle = SIZE_STYLES[size];

  const renderLabel = () => {
    if (typeof label === 'string') {
      return (
        <Text
          testID={`${testID}-text`}
          style={[styles.text, { color: colors.text, fontSize: sizeStyle.fontSize }]}
        >
          {label.toUpperCase()}
        </Text>
      );
    }

    return (
      <View testID={`${testID}-node`} style={styles.nodeWrapper}>
        {label}
      </View>
    );
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderRadius: sizeStyle.borderRadius,
        },
        style,
      ]}
    >
      {renderLabel()}
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  nodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Badge;
