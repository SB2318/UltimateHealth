import React from 'react';
import { View } from 'react-native';

const PodcastDetailSkeleton = () => {
  return (
    <View>
      <View style={{ height: 200, backgroundColor: '#E5E7EB' }} />
      <View style={{ height: 20, width: '70%', backgroundColor: '#E5E7EB', marginTop: 10 }} />
      <View style={{ height: 14, width: '90%', backgroundColor: '#E5E7EB', marginTop: 6 }} />
    </View>
  );
};

export default PodcastDetailSkeleton;