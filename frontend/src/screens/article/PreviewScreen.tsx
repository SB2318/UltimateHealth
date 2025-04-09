import React, {useRef} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {PRIMARY_COLOR} from '../../helper/Theme';
import {ArticleData, PreviewScreenProp, User} from '../../type';
import {createHTMLStructure} from '../../helper/Utils';
import {useMutation, useQuery} from '@tanstack/react-query';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';
import axios from 'axios';
import Loader from '../../components/Loader';
import {
  GET_IMAGE,
  GET_PROFILE_API,
  POST_ARTICLE,
  SUBMIT_SUGGESTED_CHANGES,
  UPLOAD_STORAGE,
} from '../../helper/APIUtils';
import {useSelector} from 'react-redux';
import useUploadImage from '../../../hooks/useUploadImage';

import {useSocket} from '../../../SocketContext';
//import io from 'socket.io-client';

export default function PreviewScreen({navigation, route}: PreviewScreenProp) {
  const {
    article,
    title,
    description,
    authorName,
    selectedGenres,
    localImages,
    articleData,
  } = route.params;

  //const socket = io('http://51.20.1.81:8084');
  const socket = useSocket();

  const webViewRef = useRef<WebView>(null);
  const {user_token} = useSelector((state: any) => state.user);

  const {uploadImage, loading} = useUploadImage();
  // console.log(selectedGenres);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            //createPostMutation.mutate();
            handlePostSubmit();
          }}>
          <Text style={styles.textWhite}>Post</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const {data: user} = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await axios.get(GET_PROFILE_API, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      });
      console.log('User Profile', response.headers);
      // console.log('Respon)
      return response.data.profile as User;
    },
  });

  const handlePostSubmit = async () => {
    let finalArticle = article;
    let imageUtil = '';

    // Resize and confirm for all images before uploading
    try {
      // Show confirmation alert
      const confirmation = await showConfirmationAlert();
      if (!confirmation) {
        Alert.alert('Post discarded');
        navigation.navigate('TabNavigation');
        return;
      }

      // Process each local image
      for (let i = 0; i < localImages.length; i++) {
        const localImage = localImages[i];

        let uploadedUrl: string | undefined;

        if (localImage.includes('api/getfile')) {
          uploadedUrl = localImage;
        } else {
          // Resize the image and handle the upload
          const resizedImageUri = await resizeImage(localImage);

          console.log('resized uri', resizedImageUri?.uri);
          uploadedUrl = await uploadImage(resizedImageUri?.uri);
        }

        if (i === 0 && imageUtil.length === 0) {
          imageUtil = uploadedUrl?.includes('api/getfile')
            ? uploadedUrl
            : `${GET_IMAGE}/${uploadedUrl}`;
        } else {
          finalArticle = finalArticle.replace(
            localImage,
            `${GET_IMAGE}/${uploadedUrl}`,
          );
        }
      }

      // Submit changes or create a new post
      if (articleData) {
        // Submit suggested changes
        submitChangesMutation.mutate({article: finalArticle, image: imageUtil});
      } else {
        // Submit new article
        createPostMutation.mutate({article: finalArticle, image: imageUtil});
      }
    } catch (err) {
      console.error('Image processing failed:', err);
      Alert.alert('Error', 'Could not process the images.');
    }
  };

  // Helper function to show confirmation alert
  const showConfirmationAlert = () => {
    return new Promise(resolve => {
      Alert.alert(
        'Create Post',
        'Please confirm you want to upload this post.',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ],
        {cancelable: false},
      );
    });
  };

  // Helper function to resize an image
  const resizeImage = async localImage => {
    try {
      const resizedImageUri = await ImageResizer.createResizedImage(
        localImage,
        1000, // Width
        1000, // Height
        'JPEG', // Format
        100, // Quality
      );
      return resizedImageUri;
    } catch (err) {
      console.error('Failed to resize image:', err);
      // throw new Error('Image resizing failed');
    }
  };

  const createPostMutation = useMutation({
    mutationKey: ['create-post-key'],
    mutationFn: async ({article, image}: {article: string; image: string}) => {
      console.log('article data', {
        title: title,
        authorName: authorName,
        authorId: user?._id,
        content: article,
        tags: selectedGenres,
        imageUtils: [image],
        description: description,
      });
      const response = await axios.post(
        POST_ARTICLE,
        {
          title: title,
          authorName: authorName,
          authorId: user?._id,
          content: article,
          tags: selectedGenres,
          imageUtils: [image],
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );
      // console.log(article);
      return response.data.newArticle as ArticleData;
    },

    onSuccess: data => {
      // User will not get notified, until the article published
      /*
      socket.emit('notification', {
        type: 'openPost',
        postId: data._id,
        authorId: user?._id,
        message: {
          title: `${user?.user_handle} posted a new article`,
          body: title,
        },
      });
      */
      Alert.alert('Article added sucessfully');

      navigation.navigate('TabNavigation');
    },
    onError: error => {
      console.log('Article post Error', error);
      // console.log(error);

      Alert.alert('Failed to upload your post');
    },
  });

  // submit suggested changes

  const submitChangesMutation = useMutation({
    mutationKey: ['sumit-post-key'],
    mutationFn: async ({article, image}: {article: string; image: string}) => {
      console.log('article data', {
        title: title,
        userId: articleData?.authorId,
        //authorId: user?._id,
        authorName: authorName,
        articleId: articleData?._id,
        content: article,
        tags: selectedGenres,
        imageUtils: [image],
        //aditionalNote: '',
        description: description,
      });
      const response = await axios.post(
        SUBMIT_SUGGESTED_CHANGES,
        //  userId, articleId, content, aditionalNote, title, imageUtils
        {
          title: title,
          userId: articleData?.authorId,
          //authorId: user?._id,
          authorName: authorName,
          articleId: articleData?._id,
          content: article,
          tags: selectedGenres,
          imageUtils: [image],
          //aditionalNote: '',
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );
      // console.log(article);
      return response.data.newArticle as ArticleData;
    },

    onSuccess: data => {
      // User will not get notified, until the article published
      /*
      socket.emit('notification', {
        type: 'openPost',
        postId: data._id,
        authorId: user?._id,
        message: {
          title: `${user?.user_handle} posted a new article`,
          body: title,
        },
      });
      */
      Alert.alert('Article updated sucessfully');

      navigation.navigate('TabNavigation');
    },
    onError: error => {
      console.log('Article post Error', error);
      // console.log(error);

      Alert.alert('Failed to upload your post');
    },
  });

  const createAndUploadHtmlFile = async () => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${title.substring(
      0,
      7,
    )}.html`;

    try {
      // Step 1: Create the HTML file
      await RNFS.writeFile(filePath, article, 'utf8');
      Alert.alert('Success', `HTML file created at: ${filePath}`);

      // Step 2: Upload the file
      const formData = new FormData();
      formData.append('file', {
        uri: filePath,
        type: 'text/html', // Change if necessary
        name: `${title.substring(0, 7)}.html`,
      });

      const response = await axios.post(UPLOAD_STORAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Upload Success', `File uploaded: ${response.data}`);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', `Operation failed: ${error.message}`);
    }
  };

  // Vultr post
  if (
    createPostMutation.isPending ||
    submitChangesMutation.isPending ||
    loading
  ) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <WebView
        style={{
          padding: 20,
          margin: 10,
          width: '99%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={webViewRef}
        originWhitelist={['*']}
        source={{
          html: createHTMLStructure(
            title,
            article,
            selectedGenres,
            '',
            user ? user?.user_name : '',
          ),
        }} // author name required
        javaScriptEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  textWhite: {
    fontWeight: '600',
    fontSize: 17,
    color: 'white',
  },
  button: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 7,
    backgroundColor: PRIMARY_COLOR,
    width: 75,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
