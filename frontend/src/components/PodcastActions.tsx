import React, { useCallback, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
    BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ON_PRIMARY_COLOR } from '../helper/Theme';

const ActionItem = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.actionItem}>
    <Icon name={icon} size={24} style={{ marginRight: 12 }} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const PodcastActions = React.forwardRef(
  ({ onShare, onReport, onDownload, onSave }: any, ref: any) => {
    const snapPoints = useMemo(() => ['40%'], []);

    const handleAction = (action: () => void) => {
      action();
      ref?.current?.dismiss();
    };

    const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: ON_PRIMARY_COLOR }}
      >
        <BottomSheetView style={styles.sheetContent}>
          <ActionItem icon="share" label="Share" onPress={() => handleAction(onShare)} />
          <ActionItem icon="flag" label="Report" onPress={() => handleAction(onReport)} />
          <ActionItem icon="file-download" label="Download" onPress={() => handleAction(onDownload)} />
          <ActionItem icon="playlist-add" label="Save to Playlist" onPress={() => handleAction(onSave)} />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default PodcastActions;

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
  },
});
