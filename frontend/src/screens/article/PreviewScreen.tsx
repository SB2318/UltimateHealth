import React, {useRef} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {PRIMARY_COLOR} from '../../helper/Theme';
import {PreviewScreenProp, User} from '../../type';
import {createHTMLStructure} from '../../helper/Utils';
import {useMutation, useQuery} from '@tanstack/react-query';
import RNFS from 'react-native-fs';
import axios from 'axios';
import Loader from '../../components/Loader';
import {GET_PROFILE_API, POST_ARTICLE, UPLOAD_STORAGE} from '../../helper/APIUtils';
import {useSelector} from 'react-redux';

export default function PreviewScreen({navigation, route}: PreviewScreenProp) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {article, title, description, image, selectedGenres} = route.params;
  const webViewRef = useRef<WebView>(null);
  const {user_token} = useSelector((state: any) => state.user);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            createPostMutation.mutate();
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

  const createPostMutation = useMutation({
    mutationKey: ['create-post-key'],
    mutationFn: async () => {
      const response = await axios.post(
        POST_ARTICLE,
        {
          title: title,
          authorName: user?.user_name,
          authorId: user?._id,
          content: article,
          tags: selectedGenres,
          imageUtils: [image],
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        },
      );
      console.log(article);
      return response.data as any;
    },

    onSuccess: () => {
      Alert.alert('Article added sucessfully');
      navigation.navigate('TabNavigation');
    },
    onError: error => {
      console.log('Article post Error', error);
      console.log(error);

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
      Alert.alert('Error', `Operation failed: ${error.message}`);
    }
  };
  
  // Vultr post
  if (createPostMutation.isPending) {
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
