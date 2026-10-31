/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars */
import React, {useCallback, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {BUTTON_COLOR} from '../../lib/ui/Theme';
import {PocketBaseResponse, PreviewScreenProp} from '../../schemas/type';
import {createHTMLStructure, handleExternalClick} from '../../lib/utils/Utils';
import ImageResizer from '@bam.tech/react-native-image-resizer';

import Loader from '../../components/common/Loader';
import {GET_IMAGE} from '../../lib/api/APIUtils';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import useUploadImage from '../../hooks/media/useUploadImage';
import {setSuggestion} from '../../store/dataSlice';
import Snackbar from 'react-native-snackbar';
import AutoHeightWebView from '@brown-bear/react-native-autoheight-webview';
import {useGetProfile} from '@/src/hooks/profile/useGetProfile';
import {usePostArticleData} from '@/src/hooks/article/usePostArticle';
import {useSubmitImprovement} from '@/src/hooks/improvement/useSubmitImprovement';
import {useSubmitSuggestedChanges} from '@/src/hooks/article/useSubmitSuggestedChanges';
import {useUploadArticleToPocketbase} from '@/src/hooks/article/useUploadArticlePocketbase';
import {useUploadImprovementToPocketbase} from '@/src/hooks/improvement/useUploadImprovementToPocketbase';
import {useRenderSuggestion} from '@/src/hooks/ai/useRenderSuggestion';
import {useDeletePocketbaseRecord} from '@/src/hooks/common/useDeletePocketbaseRecord';

const COMMON_GRAMMAR_FIXES: Array<[RegExp, string]> = [
  [/\bteh\b/gi, 'the'],
  [/\brecieve\b/gi, 'receive'],
  [/\boccured\b/gi, 'occurred'],
  [/\bdefinately\b/gi, 'definitely'],
  [/\bseperate\b/gi, 'separate'],
  [/\bneccessary\b/gi, 'necessary'],
  [/\baccomodate\b/gi, 'accommodate'],
  [/\bdont\b/gi, "don't"],
  [/\bcant\b/gi, "can't"],
  [/\bwont\b/gi, "won't"],
  [/\bim\b/gi, "I'm"],
  [/\bi\b/g, 'I'],
];

const countSyllables = (word: string): number => {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleaned) return 1;
  if (cleaned.length <= 3) return 1;
  const withoutSilentE = cleaned.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  const vowelGroups = withoutSilentE.replace(/^y/, '').match(/[aeiouy]{1,2}/g);
  return Math.max(1, vowelGroups ? vowelGroups.length : 1);
};

/**
 * Fallback Content Checker & Grammar Suggestion engine when the remote
 * content-intel service is unreachable or returns an incomplete response.
 */
export const buildFallbackContentAnalysis = (rawHtml: string) => {
  const safeHtml = rawHtml || '';
  const plainText = safeHtml
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];
  const wordCount = Math.max(1, words.length);
  const sentences = plainText
    ? plainText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean)
    : [];
  const sentenceCount = Math.max(1, sentences.length);
  const syllableCount = words.reduce((acc, w) => acc + countSyllables(w), 0);

  // Flesch Reading Ease formula: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
  const rawScore =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / wordCount);
  const readability_score = Math.max(
    10,
    Math.min(100, Math.round(Number.isFinite(rawScore) ? rawScore : 72)),
  );
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  const reading_time = `${minutes} min read`;

  // Apply non-destructive grammar & whitespace cleanup to text nodes (outside HTML tags)
  const applyTextTransform = (
    html: string,
    transformFn: (textSegment: string) => string,
  ): string => {
    return html
      .split(/(<[^>]+>)/g)
      .map(segment => {
        if (segment.startsWith('<') && segment.endsWith('>')) {
          return segment;
        }
        return transformFn(segment);
      })
      .join('');
  };

  const cleanedSuggestion = applyTextTransform(safeHtml, segment => {
    let updated = segment.replace(/[ \t]{2,}/g, ' ');
    for (const [pattern, replacement] of COMMON_GRAMMAR_FIXES) {
      updated = updated.replace(pattern, replacement);
    }
    return updated;
  });

  // Highlight complex sentences (> 25 words) for RenderSuggestion WebView
  const highlightedHtml = applyTextTransform(cleanedSuggestion, segment => {
    return segment.replace(/[^.!?]+[.!?]+/g, sentence => {
      const count = sentence.trim().split(/\s+/).filter(Boolean).length;
      if (count > 25) {
        return `<span class="complex-sentence">${sentence}</span>`;
      }
      return sentence;
    });
  });

  return {
    readability_score,
    reading_time,
    full_html: highlightedHtml || cleanedSuggestion,
    suggestion: cleanedSuggestion,
  };
};

export default function PreviewScreen({navigation, route}: PreviewScreenProp) {
  const {
    article,
    title,
    description,
    authorName,
    selectedGenres,
    localImages = [],
    image,
    articleData,
    requestId,
    language,
    pb_record_id,
    translationSource,
  } = route.params;

  const [imageUtil, setImageUtil] = useState<string>('');
  const [imageUtils, setImageUtils] = useState<string[]>([]);

  const {user_token, user_id} = useAppSelector((state: any) => state.user);
  const {suggestion, suggestionAccepted} = useAppSelector(
    (state: any) => state.data,
  );

  const {isConnected} = useAppSelector((state: any) => state.network);
  const dispatch = useAppDispatch();

  const {mutate: postMutation, isPending: postMutationPending} =
    usePostArticleData();
  const {mutate: improvementMutation, isPending: improvementMutationPending} =
    useSubmitImprovement();

  const {mutate: submitChangesMutation, isPending: submitChangesPending} =
    useSubmitSuggestedChanges();

  const {mutate: uploadPocketbase, isPending: uploadPocketbasePending} =
    useUploadArticleToPocketbase();
  const {
    mutate: uploadImprovementToPocketbase,
    isPending: uploadPocketbaseImprovementPending,
  } = useUploadImprovementToPocketbase();

  const {mutate: renderAISuggestion, isPending: renderSuggestionPending} =
    useRenderSuggestion();

  const {mutate: deletePocketbaseRecord} = useDeletePocketbaseRecord();

  const {uploadImage, loading} = useUploadImage();

  const {data: user} = useGetProfile();

  const activeArticleHtml =
    suggestionAccepted && suggestion && suggestion !== ''
      ? suggestion
      : article;

  // Helper function to show confirmation alert
  const showConfirmationAlert = () => {
    return new Promise<boolean>(resolve => {
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
  const resizeImage = async (localImage: string) => {
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
      return undefined;
    }
  };

  const handlePostSubmit = useCallback(async () => {
    let finalArticle =
      suggestionAccepted && suggestion && suggestion !== ''
        ? suggestion
        : article;
    let coverImageUtil = '';

    try {
      const confirmation = await showConfirmationAlert();
      if (!confirmation) {
        Alert.alert('Post discarded');
        AsyncStorage.multiRemove([
          '@article_description_draft',
          '@article_editor_body_draft',
        ]).catch(() => {});
        navigation.navigate('TabNavigation');
        return;
      }

      const resultImages: string[] = [];
      const effectiveLocalImages =
        Array.isArray(localImages) && localImages.length > 0
          ? localImages
          : image
            ? [image]
            : [];

      // Process each local image
      for (let i = 0; i < effectiveLocalImages.length; i++) {
        const localImage = effectiveLocalImages[i];
        if (!localImage) continue;

        let uploadedUrl: string | undefined;

        if (
          localImage.includes('api/getfile') ||
          localImage.startsWith('http://') ||
          localImage.startsWith('https://')
        ) {
          uploadedUrl = localImage;
        } else {
          const resizedImageUri = await resizeImage(localImage);
          const sourceUri = resizedImageUri?.uri || localImage;
          uploadedUrl = await uploadImage(sourceUri);
        }

        const resolvedUrl = uploadedUrl
          ? uploadedUrl.includes('api/getfile') ||
            uploadedUrl.startsWith('http://') ||
            uploadedUrl.startsWith('https://')
            ? uploadedUrl
            : `${GET_IMAGE}/${uploadedUrl}`
          : localImage;

        if (i === 0 && coverImageUtil.length === 0) {
          coverImageUtil = resolvedUrl;
        } else {
          resultImages.push(resolvedUrl);
          finalArticle = finalArticle.replace(localImage, resolvedUrl);
        }
      }

      const finalImageUtils = coverImageUtil
        ? [coverImageUtil, ...resultImages]
        : resultImages;
      setImageUtils(finalImageUtils);

      // Submit Improvement
      if (requestId) {
        uploadImprovementToPocketbase(
          {
            title: title,
            htmlContent: finalArticle,
            article_id: articleData ? articleData.pb_recordId : null,
            record_id: pb_record_id ?? null,
            improvement_id: requestId,
            user_id: user_id,
          },
          {
            onSuccess: (data: PocketBaseResponse) => {
              if (data.html_file) {
                improvementMutation(
                  {
                    edited_content: data.html_file,
                    recordId: data.recordId,
                    requestId: requestId ?? '',
                    imageUtils: finalImageUtils,
                  },
                  {
                    onSuccess: _result => {
                      Snackbar.show({
                        text: 'Changes submitted for review',
                        duration: Snackbar.LENGTH_SHORT,
                      });

                      AsyncStorage.multiRemove([
                        '@article_description_draft',
                        '@article_editor_body_draft',
                      ]).catch(() => {});
                      navigation.navigate('TabNavigation');
                    },
                    onError: error => {
                      console.log('Article post Error', error);

                      deletePocketbaseRecord(
                        {
                          recordId: data.recordId,
                          collectionName: 'edit_requests',
                        },
                        {
                          onError: cleanupErr => {
                            console.warn(
                              'PocketBase orphan cleanup failed for recordId:',
                              data.recordId,
                              cleanupErr,
                            );
                          },
                        },
                      );

                      Alert.alert('Error', 'Failed to upload your post');
                    },
                  },
                );
              } else {
                Alert.alert('Failed to upload your post');
              }
            },
            onError: error => {
              console.log('Article post Error', error);
              Alert.alert('Failed to upload your post');
            },
          },
        );
      } else {
        // Submit new article or suggested changes
        setImageUtil(coverImageUtil);
        uploadPocketbase(
          {
            title: title,
            htmlContent: finalArticle,
            articleData: articleData,
          },
          {
            onSuccess: (data: PocketBaseResponse) => {
              if (data.html_file) {
                if (articleData) {
                  submitChangesMutation(
                    {
                      article: data.html_file,
                      title: title,
                      userId: articleData
                        ? typeof articleData.authorId === 'string'
                          ? articleData.authorId
                          : articleData.authorId._id
                        : '',
                      authorName: authorName,
                      articleId: articleData?._id,
                      tags: selectedGenres,
                      imageUtils: finalImageUtils,
                      description: description,
                    },
                    {
                      onSuccess: _result => {
                        Snackbar.show({
                          text: 'Article submitted for review',
                          duration: Snackbar.LENGTH_SHORT,
                        });

                        AsyncStorage.multiRemove([
                          '@article_description_draft',
                          '@article_editor_body_draft',
                        ]).catch(() => {});
                        navigation.navigate('TabNavigation');
                      },
                      onError: error => {
                        console.log('Article post Error', error);

                        deletePocketbaseRecord(
                          {
                            recordId: data.recordId,
                            collectionName: 'content',
                          },
                          {
                            onError: cleanupErr => {
                              console.warn(
                                'PocketBase orphan cleanup failed for recordId:',
                                data.recordId,
                                cleanupErr,
                              );
                            },
                          },
                        );

                        Alert.alert('Failed to upload your post');
                      },
                    },
                  );
                } else {
                  postMutation(
                    {
                      title: title,
                      authorName: authorName,
                      authorId: user?._id ?? user_id ?? '',
                      content: data.html_file,
                      tags: selectedGenres,
                      imageUtils: finalImageUtils,
                      description: description,
                      pb_recordId: data.recordId,
                      allow_podcast: true,
                      language: language,
                      isTranslation: Boolean(translationSource),
                      sourceArticleId: translationSource?.sourceArticleId,
                      sourceArticleRecordId:
                        translationSource?.sourceArticleRecordId,
                      sourceLanguage: translationSource?.sourceLanguage,
                      targetLanguage: language,
                      translationOf: translationSource?.sourceArticleId,
                    },
                    {
                      onSuccess: () => {
                        Snackbar.show({
                          text: translationSource
                            ? 'Translation submitted successfully'
                            : 'Article added successfully',
                          duration: Snackbar.LENGTH_SHORT,
                        });

                        AsyncStorage.multiRemove([
                          '@article_description_draft',
                          '@article_editor_body_draft',
                        ]).catch(() => {});
                        navigation.navigate('TabNavigation');
                      },

                      onError: error => {
                        console.log('Article post Error', error);

                        deletePocketbaseRecord(
                          {
                            recordId: data.recordId,
                            collectionName: 'content',
                          },
                          {
                            onError: cleanupErr => {
                              console.warn(
                                'PocketBase orphan cleanup failed for recordId:',
                                data.recordId,
                                cleanupErr,
                              );
                            },
                          },
                        );

                        Snackbar.show({
                          text: 'Failed to upload your post',
                          duration: Snackbar.LENGTH_SHORT,
                        });
                      },
                    },
                  );
                }
              } else {
                Snackbar.show({
                  text: 'Failed to upload your post',
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            },
            onError: error => {
              console.log('Article post Error pb', error.message);
              Alert.alert('Failed to upload your post');
            },
          },
        );
      }
    } catch (err) {
      console.error('Image processing failed:', err);
      Alert.alert('Error', 'Could not process the images.');
    }
  }, [
    suggestionAccepted,
    suggestion,
    article,
    localImages,
    image,
    requestId,
    title,
    articleData,
    pb_record_id,
    user_id,
    authorName,
    selectedGenres,
    description,
    user,
    language,
    translationSource,
    navigation,
  ]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isConnected) {
              handlePostSubmit();
            } else {
              Snackbar.show({
                text: 'Please check your internet connection',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Submit article"
          accessibilityHint="Submits your article for review">
          <Text style={styles.textWhite}>Submit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isConnected, handlePostSubmit]);

  const openFallbackSuggestions = () => {
    const fallback = buildFallbackContentAnalysis(activeArticleHtml);
    dispatch(setSuggestion({suggestion: fallback.suggestion}));
    Snackbar.show({
      text: 'Using built-in Content & Grammar Checker fallback',
      duration: Snackbar.LENGTH_SHORT,
    });
    navigation.navigate('RenderSuggestion', {
      htmlContent: fallback.full_html,
      readability_score: fallback.readability_score,
      reading_time: fallback.reading_time,
      isFallback: true,
    });
  };

  const handleRunContentAndGrammarCheck = () => {
    if (!isConnected) {
      openFallbackSuggestions();
      return;
    }

    renderAISuggestion(
      {
        text: activeArticleHtml,
      },
      {
        onSuccess: data => {
          const suggestionHtml = data?.full_html ?? data?.suggested_html;

          if (suggestionHtml) {
            dispatch(
              setSuggestion({
                suggestion: data.suggestion || suggestionHtml,
              }),
            );

            navigation.navigate('RenderSuggestion', {
              htmlContent: suggestionHtml,
              readability_score: data.readability_score,
              reading_time: data.reading_time,
              isFallback: false,
            });
          } else {
            openFallbackSuggestions();
          }
        },
        onError: error => {
          console.log(
            'Content checker API unavailable, using fallback:',
            error,
          );
          openFallbackSuggestions();
        },
      },
    );
  };

  if (
    renderSuggestionPending ||
    uploadPocketbaseImprovementPending ||
    uploadPocketbasePending ||
    postMutationPending ||
    submitChangesPending ||
    improvementMutationPending ||
    loading
  ) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000A60" />
      {/* AI Content Checker & Grammar Suggestions Card with Built-In Fallback */}
      <View style={styles.aiReviewCard}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>✨</Text>
        </View>
        <Text style={styles.reviewTitle}>Article Ready for Review</Text>
        <Text style={styles.reviewSubtext}>
          Run Content Checker & Grammar Suggestions before submitting (includes
          automatic fallback if AI service is busy)
        </Text>
        {suggestionAccepted && suggestion !== '' && (
          <View style={styles.appliedBadge}>
            <Text style={styles.appliedBadgeText}>
              ✓ Grammar & Readability Suggestions Applied
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleRunContentAndGrammarCheck}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Get AI suggestions"
          accessibilityHint="Analyzes your article for grammar and readability">
          <Text style={styles.continueButtonText}>
            Check Content & Grammar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Preview Label */}
      <View style={styles.previewHeader}>
        <Text style={styles.previewLabel}>Preview</Text>
      </View>

      <View style={styles.articlePreviewContainer}>
        <AutoHeightWebView
          style={styles.webView}
          customStyle={`* { font-family: 'Times New Roman'; } p { font-size: 16px; }`}
          files={[
            {
              href: 'cssfileaddress',
              type: 'text/css',
              rel: 'stylesheet',
            },
          ]}
          originWhitelist={['http://*', 'https://*']}
          source={{
            html: createHTMLStructure(
              title,
              activeArticleHtml,
              selectedGenres,
              '',
              user ? user?.user_name : authorName || '',
            ),
          }}
          scalesPageToFit={true}
          viewportContent={'width=device-width, user-scalable=no'}
          onShouldStartLoadWithRequest={handleExternalClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  textWhite: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
  },
  button: {
    marginRight: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: BUTTON_COLOR,
    borderRadius: 8,
    shadowColor: BUTTON_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  aiReviewCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 28,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  reviewSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  appliedBadge: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 14,
  },
  appliedBadgeText: {
    color: '#047857',
    fontSize: 13,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: BUTTON_COLOR,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    minWidth: 200,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  previewHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  articlePreviewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  webView: {
    width: Dimensions.get('window').width - 32,
  },
});
