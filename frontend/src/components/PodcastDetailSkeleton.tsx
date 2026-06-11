import React from 'react';

import {YStack} from 'tamagui';

import PodcastSkeletonCard from './PodcastSkeletonCard';

const PodcastDetailSkeleton = () => {
  return (
    <YStack
      flex={1}
      backgroundColor="#0B1425"
      padding="$4">

      <PodcastSkeletonCard />
    </YStack>
  );
};

export default PodcastDetailSkeleton;