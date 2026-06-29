import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {useCallback, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {setPodcasts} from '../store/dataSlice';
import {RootStackParamList, Category} from '../type';
import FilterModal from './FilterModal';
import {
  XStack,
  YStack,
  Button,
  Popover,
  Separator,
  Text,
} from 'tamagui';
import {Feather, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFilterPodcasts} from '../hooks/useFilterPodcasts';

interface Props {
  onClick: () => void;
}

const HeaderRightMenu = ({onClick}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const surface = isDarkMode ? '#1F2937' : '#FFFFFF';
  const text = isDarkMode ? '#F9FAFB' : '#333333';
  const mutedText = isDarkMode ? '#D1D5DB' : '#555555';
  const hoverSurface = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortingType, setSortingType] = useState<string>('');
  const [selectCategoryList, setSelectedCategoryList] = useState<Category[]>(
    [],
  );

  const {categories} = useAppSelector((state: any) => state.data);
  const {isGuest} = useAppSelector((state: any) => state.user);
  const {isConnected} = useAppSelector((state: any) => state.network);
  const dispatch = useAppDispatch();

  const {mutate: filterPodcast} = useFilterPodcasts();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setMenuOpen(false);
  }, []);


  const handleCategorySelection = (category: any) => {
    setSelectedCategoryList(prevList => {
      const isAlreadySelected = prevList.some((p: Category) => 
        (p.id !== undefined && category.id !== undefined && p.id === category.id) ||
        (p._id !== undefined && category._id !== undefined && p._id === category._id) ||
        (p.name === category.name)
      );
      return isAlreadySelected
        ? prevList.filter(item => !(
            (item.id !== undefined && category.id !== undefined && item.id === category.id) ||
            (item._id !== undefined && category._id !== undefined && item._id === category._id) ||
            (item.name === category.name)
          ))
        : [...prevList, category as Category];
    });
  };

  const handleFilterReset = () => {
    setSelectedCategoryList([]);
    setSortingType('');
  };

  return (
    <SafeAreaView>
      <XStack alignItems="center" space="$3" marginRight="$3">
        <Button
          size="$5"
          circular
          backgroundColor={surface}
          icon={<Feather name="search" size={20} color={text} />}
          onPress={onClick}
          pressStyle={{opacity: 0.7}}
        />

        {/* ⋮ Menu Button */}
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <Button
              size="$5"
              circular
              backgroundColor={surface}
              icon={
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={20}
                  color={text}
                />
              }
              pressStyle={{opacity: 0.7}}
            />
          </Popover.Trigger>

          <Popover.Content
            backgroundColor={surface}
            borderRadius="$4"
            elevation="$3"
            padding="$1"
            width={150}
            shadowColor="rgba(0,0,0,0.15)">
            <YStack>
              {/* Menu Row: Profile */}
              <XStack
                alignItems="flex-start"
                justifyContent="space-between"
                paddingVertical="$2"
                paddingHorizontal="$2"
                borderRadius="$4"
                hoverStyle={{backgroundColor: hoverSurface}}
                pressStyle={{opacity: 0.8}}
                onPress={() => {
                  setMenuOpen(false);
                  if (isGuest) {
                    navigation.navigate('GuestPlaceholderScreen', {
                      title: 'Sign In Required',
                      description:
                        'Please sign in or sign up to view your podcast profile.',
                      iconName: 'user',
                    });
                    return;
                  }
                  navigation.navigate('PodcastProfile');
                }}>
                <Text fontSize={15} color={text}>
                  Profile
                </Text>
                <FontAwesome name="user" size={17} color={mutedText} />
              </XStack>

              {/* Menu Row: Downloads */}
              <XStack
                alignItems="flex-start"
                justifyContent="space-between"
                paddingVertical="$2"
                paddingHorizontal="$1"
                borderRadius="$4"
                hoverStyle={{backgroundColor: hoverSurface}}
                pressStyle={{opacity: 0.8}}
                onPress={() => {
                  setMenuOpen(false);
                  if (isGuest) {
                    navigation.navigate('GuestPlaceholderScreen', {
                      title: 'Sign In Required',
                      description: 'Please sign in or sign up to view your downloads.',
                      iconName: 'download',
                    });
                    return;
                  }
                  navigation.navigate('OfflinePodcastList');
                }}>
                <Text fontSize={15} color={text}>
                  Downloads
                </Text>
                <Feather name="download" size={17} color={mutedText} />
              </XStack>

              <Separator marginVertical="$1" />

              {/* Menu Row: Filter */}
              <XStack
                alignItems="center"
                justifyContent="space-between"
                paddingVertical="$3"
                paddingHorizontal="$3"
                borderRadius="$4"
                hoverStyle={{backgroundColor: hoverSurface}}
                pressStyle={{opacity: 0.8}}
                onPress={handlePresentModalPress}>
                <Text fontSize={15} color={text}>
                  Filter
                </Text>
                <Feather name="filter" size={17} color={mutedText} />
              </XStack>
            </YStack>
          </Popover.Content>
        </Popover>

        <FilterModal
          bottomSheetModalRef={bottomSheetModalRef}
          categories={categories}
          handleCategorySelection={handleCategorySelection}
          selectCategoryList={selectCategoryList}
          handleFilterReset={handleFilterReset}
          handleFilterApply={() => {
            if (isConnected) {
              if (selectCategoryList.length > 0 && isConnected) {
                
                filterPodcast(
                  {
                    selectedCategoryList: selectCategoryList,
                    sortingType: sortingType,
                  },
                  {
                    onSuccess: data => {
                      dispatch(setPodcasts(data));
                    },
                    onError: () => {
                      Snackbar.show({
                        text: 'You are offline',
                        duration: Snackbar.LENGTH_SHORT,
                      });
                    },
                  },
                );
              } else {
                Snackbar.show({
                  text: 'Please check your internet connection!',
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
            } else {
              Snackbar.show({
                text: 'You are offline',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }}
          setSortingType={setSortingType}
          sortingType={sortingType}
        />
      </XStack>
    </SafeAreaView>
  );
};

export default HeaderRightMenu;
