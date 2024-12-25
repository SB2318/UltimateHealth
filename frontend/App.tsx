/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import {Platform, StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PRIMARY_COLOR} from './src/helper/Theme';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  /*
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleSocket = () => {
    const newSocket = io('http://localhost:8080'); // HTTP didn't work either
    // newSocket.connect(); //? manual connection didn't work
    console.log(newSocket.connected); // false
    setSocket(newSocket);
  };
  useEffect(() => {
    handleSocket();
  }, [setSocket]);
*/
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const BarStyle = Platform.OS === 'ios' ? 'dark-content' : 'light-content';
  const navigationContainerRef = useRef();

  useEffect(() => {
    // const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage); // when app is in foreground
      const data = remoteMessage.data;
      // handleNotification(data);
      PushNotification.localNotification({
        // channelId: 'default-channel-id',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        playSound: true,
        soundName: 'default',
        priority: 'high',
        visibility: 'public',
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background notification received:', remoteMessage); // wjem app is in bg
      const data = remoteMessage.data;
      handleNotification(data);
    });

    // On app open

    const onOpenApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open:', remoteMessage);
      const data = remoteMessage.data;
      handleNotification(data);
    });

    return () => {
      unsubscribe();
      onOpenApp();
    };
  }, []);

  const handleNotification = data => {
    if (!navigationContainerRef.current) {
      return;
    }
    if (data?.action === 'openPost') {
      navigationContainerRef.current.navigate('ArticleScreen', {
        articleId: Number(data?.postId),
        authorId: data?.authorId.toString(),
      });
    } else if (data?.action === 'likePost') {
      navigationContainerRef.current.navigate('NotificationScreen');
    } else if (data?.action === 'commentPost') {
      navigationContainerRef.current.navigate('CommentScreen', {
        articleId: Number(data?.postId),
      });
    } else if (data?.action === 'commentLikePost') {
      navigationContainerRef.current.navigate('NotificationScreen');
    } else if (data?.action === 'userFollow') {
      navigationContainerRef.current.navigate('NotificationScreen');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap your app with SocketProvider */}
      <SafeAreaProvider>
        <View
          style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : BarStyle}
            backgroundColor={
              isDarkMode ? backgroundStyle.backgroundColor : PRIMARY_COLOR
            }
          />
          <NavigationContainer ref={navigationContainerRef}>
            <StackNavigation />
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
