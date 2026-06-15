import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import IonIcon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PRIMARY_COLOR } from '../../helper/Theme';
import { EditorScreenProp } from '../../type';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setSuggestion, setSuggestionAccepted } from '../../store/dataSlice';

// Import the existing Preview component so we can use it inside the tab
import PreviewScreen from './PreviewScreen';

const EditorScreen = ({ navigation, route }: EditorScreenProp) => {
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
  } = route.params;

  const RichText = useRef<RichEditor>(null);
  const [article, setArticle] = useState<string>('');
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [htmlImages, setHtmlImages] = useState<string[]>([]);
  const [editorReady, setEditorReady] = useState<boolean>(false);

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const dispatch = useDispatch();

  useEffect(() => {
    if (htmlContent) {
      setArticle(htmlContent);
      setEditorReady(true);
    }
  }, [htmlContent]);

  React.useEffect(() => {
    if (imageUtils) {
      setLocalImages((prevImages: string[]) => [imageUtils, ...prevImages]);
    }
  }, [imageUtils]);

  useEffect(() => {
    if (activeTab === 'write' && editorReady && article && RichText.current) {
      RichText.current?.setContentHTML(article);
    }
  }, [editorReady, activeTab, article]);

  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (_items: any[]) {
      setEditorReady(true);
    });
  }

  function handleHeightChange(_height: number) {}

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

      setLocalImages((prev: string[]) => [...prev, str]);
      setHtmlImages((prev: string[]) => [...prev, imageHTML]);

      await RichText.current?.insertHTML(imageHTML);
    }
  }

  // Helper to handle switching to preview
  const handleTabSwitch = (tab: 'write' | 'preview') => {
    if (tab === 'preview' && article.length <= 20) {
      Alert.alert('Error', 'Please enter at least 20 characters before previewing.');
      return;
    }

    if (tab === 'preview') {
      dispatch(setSuggestion({ suggestion: '' }));
      dispatch(setSuggestionAccepted({ selection: false }));
    }
    setActiveTab(tab);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      
      {/* --- TABBED NAVIGATION UI --- */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'write' && styles.activeTabButton]}
          onPress={() => handleTabSwitch('write')}
        >
          <Text style={[styles.tabText, activeTab === 'write' && styles.activeTabText]}>
            Write
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'preview' && styles.activeTabButton]}
          onPress={() => handleTabSwitch('preview')}
        >
          <Text style={[styles.tabText, activeTab === 'preview' && styles.activeTabText]}>
            Preview
          </Text>
        </TouchableOpacity>
      </View>

      {/* --- CONDITIONAL RENDERING --- */}
      {activeTab === 'write' ? (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
              [actions.setStrikethrough]: ({ tintColor }: { tintColor: string }) => (
                <FontAwesome name="strikethrough" color={tintColor} size={24} />
              ),
              [actions.alignLeft]: ({ tintColor }: { tintColor: string }) => (
                <Feather name="align-left" color={tintColor} size={28} />
              ),
              [actions.alignCenter]: ({ tintColor }: { tintColor: string }) => (
                <Feather name="align-center" color={tintColor} size={28} />
              ),
              [actions.alignRight]: ({ tintColor }: { tintColor: string }) => (
                <Feather name="align-right" color={tintColor} size={28} />
              ),
              [actions.undo]: ({ tintColor }: { tintColor: string }) => (
                <IonIcon name="arrow-undo" color={tintColor} size={28} />
              ),
              [actions.redo]: ({ tintColor }: { tintColor: string }) => (
                <IonIcon name="arrow-redo" color={tintColor} size={28} />
              ),
              [actions.heading1]: ({ tintColor }: { tintColor: string }) => (
                <Text style={[styles.headingIcon, { color: tintColor }]}>H1</Text>
              ),
              [actions.heading2]: ({ tintColor }: { tintColor: string }) => (
                <Text style={[styles.headingIcon, { color: tintColor }]}>H2</Text>
              ),
              [actions.heading3]: ({ tintColor }: { tintColor: string }) => (
                <Text style={[styles.headingIcon, { color: tintColor }]}>H3</Text>
              ),
              [actions.insertImage]: ({ tintColor }: { tintColor: string }) => (
                <Entypo name="image" color={tintColor} size={26} />
              ),
              [actions.blockquote]: ({ tintColor }: { tintColor: string }) => (
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
            onChange={(text: string) => setArticle(text)}
            editorInitializedCallback={editorInitializedCallback}
            onHeightChange={handleHeightChange}
            initialHeight={650}
            useContainer={true}
            pasteAsPlainText={false}
          />

          <Text style={styles.characterCount}>
            {article.replace(/<[^>]*>/g, '').length} characters
          </Text>
        </ScrollView>
      ) : (
        /* --- RENDER EXISTING PREVIEW COMPONENT --- */
        <View style={{ flex: 1 }}>
          {/* We use 'as any' here to bypass TypeScript's strict screen-to-screen navigation checks */}
          <PreviewScreen 
            navigation={navigation as any} 
            route={{
              params: {
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
                language: language,
                translationSource: translationSource,
              }
            } as any} 
          />
        </View>
      )}
    </View>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  /* --- TAB STYLES --- */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: PRIMARY_COLOR,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: PRIMARY_COLOR,
  },
  /* ---------------------- */
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
});