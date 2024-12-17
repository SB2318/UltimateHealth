import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {CommentScreenProp} from '../type';
import {PRIMARY_COLOR} from '../helper/Theme';
import io from 'socket.io-client';
import {Comment} from '../type';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {GET_STORAGE_DATA} from '../helper/APIUtils';

const CommentScreen = ({navigation, route}: CommentScreenProp) => {
  const socket = io('http://51.20.1.81:8082');
  //const socket = useSocket();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const {user_id} = useSelector((state: any) => state.user);
  //const {articleId} = route.params;

  //console.log('articleid', articleId);
  useEffect(() => {
    //console.log('Fetching comments for articleId:', route.params.articleId);
    socket.emit('fetch-comments', {articleId: route.params.articleId});

    socket.on('connect', () => {
      console.log('connection established');
    });

    socket.on('error', () => {
      console.log('connection error');
    });

    socket.on('fetch-comments', data => {
      console.log('comment loaded');
      if (data.articleId === route.params.articleId) {
        setComments(data.comments);
      }
    });

    // Listen for new comments
    socket.on('comment', data => {
      console.log('new comment loaded', data);
      if (data.articleId === route.params.articleId) {
        setComments(prevComments => [data.comment, ...prevComments]);
      }
    });

    // Listen for new replies
    socket.on('new-reply', data => {
      if (data.articleId === route.params.articleId) {
        setComments(prevComments => {
          return prevComments.map(comment =>
            comment._id === data.parentCommentId
              ? {...comment, replies: [...comment.replies, data.reply]}
              : comment,
          );
        });
      }
    });

    // Listen for parent comment updates (e.g., when replies are added)
    socket.on('update-parent-comment', data => {
      setComments(prevComments => {
        return prevComments.map(comment =>
          comment._id === data.parentCommentId
            ? {...comment, ...data.parentComment} // update parent comment
            : comment,
        );
      });
    });

    return () => {
      socket.off('fetch-comments');
      socket.off('comment');
      socket.off('new-reply');
      socket.off('update-parent-comment');
    };
  }, [socket,route.params.articleId]);

 // console.log('com', comments);
  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      Alert.alert('Please enter a comment before submitting.');
      return;
    }

    const newCommentObj = {
      userId: user_id,
      articleId: route.params.articleId,
      content: newComment,
      parentCommentId: null,
    };

    /*
    const newCommentObj = {
      _id: String(comments.length + 1), // Generate a new id for the comment
      userId: {user_handle: 'You'}, // Placeholder for username
      avatar: '🧑‍💻', // Placeholder for avatar
      content: newComment,
      timestamp: new Date().toLocaleString(), // dynamic timestamp
      replies: [],
    };
    */

    console.log('Comment emitting', newCommentObj);
    // Emit the new comment to the backend via socket
    socket.emit('comment', newCommentObj);

    setNewComment(''); // Clear the input field after submitting
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Leave a Feedback</Text>

      {/* Comments List */}
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <View style={styles.commentContainer}>
            {item.userId.Profile_image ? (
              <Image
                source={{
                  uri: item.userId.Profile_image.startsWith('https')
                    ? item.userId.Profile_image
                    : `${GET_STORAGE_DATA}/${item.userId.Profile_image}`,
                }}
                style={[
                  styles.profileImage,
                  !item.userId.Profile_image && {borderWidth: 0.5, borderColor: 'black'},
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
              <Text style={styles.username}>{item.userId.user_handle}</Text>
              <Text style={styles.comment}>{item.content}</Text>
              <Text style={styles.timestamp}>
                {moment(item.createdAt).format('LT')}
              </Text>

              {/* Render replies if they exist */}
              {item.replies && item.replies.length > 0 && (
                <FlatList
                  data={item.replies}
                  renderItem={({item: reply}) => (
                    <View style={styles.replyContainer}>
                      <Text style={styles.replyText}>
                        Reply: {reply.content}
                      </Text>
                    </View>
                  )}
                  keyExtractor={item => item._id}
                  //style={styles.repliesList}
                />
              )}
            </View>
          </View>
        )}
        keyExtractor={item => item._id} // Change from 'id' to '_id' for consistency
        style={styles.commentsList}
      />

      {/* New Comment Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Add a comment..."
        multiline
        value={newComment}
        onChangeText={setNewComment}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleCommentSubmit}>
        <Text style={styles.submitButtonText}>⏩ Submit Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  commentsList: {
    flex: 1,
    marginBottom: 20,
  },
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
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentScreen;
