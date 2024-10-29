import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../helper/Theme';
import * as Progress from 'react-native-progress';
import {Dropdown} from 'react-native-element-dropdown';
import {LineChart} from 'react-native-gifted-charts';
import moment from 'moment';
import { fp } from '../helper/Metric';

const ActivityOverview = () => {
  const [value, setValue] = useState<string>('read');
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
          <Text style={styles.valueText}>20</Text>
          <Progress.Bar
            progress={0.2}
            width={100}
            color={'black'}
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.titleText}> Total Writes</Text>
          <Text style={styles.valueText}>26</Text>

          <Progress.Bar
            progress={0.3}
            width={100}
            color={'green'}
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.box}>
          <Text style={styles.titleText}> Total Likes</Text>
          <Text style={styles.valueText}>20</Text>

          <Progress.Bar
            progress={0.2}
            width={100}
            color={'black'}
            borderRadius={0}
            style={{marginTop: 4}}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.titleText}> Total Views</Text>
          <Text style={styles.valueText}>46</Text>

          <Progress.Bar
            progress={0.4}
            width={100}
            color={SECONDARY_COLOR}
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

      <Text style={{...styles.btnText, fontSize: 14, marginStart: 10}}>
        Mostly Viewed Articles
      </Text>

      <Pressable>
        <View style={styles.cardContainer}>
          {/* image */}

          <Image
            source={require('../assets/article_default.jpg')}
            style={styles.image}
          />

          <View style={styles.textContainer}>
            {/* title */}
            <Text style={styles.footerText}>
              {/*item?.tags.map(tag => tag.name).join(' | ') */}
            </Text>
            <Text style={styles.title}>{'Health Article'}</Text>
            {/* description */}
            {/**  <Text style={styles.description}>{item?.description}</Text> */}
            {/* displaying the categories, author name, and last updated date */}

            <Text style={{...styles.footerText, marginBottom: 3}}>0 view</Text>
            <Text style={styles.footerText}>
              Last updated: {''}
              {moment(new Date()).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>

      <Pressable>
        <View style={styles.cardContainer}>
          {/* image */}

          <Image
            source={require('../assets/article_default.jpg')}
            style={styles.image}
          />

          <View style={styles.textContainer}>
            {/* title */}
            <Text style={styles.footerText}>
              {/*item?.tags.map(tag => tag.name).join(' | ') */}
            </Text>
            <Text style={styles.title}>{'Health Article'}</Text>
            {/* description */}
            {/**  <Text style={styles.description}>{item?.description}</Text> */}
            {/* displaying the categories, author name, and last updated date */}

            <Text style={{...styles.footerText, marginBottom: 3}}>0 view</Text>
            <Text style={styles.footerText}>
              Last updated: {''}
              {moment(new Date()).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>

      <Pressable>
        <View style={styles.cardContainer}>
          {/* image */}

          <Image
            source={require('../assets/article_default.jpg')}
            style={styles.image}
          />

          <View style={styles.textContainer}>
            {/* title */}
            <Text style={styles.footerText}>
              {/*item?.tags.map(tag => tag.name).join(' | ') */}
            </Text>
            <Text style={styles.title}>{'Health Article'}</Text>
            {/* description */}
            {/**  <Text style={styles.description}>{item?.description}</Text> */}
            {/* displaying the categories, author name, and last updated date */}

            <Text style={{...styles.footerText, marginBottom: 3}}>0 view</Text>
            <Text style={styles.footerText}>
              Last updated: {''}
              {moment(new Date()).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>
      
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
    color: 'green',
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
    maxHeight: 100,
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
