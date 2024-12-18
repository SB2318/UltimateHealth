import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {Comment} from '../type';
import {GET_STORAGE_DATA} from '../helper/APIUtils';
import moment from 'moment';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ArticleFloatingMenu from './ArticleFloatingMenu';
import Entypo from 'react-native-vector-icons/Entypo';

export default function CommentItem({item}: {item: Comment}) {
  const width = useSharedValue(0);
  const yValue = useSharedValue(60);

  const menuStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      transform: [{translateY: yValue.value}],
    };
  });

  const handleAnimation = () => {
    if (width.value === 0) {
      width.value = withTiming(300, {duration: 300});
      yValue.value = withTiming(-1, {duration: 300});
    } else {
      width.value = withTiming(0, {duration: 300});
      yValue.value = withTiming(100, {duration: 300});
    }
  };

  const formatWithOrdinal = date => {
    const day = moment(date).date();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? 'st'
        : day === 2 || day === 22
        ? 'nd'
        : day === 3 || day === 23
        ? 'rd'
        : 'th';

    return moment(date).format('D MMM, ddd, h:mm a');
  };
  return (
    <View style={styles.commentContainer}>
      <Animated.View style={[menuStyle, styles.shareIconContainer]}>
        <ArticleFloatingMenu
          items={[
            {
              name: 'Edit',
              action: () => {
                Alert.alert('Edit Clicked');
              },
              icon: 'edit',
            },
            {
              name: 'Delete',
              action: () => {
                Alert.alert('Download Clicked');
              },
              icon: 'delete',
            },
          ]}
        />
      </Animated.View>

      <TouchableOpacity
        style={styles.shareIconContainer}
        onPress={() => {
          /* Handle share action */
          handleAnimation();
        }}>
        <Entypo name="dots-three-vertical" size={22} color={'black'} />
      </TouchableOpacity>
      {item.userId && item.userId.Profile_image ? (
        <Image
          source={{
            uri: item.userId.Profile_image.startsWith('https')
              ? item.userId.Profile_image
              : `${GET_STORAGE_DATA}/${item.userId.Profile_image}`,
          }}
          style={[
            styles.profileImage,
            !item.userId.Profile_image && {
              borderWidth: 0.5,
              borderColor: 'black',
            },
          ]}
        />
      ) : (
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
          style={[
            styles.profileImage,
            {borderWidth: 0.5, borderColor: 'black'},
          ]}
        />
      )}
      {/**<Text style={styles.avatar}>🧑‍💻</Text> */}
      <View style={styles.commentContent}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            // padding:6,
          }}>
          <Text style={styles.username}>{item.userId.user_handle}</Text>
          {item.isEdited && (
            <Text style={{...styles.comment, marginStart: 4, marginTop: 2}}>
              (Edited)
            </Text>
          )}
        </View>

        <Text style={styles.comment}>{item.content}</Text>
        <Text style={styles.timestamp}>
          {formatWithOrdinal(item.createdAt)}
        </Text>

        {/* Render replies if they exist
        {item.replies && item.replies.length > 0 && (
          <FlatList
            data={item.replies}
            renderItem={({item: reply}) => (
              <View style={styles.replyContainer}>
                <Text style={styles.replyText}>Reply: {reply.content}</Text>
              </View>
            )}
            keyExtractor={item => item._id}
            //style={styles.repliesList}
          />
        )}*/}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  avatar: {
    fontSize: 30,
    marginRight: 10,
    alignSelf: 'center',
  },

  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    objectFit: 'cover',
    resizeMode: 'contain',
    marginHorizontal: 4,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  replyContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  replyText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },

  shareIconContainer: {
    position: 'absolute',
    top: 1,
    right: 7,
    zIndex: 1,
  },
});
