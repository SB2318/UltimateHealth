import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from './Skeleton';

const ArticleCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Cover Image Placeholder */}
      <Skeleton width="100%" height={180} borderRadius={0} />

      <View style={styles.contentContainer}>
        {/* Tags Placeholder */}
        <Skeleton width={120} height={14} borderRadius={4} style={styles.marginBottom} />

        {/* Title Placeholders */}
        <Skeleton width="90%" height={24} borderRadius={4} style={styles.marginBottomSmall} />
        <Skeleton width="60%" height={24} borderRadius={4} style={styles.marginBottomLarge} />

        {/* Meta Row Placeholder */}
        <View style={styles.metaRow}>
          <Skeleton width={80} height={14} borderRadius={4} />
          <View style={styles.dot} />
          <Skeleton width={60} height={14} borderRadius={4} />
          <View style={styles.dot} />
          <Skeleton width={60} height={14} borderRadius={4} />
        </View>

        {/* Actions Placeholder */}
        <View style={styles.likeSaveContainer}>
          <Skeleton width={40} height={24} borderRadius={4} />
          <Skeleton width={24} height={24} borderRadius={12} />
          <Skeleton width={40} height={24} borderRadius={4} />
          <Skeleton width={24} height={24} borderRadius={12} />
          <Skeleton width={20} height={24} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  contentContainer: {
    padding: 14,
  },
  marginBottom: {
    marginBottom: 12,
  },
  marginBottomSmall: {
    marginBottom: 6,
  },
  marginBottomLarge: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  likeSaveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default ArticleCardSkeleton;
