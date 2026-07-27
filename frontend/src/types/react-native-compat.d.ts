import 'react-native';
import 'tamagui';

declare module 'react-native' {
  interface TextInputProps {
    id?: string;
    name?: string;
  }
}

declare module 'tamagui' {
  interface InputExtraProps {
    id?: string;
    name?: string;
  }
}
