import {StyleSheet} from 'react-native';
import {ON_PRIMARY_COLOR, PRIMARY_COLOR} from '../helper/Theme';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: ON_PRIMARY_COLOR,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    marginStart: 4,
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
  },
  btn: {
    height: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 24,
    padding: 3,
  },
  normalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 6,
  },
});

export default GlobalStyles;
