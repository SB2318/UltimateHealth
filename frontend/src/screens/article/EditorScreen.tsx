/* eslint-disable react-hooks/immutability, react-hooks/refs, react-hooks/static-components, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars */
 
 
import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet,
  Text,
   ScrollView ,
  Alert,
  TouchableOpacity,
  View,
 } from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import IonIcon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import {PRIMARY_COLOR} from '../../helper/Theme';
import {EditorScreenProp} from '../../type';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {setSuggestion, setSuggestionAccepted} from '../../store/dataSlice';
import AutoHeightWebView from '@brown-bear/react-native-autoheight-webview';
import {createHTMLStructure} from '../../helper/Utils';

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
    translationSource,
    language,
  } = route.params || {};

  const RichText = useRef<RichEditor>(null);
  const [article, setArticle] = useState('');
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [htmlImages, setHtmlImages] = useState<string[]>([]);
  const [editorReady, setEditorReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.preview_button}
          onPress={() => {
            if (article.length > 20) {
              setActiveTab('preview');
            } else {
              Alert.alert('Error', 'Please enter at least 20 characters');
            }
          }}>
          <Fontisto name="preview" size={26} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    article,
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
    if (editorReady && article && RichText.current) {
      RichText.current?.setContentHTML(article);
      //RichText.current?.focusContentEditor(); 
    }
  }, [ editorReady]);

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
  function handleHeightChange(_height: number) {
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

      // imageHTML must be declared before it is referenced in setHtmlImages
      const imageHTML = `<img src="${str}" style="width: ${width}px; height: ${height}px;" />`;

      setLocalImages(prev => [...prev, str]);
      setHtmlImages(prev => [...prev, imageHTML]);

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
  const EditorScene = () => (
    <ScrollView
      style={[styles.container, {paddingBottom: insets.bottom}]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">

      {/* Writing Helper Text */}
      <Text style={styles.helperText}>
        Compose your article with rich formatting tools below
      </Text>

      <RichToolbar
        style={styles.richBar}
        editor={RichText}
        disabled={false}
        iconTint={'#FFFFFF'}
        selectedIconTint={'#FCD34D'}
        disabledIconTint={'#9CA3AF'}
        onPressAddImage={onPressAddImage}
        iconSize={28}
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
          actions.blockquote,

          // Undo/Redo Actions
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
          // Custom Icons for Text Formatting Actions
          [actions.setStrikethrough]: ({tintColor}: {tintColor: string}) => (
            <FontAwesome name="strikethrough" color={tintColor} size={24} />
          ),
          [actions.alignLeft]: ({tintColor}: {tintColor: string}) => (
            <Feather name="align-left" color={tintColor} size={28} />
          ),
          [actions.alignCenter]: ({tintColor}: {tintColor: string}) => (
            <Feather name="align-center" color={tintColor} size={28} />
          ),
          [actions.alignRight]: ({tintColor}: {tintColor: string}) => (
            <Feather name="align-right" color={tintColor} size={28} />
          ),
          [actions.undo]: ({tintColor}: {tintColor: string}) => (
            <IonIcon name="arrow-undo" color={tintColor} size={28} />
          ),
          [actions.redo]: ({tintColor}: {tintColor: string}) => (
            <IonIcon name="arrow-redo" color={tintColor} size={28} />
          ),
          [actions.heading1]: ({tintColor}: {tintColor: string}) => (
            <Text style={[styles.headingIcon, {color: tintColor}]}>H1</Text>
          ),
          [actions.heading2]: ({tintColor}: {tintColor: string}) => (
            <Text style={[styles.headingIcon, {color: tintColor}]}>H2</Text>
          ),
          [actions.heading3]: ({tintColor}: {tintColor: string}) => (
            <Text style={[styles.headingIcon, {color: tintColor}]}>H3</Text>
          ),
          [actions.insertImage]: ({tintColor}: {tintColor: string}) => (
            <Entypo name="image" color={tintColor} size={26} />
          ),
          [actions.blockquote]: ({tintColor}: {tintColor: string}) => (
            <Entypo name="quote" color={tintColor} size={28} />
          ),
        }}
        insertImage={onPressAddImage}
      />

      <RichEditor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={'Start writing your article here...'}
        initialContentHTML={article}
        onChange={text => setArticle(text)}
        editorInitializedCallback={editorInitializedCallback}
        onHeightChange={handleHeightChange}
        initialHeight={650}
        useContainer={true}
        pasteAsPlainText={false}
      />

      {/* Character Count Helper */}
      <Text style={styles.characterCount}>
        {article.replace(/<[^>]*>/g, '').length} characters
      </Text>
    </ScrollView>
  );

  const PreviewScene = () => (
    <ScrollView
      style={styles.previewContainer}
      showsVerticalScrollIndicator={true}>
      <View style={styles.previewContent}>
        <Text style={styles.previewTitle}>{title || 'Article Preview'}</Text>
        {article ? (
          <AutoHeightWebView
            style={styles.webView}
            source={{html: createHTMLStructure(article)}}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyPreview}>Start typing to see preview...</Text>
        )}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'editor' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('editor')}>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'editor' && styles.tabLabelActive,
            ]}>
            Editor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'preview' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('preview')}>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'preview' && styles.tabLabelActive,
            ]}>
            Preview
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'editor' ? <EditorScene /> : <PreviewScene />}
    </View>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
  },
  /*******************************/
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  helperText: {
    fontSize: 15,
    color: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    fontWeight: '500',
  },
  editor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 5,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 650,
  },
  rich: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 24,
  },
  richBar: {
    height: 56,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headingIcon: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  characterCount: {
    fontSize: 13,
    color: '#9CA3AF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: 'right',
    backgroundColor: '#FFFFFF',
    marginTop: 4,
    marginHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  preview_button: {
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    elevation: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomColor: PRIMARY_COLOR,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabLabelActive: {
    color: PRIMARY_COLOR,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  previewContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  webView: {
    marginTop: 12,
  },
  emptyPreview: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 32,
  },
});

