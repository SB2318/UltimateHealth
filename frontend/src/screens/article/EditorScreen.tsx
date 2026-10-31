/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {File} from 'expo-file-system';
import RNFS from 'react-native-fs';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import IonIcon from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import {EDITOR_TYPOGRAPHY} from '../../lib/ui/Typography';
import {EditorScreenProp} from '../../schemas/type';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setSuggestion, setSuggestionAccepted} from '../../store/dataSlice';
import AutoHeightWebView from '@brown-bear/react-native-autoheight-webview';
import {createHTMLStructure} from '../../lib/utils/Utils';
import {useAppDispatch} from '@/src/store/hooks';

export const EDITOR_BODY_DRAFT_KEY = '@article_editor_body_draft';

const extractHtmlBody = (rawHtml: string) => {
  const withoutScripts = rawHtml.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    '',
  );
  const bodyMatch = withoutScripts.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1].trim() : withoutScripts.trim();
};

const QUICK_SNIPPETS: Array<{
  id: string;
  label: string;
  icon: string;
  html: string;
  isFullTemplate?: boolean;
}> = [
  {
    id: 'template',
    label: 'Article Outline',
    icon: 'document-text-outline',
    isFullTemplate: true,
    html: `<h2>Introduction</h2><p>Provide a clear overview of the health topic and why it matters to readers.</p><h2>Key Causes &amp; Symptoms</h2><ul><li><strong>Primary factor:</strong> Explain the main symptom or cause.</li><li><strong>Secondary factor:</strong> Add supporting clinical context.</li></ul><div style="background-color:#EFF6FF;border-left:4px solid #000A60;padding:12px 16px;border-radius:8px;margin:12px 0;"><strong>💡 Key Takeaway:</strong> Summarize the most important actionable insight for patients or readers here.</div><h2>Evidence-Based Recommendations</h2><ol><li>First practical step or lifestyle modification.</li><li>Second clinical or preventive recommendation.</li></ol><h2>Conclusion</h2><p>Wrap up with final thoughts and when to consult a healthcare professional.</p><p><br/></p>`,
  },
  {
    id: 'takeaway',
    label: 'Key Takeaway',
    icon: 'bulb-outline',
    html: `<div style="background-color:#EFF6FF;border-left:4px solid #000A60;padding:12px 16px;border-radius:8px;margin:12px 0;"><strong>💡 Key Takeaway:</strong> Write your key takeaway point here...</div><p><br/></p>`,
  },
  {
    id: 'clinical_note',
    label: 'Clinical Note',
    icon: 'medkit-outline',
    html: `<div style="background-color:#FEF3C7;border-left:4px solid #D97706;padding:12px 16px;border-radius:8px;margin:12px 0;"><strong>⚕️ Clinical Note:</strong> Always consult a qualified healthcare professional for personalized medical diagnosis and treatment.</div><p><br/></p>`,
  },
  {
    id: 'table',
    label: '2×2 Table',
    icon: 'grid-outline',
    html: `<table style="width:100%;border-collapse:collapse;margin:12px 0;border:1px solid #D1D5DB;"><thead><tr style="background-color:#F3F4F6;"><th style="border:1px solid #D1D5DB;padding:8px;text-align:left;">Aspect / Symptom</th><th style="border:1px solid #D1D5DB;padding:8px;text-align:left;">Clinical Guidance</th></tr></thead><tbody><tr><td style="border:1px solid #D1D5DB;padding:8px;">Point 1</td><td style="border:1px solid #D1D5DB;padding:8px;">Details here</td></tr><tr><td style="border:1px solid #D1D5DB;padding:8px;">Point 2</td><td style="border:1px solid #D1D5DB;padding:8px;">Details here</td></tr></tbody></table><p><br/></p>`,
  },
  {
    id: 'citation',
    label: 'Citation',
    icon: 'bookmark-outline',
    html: `<p style="font-size:14px;color:#4B5563;border-left:3px solid #9CA3AF;padding-left:10px;margin:8px 0;"><em>[Reference] Author et al., &ldquo;Study or Guideline Title,&rdquo; Journal / Medical Source, Year.</em></p><p><br/></p>`,
  },
  {
    id: 'divider',
    label: 'Divider',
    icon: 'remove-outline',
    html: `<hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0;" /><p><br/></p>`,
  },
];

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
  const [activeTab, setActiveTab] = useState<'editor' | 'html' | 'preview'>(
    'editor',
  );
  const [focusMode, setFocusMode] = useState(false);
  const [draftStatus, setDraftStatus] = useState<string>('');

  // Link Modal state
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  // Find & Replace Modal state
  const [findModalVisible, setFindModalVisible] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const dispatch = useAppDispatch();
  const isNewArticleDraft = !articleData && !requestId && !htmlContent;

  // Live writing stats (plain text characters, words, paragraphs, reading time)
  const writingStats = useMemo(() => {
    const plainText = (article || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const charCount = (article || '').replace(/<[^>]*>/g, '').trim().length;
    const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;
    const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));
    const isReady = charCount > 20;
    return {
      charCount,
      wordCount,
      readingTimeMin: wordCount > 0 ? readingTimeMin : 0,
      isReady,
    };
  }, [article]);

  const syncContentToEditor = (newHtml: string) => {
    setArticle(newHtml);
    RichText.current?.setContentHTML(newHtml);
  };

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

  // Load initial HTML content or saved draft for new articles
  useEffect(() => {
    if (htmlContent) {
      setArticle(htmlContent);
      setEditorReady(true);
      return;
    }

    if (isNewArticleDraft) {
      AsyncStorage.getItem(EDITOR_BODY_DRAFT_KEY)
        .then(savedDraft => {
          if (savedDraft && savedDraft.trim().length > 0) {
            setArticle(savedDraft);
            setDraftStatus('Draft restored');
            RichText.current?.setContentHTML(savedDraft);
          }
        })
        .catch(() => {});
    }
  }, [htmlContent]);

  // Auto-save body draft when writing a new article
  useEffect(() => {
    if (!isNewArticleDraft) return;
    const trimmed = (article || '').trim();
    if (!trimmed) return;

    const timer = setTimeout(() => {
      AsyncStorage.setItem(EDITOR_BODY_DRAFT_KEY, article)
        .then(() => {
          setDraftStatus('Saved');
        })
        .catch(() => {});
    }, 800);

    return () => clearTimeout(timer);
  }, [article, isNewArticleDraft]);

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

  const handleTabSwitch = (nextTab: 'editor' | 'html' | 'preview') => {
    if (activeTab === 'html' && nextTab === 'editor') {
      RichText.current?.setContentHTML(article);
    }
    setActiveTab(nextTab);
  };

  const handleInsertSnippet = (snippet: (typeof QUICK_SNIPPETS)[number]) => {
    if (snippet.isFullTemplate && writingStats.charCount > 20) {
      Alert.alert(
        'Insert Article Outline',
        'Do you want to append this outline to your current text or replace the editor content?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Append',
            onPress: () => {
              const combined = `${article}<br/>${snippet.html}`;
              syncContentToEditor(combined);
            },
          },
          {
            text: 'Replace',
            style: 'destructive',
            onPress: () => {
              syncContentToEditor(snippet.html);
            },
          },
        ],
      );
      return;
    }

    if (activeTab === 'html') {
      setArticle(prev => `${prev}\n${snippet.html}`);
    } else if (RichText.current && editorReady) {
      RichText.current.insertHTML(snippet.html);
      setArticle(prev =>
        prev ? `${prev}${snippet.html}` : snippet.html,
      );
    } else {
      syncContentToEditor(`${article}${snippet.html}`);
    }
  };

  const handleOpenLinkModal = () => {
    setLinkTitle('');
    setLinkUrl('');
    setLinkModalVisible(true);
  };

  const handleConfirmInsertLink = () => {
    const trimmedUrl = linkUrl.trim();
    if (!trimmedUrl) {
      Alert.alert('Missing URL', 'Please enter a valid web link (URL).');
      return;
    }
    const normalizedUrl = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;
    const displayTitle = linkTitle.trim() || normalizedUrl;
    const anchorHtml = `<a href="${normalizedUrl}">${displayTitle}</a>&nbsp;`;

    if (activeTab === 'html') {
      setArticle(prev => `${prev}${anchorHtml}`);
    } else if (RichText.current && editorReady) {
      RichText.current.insertLink(displayTitle, normalizedUrl);
      setArticle(prev =>
        prev.includes(normalizedUrl) ? prev : `${prev}${anchorHtml}`,
      );
    } else {
      syncContentToEditor(`${article}${anchorHtml}`);
    }
    setLinkModalVisible(false);
  };

  const handleConfirmFindReplace = () => {
    if (!findText.trim()) {
      Alert.alert('Find & Replace', 'Please enter text to find.');
      return;
    }
    const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');

    // Only replace inside text nodes (not inside HTML tag attributes)
    const updatedHtml = (article || '')
      .split(/(<[^>]+>)/g)
      .map(segment => {
        if (segment.startsWith('<') && segment.endsWith('>')) {
          return segment;
        }
        return segment.replace(regex, replaceText);
      })
      .join('');

    if (updatedHtml === article) {
      Alert.alert('No Matches', `Could not find "${findText}" in the article.`);
      return;
    }

    syncContentToEditor(updatedHtml);
    setFindModalVisible(false);
  };

  const handleClearEditor = () => {
    if (!article.trim()) return;
    Alert.alert(
      'Clear Editor',
      'Are you sure you want to clear all text in the editor?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            syncContentToEditor('');
            AsyncStorage.removeItem(EDITOR_BODY_DRAFT_KEY).catch(() => {});
            setDraftStatus('');
          },
        },
      ],
    );
  };

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

      syncContentToEditor(bodyHtml);

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

      const imageHTML = `<img src="${str}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; display: block;" />`;

      setLocalImages(prev => [...prev, str]);
      setHtmlImages(prev => [...prev, imageHTML]);

      await RichText.current?.insertHTML(imageHTML);
    }
  }

  return (
    <View style={styles.tabContainer}>
      <StatusBar style="light" backgroundColor="#000A60" />

      {/* 3-Mode Studio Tab Bar: Editor | HTML Source | Live Preview */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'editor' && styles.tabButtonActive,
          ]}
          onPress={() => handleTabSwitch('editor')}
          accessibilityRole="tab"
          accessibilityLabel="Editor"
          accessibilityState={{selected: activeTab === 'editor'}}>
          <IonIcon
            name="create-outline"
            size={16}
            color={activeTab === 'editor' ? PRIMARY_COLOR : '#6B7280'}
          />
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
            activeTab === 'html' && styles.tabButtonActive,
          ]}
          onPress={() => handleTabSwitch('html')}
          accessibilityRole="tab"
          accessibilityLabel="HTML Source"
          accessibilityState={{selected: activeTab === 'html'}}>
          <IonIcon
            name="code-slash-outline"
            size={16}
            color={activeTab === 'html' ? PRIMARY_COLOR : '#6B7280'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'html' && styles.tabLabelActive,
            ]}>
            HTML Source
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'preview' && styles.tabButtonActive,
          ]}
          onPress={() => handleTabSwitch('preview')}
          accessibilityRole="tab"
          accessibilityLabel="Preview"
          accessibilityState={{selected: activeTab === 'preview'}}>
          <IonIcon
            name="eye-outline"
            size={16}
            color={activeTab === 'preview' ? PRIMARY_COLOR : '#6B7280'}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'preview' && styles.tabLabelActive,
            ]}>
            Preview
          </Text>
        </TouchableOpacity>
      </View>

      {/* Live Writing Metrics & Utility Strip */}
      <View style={styles.metricsStrip}>
        <View style={styles.metricsLeft}>
          <View style={styles.metricPill}>
            <Text style={styles.metricValue}>{writingStats.wordCount}</Text>
            <Text style={styles.metricLabel}>words</Text>
          </View>
          <Text style={styles.metricDot}>•</Text>
          <Text style={styles.metricSubtext}>
            {writingStats.readingTimeMin > 0
              ? `~${writingStats.readingTimeMin} min read`
              : '0 min read'}
          </Text>
          {draftStatus ? (
            <>
              <Text style={styles.metricDot}>•</Text>
              <Text style={styles.draftBadgeText}>{draftStatus}</Text>
            </>
          ) : null}
        </View>

        <View style={styles.metricsRight}>
          <TouchableOpacity
            style={styles.utilityIconBtn}
            onPress={() => setFindModalVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Find and replace">
            <IonIcon name="search-outline" size={17} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.utilityIconBtn,
              focusMode && styles.utilityIconBtnActive,
            ]}
            onPress={() => setFocusMode(prev => !prev)}
            accessibilityRole="button"
            accessibilityLabel="Toggle focus mode">
            <IonIcon
              name={focusMode ? 'contract-outline' : 'expand-outline'}
              size={17}
              color={focusMode ? '#000A60' : '#374151'}
            />
          </TouchableOpacity>

          {article.trim().length > 0 && (
            <TouchableOpacity
              style={styles.utilityIconBtn}
              onPress={handleClearEditor}
              accessibilityRole="button"
              accessibilityLabel="Clear editor">
              <IonIcon name="trash-outline" size={17} color="#DC2626" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* VISUAL EDITOR VIEW (Kept mounted to preserve cursor and WebView state) */}
      <ScrollView
        style={[
          styles.container,
          {paddingBottom: insets.bottom},
          activeTab !== 'editor' && styles.hiddenScene,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {!focusMode && (
          <>
            {/* Writing Helper Text & HTML Upload Shortcut */}
            <View style={styles.helperBar}>
              <Text style={styles.helperText} numberOfLines={1}>
                {title ? `Writing: ${title}` : 'Compose or upload .html'}
              </Text>
              <TouchableOpacity
                style={styles.uploadHtmlChip}
                onPress={handleUploadHtmlFile}
                accessibilityRole="button"
                accessibilityLabel="Upload HTML file">
                <IonIcon name="code-slash-outline" size={15} color="#FFFFFF" />
                <Text style={styles.uploadHtmlChipText}>Upload HTML</Text>
              </TouchableOpacity>
            </View>

            {/* Quick-Insert Medical & Formatting Blocks Bar */}
            <View style={styles.snippetSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.snippetScrollContent}
                keyboardShouldPersistTaps="handled">
                {QUICK_SNIPPETS.map(snippet => (
                  <TouchableOpacity
                    key={snippet.id}
                    style={styles.snippetChip}
                    onPress={() => handleInsertSnippet(snippet)}
                    accessibilityRole="button"
                    accessibilityLabel={`Insert ${snippet.label}`}>
                    <IonIcon
                      name={snippet.icon as any}
                      size={14}
                      color="#000A60"
                    />
                    <Text style={styles.snippetChipText}>{snippet.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}

        <RichToolbar
          style={styles.richBar}
          editor={RichText}
          disabled={false}
          iconTint={'#FFFFFF'}
          selectedIconTint={'#FCD34D'}
          disabledIconTint={'#9CA3AF'}
          onPressAddImage={onPressAddImage}
          onInsertLink={handleOpenLinkModal}
          iconSize={26}
          actions={[
            actions.undo,
            actions.redo,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.heading1,
            actions.heading2,
            actions.heading3,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.insertLink,
            actions.insertImage,
          ]}
          iconMap={{
            [actions.setStrikethrough]: ({tintColor}: {tintColor: string}) => (
              <FontAwesome name="strikethrough" color={tintColor} size={22} />
            ),
            [actions.alignLeft]: ({tintColor}: {tintColor: string}) => (
              <Feather name="align-left" color={tintColor} size={24} />
            ),
            [actions.alignCenter]: ({tintColor}: {tintColor: string}) => (
              <Feather name="align-center" color={tintColor} size={24} />
            ),
            [actions.alignRight]: ({tintColor}: {tintColor: string}) => (
              <Feather name="align-right" color={tintColor} size={24} />
            ),
            [actions.undo]: ({tintColor}: {tintColor: string}) => (
              <IonIcon name="arrow-undo" color={tintColor} size={24} />
            ),
            [actions.redo]: ({tintColor}: {tintColor: any}) => (
              <IonIcon name="arrow-redo" color={tintColor} size={24} />
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
              <Entypo name="image" color={tintColor} size={24} />
            ),
            [actions.blockquote]: ({tintColor}: {tintColor: string}) => (
              <Entypo name="quote" color={tintColor} size={24} />
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
            'Start writing your article here, or tap "Article Outline" above for a structured template...'
          }
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

        {/* Character Count & Readiness Status */}
        <View style={styles.statusFooterCard}>
          <View style={styles.readinessBadge}>
            <IonIcon
              name={
                writingStats.isReady
                  ? 'checkmark-circle'
                  : 'information-circle-outline'
              }
              size={16}
              color={writingStats.isReady ? '#059669' : '#D97706'}
            />
            <Text
              style={[
                styles.readinessText,
                {color: writingStats.isReady ? '#059669' : '#D97706'},
              ]}>
              {writingStats.isReady
                ? 'Ready for Preview & Grammar Check'
                : `${Math.max(0, 21 - writingStats.charCount)} more characters needed`}
            </Text>
          </View>
          <Text style={styles.characterCount}>
            {writingStats.charCount} characters
          </Text>
        </View>

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

      {/* RAW HTML SOURCE EDITOR TAB */}
      {activeTab === 'html' && (
        <ScrollView
          style={[styles.container, {paddingBottom: insets.bottom}]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.htmlSourceHeader}>
            <View style={{flex: 1}}>
              <Text style={styles.htmlSourceTitle}>HTML Source Editor</Text>
              <Text style={styles.htmlSourceSubtitle}>
                Edit raw HTML tags directly. Changes sync automatically with the
                Visual Editor.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.uploadHtmlChip}
              onPress={handleUploadHtmlFile}
              accessibilityRole="button"
              accessibilityLabel="Import HTML file">
              <IonIcon name="folder-open-outline" size={15} color="#FFFFFF" />
              <Text style={styles.uploadHtmlChipText}>Import .html</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.htmlCodeInput}
            multiline
            value={article}
            onChangeText={setArticle}
            placeholder="<h2>Your HTML Heading</h2><p>Write or paste raw HTML here...</p>"
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="HTML Source Code Input"
          />

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
      )}

      {/* LIVE PREVIEW TAB */}
      {activeTab === 'preview' && (
        <ScrollView
          style={styles.previewContainer}
          showsVerticalScrollIndicator={true}>
          <View style={styles.previewContent}>
            <Text style={styles.previewTitle}>
              {title || 'Article Preview'}
            </Text>
            {description ? (
              <Text style={styles.previewDescription}>{description}</Text>
            ) : null}

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
      )}

      {/* INSERT HYPERLINK MODAL */}
      <Modal
        visible={linkModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLinkModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Insert Hyperlink</Text>
            <Text style={styles.modalSubtitle}>
              Add a reference or external clinical source link.
            </Text>

            <Text style={styles.modalFieldLabel}>Link Text</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. WHO Clinical Guidelines"
              placeholderTextColor="#9CA3AF"
              value={linkTitle}
              onChangeText={setLinkTitle}
            />

            <Text style={styles.modalFieldLabel}>URL</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="https://www.who.int/..."
              placeholderTextColor="#9CA3AF"
              value={linkUrl}
              onChangeText={setLinkUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setLinkModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleConfirmInsertLink}>
                <Text style={styles.modalConfirmText}>Insert Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FIND & REPLACE MODAL */}
      <Modal
        visible={findModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFindModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Find & Replace</Text>
            <Text style={styles.modalSubtitle}>
              Quickly replace words or phrases across your article.
            </Text>

            <Text style={styles.modalFieldLabel}>Find word or phrase</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Text to find..."
              placeholderTextColor="#9CA3AF"
              value={findText}
              onChangeText={setFindText}
            />

            <Text style={styles.modalFieldLabel}>Replace with</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Replacement text..."
              placeholderTextColor="#9CA3AF"
              value={replaceText}
              onChangeText={setReplaceText}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setFindModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleConfirmFindReplace}>
                <Text style={styles.modalConfirmText}>Replace All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  hiddenScene: {
    display: 'none',
  },
  metricsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  metricsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metricValue: {
    fontSize: EDITOR_TYPOGRAPHY.badge.fontSize + 1, // 13px
    fontWeight: EDITOR_TYPOGRAPHY.badge.fontWeight,
    color: '#000A60',
  },
  metricLabel: {
    fontSize: EDITOR_TYPOGRAPHY.caption.fontSize, // 13px
    color: '#4B5563',
  },
  metricDot: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  metricSubtext: {
    fontSize: EDITOR_TYPOGRAPHY.caption.fontSize, // 13px
    fontWeight: '600',
    color: '#374151',
  },
  draftBadgeText: {
    fontSize: EDITOR_TYPOGRAPHY.badge.fontSize, // 12px
    fontWeight: EDITOR_TYPOGRAPHY.badge.fontWeight,
    color: '#059669',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  metricsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  utilityIconBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  utilityIconBtnActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#000A60',
  },
  helperBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  helperText: {
    flex: 1,
    fontSize: EDITOR_TYPOGRAPHY.sectionSubtitle.fontSize + 1, // 15px
    lineHeight: EDITOR_TYPOGRAPHY.sectionSubtitle.lineHeight + 1,
    color: '#374151',
    fontWeight: '600',
    marginRight: 8,
  },
  uploadHtmlChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#000A60',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadHtmlChipText: {
    color: '#FFFFFF',
    fontSize: EDITOR_TYPOGRAPHY.buttonSmall.fontSize, // 13px
    fontWeight: EDITOR_TYPOGRAPHY.buttonSmall.fontWeight,
  },
  snippetSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  snippetScrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  snippetChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  snippetChipText: {
    fontSize: EDITOR_TYPOGRAPHY.caption.fontSize, // 13px
    fontWeight: '600',
    color: '#000A60',
  },
  editor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 8,
    marginTop: 6,
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
    paddingVertical: 14,
    fontSize: EDITOR_TYPOGRAPHY.bodyLarge.fontSize, // 17px
    lineHeight: EDITOR_TYPOGRAPHY.bodyLarge.lineHeight, // 26px
  },
  richBar: {
    height: 52,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 4,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headingIcon: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  statusFooterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  readinessBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readinessText: {
    fontSize: EDITOR_TYPOGRAPHY.caption.fontSize + 0.5, // ~13.5px
    fontWeight: '600',
  },
  characterCount: {
    fontSize: EDITOR_TYPOGRAPHY.caption.fontSize + 0.5, // ~13.5px
    color: '#4B5563',
    fontWeight: '600',
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#000A60',
    marginHorizontal: 12,
    marginTop: 14,
    marginBottom: 26,
    paddingVertical: 15,
    borderRadius: 12,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: EDITOR_TYPOGRAPHY.button.fontSize, // 17px
    fontWeight: EDITOR_TYPOGRAPHY.button.fontWeight,
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
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomColor: PRIMARY_COLOR,
  },
  tabLabel: {
    fontSize: EDITOR_TYPOGRAPHY.tabLabel.fontSize, // 15px
    fontWeight: EDITOR_TYPOGRAPHY.tabLabel.fontWeight,
    color: '#6B7280',
  },
  tabLabelActive: {
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
  htmlSourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  htmlSourceTitle: {
    fontSize: EDITOR_TYPOGRAPHY.sectionTitle.fontSize, // 17px
    fontWeight: EDITOR_TYPOGRAPHY.sectionTitle.fontWeight,
    color: '#111827',
  },
  htmlSourceSubtitle: {
    fontSize: EDITOR_TYPOGRAPHY.sectionSubtitle.fontSize, // 14px
    lineHeight: EDITOR_TYPOGRAPHY.sectionSubtitle.lineHeight,
    color: '#4B5563',
    marginTop: 3,
  },
  htmlCodeInput: {
    minHeight: 520,
    backgroundColor: '#111827',
    color: '#F9FAFB',
    fontFamily: 'monospace',
    fontSize: EDITOR_TYPOGRAPHY.code.fontSize, // 14px
    lineHeight: EDITOR_TYPOGRAPHY.code.lineHeight, // 22px
    padding: 16,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
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
    fontSize: EDITOR_TYPOGRAPHY.screenTitle.fontSize + 2, // 24px
    lineHeight: 32,
    fontWeight: EDITOR_TYPOGRAPHY.screenTitle.fontWeight,
    color: '#111827',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: EDITOR_TYPOGRAPHY.body.fontSize, // 16px
    lineHeight: EDITOR_TYPOGRAPHY.body.lineHeight, // 26px
    color: '#4B5563',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  webView: {
    marginTop: 12,
  },
  emptyPreview: {
    fontSize: EDITOR_TYPOGRAPHY.bodyLarge.fontSize, // 17px
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 32,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  modalTitle: {
    fontSize: EDITOR_TYPOGRAPHY.h3.fontSize + 1, // 19px
    fontWeight: '700',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: EDITOR_TYPOGRAPHY.sectionSubtitle.fontSize, // 14px
    lineHeight: 20,
    color: '#4B5563',
    marginTop: 4,
    marginBottom: 14,
  },
  modalFieldLabel: {
    fontSize: EDITOR_TYPOGRAPHY.sectionSubtitle.fontSize, // 14px
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontSize: EDITOR_TYPOGRAPHY.input.fontSize, // 15px
    lineHeight: 22,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  modalCancelText: {
    fontSize: EDITOR_TYPOGRAPHY.input.fontSize, // 15px
    fontWeight: '600',
    color: '#4B5563',
  },
  modalConfirmBtn: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 8,
    backgroundColor: '#000A60',
  },
  modalConfirmText: {
    fontSize: EDITOR_TYPOGRAPHY.input.fontSize, // 15px
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
