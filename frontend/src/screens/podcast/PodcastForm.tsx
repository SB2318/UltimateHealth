 
 
import React, {useState} from 'react';
import { View,
  Text,
  StyleSheet,
   TextInput ,
  TouchableOpacity,
   ScrollView ,
  Image,
  Modal,
   FlatList ,
  Alert,
   } from 'react-native';
import {useAppSelector} from '../../store/hooks';
import {PodcastFormProp, Category, PodcastEpisode} from '../../schemas/type';
import {useGetPodcastEpisodes} from '../../hooks/podcast/useGetPodcastEpisodes';
import {useCreatePodcastEpisode} from '../../hooks/podcast/useCreatePodcastEpisode';
import Ionicon from '@expo/vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {hp} from '../../lib/ui/Metric';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import { ttsLanguageList } from '../../lib/utils/Utils';
import TagSelectorSection, {
  isSameCategory,
} from '../../components/common/TagSelectorSection';
import * as DocumentPicker from 'expo-document-picker';
import Snackbar from 'react-native-snackbar';


const PodcastForm = ({navigation, route}: PodcastFormProp) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<Category[]>([]);
  const [language, setLanguage] = useState('en');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const initialEpisodeId = route.params?.episodeId;
  const {data: episodes = []} = useGetPodcastEpisodes();
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(
    initialEpisodeId || null,
  );
  const [episodeModalVisible, setEpisodeModalVisible] = useState(false);
  const {mutate: createEpisode, isPending: isCreatingEpisode} = useCreatePodcastEpisode();
  const [showNewSeriesForm, setShowNewSeriesForm] = useState(false);
  const [newSeriesName, setNewSeriesName] = useState('');
  const [newSeriesDesc, setNewSeriesDesc] = useState('');
  const [seriesCreateError, setSeriesCreateError] = useState('');
  const {categories} = useAppSelector((state: any) => state.data);
  const [imageUtils, setImageUtils] = useState('');

  // Inline validation error state
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [genresError, setGenresError] = useState('');
  const [imageError, setImageError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isSelected = (genre: Category) =>
    selectedGenres.some(item => isSameCategory(item, genre));

  const handleGenrePress = (genre: Category) => {
    let nextSelected = selectedGenres;
    if (isSelected(genre)) {
      nextSelected = selectedGenres.filter(
        item => !isSameCategory(item, genre),
      );
      setSelectedGenres(nextSelected);
    } else if (selectedGenres.length < 5) {
      nextSelected = [...selectedGenres, genre];
      setSelectedGenres(nextSelected);
    }

    if (submitted) {
      setGenresError(
        nextSelected.length === 0
          ? 'Please select at least one tag for your podcast.'
          : '',
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Podcast title is required.');
      isValid = false;
    } else if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!description.trim()) {
      setDescriptionError('Please provide a description for your podcast.');
      isValid = false;
    } else if (description.trim().length < 10) {
      setDescriptionError('Description must be at least 10 characters.');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (selectedGenres.length === 0) {
      setGenresError('Please select at least one tag for your podcast.');
      isValid = false;
    } else {
      setGenresError('');
    }

    if (!imageUtils) {
      setImageError('Please upload a cover image for your podcast.');
      isValid = false;
    } else {
      setImageError('');
    }

    return isValid;
  };

  const handleCreatePost = () => {
    setSubmitted(true);
    if (!validateForm()) {
      return;
    }

    navigation.navigate('PodcastRecorder', {
      title: title,
      description: description,
      selectedGenres: selectedGenres,
      imageUtils: imageUtils,
      episodeId: selectedEpisodeId || null,
    });
  };

  const handlePickAudio = async () => {
    setSubmitted(true);
    if (!validateForm()) {
      Snackbar.show({
        text: 'Please complete all required fields above first',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedAsset = result.assets[0];
        if (pickedAsset.size && pickedAsset.size > 50 * 1024 * 1024) {
          Alert.alert('File Too Large', 'Audio file must be under 50 MB.');
          return;
        }

        Snackbar.show({
          text: `Selected: ${pickedAsset.name || 'Audio file'}`,
          duration: Snackbar.LENGTH_SHORT,
        });

        navigation.navigate('PodcastPlayer', {
          title: title,
          description: description,
          selectedGenres: selectedGenres,
          imageUtils: imageUtils,
          filePath: pickedAsset.uri,
          episodeId: selectedEpisodeId || null,
        });
      }
    } catch (err) {
      console.warn('Error picking audio file:', err);
      Alert.alert(
        'Error',
        'Could not access the selected audio file. Please try again.',
      );
    }
  };

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
      } else if (response.errorMessage) {
        if (__DEV__) console.log('ImagePicker Error:', response.errorMessage);
      } else if (response.assets) {
        const {uri, fileSize} = response.assets[0];

        if (fileSize && fileSize > 1024 * 1024) {
          Alert.alert('Error', 'File size exceeds 1 MB.');
          return;
        }

        ImageResizer.createResizedImage(uri as any, 1000, 1000, 'JPEG', 80)
          .then(resizedImage => {
            setImageUtils(resizedImage.uri);
          })
          .catch(err => {
            if (__DEV__) console.log('Image resize failed, using original:', err);
            setImageUtils(uri ? uri : '');
          });
      }
    });
  };

  const getLanguageLabel = (value: string) => {
    return ttsLanguageList.find(lang => lang.code === value)?.name || 'English (India)';
  };

  const WarningBox = () => {
    return (
      <View style={styles.warningContainer}>
        <Ionicon
          name="alert-circle"
          size={24}
          color="#D9534F"
          style={{marginRight: 8}}
        />
        <View style={{flex: 1}}>
          <Text style={styles.warningTitle}>
            Important Submission Guidelines
          </Text>
          <Text style={styles.warningText}>
            Please ensure your podcast title, description, and tags are clear,
            relevant, and respectful. Avoid offensive, misleading, or unrelated
            content. Podcasts violating our community guidelines may be rejected
            by our review team.
          </Text>
        </View>
      </View>
    );
  };

  const LanguageSelector = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLanguageModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setLanguageModalVisible(false)}>
                <Ionicon name="close" size={24} color="#222" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={ttsLanguageList}
              keyExtractor={(item: {code: string; name: string}) => item.code}
              renderItem={({item}: {item: {code: string; name: string}}) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    language === item.code && styles.selectedLanguageItem,
                  ]}
                  onPress={() => {
                    setLanguage(item.code);
                    setLanguageModalVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.languageItemText,
                      language === item.code && styles.selectedLanguageItemText,
                    ]}>
                    {item.name}
                  </Text>
                  {language === item.code && (
                    <Ionicon name="checkmark" size={20} color={PRIMARY_COLOR} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const selectedEpisode = episodes.find(
    (ep: PodcastEpisode) => (ep._id || ep.id) === selectedEpisodeId,
  );

  const EpisodeSelector = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={episodeModalVisible}
        onRequestClose={() => {
          setEpisodeModalVisible(false);
          setShowNewSeriesForm(false);
        }}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setEpisodeModalVisible(false);
            setShowNewSeriesForm(false);
          }}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {showNewSeriesForm ? 'New Episode Series' : 'Select Episode Series'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setEpisodeModalVisible(false);
                  setShowNewSeriesForm(false);
                }}>
                <Ionicon name="close" size={24} color="#222" />
              </TouchableOpacity>
            </View>

            {showNewSeriesForm ? (
              <View style={styles.createSeriesContainer}>
                <Text style={styles.createSeriesSubtitle}>
                  Group multiple episodes under a single show or topic for listeners.
                </Text>
                <TextInput
                  placeholder="Series Title (e.g. Daily Health Talks)"
                  placeholderTextColor="#9ca3af"
                  style={styles.seriesInput}
                  value={newSeriesName}
                  onChangeText={text => {
                    setNewSeriesName(text);
                    if (seriesCreateError) setSeriesCreateError('');
                  }}
                  autoFocus
                />
                <TextInput
                  placeholder="Short Description (Optional)"
                  placeholderTextColor="#9ca3af"
                  style={[styles.seriesInput, {height: 60, textAlignVertical: 'top'}]}
                  multiline
                  numberOfLines={2}
                  value={newSeriesDesc}
                  onChangeText={setNewSeriesDesc}
                />
                {seriesCreateError ? (
                  <Text style={styles.errorText}>{seriesCreateError}</Text>
                ) : null}

                <View style={styles.createSeriesActions}>
                  <TouchableOpacity
                    style={styles.cancelSeriesButton}
                    onPress={() => {
                      setShowNewSeriesForm(false);
                      setNewSeriesName('');
                      setNewSeriesDesc('');
                      setSeriesCreateError('');
                    }}>
                    <Text style={styles.cancelSeriesText}>Back to List</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.saveSeriesButton, isCreatingEpisode && {opacity: 0.7}]}
                    disabled={isCreatingEpisode}
                    onPress={() => {
                      if (!newSeriesName.trim()) {
                        setSeriesCreateError('Series title is required');
                        return;
                      }
                      createEpisode(
                        {name: newSeriesName.trim(), description: newSeriesDesc.trim()},
                        {
                          onSuccess: (created: any) => {
                            setSelectedEpisodeId(created._id || created.id);
                            setShowNewSeriesForm(false);
                            setNewSeriesName('');
                            setNewSeriesDesc('');
                            setEpisodeModalVisible(false);
                          },
                          onError: () => {
                            setSeriesCreateError('Failed to create episode series. Try again.');
                          },
                        },
                      );
                    }}>
                    <Text style={styles.saveSeriesText}>
                      {isCreatingEpisode ? 'Creating...' : 'Create & Select'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.addSeriesButton}
                  onPress={() => setShowNewSeriesForm(true)}>
                  <Ionicon name="add-circle" size={20} color="#2563EB" />
                  <Text style={styles.addSeriesButtonText}>+ Create New Episode Series</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    !selectedEpisodeId && styles.selectedLanguageItem,
                  ]}
                  onPress={() => {
                    setSelectedEpisodeId(null);
                    setEpisodeModalVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.languageItemText,
                      !selectedEpisodeId && styles.selectedLanguageItemText,
                    ]}>
                    None (Standalone Podcast)
                  </Text>
                  {!selectedEpisodeId && (
                    <Ionicon name="checkmark" size={20} color="#2563EB" />
                  )}
                </TouchableOpacity>

                {episodes.length === 0 ? (
                  <View style={styles.emptySeriesPrompt}>
                    <Text style={styles.emptySeriesPromptText}>
                      You don't have any series yet. Tap "+ Create New Episode Series" above to organize your podcasts into shows.
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={episodes}
                    keyExtractor={(item: PodcastEpisode) => item._id || item.id || ''}
                    renderItem={({item}: {item: PodcastEpisode}) => {
                      const epId = item._id || item.id;
                      const isItemSel = selectedEpisodeId === epId;
                      return (
                        <TouchableOpacity
                          style={[
                            styles.languageItem,
                            isItemSel && styles.selectedLanguageItem,
                          ]}
                          onPress={() => {
                            setSelectedEpisodeId(epId || null);
                            setEpisodeModalVisible(false);
                          }}>
                          <View style={{flex: 1}}>
                            <Text
                              style={[
                                styles.languageItemText,
                                isItemSel && styles.selectedLanguageItemText,
                              ]}>
                              {item.name}
                            </Text>
                            {item.description ? (
                              <Text style={{fontSize: 12, color: '#6b7280'}} numberOfLines={1}>
                                {item.description}
                              </Text>
                            ) : null}
                          </View>
                          {isItemSel && (
                            <Ionicon name="checkmark" size={20} color="#2563EB" />
                          )}
                        </TouchableOpacity>
                      );
                    }}
                  />
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAwareScrollView
        style={{width: '100%', flex: 1}}
        bottomOffset={50}
        showsVerticalScrollIndicator={false}
        extraKeyboardSpace={20}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: hp(4),
        }}>
        <WarningBox />
        <LanguageSelector />
        <EpisodeSelector />

        <View style={styles.form}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.sectionTitle}>Podcast Details</Text>
            <Text style={styles.sectionSubtitle}>
              Fill in the information below to create your podcast
            </Text>
          </View>

          {/* Image Upload Section */}
          <View style={styles.section}>
            <Text style={styles.inputLabel}>
              <Ionicon name="image-outline" size={18} color="#222" /> Cover Image
            </Text>
            {imageUtils ? (
              <View style={styles.imageContainer}>
                <Image source={{uri: imageUtils}} style={styles.image} />
                <View style={styles.imageOverlay}>
                  <TouchableOpacity
                    style={styles.changeButton}
                    onPress={() => {
                      selectImage();
                      setImageError('');
                    }}>
                    <Ionicon name="pencil" size={16} color="#222" />
                    <Text style={styles.changeButtonText}>Change</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      setImageUtils('');
                      if (submitted) setImageError('Please upload a cover image for your podcast.');
                    }}>
                    <Ionicon name="trash" size={16} color="#fff" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.uploadContainer,
                  submitted && imageError ? styles.uploadContainerError : null,
                ]}
                onPress={() => {
                  selectImage();
                  setImageError('');
                }}>
                <Ionicon name="cloud-upload" size={40} color={PRIMARY_COLOR} />
                <Text style={styles.uploadText}>Upload Cover Image</Text>
                <Text style={styles.uploadHint}>
                  Maximum file size: 1MB • JPG, PNG
                </Text>
              </TouchableOpacity>
            )}
            {submitted && imageError ? (
              <Text style={styles.errorText}>{imageError}</Text>
            ) : null}
          </View>

          {/* Basic Information Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            {/* Title */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>
                <Ionicon name="mic-outline" size={18} color="#222" /> Title *
              </Text>
              <TextInput
                autoCapitalize="sentences"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Enter your podcast title"
                placeholderTextColor="#6b7280"
                maxLength={100}
                style={[
                  styles.inputControl,
                  titleError ? styles.inputControlError : null,
                ]}
                value={title}
                onChangeText={(text: string) => {
                  setTitle(text);
                  if (!text.trim()) {
                    setTitleError('Podcast title is required.');
                  } else if (text.trim().length < 3) {
                    setTitleError('Title must be at least 3 characters.');
                  } else {
                    setTitleError('');
                  }
                }}
              />
              <Text style={styles.charCounter}>{title.length}/100</Text>
              {titleError ? (
                <Text style={styles.errorText}>{titleError}</Text>
              ) : null}
            </View>

            {/* Language Dropdown */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>
                <Ionicon name="globe-outline" size={18} color="#222" /> Language *
              </Text>
              <TouchableOpacity
                style={styles.languageSelector}
                onPress={() => setLanguageModalVisible(true)}>
                <Text style={styles.languageSelectorText}>
                  {getLanguageLabel(language)}
                </Text>
                <Ionicon name="chevron-down" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Episode Series Dropdown */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>
                <Ionicon name="albums-outline" size={18} color="#222" /> Episode Series (Optional)
              </Text>
              <TouchableOpacity
                style={styles.languageSelector}
                onPress={() => setEpisodeModalVisible(true)}>
                <Text style={styles.languageSelectorText}>
                  {selectedEpisode ? selectedEpisode.name : 'None (Standalone Podcast)'}
                </Text>
                <Ionicon name="chevron-down" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>
                <Ionicon name="document-text-outline" size={18} color="#222" /> Description *
              </Text>
              <TextInput
                placeholder="Provide a brief overview of your podcast"
                placeholderTextColor="#6b7280"
                textAlignVertical="top"
                style={[
                  styles.aboutInput,
                  submitted && descriptionError ? styles.inputControlError : null,
                ]}
                multiline
                numberOfLines={4}
                autoCapitalize="sentences"
                value={description}
                onChangeText={(text: string) => {
                  if (text.length <= 160) {
                    setDescription(text);
                    if (submitted) {
                      if (!text.trim()) {
                        setDescriptionError('Please provide a description for your podcast.');
                      } else if (text.trim().length < 10) {
                        setDescriptionError('Description must be at least 10 characters.');
                      } else {
                        setDescriptionError('');
                      }
                    }
                  }
                }}
              />
              <Text style={styles.charCounter}>{description.length}/160</Text>
              {submitted && descriptionError ? (
                <Text style={styles.errorText}>{descriptionError}</Text>
              ) : null}
            </View>
          </View>

          {/* Tags Section */}
          <TagSelectorSection
            categories={categories || []}
            selectedGenres={selectedGenres}
            onToggleGenre={handleGenrePress}
            onClearAll={() => {
              setSelectedGenres([]);
              if (submitted) {
                setGenresError(
                  'Please select at least one tag for your podcast.',
                );
              }
            }}
            maxSelection={5}
            subtitle="Select up to 5 tags to help people discover your podcast"
            errorText={submitted && genresError ? genresError : undefined}
          />

          {/* Action Buttons: Live Recording or Upload Pre-recorded Audio */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCreatePost}>
              <Ionicon name="mic-outline" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Continue to Recording</Text>
              <Ionicon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.uploadAudioButton}
              onPress={handlePickAudio}>
              <Ionicon name="cloud-upload-outline" size={21} color={PRIMARY_COLOR} />
              <Text style={styles.uploadAudioButtonText}>Upload Audio from Device</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  form: {
    marginTop: hp(2),
    paddingHorizontal: 16,
    paddingBottom: hp(4),
  },
  headerSection: {
    marginBottom: 24,
    paddingVertical: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  aboutInput: {
    height: 120,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  changeButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeButtonText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  uploadContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    height: 160,
    width: '100%',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 8,
  },
  uploadText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
  },
  uploadHint: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 4,
  },
  charCounter: {
    marginTop: 6,
    alignSelf: 'flex-end',
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '500',
  },
  languageSelector: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageSelectorText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  actionButtonsContainer: {
    marginTop: 8,
    marginBottom: hp(4),
    gap: 6,
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  uploadAudioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadAudioButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: '700',
  },
  genreContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  genreButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  genreButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedGenreButton: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  selectedGenreButtonText: {
    color: '#fff',
  },
  selectedGenresWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginTop: 8,
  },
  selectedGenreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    gap: 6,
  },
  selectedGenreChipText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedGenreText: {
    color: PRIMARY_COLOR,
    marginHorizontal: hp(0.5),
  },
  warningContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(251, 146, 60, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#FB923C',
    padding: 16,
    marginTop: hp(1),
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EA580C',
    marginBottom: 6,
  },
  warningText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  languageItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  selectedLanguageItemText: {
    color: PRIMARY_COLOR,
    fontWeight: '700',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 2,
  },
  inputControlError: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  uploadContainerError: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  addSeriesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
    gap: 8,
  },
  addSeriesButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2563EB',
  },
  emptySeriesPrompt: {
    padding: 24,
    alignItems: 'center',
  },
  emptySeriesPromptText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  createSeriesContainer: {
    padding: 20,
  },
  createSeriesSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 18,
  },
  seriesInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
    marginBottom: 12,
  },
  createSeriesActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  cancelSeriesButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  cancelSeriesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  saveSeriesButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  saveSeriesText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PodcastForm;

