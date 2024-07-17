import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  BackHandler,
  Alert,
  TextInput,
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {PRIMARY_COLOR} from '../helper/Theme';
import AddIcon from '../components/AddIcon';
import {fp, hp, wp} from '../helper/Metric';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TabView, TabBar} from 'react-native-tab-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ArticleCard from '../components/ArticleCard';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 110;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const articles = [
  {
    id: '1',
    title: 'The Silent Killer: Hypertension',
    description:
      'Hypertension, also known as high blood pressure, often shows no symptoms but can lead to serious health complications if untreated.',
    content:
      'Content about hypertension, its causes, symptoms, and treatments...',
    category: ['Popular', 'Stories'],
    author_name: 'Dr. Alex Carter',
    lastUpdatedAt: '14.06.2024',
    imageUtils:
      'https://img.freepik.com/free-vector/tiny-doctor-heart-patient-with-high-blood-pressure-medical-checkup-hospital-clinic-risk-cholesterol-cardiovascular-disease-flat-vector-illustration-cardiology-health-concept_74855-20983.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718582400&semt=sph',
  },
  {
    id: '2',
    title: 'Understanding Diabetes: Types, Symptoms, and Management',
    description:
      'Diabetes is a chronic condition characterized by high blood sugar levels. Learn about the different types, symptoms, and management strategies.',
    content: 'Content about diabetes, its types, symptoms, and management...',
    category: ['Health', 'Stories'],
    author_name: 'Dr. Emily White',
    lastUpdatedAt: '13.06.2024',
    imageUtils:
      'https://cdn.pixabay.com/photo/2015/05/21/11/17/diabetes-777002_640.jpg',
  },
  {
    id: '3',
    title: 'Cancer: Early Detection and Treatment Options',
    description:
      'Cancer remains one of the leading causes of death worldwide. Early detection and advanced treatment options can improve survival rates.',
    content:
      'Content about cancer, its early detection, and treatment options...',
    category: ['Diseases', 'Popular'],
    author_name: 'Dr. Michael Johnson',
    lastUpdatedAt: '12.06.2024',
    imageUtils:
      'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/01/GettyImages-122373924_header-1024x575-1.jpg?w=1155&h=1207',
  },
  {
    id: '4',
    title: 'The Impact of Obesity on Overall Health',
    description:
      'Obesity is linked to a range of health issues, including diabetes, heart disease, and joint problems. Learn about the impact of obesity on health.',
    content:
      'Content about obesity, its impact on health, and ways to manage weight...',
    category: ['Popular', 'Stories'],
    author_name: 'Dr. Sarah Lee',
    lastUpdatedAt: '11.06.2024',
    imageUtils:
      'https://www.hindustantimes.com/ht-img/img/2024/05/11/1600x900/obesity-cancer_1715423468999_1715423469283.jpg',
  },
  {
    id: '5',
    title: 'Heart Disease: Prevention and Management',
    description:
      'Heart disease is a leading cause of death worldwide. Discover prevention strategies and management techniques to reduce your risk.',
    content: 'Content about heart disease, its prevention, and management...',
    category: ['Health', 'Diseases'],
    author_name: 'Dr. James Brown',
    lastUpdatedAt: '10.06.2024',
    imageUtils:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPsTqx0xw0aGEY64kyk7qvW29yz9xN3QWPg&s',
  },
  {
    id: '6',
    title: 'Chronic Respiratory Diseases: Asthma and COPD',
    description:
      'Chronic respiratory diseases, such as asthma and COPD, affect millions of people. Learn about their symptoms and treatments.',
    content:
      'Content about chronic respiratory diseases, their symptoms, and treatments...',
    category: ['Popular', 'Stories'],
    author_name: 'Dr. Anna Wilson',
    lastUpdatedAt: '09.06.2024',
    imageUtils:
      'https://st4.depositphotos.com/6563466/38921/i/450/depositphotos_389216432-stock-photo-human-respiratory-system-lungs-anatomy.jpg',
  },
  {
    id: '7',
    title: 'Alzheimer’s Disease: Understanding the Symptoms and Care',
    description:
      'Alzheimer’s disease is a progressive neurological disorder. Understand its symptoms, stages, and care options.',
    content:
      'Content about Alzheimer’s disease, its symptoms, and care options...',
    category: ['Diseases', 'Stories'],
    author_name: 'Dr. Robert Green',
    lastUpdatedAt: '08.06.2024',
    imageUtils:
      'https://media.istockphoto.com/id/1125868862/photo/3d-illustration-of-the-human-brain-with-alzheimers-disease-dementia.jpg?s=612x612&w=0&k=20&c=FrD3pBhyBOjtgaWw_WDdAh2ktxWoaDm2DW_Ty47R5eg=',
  },
  {
    id: '8',
    title: 'Stroke: Signs, Prevention, and Recovery',
    description:
      'Stroke is a medical emergency that requires immediate attention. Learn about the signs, prevention methods, and recovery processes.',
    content: 'Content about stroke, its signs, prevention, and recovery...',
    category: ['Health', 'Stories'],
    author_name: 'Dr. Laura Davis',
    lastUpdatedAt: '07.06.2024',
    imageUtils:
      'https://www.apexhospitals.com/_next/image?url=https%3A%2F%2Fbed.apexhospitals.com%2Fuploads%2Fstroke_management_6fdf77c521.png&w=1200&q=75',
  },
  {
    id: '9',
    title: 'Mental Health Disorders: Types and Treatments',
    description:
      'Mental health disorders are common and treatable. Discover the different types of disorders and available treatments.',
    content:
      'Content about mental health disorders, their types, and treatments...',
    category: ['Health', 'Popular'],
    author_name: 'Dr. Chris Miller',
    lastUpdatedAt: '06.06.2024',
    imageUtils:
      'https://img.freepik.com/free-vector/gradient-world-mental-health-day-background_23-2149604961.jpg',
  },
  {
    id: '10',
    title: 'Infectious Diseases: Prevention and Vaccination',
    description:
      'Infectious diseases can spread quickly and cause serious health problems. Learn about prevention methods and the importance of vaccination.',
    content:
      'Content about infectious diseases, their prevention, and vaccination...',
    category: ['Health', 'Diseases'],
    author_name: 'Dr. Patricia Taylor',
    lastUpdatedAt: '05.06.2024',
    imageUtils:
      'https://www.shutterstock.com/image-illustration/virus-vaccine-flu-coronavirus-medical-600nw-1667085835.jpg',
  },
];

const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const bottomBarHeight = useBottomTabBarHeight();
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'All', title: 'All'},
    {key: 'Popular', title: 'Popular'},
    {key: 'Health', title: 'Health'},
    {key: 'Diseases', title: 'Diseases'},
    {key: 'Stories', title: 'Stories'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);

  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach(item => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  /** * PanResponder for list in tab scene */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({value}) => {
      listRefArr.current.forEach(item => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert(
          'Warning',
          'Do you want to exit',
          [
            {text: 'No', onPress: () => null},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
      }),
    [],
  );
  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  // header
  const renderHeader = () => {
    // Interpolating the scrollY value to dynamically adjust the y position
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolate: 'clamp',
    });
    // Interpolating the scrollY value to dynamically adjust the opacity
    const opacity = scrollY.interpolate({
      inputRange: [0, HeaderHeight], // Change 120 to your desired threshold
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[
          styles.header,
          {
            transform: [{translateY: y}],
            opacity: opacity,
            paddingTop: insets.top + 10,
          },
        ]}>
        <View>
          <View
            style={{
              marginBottom: 6,
            }}>
            {/* header title */}
            <Text style={styles.headerTitle}>Discover</Text>
            {/* header subtitle */}
            <Text style={styles.headerSubtitle}>
              Retrieve the health data, Provide your valuable insights
            </Text>
          </View>

          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon color="#778599" name="search" size={17} />
            </View>
            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Search articles..."
              placeholderTextColor="#778599"
              style={styles.searchControl}
            />
            <TouchableOpacity style={styles.filterIcon}>
              <SimpleLineIcons color="#000" name="equalizer" size={17} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };
  // item card
  const rednerTabItem = ({item, index}) => {
    return <ArticleCard item={item} />;
  };
  // scene
  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let data;
    let renderItem;
    switch (route.key) {
      case 'All':
        data = articles;
        renderItem = rednerTabItem;
        break;
      case 'Popular':
        data = articles.filter(article => article.category.includes('Popular'));
        renderItem = rednerTabItem;
        break;
      case 'Health':
        data = articles.filter(article => article.category.includes('Health'));
        renderItem = rednerTabItem;
        break;
      case 'Diseases':
        data = articles.filter(article =>
          article.category.includes('Diseases'),
        );
        renderItem = rednerTabItem;
        break;
      case 'Stories':
        data = articles.filter(article => article.category.includes('Stories'));
        renderItem = rednerTabItem;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={1}
        ref={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: scrollY}},
                  },
                ],
                {useNativeDriver: true},
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          paddingHorizontal: 10,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight,
          paddingBottom: bottomBarHeight + 15,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  // tab view tabbar
  const renderTabBar = props => {
    // Interpolating the scrollY value to dynamically adjust the y position
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={[
          styles.tabBarConatiner,
          {
            transform: [{translateY: y}],
          },
        ]}>
        <TabBar
          style={styles.tabBar}
          tabStyle={styles.tabStyle}
          indicatorStyle={styles.indicator}
          {...props}
          renderLabel={({focused, route}) => {
            return <Text style={styles.label}>{route.title}</Text>;
          }}
        />
      </Animated.View>
    );
  };
  // tab view to render tabs
  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={id => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };

  const isDarkMode = useColorScheme() === 'dark';
  const color = isDarkMode ? 'white' : 'black';
  const handleNoteIconClick = () => {
    navigation.navigate('EditorScreen');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: PRIMARY_COLOR}}>
      {renderHeader()}
      {renderTabView()}
      <View style={styles.homePlusIconview}>
        <AddIcon callback={handleNoteIconClick} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // header
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingBottom: 10,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: fp(8),
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: fp(3),
    fontWeight: '400',
    marginVertical: 5,
    color: 'white',
  },
  search: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  filterIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: wp(9),
    paddingRight: wp(9),
    width: '100%',
    fontSize: fp(4),
    fontWeight: '500',
  },

  // tab
  tabBarConatiner: {
    top: 0,
    zIndex: 1,
    position: 'absolute',
    marginTop: 4,
    width: wp(100),
  },
  tabBar: {backgroundColor: PRIMARY_COLOR},
  label: {color: 'white', fontWeight: 'bold', fontSize: fp(4)},
  tabStyle: {
    flexDirection: 'row',
    gap: 4,
  },
  indicator: {backgroundColor: 'white'},
  //  add article icon button
  homePlusIconview: {
    bottom: 100,
    right: 25,
    position: 'absolute',
  },
});
