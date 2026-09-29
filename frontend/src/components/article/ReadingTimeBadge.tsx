import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {getReadTime} from '../../lib/utils/readTime';

type ReadingTimeBadgeProps = {
  content?: string | null;
  compact?: boolean;
};

export const ReadingTimeBadge = ({
  content,
  compact = false,
}: ReadingTimeBadgeProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? '#D1D5DB' : '#6B7280';

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={`Estimated reading time: ${getReadTime(content || '')}`}
      style={[
        styles.container,
        compact && styles.compactContainer,
        {backgroundColor: isDarkMode ? '#374151' : '#F3F4F6'},
      ]}>
      <Ionicons
        name="time-outline"
        size={compact ? 12 : 13}
        color={color}
        style={styles.icon}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Text style={[styles.text, compact && styles.compactText, {color}]}>
        {getReadTime(content || '')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  compactContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
  },
  compactText: {
    fontSize: 12,
  },
});

export default ReadingTimeBadge;
