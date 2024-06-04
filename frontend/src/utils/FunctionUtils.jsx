
import { Alert ,BackHandler} from "react-native";

export const handleBackButton = () =>{
    
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    
    }
  