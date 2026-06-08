import { useNetInfo } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const netInfo = useNetInfo();
  
  // netInfo.isConnected can be null during initialization, default to true or false.
  // Using true avoids flashing offline UI initially.
  const isConnected = netInfo.isConnected ?? true;

  return {
    isConnected,
    isInternetReachable: netInfo.isInternetReachable,
    type: netInfo.type,
  };
};
