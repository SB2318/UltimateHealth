import { StyleProp, ViewStyle } from 'react-native';

declare module 'react-native-safe-area-context' {
  interface NativeSafeAreaViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    edges?: ('top' | 'bottom' | 'left' | 'right')[];
  }
}

export {};
