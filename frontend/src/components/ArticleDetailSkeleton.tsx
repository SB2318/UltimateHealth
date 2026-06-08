import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Skeleton } from './Skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp } from '../helper/Metric';

const { width } = Dimensions.get('window');

const ArticleDetailSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cover Image Placeholder */}
      <View style={styles.imageContainer}>
        <Skeleton width="100%" height={hp(40)} borderRadius={0} />
        
        {/* Floating Play/Like Buttons Placeholders */}
        <View style={styles.floatingButtonsRow}>
          <Skeleton width={50} height={50} borderRadius={25} />
          <Skeleton width={50} height={50} borderRadius={25} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* View Count & Tags */}
        <Skeleton width={60} height={14} borderRadius={4} style={styles.marginBottom} />
        <Skeleton width={180} height={14} borderRadius={4} style={styles.marginBottomLarge} />

        {/* Title */}
        <Skeleton width="95%" height={32} borderRadius={4} style={styles.marginBottomSmall} />
        <Skeleton width="75%" height={32} borderRadius={4} style={styles.marginBottomLarge} />

        {/* Avatars */}
        <View style={styles.avatarsContainer}>
          <Skeleton width={40} height={40} borderRadius={20} />
          <Skeleton width={40} height={40} borderRadius={20} style={styles.avatarOverlap} />
          <Skeleton width={40} height={40} borderRadius={20} style={styles.avatarOverlap} />
        </View>

        {/* Content Lines */}
        <View style={styles.textBody}>
          <Skeleton width="100%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="100%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="100%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="90%" height={16} borderRadius={4} style={styles.marginBottomLarge} />

          <Skeleton width="100%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="100%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="85%" height={16} borderRadius={4} style={styles.marginBottomLarge} />

          <Skeleton width="100%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="95%" height={16} borderRadius={4} style={styles.marginBottomSmall} />
          <Skeleton width="70%" height={16} borderRadius={4} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  floatingButtonsRow: {
    position: 'absolute',
    bottom: -25,
    right: 20,
    flexDirection: 'row',
    gap: 15,
  },
  contentContainer: {
    padding: 20,
    marginTop: 20,
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 12,
  },
  avatarOverlap: {
    marginLeft: -15,
  },
  textBody: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  marginBottomSmall: {
    marginBottom: 8,
  },
  marginBottomLarge: {
    marginBottom: 20,
  },
});

export default ArticleDetailSkeleton;
