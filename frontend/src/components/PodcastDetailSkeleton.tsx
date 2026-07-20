 
import React from 'react';

import {YStack} from 'tamagui';

import PodcastSkeletonCard from './PodcastSkeletonCard';

const PodcastDetailSkeleton = () => {
  return (
    <YStack
      testID="podcast-detail-skeleton"
      flex={1}
      backgroundColor="$background"
      padding="$4">

      <PodcastSkeletonCard />
    </YStack>
  );
};

export default PodcastDetailSkeleton;

