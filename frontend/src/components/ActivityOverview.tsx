import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../helper/Theme';
import * as Progress from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import {LineChart} from 'react-native-gifted-charts';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';
import {fp} from '../helper/Metric';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {
  GET_IMAGE,
  GET_MOSTLY_VIEWED,
  GET_TOTAL_LIKES_VIEWS,
  GET_TOTAL_READS,
  GET_TOTAL_WRITES,
} from '../helper/APIUtils';
import {ArticleData, ReadStatus, UserStatus, WriteStatus} from '../type';
import Loader from './Loader';

interface Props {
  onArticleViewed: ({
    articleId,
    authorId,
  }: {
    articleId: number;
    authorId: string;
  }) => void;
  userId?: string;
  others: boolean;
}
const ActivityOverview = ({onArticleViewed, userId, others}: Props) => {
  const [value, setValue] = useState<string>('read');
  const {user_token, user_id} = useSelector((state: any) => state.user);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const dailyDrops = [
    {label: 'Sunday', value: 'sunday'},
    {label: 'Monday', value: 'monday'},
    {label: 'Tuesday', value: 'tuesday'},
    {label: 'Wednesday', value: 'wednesday'},
    {label: 'Thursday', value: 'thursday'},
    {label: 'Friday', value: 'friday'},
    {label: 'Saturday', value: 'saturday'},
  ];

  const monthlyDrops = [
    {label: 'January', value: 'january'},
    {label: 'February', value: 'february'},
    {label: 'March', value: 'march'},
    {label: 'April', value: 'april'},
    {label: 'May', value: 'may'},
    {label: 'June', value: 'june'},
    {label: 'July', value: 'july'},
    {label: 'August', value: 'august'},
    {label: 'September', value: 'september'},
    {label: 'October', value: 'october'},
    {label: 'November', value: 'november'},
    {label: 'December', value: 'december'},
  ];

  const yearlyDrops = [
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
  ];

  const chartData = [
    {value: 50},
    {value: 80},
    {value: 90},
    {value: 70},
    {value: 60},
  ];

  // GET MOST VIEWED ARTICLE
  const {
    data: article,
    isLoading: isArticleLoading,
    refetch: refetchArticles,
  } = useQuery({
    queryKey: ['get-most-viewed-articles'],
    queryFn: async () => {
      try {
        if (user_token === '') {
          Alert.alert('No token found');
          return '';
        }
        if (!userId) {
          if (others) {
            // user id not found for others profile
            Alert.alert('No user id found');
            return '';
          }
        }
        if (user_id === '' && !others) {
          // user id not found for own profile
          Alert.alert('No user id found');
          return '';
        }

        let url = others
          ? `${GET_MOSTLY_VIEWED}${userId}`
          : `${GET_MOSTLY_VIEWED}${user_id}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        });

        return response.data as ArticleData[];
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    },
  });

  // GET USER STATUS FOR LIKE AND VIEW COUNT

  const {
    data: likeViewStat,
    isLoading: likeViewStatDataLoading,
    refetch: refetchLikeViewStat,
  } = useQuery({
    queryKey: ['get-like-view-status'],
    queryFn: async () => {
      try {
        if (user_token === '') {
          Alert.alert('No token found');
          return '';
        }
        if (!userId) {
          if (others) {
            // user id not found for others profile
            Alert.alert('No user id found');
            return '';
          }
        }
        if (user_id === '' && !others) {
          // user id not found for own profile
          Alert.alert('No user id found');
          return '';
        }

        let url = others
          ? `${GET_TOTAL_LIKES_VIEWS}${userId}`
          : `${GET_TOTAL_LIKES_VIEWS}${user_id}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        });
        console.log('Like View Data', response.data);

        return response.data as UserStatus;
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    },
  });

  // GET TOTAL READ STATUS

  const {
    data: readStat,
    isLoading: readStatDataLoading,
    refetch: refetchLikeReadStat,
  } = useQuery({
    queryKey: ['get-read-status'],
    queryFn: async () => {
      try {
        if (user_token === '') {
          Alert.alert('No token found');
          return '';
        }
        if (!userId) {
          if (others) {
            // user id not found for others profile
            Alert.alert('No user id found');
            return '';
          }
        }
        if (user_id === '' && !others) {
          // user id not found for own profile
          Alert.alert('No user id found');
          return '';
        }

        let url = others
          ? `${GET_TOTAL_READS}${userId}`
          : `${GET_TOTAL_READS}${user_id}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        });
        console.log('READ Data', response.data);

        return response.data as ReadStatus;
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    },
  });

  // GET TOTAL WRITE STATUS

  const {
    data: writeStat,
    isLoading: writeStatDataLoading,
    refetch: refetchWriteStat,
  } = useQuery({
    queryKey: ['get-write-status'],
    queryFn: async () => {
      try {
        if (user_token === '') {
          Alert.alert('No token found');
          return '';
        }
        if (!userId) {
          if (others) {
            // user id not found for others profile
            Alert.alert('No user id found');
            return '';
          }
        }
        if (user_id === '' && !others) {
          // user id not found for own profile
          Alert.alert('No user id found');
          return '';
        }

        let url = others
          ? `${GET_TOTAL_WRITES}${userId}`
          : `${GET_TOTAL_WRITES}${user_id}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        });
        console.log('Write Data', response.data);

        return response.data as WriteStatus;
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    },
  });

  const colorList = ['black', 'green', PRIMARY_COLOR];
  if (
    isArticleLoading ||
    likeViewStatDataLoading ||
    writeStatDataLoading ||
    readStatDataLoading
  ) {
    <Loader />;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        marginBottom: 120,
        backgroundColor: 'white',
      }}>
      <View style={styles.rowContainer}>
        <View style={styles.box}>
          <Text style={styles.titleText}> Total Reads</Text>
          <Text style={styles.valueText}>{readStat?.totalReads}</Text>
          <Progress.Bar
            progress={readStat?.progress ? readStat?.progress : 0}
            width={100}
            color={
              readStat?.progress
                ? readStat?.progress < 0.4
                  ? colorList[0]
                  : readStat?.progress < 0.8
                  ? colorList[1]
                  : colorList[2]
                : 'black'
            }
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.titleText}> Total Writes</Text>
          <Text style={styles.valueText}>{writeStat?.totalWrites}</Text>

          <Progress.Bar
            progress={writeStat?.progress ? writeStat?.progress : 0}
            width={100}
            color={
              writeStat?.progress
                ? writeStat?.progress < 0.4
                  ? colorList[0]
                  : writeStat?.progress < 0.8
                  ? colorList[1]
                  : colorList[2]
                : 'black'
            }
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.box}>
          <Text style={styles.titleText}> Total Likes</Text>
          <Text style={styles.valueText}>{likeViewStat?.totalLikes}</Text>

          <Progress.Bar
            progress={
              likeViewStat?.likeProgress ? likeViewStat?.likeProgress : 0
            }
            width={100}
            color={
              likeViewStat?.likeProgress
                ? likeViewStat?.likeProgress < 0.4
                  ? colorList[0]
                  : likeViewStat?.likeProgress < 0.8
                  ? colorList[1]
                  : colorList[2]
                : 'black'
            }
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.titleText}> Total Views</Text>
          <Text style={styles.valueText}>{likeViewStat?.totalViews}</Text>

          <Progress.Bar
            progress={
              likeViewStat?.viewProgress ? likeViewStat.viewProgress : 0
            }
            width={100}
            color={
              likeViewStat?.viewProgress
                ? likeViewStat?.viewProgress < 0.4
                  ? colorList[0]
                  : likeViewStat?.viewProgress < 0.8
                  ? colorList[1]
                  : colorList[2]
                : 'black'
            }
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>
      </View>

      <View
        style={{
          height: 0.8,
          width: '96%',
          margin: 10,
          backgroundColor: '#c1c1c1',
        }}
      />

      <View style={styles.rowContainer}>
        <Dropdown
          style={styles.dropdown}
          //placeholderStyle={styles.placeholderStyle}
          data={[
            {label: 'Read', value: 'read'},
            {label: 'Write', value: 'write'},
          ]}
          labelField="label"
          valueField="value"
          //placeholder={!isFocus ? 'Select your role' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          placeholder={null}
        />

        <Text style={styles.btnText}>29th Oct, 2024</Text>
      </View>

      <View style={styles.rowContainer}>
        <Dropdown
          style={styles.button}
          //placeholderStyle={styles.placeholderStyle}
          data={dailyDrops}
          labelField="label"
          valueField="value"
          //placeholder={!isFocus ? 'Select your role' : '...'}
          value={selectedDay}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedDay(item.value);
            setIsFocus(false);
          }}
          placeholder={'Daily'}
        />

        <Dropdown
          style={styles.button}
          //placeholderStyle={styles.placeholderStyle}
          data={monthlyDrops}
          labelField="label"
          valueField="value"
          //placeholder={!isFocus ? 'Select your role' : '...'}
          value={selectedMonth}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedMonth(item.value);
            setIsFocus(false);
          }}
          placeholder={'Monthly'}
        />
        <Dropdown
          style={styles.button}
          //placeholderStyle={styles.placeholderStyle}
          data={yearlyDrops}
          labelField="label"
          valueField="value"
          //placeholder={!isFocus ? 'Select your role' : '...'}
          value={selectedYear}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedYear(item.value);
            setIsFocus(false);
          }}
          placeholder={'Yearly'}
        />
      </View>

      <View style={{marginTop: 10}}>
        <LineChart data={chartData} areaChart />
      </View>

      {/**
         *
         * <Image
        source={{
          uri: 'https://i.ibb.co/T2WNVJZ/Whats-App-Image-2024-07-14-at-12-46-02-AM-1.jpg',
        }}
        style={{width: '95%', height: 600, resizeMode: 'contain'}}
      />
         */}

      <View
        style={{
          height: 0.8,
          width: '96%',
          margin: 10,
          backgroundColor: '#c1c1c1',
        }}
      />

      <Text style={{...styles.btnText, fontSize: 17, marginStart: 10}}>
        Mostly Viewed Articles
      </Text>

      {article &&
        article.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                onArticleViewed({
                  articleId: Number(item._id),
                  authorId: item.authorId,
                });
              }}>
              <View style={styles.cardContainer}>
                {/* image */}

                {item?.imageUtils[0] && item?.imageUtils[0].length !== 0 ? (
                  <Image
                    source={{
                      uri: item?.imageUtils[0].startsWith('http')
                        ? item?.imageUtils[0]
                        : `${GET_IMAGE}/${item?.imageUtils[0]}`,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require('../assets/article_default.jpg')}
                    style={styles.image}
                  />
                )}

                <View style={styles.textContainer}>
                  {/* title */}
                  <Text style={styles.footerText}>
                    {item?.tags.map(tag => tag.name).join(' | ')}
                  </Text>
                  <Text style={styles.title}>{item?.title}</Text>
                  {/* description */}
                  {/**  <Text style={styles.description}>{item?.description}</Text> */}
                  {/* displaying the categories, author name, and last updated date */}

                  <Text style={{...styles.footerText, marginBottom: 3}}>
                    {item?.viewUsers
                      ? item?.viewUsers.length > 1
                        ? `${item?.viewUsers.length} views`
                        : `${item?.viewUsers.length} view`
                      : '0 view'}
                  </Text>
                  <Text style={styles.footerText}>
                    Last updated: {''}
                    {moment(new Date(item?.lastUpdated)).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  box: {
    width: '45%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    borderWidth: 1,
    padding: 6,
    borderColor: 'black',
    borderRadius: 8,
    flexDirection: 'column',
  },

  titleText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 4,
    fontWeight: '600',
  },

  valueText: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    marginVertical: 4,
    fontWeight: '500',
  },

  dropdown: {
    height: 30,
    width: '25%',
    // borderColor: '#0CAFFF',
    //borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    marginVertical: 6,
    paddingRight: 2,
  },

  button: {
    width: '30%',
    padding: 6,
    borderRadius: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1c1c1',
    borderColor: 'black',
  },
  btnText: {
    fontSize: 16,
    color: 'black',
  },
  cardContainer: {
    flex: 0,
    width: '100%',
    maxHeight: 150,
    backgroundColor: '#E6E6E6',
    flexDirection: 'row',

    marginVertical: 14,
    overflow: 'hidden',
    elevation: 4,

    borderRadius: 12,
  },
  image: {
    flex: 0.6,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
  title: {
    fontSize: fp(4.5),
    fontWeight: 'bold',
    color: '#121a26',
    marginBottom: 4,
    fontFamily: 'Lobster-Regular',
  },
  footerText: {
    fontSize: fp(3.3),
    fontWeight: '600',
    color: '#121a26',
    marginBottom: 3,
  },
});

export default ActivityOverview;
