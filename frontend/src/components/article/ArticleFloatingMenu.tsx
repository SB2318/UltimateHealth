import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ArticleFloatingMenuProp {
  visible: boolean;
  items: Item[];
  onDismiss: () => void;
}

interface Item {
  name: string;
  articleId: string;
  action: () => void;
  icon: string;
}

export default function ArticleFloatingMenuSheet({
  visible,
  items,
  onDismiss,
}: ArticleFloatingMenuProp) {
  const isDarkMode = useColorScheme() === 'dark';

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Close article options menu"
        />
        <View
          style={[
            styles.sheetContainer,
            {backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF'},
          ]}>
          <View style={styles.handleIndicator} />
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            {items.map((item, index) => (
              <TouchableOpacity
                key={`${item.name}-${item.articleId}-${index}`}
                style={[
                  styles.menuItem,
                  {backgroundColor: isDarkMode ? '#374151' : '#F3F4F6'},
                ]}
                activeOpacity={0.75}
                onPress={() => {
                  onDismiss();
                  setTimeout(() => {
                    item.action();
                  }, 120);
                }}
                accessibilityRole="button"
                accessibilityLabel={item.name}>
                <AntDesign
                  name={item.icon as any}
                  size={20}
                  color={isDarkMode ? '#F9FAFB' : '#111827'}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    {color: isDarkMode ? '#F9FAFB' : '#111827'},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.cancelButton,
                {borderColor: isDarkMode ? '#4B5563' : '#E5E7EB'},
              ]}
              activeOpacity={0.75}
              onPress={onDismiss}
              accessibilityRole="button"
              accessibilityLabel="Cancel">
              <Text
                style={[
                  styles.cancelText,
                  {color: isDarkMode ? '#D1D5DB' : '#4B5563'},
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  handleIndicator: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    gap: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 4,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
