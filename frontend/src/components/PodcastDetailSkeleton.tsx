/* eslint-disable react-hooks/immutability, react-hooks/refs, react-hooks/static-components, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars */
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

