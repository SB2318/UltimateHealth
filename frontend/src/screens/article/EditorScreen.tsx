/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */

import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import {File} from 'expo-file-system';
import RNFS from 'react-native-fs';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import IonIcon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import {EditorScreenProp} from '../../schemas/type';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setSuggestion, setSuggestionAccepted} from '../../store/dataSlice';
import AutoHeightWebView from '@brown-bear/react-native-autoheight-webview';
import {createHTMLStructure} from '../../lib/utils/Utils';
import {useAppDispatch} from '@/src/store/hooks';

const extractHtmlBody = (rawHtml: string) => {
  const withoutScripts = rawHtml.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    '',
  );
  const bodyMatch = withoutScripts.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1].trim() : withoutScripts.trim();
};

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
  const dispatch = useAppDispatch();

  const navigateToPreviewScreen = (htmlToPreview?: string) => {
    const content = (htmlToPreview ?? article ?? '').trim();
    const plainTextLength = content.replace(/<[^>]*>/g, '').trim().length;
    if (plainTextLength <= 20) {
      Alert.alert('Error', 'Please enter at least 20 characters');
      return;
    }

    dispatch(setSuggestion({suggestion: ''}));
    dispatch(setSuggestionAccepted({selection: false}));

    navigation.navigate('PreviewScreen', {
      article: content,
      title,
      authorName,
      language,
      description,
      image: imageUtils,
      selectedGenres,
      localImages,
      htmlImages,
      articleData,
      requestId,
      pb_record_id,
      translationSource,
    });
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.preview_button}
          onPress={() => navigateToPreviewScreen()}
          accessibilityRole="button"
          accessibilityLabel="Preview article"
          accessibilityHint="Opens the article preview screen if the article has enough content">
          <Fontisto name="preview" size={26} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    article,
    title,
    description,
    selectedGenres,
    authorName,
    imageUtils,
    localImages,
    htmlImages,
    articleData,
    requestId,
    pb_record_id,
    translationSource,
    language,
  ]);

  useEffect(() => {
    if (htmlContent) {
      setArticle(htmlContent);
      setEditorReady(true);
    }
  }, [htmlContent]);

  React.useEffect(() => {
    if (imageUtils) {
      setLocalImages(prevImages =>
        prevImages.includes(imageUtils)
          ? prevImages
          : [imageUtils, ...prevImages],
      );
    }
  }, [imageUtils]);

  useEffect(() => {
    if (editorReady && article && RichText.current) {
      RichText.current?.setContentHTML(article);
    }
  }, [editorReady]);

  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (_items) {
      setEditorReady(true);
    });
  }

  function handleHeightChange(_height: number) {
    // editor height change
  }

  const handleUploadHtmlFile = async () => {
    try {
      const picked = await File.pickFileAsync({
        mimeTypes: ['text/html', 'application/xhtml+xml', 'text/plain'],
      });
      if (!picked || ('canceled' in picked && picked.canceled)) {
        return;
      }

      const fileObj: any =
        'result' in picked
          ? Array.isArray(picked.result)
            ? picked.result[0]
            : picked.result
          : Array.isArray(picked)
            ? picked[0]
            : picked;

      if (!fileObj) return;

      let rawText = '';
      if (typeof fileObj.text === 'function') {
        rawText = await fileObj.text();
      } else if (typeof fileObj.textSync === 'function') {
        rawText = fileObj.textSync();
      } else if (fileObj.uri) {
        rawText = await RNFS.readFile(fileObj.uri, 'utf8');
      }

      const bodyHtml = extractHtmlBody(rawText || '');
      if (bodyHtml.replace(/<[^>]*>/g, '').trim().length <= 20) {
        Alert.alert(
          'Invalid HTML File',
          'The selected HTML file must contain at least 20 characters of text.',
        );
        return;
      }

      setArticle(bodyHtml);
      RichText.current?.setContentHTML(bodyHtml);

      Alert.alert(
        'HTML File Loaded',
        'Would you like to go directly to Preview & Submit, or continue editing here?',
        [
          {
            text: 'Edit Here',
            style: 'cancel',
          },
          {
            text: 'Go to Preview & Submit',
            onPress: () => navigateToPreviewScreen(bodyHtml),
          },
        ],
      );
    } catch (error: any) {
      const msg = String(error?.message || '');
      if (
        msg.toLowerCase().includes('cancel') ||
        msg.toLowerCase().includes('aborted')
      ) {
        return;
      }
      Alert.alert('Upload Failed', 'Could not read the selected HTML file.');
    }
  };

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

      const imageHTML = `<img src="${str}" style="width: ${width}px; height: ${height}px;" />`;

      setLocalImages(prev => [...prev, str]);
      setHtmlImages(prev => [...prev, imageHTML]);

      await RichText.current?.insertHTML(imageHTML);
    }
  }

  const EditorScene = () => (
    <ScrollView
      style={[styles.container, {paddingBottom: insets.bottom}]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {/* Writing Helper Text & HTML Upload Shortcut */}
      <View style={styles.helperBar}>
        <Text style={styles.helperText}>
          Compose your article or upload an .html file
        </Text>
        <TouchableOpacity
          style={styles.uploadHtmlChip}
          onPress={handleUploadHtmlFile}
          accessibilityRole="button"
          accessibilityLabel="Upload HTML file">
          <IonIcon name="code-slash-outline" size={16} color="#FFFFFF" />
          <Text style={styles.uploadHtmlChipText}>Upload HTML</Text>
        </TouchableOpacity>
      </View>

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
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.insertImage,
          actions.blockquote,
          actions.undo,
          actions.redo,
        ]}
        iconMap={{
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
          [actions.redo]: ({tintColor}: {tintColor: any}) => (
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
        accessibilityLabel="Article editor"
        accessibilityHint="Enter and edit the content of your article"
      />

      {/* Character Count Helper */}
      <Text style={styles.characterCount}>
        {article.replace(/<[^>]*>/g, '').length} characters
      </Text>

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => navigateToPreviewScreen()}
        accessibilityRole="button"
        accessibilityLabel="Continue to Preview and Submit">
        <Text style={styles.proceedButtonText}>
          Continue to Preview & Submit
        </Text>
        <IonIcon name="arrow-forward" size={18} color="#FFFFFF" />
      </TouchableOpacity>
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
            source={{
              html: createHTMLStructure(title || '', article, [], '', ''),
            }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyPreview}>
            Start typing to see preview...
          </Text>
        )}

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigateToPreviewScreen()}
          accessibilityRole="button"
          accessibilityLabel="Continue to Preview and Submit">
          <Text style={styles.proceedButtonText}>
            Continue to Preview & Submit
          </Text>
          <IonIcon name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
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
          onPress={() => setActiveTab('editor')}
          accessibilityRole="tab"
          accessibilityLabel="Editor"
          accessibilityState={{selected: activeTab === 'editor'}}>
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
          onPress={() => setActiveTab('preview')}
          accessibilityRole="tab"
          accessibilityLabel="Preview"
          accessibilityState={{selected: activeTab === 'preview'}}>
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
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  helperBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  helperText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginRight: 8,
  },
  uploadHtmlChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#000A60',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  uploadHtmlChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
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
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000A60',
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
