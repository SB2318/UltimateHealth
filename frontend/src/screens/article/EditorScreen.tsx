/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ON_PRIMARY_COLOR, PRIMARY_COLOR} from '../../helper/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {EditorScreenProp} from '../../type';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp} from '../../helper/Metric';
import {useDispatch} from 'react-redux';
import {setSuggestion, setSuggestionAccepted} from '../../store/dataSlice';

// Feature:
// If you want to discard your post, in that case no post will upload into storage,
const EditorScreen = ({navigation, route}: EditorScreenProp) => {
  const insets = useSafeAreaInsets();
  const {
    title,
    description,
    selectedGenres,
    authorName,
    imageUtils,
    articleData,
    requestId,
    htmlContent,
    pb_record_id,
  } = route.params;

  const RichText = useRef();
  const [article, setArticle] = useState('');
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [htmlImages, setHtmlImages] = useState<string[]>([]);
  const [editorReady, setEditorReady] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.preview_button}
          onPress={() => {
            console.log('Preview button pressed');
            if (article.length > 20) {
              //console.log('Preview Screen');
              dispatch(setSuggestion({suggestion: ''}));
              dispatch(setSuggestionAccepted({selection: false}));
              navigation.navigate('PreviewScreen', {
                article: article,
                title: title,
                authorName: authorName,
                description: description,
                image: imageUtils,
                selectedGenres: selectedGenres,
                localImages: localImages,
                htmlImages: htmlImages,
                articleData: articleData,
                requestId: requestId,
                pb_record_id: pb_record_id,
              });
            } else {
              Alert.alert('Error', 'Please enter at least 20 characters');
            }
          }}>
          <Fontisto name="preview" size={26} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    article,
    title,
    description,
    imageUtils,
    selectedGenres,
    authorName,
    localImages,
    htmlImages,
    articleData,
    requestId,
  ]);

  useEffect(() => {
    /*
    const loadArticle = async () => {
      if (!articleData) {
        return;
      }
      try {
        if (articleData.content.endsWith('.html')) {
          await getContent(articleData.content);

          setEditorReady(true);
        } else {
          setArticle(articleData.content);
          setEditorReady(true);
        }
      } catch (err) {
        console.error('Failed to load article:', err);
      }
    };
    */

    if (htmlContent) {
      setArticle(htmlContent);
      setEditorReady(true);
    }

    // loadArticle();
  }, [htmlContent]);

  React.useEffect(() => {
    if (imageUtils) {
      setLocalImages(prevImages => [imageUtils, ...prevImages]); // Add imageUtils at the start
    }
  }, [imageUtils]);

  useEffect(() => {
    if (editorReady && article) {
      RichText.current?.setContentHTML(article);
      //RichText.current?.focusContentEditor(); // Optional: Ensure the cursor is focused
    }
  }, [editorReady]);

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (_items) {
      setEditorReady(true);
    });
  }

  /*

  const getContent = async content => {
    try {
      const response = await fetch(`${GET_STORAGE_DATA}/${content}`);
      const text = await response.text();
      setArticle(text);
    } catch (error) {
      // console.error('Error fetching URI:', error);
      setArticle(content);
    }
  };
  */

  // Callback after height change
  function handleHeightChange(_height) {
    // console.log("editor height change:", height);
  }

  async function onPressAddImage() {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      presentationStyle: 'popover',
      quality: 0.7,
      includeBase64: true,
    });
    if (result.assets && result.assets.length > 0) {
      const type = result.assets[0].type;
      const base64String = result.assets[0].base64;
      const str = `data:${type};base64,${base64String}`;

      const width = 1000;
      const height = 1000;

      setLocalImages(prev => [...prev, str]);
      setHtmlImages(prev => [...prev, imageHTML]);

      const imageHTML = `<img src="${str}" style="width: ${width}px; height: ${height}px;" />`;

      await RichText.current?.insertHTML(imageHTML);

      //await RichText.current?.insertImage(str);
    } else {
      //console.log('No image selected');
    }
  }

  // async function insertVideo() {
  //   const result = await ImagePicker.launchImageLibrary({
  //     mediaType: 'video',
  //     presentationStyle: 'popover',
  //   });

  //   if (result.assets && result.assets.length > 0) {
  //     const fileUri = result.assets[0].uri;
  //     console.log('Image URI:', fileUri);
  //     setvideoData(`${fileUri}`);
  //     // Convert the video URI to a Blob
  //     // await RichText.current?.insertVideo(blobUrl);
  //     // Insert video through local file url
  //     RichText.current?.insertVideo(fileUri);
  //   } else {
  //     console.log('No video selected');
  //   }
  // }
  /*
  const onPressAddImage =  () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const {uri, fileSize} = response.assets[0];

        // Check file size (1 MB limit)
        if (fileSize && fileSize > 1024 * 1024) {
          Alert.alert('Error', 'File size exceeds 1 MB.');
          return;
        }

        // Check dimensions
        ImageResizer.createResizedImage(uri, 2000, 2000, 'JPEG', 100)
          .then(async resizedImageUri => {
            // If the image is resized successfully, upload it
          })
          .catch(err => {
            console.log(err);
            Alert.alert('Error', 'Could not resize the image.');
          });

        // setImageUtils(uri ? uri : '');
        await RichText.current?.insertImage(uri ? uri : '');
      }
    });
  };
*/
  return (
    <ScrollView style={[styles.container, {paddingBottom: insets.bottom}]}>
      {/* <View style={styles.box}>
        <Text style={styles.text}>Write your post</Text>

        <TouchableOpacity
          onPress={() => {
            //if (article.length > 20) {
            navigation.navigate('PreviewScreen', {
              article: article,
            });
            // }
          }}>
          <Text style={styles.preview}>Preview</Text>
        </TouchableOpacity>
      </View> */}

      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={'white'}
        selectedIconTint={'black'}
        disabledIconTint={'purple'}
        onPressAddImage={onPressAddImage}
        iconSize={30}
        actions={[
          // Text Formatting Actions
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,

          // Heading Actions
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          actions.heading5,
          actions.heading6,

          // Alignment Actions
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,

          // List Actions
          actions.insertBulletsList,
          actions.insertOrderedList,

          // Insert Actions
          actions.insertLink,
          actions.insertImage,
          //actions.insertHTML,
          actions.table,

          // Undo/Redo Actions
          actions.undo,
          actions.redo,

          // Blockquote Action
          actions.blockquote,
        ]}
        iconMap={{
          // Custom Icons for Text Formatting Actions
          [actions.setStrikethrough]: ({tintColor}) => (
            <FontAwesome name="strikethrough" color={tintColor} size={26} />
          ),

          // Custom Icons for Alignment Actions
          [actions.alignLeft]: ({tintColor}) => (
            <Feather name="align-left" color={tintColor} size={35} />
          ),
          [actions.alignCenter]: ({tintColor}) => (
            <Feather name="align-center" color={tintColor} size={35} />
          ),
          [actions.alignRight]: ({tintColor}) => (
            <Feather name="align-right" color={tintColor} size={35} />
          ),

          // Custom Icons for Undo/Redo Actions
          [actions.undo]: ({tintColor}) => (
            <IonIcon name="arrow-undo" color={tintColor} size={35} />
          ),
          [actions.redo]: ({tintColor}) => (
            <IonIcon name="arrow-redo" color={tintColor} size={35} />
          ),

          // Custom Icons for Heading Actions
          [actions.heading1]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
          ),
          [actions.heading2]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H2</Text>
          ),
          [actions.heading3]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
          ),
          [actions.heading4]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
          ),
          [actions.heading5]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H5</Text>
          ),
          [actions.heading6]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H6</Text>
          ),

          // Custom Icon for Image Insertion
          [actions.insertImage]: ({tintColor}) => (
            <Entypo name="image" color={tintColor} size={29} />
          ),

          // Custom Icon for Blockquote Action
          [actions.blockquote]: ({tintColor}) => (
            <Entypo name="quote" color={tintColor} size={35} />
          ),
        }}
        insertImage={onPressAddImage}
      />

      <RichEditor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={
          'Start Writing Here — outside formatting not acceptable here'
        }
        initialContentHTML={article}
        onChange={text => setArticle(text)}
        editorInitializedCallback={editorInitializedCallback}
        onHeightChange={handleHeightChange}
        initialHeight={600}
      />

      {/**
     *
     *  <Text style={styles.text}>Result</Text>

      <HTMLView value={article} stylesheet={styles} />
     */}
    </ScrollView>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,
    backgroundColor: ON_PRIMARY_COLOR,
  },
  editor: {
    backgroundColor: ON_PRIMARY_COLOR,
    borderColor: 'black',
    marginHorizontal: 4,
  },
  rich: {
    //minHeight: 700,
    flex: 1,
    backgroundColor: ON_PRIMARY_COLOR,
  },
  richBar: {
    height: 55,
    backgroundColor: PRIMARY_COLOR,
    marginTop: 0,
    marginBottom: hp(0.8),
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  preview: {
    fontWeight: '500',
    fontSize: 18,
  },
  tib: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#515156',
  },

  box: {
    flex: 0,
    width: '94%',
    marginBottom: 20,
    marginTop: 10,
    marginStart: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  preview_button: {
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  fontOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 15,
    color: 'blue',
    fontSize: 18,
  },
});
