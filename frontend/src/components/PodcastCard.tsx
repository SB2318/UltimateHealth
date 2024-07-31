import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Podcast} from '../type';

const PodcastCard = ({title, host, imageUri, likes, duration}: Podcast) => {
  const handlePlayPodcast = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <Image
          source={{
            uri: imageUri
              ? imageUri
              : 'https://t3.ftcdn.net/jpg/05/10/75/30/360_F_510753092_f4AOmCJAczuGgRLCmHxmowga2tC9VYQP.jpg',
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.host}>{host}</Text>
          <View style={styles.likesContainer}>
            <Ionicons name="heart" size={20} />
            <Text>{likes}</Text>
          </View>
        </View>
      </View>

      <View style={styles.playContainer}>
        <TouchableOpacity onPress={handlePlayPodcast}>
          <Feather name="play-circle" size={24} color={'black'} />
        </TouchableOpacity>
        <Text>{duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imageTextContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  host: {
    fontSize: 12,
    fontWeight: 'regular',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 5,
  },
  playContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});

export default PodcastCard;
