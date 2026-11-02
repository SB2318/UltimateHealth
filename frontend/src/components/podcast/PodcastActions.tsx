// @ts-nocheck
import React, { useCallback, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {
    BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Icon from '@expo/vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../lib/ui/Theme';


const ActionItem = ({
  icon,
  label,
  onPress,
  iconColor,
  itemBg,
  labelColor,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  iconColor?: string;
  itemBg?: string;
  labelColor?: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.actionItem, itemBg ? { backgroundColor: itemBg } : null]}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={label}>
    <View style={[styles.iconContainer, iconColor && {backgroundColor: `${iconColor}15`}]}>
      <Icon name={icon as any} size={22} color={iconColor || PRIMARY_COLOR} />
    </View>
    <Text style={[styles.label, labelColor ? { color: labelColor } : null]}>{label}</Text>
  </TouchableOpacity>
);


interface Props {
   onShare: ()=> void;
  onReport: ()=> void;
  onDownload: ()=> void;
  onSave: ()=> void;
  downloaded: boolean;
}
 
const PodcastActions = React.forwardRef(
  ({ onShare, onReport, onDownload, onSave, downloaded}: Props, ref: any) => {
    const isDark = useColorScheme() === 'dark';
    const snapPoints = useMemo(() => ['42%'], []);

    const handleAction = (action: () => void) => {
      ref?.current?.dismiss();
      // Delay opening next dialog so bottom sheet dismiss animation completes cleanly without modal conflict
      setTimeout(() => {
        action();
      }, 350);
    };

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    const sheetBg = isDark ? '#1E293B' : '#FFFFFF';
    const titleColor = isDark ? '#F1F5F9' : '#0F172A';
    const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0';
    const itemBg = isDark ? '#0F172A' : '#F8FAFC';
    const labelColor = isDark ? '#E2E8F0' : '#1E293B';

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: sheetBg }}
        handleIndicatorStyle={{ backgroundColor: isDark ? '#64748B' : '#CBD5E1' }}
      >
        <BottomSheetView style={[styles.sheetContent, { backgroundColor: sheetBg }]}>
          <Text style={[styles.sheetTitle, { color: titleColor, borderBottomColor: borderColor }]}>
            Podcast Actions
          </Text>
          <ActionItem
            icon="share"
            label="Share"
            onPress={() => handleAction(onShare)}
            iconColor="#3b82f6"
            itemBg={itemBg}
            labelColor={labelColor}
          />
          <ActionItem
            icon="playlist-add"
            label="Save to Playlist"
            onPress={() => handleAction(onSave)}
            iconColor={PRIMARY_COLOR}
            itemBg={itemBg}
            labelColor={labelColor}
          />
          <ActionItem
            icon="file-download"
            label={downloaded ? 'Remove from downloads' : 'Download'}
            onPress={() => handleAction(onDownload)}
            iconColor="#10b981"
            itemBg={itemBg}
            labelColor={labelColor}
          />
          <ActionItem
            icon="flag"
            label="Report"
            onPress={() => handleAction(onReport)}
            iconColor="#ef4444"
            itemBg={itemBg}
            labelColor={labelColor}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);


export default PodcastActions;


const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    flex: 1,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});