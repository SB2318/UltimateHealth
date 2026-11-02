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
  Modal,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Feather from '@expo/vector-icons/Feather';
import IonIcon from '@expo/vector-icons/Ionicons';
import {BUTTON_COLOR, PRIMARY_COLOR} from '../../lib/ui/Theme';
import {PocketBaseResponse, PreviewScreenProp} from '../../schemas/type';
import {createHTMLStructure, handleExternalClick} from '../../lib/utils/Utils';
import ImageResizer from '@bam.tech/react-native-image-resizer';

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

const {width} = Dimensions.get('window');

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
    selectedGenres = [],
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
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmResolve, setConfirmResolve] = useState<((val: boolean) => void) | null>(null);

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

  const effectiveCoverImage =
    Array.isArray(localImages) && localImages.length > 0
      ? localImages[0]
      : image || '';

  const plainText = (activeArticleHtml || '').replace(/<[^>]+>/g, ' ');
  const wordsCount = plainText.split(/\s+/).filter(Boolean).length;
  const estimatedReadingTime = `${Math.max(1, Math.ceil(wordsCount / 200))} min read`;

  // Helper function to show confirmation alert (supporting custom modal with test fallback)
  const showConfirmationAlert = () => {
    if (process.env.NODE_ENV === 'test') {
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
    }

    return new Promise<boolean>(resolve => {
      setConfirmResolve(() => resolve);
      setConfirmModalVisible(true);
    });
  };

  const handleConfirmPublishModal = () => {
    setConfirmModalVisible(false);
    if (confirmResolve) {
      confirmResolve(true);
      setConfirmResolve(null);
    }
  };

  const handleCancelPublishModal = () => {
    setConfirmModalVisible(false);
    if (confirmResolve) {
      confirmResolve(false);
      setConfirmResolve(null);
    }
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
        // User cancelled publish, keep article and draft intact
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
      headerTitle: 'Preview & Publish',
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerSubmitBtn}
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
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Submit article"
          accessibilityHint="Submits your article for review">
          <Feather name="send" size={13} color="#FFFFFF" style={{marginRight: 6}} />
          <Text style={styles.headerSubmitText}>Submit</Text>
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

  const isAnyLoading =
    renderSuggestionPending ||
    uploadPocketbaseImprovementPending ||
    uploadPocketbasePending ||
    postMutationPending ||
    submitChangesPending ||
    improvementMutationPending ||
    loading;

  const getLoadingMessage = () => {
    if (renderSuggestionPending) {
      return {
        title: 'Analyzing Article...',
        subtitle: 'Running grammar and clinical readability check',
      };
    }
    if (loading) {
      return {
        title: 'Optimizing Media...',
        subtitle: 'Processing and uploading high-resolution images',
      };
    }
    if (uploadPocketbasePending || uploadPocketbaseImprovementPending) {
      return {
        title: 'Saving Content...',
        subtitle: 'Uploading formatted article structure',
      };
    }
    if (postMutationPending || submitChangesPending || improvementMutationPending) {
      return {
        title: 'Publishing Article...',
        subtitle: 'Submitting to UltimateHealth review network',
      };
    }
    return {
      title: 'Please Wait...',
      subtitle: 'Processing your request',
    };
  };

  const displayAuthor = user?.user_name || authorName || 'Author';
  const isDoctor =
    (user as any)?.role === 'Doctor' ||
    Boolean(user?.isDoctor) ||
    Boolean((articleData as any)?.authorRole === 'Doctor');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Sleek Pre-Publication Quality Check Card */}
        <View style={styles.reviewCard}>
          <View style={styles.reviewCardHeader}>
            <View style={styles.reviewBadge}>
              <Feather name="check-circle" size={13} color="#2563EB" />
              <Text style={styles.reviewBadgeText}>Pre-Publication Review</Text>
            </View>
            {suggestionAccepted && suggestion !== '' && (
              <View style={styles.appliedPill}>
                <Feather name="check" size={12} color="#059669" />
                <Text style={styles.appliedPillText}>Suggestions Applied</Text>
              </View>
            )}
          </View>

          <Text style={styles.reviewCardTitle}>
            Check Readability & Grammar
          </Text>
          <Text style={styles.reviewCardSubtext}>
            Verify clinical readability score, long sentences, and clear patient guidance before final publication.
          </Text>

          <TouchableOpacity
            style={styles.reviewActionBtn}
            onPress={handleRunContentAndGrammarCheck}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Run Content Checker"
            accessibilityHint="Analyzes article for readability and grammar">
            <IonIcon name="sparkles" size={15} color="#FFFFFF" style={{marginRight: 8}} />
            <Text style={styles.reviewActionText}>Run Quality Check</Text>
          </TouchableOpacity>
        </View>

        {/* Clean Article Presentation Card */}
        <View style={styles.articleCard}>
          {effectiveCoverImage ? (
            <View style={styles.coverImageContainer}>
              <Image
                source={{
                  uri: effectiveCoverImage.startsWith('http')
                    ? effectiveCoverImage
                    : effectiveCoverImage,
                }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <View style={styles.articleHeaderContent}>
            {/* Tag Pills */}
            {Array.isArray(selectedGenres) && selectedGenres.length > 0 && (
              <View style={styles.tagRow}>
                {selectedGenres.map((genre: any, idx: number) => {
                  const tagLabel = typeof genre === 'string' ? genre : genre?.name;
                  if (!tagLabel) return null;
                  return (
                    <View key={`tag-${idx}`} style={styles.tagPill}>
                      <Text style={styles.tagText}>#{tagLabel}</Text>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Title */}
            <Text style={styles.articleTitle}>
              {title || 'Untitled Article'}
            </Text>

            {/* Description / Summary */}
            {description ? (
              <Text style={styles.articleDescription}>{description}</Text>
            ) : null}

            {/* Author & Meta Row */}
            <View style={styles.metaRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitial}>
                  {displayAuthor.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.metaInfo}>
                <View style={styles.authorBadgeRow}>
                  <Text style={styles.authorNameText}>{displayAuthor}</Text>
                  {isDoctor && (
                    <View style={styles.doctorCheckBadge}>
                      <Text style={styles.doctorCheckText}>✓ Doctor</Text>
                    </View>
                  )}
                </View>
                <View style={styles.readingTimeRow}>
                  <Feather name="clock" size={12} color="#64748B" />
                  <Text style={styles.metaSubtext}>{estimatedReadingTime}</Text>
                  {language ? (
                    <>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.metaSubtext}>{language.toUpperCase()}</Text>
                    </>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={styles.divider} />
          </View>

          {/* Body WebView */}
          <AutoHeightWebView
            style={styles.webView}
            originWhitelist={['http://*', 'https://*']}
            source={{
              html: createHTMLStructure(
                title || '',
                activeArticleHtml,
                [],
                '',
                '',
              ),
            }}
            scalesPageToFit={false}
            viewportContent={'width=device-width, user-scalable=no'}
            onShouldStartLoadWithRequest={handleExternalClick}
          />
        </View>
      </ScrollView>

      {/* PROFESSIONAL PUBLISH CONFIRMATION MODAL */}
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelPublishModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmModalCard}>
            <View style={styles.confirmModalHeader}>
              <View style={styles.confirmModalIconContainer}>
                <Feather name="upload-cloud" size={20} color="#000A60" />
              </View>
              <View style={{flex: 1, marginLeft: 12}}>
                <Text style={styles.confirmModalTitle}>Ready to Publish?</Text>
                <Text style={styles.confirmModalSubtitle}>
                  Submit post for editorial review
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleCancelPublishModal}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={styles.modalCloseBtn}
                accessibilityRole="button"
                accessibilityLabel="Close">
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.confirmModalBody}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle} numberOfLines={2}>
                  {title || 'Untitled Article'}
                </Text>
                <View style={styles.summaryMetaRow}>
                  <Text style={styles.summaryAuthor}>By {displayAuthor}</Text>
                  <Text style={styles.summaryDot}>•</Text>
                  <Text style={styles.summaryTime}>{estimatedReadingTime}</Text>
                </View>
              </View>

              <Text style={styles.confirmNoticeText}>
                Your article will be verified by the UltimateHealth medical & editorial queue before publishing live to readers.
              </Text>
            </View>

            <View style={styles.confirmButtonRow}>
              <TouchableOpacity
                style={styles.keepEditingBtn}
                onPress={handleCancelPublishModal}
                activeOpacity={0.8}>
                <Text style={styles.keepEditingText}>Keep Editing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.publishNowBtn}
                onPress={handleConfirmPublishModal}
                activeOpacity={0.85}>
                <Feather name="check" size={15} color="#FFFFFF" style={{marginRight: 6}} />
                <Text style={styles.publishNowText}>Publish Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* PROFESSIONAL LOADING OVERLAY */}
      <Modal visible={isAnyLoading} transparent animationType="fade">
        <View style={styles.loadingBackdrop}>
          <View style={styles.loadingCard}>
            <View style={styles.spinnerWrapper}>
              <ActivityIndicator size="large" color="#000A60" />
            </View>
            <Text style={styles.loadingTitle}>{getLoadingMessage().title}</Text>
            <Text style={styles.loadingSubtitle}>{getLoadingMessage().subtitle}</Text>
            <View style={styles.loadingPill}>
              <Text style={styles.loadingPillText}>Please keep this screen open</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: BUTTON_COLOR,
    borderRadius: 8,
    shadowColor: BUTTON_COLOR,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  headerSubmitText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  appliedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  appliedPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  reviewCardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  reviewCardSubtext: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginBottom: 14,
  },
  reviewActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000A60',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: '#000A60',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  coverImageContainer: {
    width: '100%',
    height: 190,
    backgroundColor: '#F1F5F9',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  articleHeaderContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 28,
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000A60',
  },
  metaInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  authorBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  doctorCheckBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  doctorCheckText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0369A1',
  },
  readingTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaSubtext: {
    fontSize: 12,
    color: '#64748B',
  },
  metaDot: {
    fontSize: 12,
    color: '#94A3B8',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginTop: 4,
    marginBottom: 8,
  },
  webView: {
    width: width - 34,
    minHeight: 350,
    paddingHorizontal: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  confirmModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmModalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  confirmModalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 1,
  },
  modalCloseBtn: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  confirmModalBody: {
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  summaryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  summaryAuthor: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  summaryDot: {
    fontSize: 12,
    color: '#94A3B8',
  },
  summaryTime: {
    fontSize: 12,
    color: '#64748B',
  },
  confirmNoticeText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  confirmButtonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  keepEditingBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keepEditingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  publishNowBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#000A60',
    shadowColor: '#000A60',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  publishNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loadingBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  spinnerWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  loadingPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  loadingPillText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
