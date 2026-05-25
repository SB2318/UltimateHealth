import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ON_PRIMARY_COLOR,
  PRIMARY_COLOR,
  SAVED_CHIP_ACTIVE_BG,
  SAVED_CHIP_INACTIVE_BG,
  SAVED_CHIP_INACTIVE_BORDER,
} from '../helper/Theme';
import AddIcon from '../components/AddIcon';
import ArticleCard from '../components/ArticleCard';

import HomeScreenHeader from '../components/HomeScreenHeader';
import {ArticleData, Category, CategoryType, HomeScreenProps} from '../type';
import FilterModal from '../components/FilterModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../components/Loader';

import {
  setFilteredArticles,
  setSearchedArticles,
  setSearchMode,
  setSelectedTags,
  setSortType,
  setTags,
} from '../store/dataSlice';
import Snackbar from 'react-native-snackbar';
import {useFocusEffect} from '@react-navigation/native';
import InactiveUserModal from '../components/InactiveUserModal';
import {StatusBar} from 'expo-status-bar';
import {wp} from '../helper/Metric';
import {useGetCategories} from '../hooks/useGetArticleTags';
import {useGetProfile} from '../hooks/useGetProfile';
import {useRequestArticleEdit} from '../hooks/useRequestArticleEdit';
import {useGetUnreadNotificationCount} from '../hooks/useGetUnreadNotificationCount';
import {useGetPaginatedArticle} from '../hooks/useGetPaginatedArticles';
import {
  OfflineArticleState,
  NoArticleState,
  BaseEmptyState,
} from '../components/EmptyStates';
import DailyWellnessChallenge from '../components/DailyWellnessChallenge';

// Loading State Component with Animation
const LoadingState = () => {
  return (
    <BaseEmptyState
      iconEmoji="📚"
      title="Loading Articles"
      description="Gathering the latest health insights for you..."
      loading={true}
    />
  );
};

// Error State Component
const ErrorState = ({onRetry}: {onRetry: () => void}) => {
  return (
    <NoArticleState onRefresh={onRetry} />
  );
};

// Offline State Component
const OfflineState = () => {
  return (
    <OfflineArticleState />
  );
};

// Empty Article State Component (for FlatList empty state)
const EmptyArticleState = () => {
  return (
    <NoArticleState />
  );
};

const SavedArticleEmptyState = () => (
  <View style={styles.savedEmptyContainer}>
    <Text style={styles.savedEmptyTitle}>No saved articles yet</Text>
    <Text style={styles.savedEmptyDescription}>
      Tap the bookmark icon on any article to save it for later.
    </Text>
  </View>
);

// Here The purpose of using Redux is to maintain filter state throughout the app session. globally
const HomeScreen = ({navigation}: HomeScreenProps) => {
  const dispatch = useDispatch();
  const [articleCategories, setArticleCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [sortingType, setSortingType] = useState<string>('');
  const {isConnected} = useSelector((state: any) => state.network);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  // const [repostItem, setRepostItem] = useState<ArticleData | null>(null);
  const [selectCategoryList, setSelectCategoryList] = useState<Category[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const {mutate: requestEdit, isPending: requestEditPending} =
    useRequestArticleEdit();

  const dailyHealthTips: Record<string, string> = {
    Nutrition:
      'Start your day with a colorful breakfast: fruits, oats, and hydration boost your energy.',
    Fitness:
      'Take a 5-minute stretch break every hour to reduce stiffness and keep your body active.',
    Sleep:
      'Wind down with a screen-free routine 30 minutes before bed for deeper rest.',
    Mindfulness:
      'Try a quick breathing reset: inhale for 4, hold 4, exhale 6, and feel the calm.',
    Wellness:
      'Drink a glass of water before each meal to support digestion and natural energy.',
    Default:
      'Pause for one mindful moment today: notice your breath, posture, and how your body feels.',
  };

  const dailyTip = useMemo(() => {
    if (!selectedCategory?.name) {
      return dailyHealthTips.Default;
    }
    return (
      dailyHealthTips[selectedCategory.name] || dailyHealthTips.Default
    );
  }, [selectedCategory]);

  const {
    filteredArticles,
    searchedArticles,
    searchMode,
    selectedTags,
    sortType,
  } = useSelector((state: any) => state.data);

  const {user_token, isGuest} = useSelector(
    (state: any) => state.user,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {data: user, refetch: refetchUser} = useGetProfile();
  const {data: categoryData, isSuccess} = useGetCategories(isConnected);

  useEffect(() => {
    if (!isSuccess || !categoryData) return;

    if (!selectedTags || selectedTags.length === 0) {
      dispatch(
        setSelectedTags({
          selectedTags: categoryData,
        }),
      );
      setSelectedCategory(categoryData[0]);
    } else {
      setSelectedCategory(selectedTags[0]);
    }

    setArticleCategories(categoryData);
    dispatch(setTags({tags: categoryData}));
  }, [categoryData, isSuccess]);

  const handleCategorySelection = (category: Category) => {
    // Update Redux State
    setSelectCategoryList(prevList => {
      const updatedList = prevList.some(p => p.id === category.id)
        ? prevList.filter(item => item.id !== category.id)
        : [...prevList, category];
      return updatedList;
    });
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const {data: unreadCount, refetch: refetchUnreadCount} =
    useGetUnreadNotificationCount(isConnected);

  useFocusEffect(
    useCallback(() => {
      if (isConnected) {
        if (user_token && !isGuest) {
          refetchUser();
          refetchUnreadCount();
        }
      } else {
        Alert.alert(
          'No Internet 😶‍🌫️',
          'Offline mode will be available in the next update.',
        );
      }
    }, [isConnected, user_token, isGuest, refetchUser, refetchUnreadCount]),
  );

  const handleNoteIconClick = () => {
    if (isGuest) {
      navigation.navigate('GuestPlaceholderScreen', {
        title: 'Sign In Required',
        description: 'Please sign in or sign up to write an article.',
        iconName: 'pen-nib',
      });
      return;
    }
    navigation.navigate('ArticleDescriptionScreen', {
      article: null,
      htmlContent: undefined,
    });
  };

  const handleCategoryClick = (category: Category) => {
    setShowSavedOnly(false);
    setSelectedCategory(category);
  };


  const handleReportAction = (item: ArticleData) => {
    navigation.navigate('ReportScreen', {
      articleId: item._id,
      authorId: item.authorId as string,
      commentId: null,
      podcastId: null,
    });
  };
  const renderItem = ({item}: {item: ArticleData}) => {
    return (
      <ArticleCard
        item={item}
        isSelected={selectedCardId === item._id}
        setSelectedCardId={setSelectedCardId}
        navigation={navigation}
        success={onRefresh}
        handleRepostAction={()=>{}}
        handleReportAction={handleReportAction}
        handleEditRequestAction={(item, index, reason) => {
          // submitRequest
          requestEdit(
            {
              articleId: item._id,
              reason: reason,
              articleRecordId: item.pb_recordId,
            },
            {
              onSuccess: data => {
                Snackbar.show({
                  text: data,
                  duration: Snackbar.LENGTH_SHORT,
                });
              },
              onError: err => {
                console.log(err);
                Snackbar.show({
                  text: 'Try again!',
                  duration: Snackbar.LENGTH_SHORT,
                });
              },
            },
          );
        }}
        source="home"
      />
    );
  };

  const handleFilterReset = () => {
    // Update Redux State Variables
    setSelectCategoryList([]);
    setSortingType('');
    dispatch(
      setSelectedTags({
        selectedTags: articleCategories,
      }),
    );
    dispatch(setSortType({sortType: ''}));
    dispatch(setFilteredArticles({filteredArticles: articleData?.articles}));
  };

  const handleFilterApply = () => {
    // Update Redux State Variables
    console.log('enter');
    if (selectCategoryList.length > 0) {
      //   console.log("enter")
      dispatch(setSelectedTags({selectedTags: selectCategoryList}));
    } else {
      //console.log("enter ele", articleCategories);

      dispatch(
        setSelectedTags({
          selectedTags: articleCategories,
        }),
      );
    }

    if (sortingType && sortingType !== '') {
      console.log('Sort type', sortType);
      dispatch(setSortType({sortType: sortingType}));
    }

    if (sortingType && sortingType !== '') {
      console.log('Sort type', sortType);
      dispatch(setSortType({sortType: sortingType}));
    }

    updateArticles(articleData?.articles);
  };

  const updateArticles = (articleData?: ArticleData[]) => {
    setFilterLoading(true);
    if (!articleData) {
      setFilterLoading(false);
      return;
    }

    let filtered = articleData;

    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.some((tag: Category) =>
          article.tags.some(category => category.name === tag.name),
        ),
      );
    }
    //  console.log('Filtered before sort', filtered);
    if (sortType && sortType === 'recent' && filtered.length > 1) {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
      );
    } else if (sortType && sortType === 'oldest' && filtered.length > 1) {
      filtered.sort(
        (a, b) =>
          new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
      );
    } else if (sortType && sortType === 'popular' && filtered.length > 1) {
      filtered.sort((a, b) => b.viewCount - a.viewCount);
    }
    dispatch(setFilteredArticles({filteredArticles: filtered}));
    setFilterLoading(false);
  };

  const {
    data: articleData,
    isLoading,
    isError,
    refetch,
  } = useGetPaginatedArticle(isConnected, page);

  const totalSavedArticles = user?.savedArticles?.length ?? 0;
  const totalArticles = articleData?.articles?.length ?? 0;

  useEffect(() => {
    if (articleData) {
      if (Number(page) === 1 && articleData.totalPages) {
        setTotalPages(articleData.totalPages);
      }

      if (Number(page) === 1) {
        updateArticles(articleData.articles);
      } else {
        updateArticles([...filteredArticles, ...articleData.articles]);
      }
    }
  }, [articleData, page]);


  const onRefresh = () => {
    console.log('is connected', isConnected);
    if (isConnected) {
      setRefreshing(true);
      refetch();
      if (!isGuest) {
        refetchUser();
        refetchUnreadCount();
      }
      setRefreshing(false);
    } else {
      Snackbar.show({
        text: 'Please check your network connection',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  const handleSearch = (textInput: string) => {
    //console.log('Search Input', textInput);
    if (textInput === '' || articleData === undefined) {
      dispatch(setSearchedArticles({searchedArticles: []}));
      dispatch(setSearchMode({searchMode: false}));
    } else {
      dispatch(setSearchMode({searchMode: true}));
      const matchesSearch = articleData?.articles.filter(article => {
        const matchesTitle = article.title
          .toLowerCase()
          .includes(textInput.toLowerCase());
        const matchesTags = article.tags.some(tag =>
          tag.name.toLowerCase().includes(textInput.toLowerCase()),
        );

        return matchesTitle || matchesTags;
      });
      dispatch(setSearchedArticles({searchedArticles: matchesSearch}));
    }
  };

  const listData = useMemo(() => {
    if (showSavedOnly) {
      const savedArticles = user?.savedArticles || [];
      return savedArticles
        .slice()
        .sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime(),
        );
    }
    if (searchMode) return searchedArticles;

    const filtered = filteredArticles.filter(
      (article: ArticleData) =>
        article.tags &&
        article.tags.some(tag => tag.name === selectedCategory?.name),
    );

    return filtered.sort(() => Math.random() - 0.5);
  }, [showSavedOnly, searchMode, searchedArticles, filteredArticles, selectedCategory, user]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    const hasCustomCategories = selectedTags.length > 0 && selectedTags.length < articleCategories.length;
    const hasSorting = sortType !== '';
    return hasCustomCategories || hasSorting;
  }, [selectedTags, sortType, articleCategories]);

  // Quick reset handler for header
  const handleQuickReset = () => {
    handleFilterReset();
  };

  if (!articleData || articleData.articles?.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeScreenHeader
          handlePresentModalPress={handlePresentModalPress}
          onTextInputChange={handleSearch}
          onNotificationClick={() => {
            if (isGuest) {
              navigation.navigate('GuestPlaceholderScreen', {
                title: 'Notifications',
                description: 'Sign in to see your notifications.',
                iconName: 'bell',
              });
            } else {
              navigation.navigate('NotificationScreen');
            }
          }}
          unreadCount={unreadCount || 0}
          hasActiveFilters={hasActiveFilters}
          onFilterReset={handleQuickReset}
        />

        <LoadingState />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeScreenHeader
          handlePresentModalPress={handlePresentModalPress}
          onTextInputChange={handleSearch}
          onNotificationClick={() => {
            if (isGuest) {
              navigation.navigate('GuestPlaceholderScreen', {
                title: 'Notifications',
                description: 'Sign in to see your notifications.',
                iconName: 'bell',
              });
            } else {
              navigation.navigate('NotificationScreen');
            }
          }}
          unreadCount={unreadCount || 0}
          hasActiveFilters={hasActiveFilters}
          onFilterReset={handleQuickReset}
        />

        <ErrorState onRetry={refetch} />
      </SafeAreaView>
    );
  }

  if (isConnected === false) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeScreenHeader
          handlePresentModalPress={handlePresentModalPress}
          onTextInputChange={handleSearch}
          onNotificationClick={() => {
            if (isGuest) {
              navigation.navigate('GuestPlaceholderScreen', {
                title: 'Notifications',
                description: 'Sign in to see your notifications.',
                iconName: 'bell',
              });
            } else {
              navigation.navigate('NotificationScreen');
            }
          }}
          unreadCount={unreadCount || 0}
          hasActiveFilters={hasActiveFilters}
          onFilterReset={handleQuickReset}
        />

        <OfflineState />
      </SafeAreaView>
    );
  }

  if (isLoading || requestEditPending) {
    return <Loader />;
  }

  if (user && (user.isBlockUser || user.isBannedUser)) {
    return (
      <SafeAreaView style={styles.blockContainer}>
        <StatusBar style="light" backgroundColor="#007AFF" />
        <HomeScreenHeader
          handlePresentModalPress={handlePresentModalPress}
          onTextInputChange={handleSearch}
          onNotificationClick={() => {
            navigation.navigate('NotificationScreen');
          }}
          unreadCount={unreadCount ? unreadCount : 0}
          hasActiveFilters={hasActiveFilters}
          onFilterReset={handleQuickReset}
        />

        <View style={styles.buttonContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            //contentContainerStyle={{flex:1}}
          >
            {selectedTags &&
              selectedTags.length > 0 &&
              !searchMode &&
              selectedTags.map((item: Category, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    ...styles.button,
                    backgroundColor:
                      selectedCategory && selectedCategory._id !== item._id
                        ? 'white'
                        : PRIMARY_COLOR,
                    borderColor:
                      selectedCategory && selectedCategory._id !== item._id
                        ? PRIMARY_COLOR
                        : 'white',
                  }}
                  onPress={() => {
                    handleCategoryClick(item);
                  }}>
                  <Text
                    style={{
                      ...styles.labelStyle,
                      color:
                        selectedCategory && selectedCategory._id !== item._id
                          ? 'black'
                          : 'white',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <InactiveUserModal
          open={true}
          onRequestAdmin={() => {
            //navigation.navigate('ContactAdminScreen');
          }}
          reason={
            user.isBlockUser
              ? 'blocked'
              : user.isBannedUser
                ? 'banned'
                : undefined
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader
        handlePresentModalPress={handlePresentModalPress}
        onTextInputChange={handleSearch}
        onNotificationClick={() => {
          if (isGuest) {
            navigation.navigate('GuestPlaceholderScreen', {
              title: 'Notifications',
              description: 'Sign in to see your notifications.',
              iconName: 'bell',
            });
          } else {
            navigation.navigate('NotificationScreen');
          }
        }}
        unreadCount={unreadCount ? unreadCount : 0}
        hasActiveFilters={hasActiveFilters}
        onFilterReset={handleQuickReset}
      />
      <View style={styles.healthSnapshotCard}>
        <Text style={styles.snapshotTitle}>Your Daily Health Snapshot</Text>
        <Text style={styles.snapshotDescription}>
          {`Top focus: ${selectedCategory?.name ?? 'General wellness'}`}
        </Text>
        <View style={styles.snapshotStatsRow}>
          <View style={styles.snapshotStatItem}>
            <Text style={styles.snapshotStatNumber}>{totalArticles}</Text>
            <Text style={styles.snapshotStatLabel}>Articles</Text>
          </View>
          <View style={styles.snapshotStatItem}>
            <Text style={styles.snapshotStatNumber}>{totalSavedArticles}</Text>
            <Text style={styles.snapshotStatLabel}>Saved</Text>
          </View>
        </View>
        <Text style={styles.snapshotTipLabel}>Wellness tip</Text>
        <Text style={styles.snapshotTipText}>{dailyTip}</Text>
        <TouchableOpacity
          style={styles.snapshotButton}
          onPress={() => {
            setShowSavedOnly(false);
            if (selectedCategory) {
              handleCategoryClick(selectedCategory);
            }
            Snackbar.show({
              text: 'Showing your current focus and fresh health tips!',
              duration: Snackbar.LENGTH_SHORT,
            });
          }}>
          <Text style={styles.snapshotButtonText}>Refresh my wellness feed</Text>
        </TouchableOpacity>
      </View>
      <DailyWellnessChallenge
        onViewHistory={() => navigation.navigate('WellnessChallengeScreen')}
      />
      <FilterModal
        bottomSheetModalRef={bottomSheetModalRef}
        categories={articleCategories}
        handleCategorySelection={handleCategorySelection}
        selectCategoryList={selectCategoryList}
        handleFilterReset={handleFilterReset}
        handleFilterApply={handleFilterApply}
        setSortingType={setSortingType}
        sortingType={sortingType}
      />
      <View style={styles.buttonContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          //contentContainerStyle={{flex:1}}
        >
          {!isGuest && (
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: showSavedOnly
                  ? SAVED_CHIP_ACTIVE_BG
                  : SAVED_CHIP_INACTIVE_BG,
                borderColor: showSavedOnly
                  ? PRIMARY_COLOR
                  : SAVED_CHIP_INACTIVE_BORDER,
              }}
              onPress={() => setShowSavedOnly(prev => !prev)}>
              <Text
                style={{
                  ...styles.labelStyle,
                  color: showSavedOnly ? 'white' : 'black',
                }}>
                🔖 Saved
              </Text>
            </TouchableOpacity>
          )}
          {selectedTags &&
            selectedTags.length > 0 &&
            !searchMode &&
            selectedTags.map((item: Category, index: number) => (
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.button,
                  backgroundColor:
                    selectedCategory && selectedCategory._id !== item._id
                      ? 'white'
                      : '#000A60',
                  borderColor:
                    selectedCategory && selectedCategory._id !== item._id
                      ? PRIMARY_COLOR
                      : 'white',
                }}
                onPress={() => {
                  handleCategoryClick(item);
                }}>
                <Text
                  style={{
                    ...styles.labelStyle,
                    color:
                      selectedCategory && selectedCategory._id !== item._id
                        ? 'black'
                        : 'white',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <View style={styles.articleContainer}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.flatListContentContainer}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            showSavedOnly ? <SavedArticleEmptyState /> : <EmptyArticleState />
          }
          onEndReached={() => {
            if (page < totalPages) {
              setPage(prev => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </View>

      <View style={styles.homePlusIconview}>
        <AddIcon callback={handleNoteIconClick} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  blockContainer: {
    flex: 0,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    //alignItems: 'center',
  },
  buttonContainer: {
    marginTop: wp(3),
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  button: {
    flex: 0,
    borderRadius: wp(4),
    marginHorizontal: 6,
    marginVertical: 4,
    padding: wp(3.1),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  articleContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    zIndex: -2,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    paddingBottom: 120,
  },
  homePlusIconview: {
    bottom: 100,
    right: 25,
    position: 'absolute',
    zIndex: -2,
  },

  healthSnapshotCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: wp(3),
    padding: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  snapshotTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0F2147',
  },
  snapshotDescription: {
    fontSize: 14,
    color: '#4D5B7A',
    marginBottom: 12,
  },
  snapshotStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  snapshotStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  snapshotStatNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000A60',
  },
  snapshotStatLabel: {
    fontSize: 12,
    color: '#7A869A',
    marginTop: 4,
  },
  snapshotTipLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2147',
    marginBottom: 6,
  },
  snapshotTipText: {
    fontSize: 14,
    color: '#33415E',
    marginBottom: 16,
    lineHeight: 20,
  },
  snapshotButton: {
    backgroundColor: '#000A60',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  snapshotButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  message: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: ON_PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    top: 30,
  },
  emptyImgStyle: {
    width: 100,
    height: 200,
    borderRadius: 8,
    marginBottom: 1,
    resizeMode: 'contain',
  },

  // New state styles
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F0F8FF',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  errorCircle: {
    backgroundColor: '#FFEBEE',
  },
  offlineCircle: {
    backgroundColor: '#FFF3E0',
  },
  iconEmoji: {
    fontSize: 56,
  },
  stateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  stateDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 6,
  },
  retryButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 8,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Empty Article State styles (for FlatList empty state)
  emptyArticleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    minHeight: 400,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#9C27B0',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  emptyIconEmoji: {
    fontSize: 48,
  },
  emptyArticleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyArticleDescription: {
    fontSize: 15,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  emptyTagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  emptyTag: {
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C5CAE9',
  },
  emptyTagText: {
    color: '#3F51B5',
    fontSize: 14,
    fontWeight: '600',
  },
  savedEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    minHeight: 400,
    backgroundColor: '#F8FAFF',
  },
  savedEmptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  savedEmptyDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
  },
});
