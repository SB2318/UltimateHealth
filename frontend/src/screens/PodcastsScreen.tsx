import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {PRIMARY_COLOR} from '../helper/Theme';
import {useHeaderHeight} from '@react-navigation/elements';
import PodcastCard from '../components/PodcastCard';
import PodcastPlayer from '../components/PodcastPlayer';
import {podcast} from '../helper/Utils';
import {hp} from '../helper/Metric';

const PodcastsScreen = ({navigation}) => {
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert(
        'Warning',
        'Do you want to exit',
        [
          {text: 'No', onPress: () => null},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: true},
      );
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: headerHeight}]}>
        <PodcastPlayer />
      </View>
      <View style={styles.content}>
        <View style={styles.recentPodcastsHeader}>
          <Text style={styles.recentPodcastsTitle}>Recent Podcasts</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={podcast}
          renderItem={({item}) => (
            <PodcastCard
              imageUri={item.imageUri}
              title={item.title}
              host={item.host}
              duration={item.duration}
              likes={item.likes}
            />
          )}
          contentInsetAdjustmentBehavior="always"
          automaticallyAdjustContentInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Dimensions.get('screen').height - hp(40),
          }}
        />
      </View>
    </View>
  );
};

export default PodcastsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
  },
  content: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  recentPodcastsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recentPodcastsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
