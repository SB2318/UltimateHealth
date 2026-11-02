import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BreathingTool from './BreathingTool';

interface BreathingModalProps {
  visible: boolean;
  onClose: () => void;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({
  visible,
  onClose,
}) => {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  const colors = {
    overlay: 'rgba(0, 0, 0, 0.65)',
    modalBg: isDark ? '#0F172A' : '#FFFFFF',
    border: isDark ? '#334155' : '#E2E8F0',
    title: isDark ? '#F8FAFC' : '#0F172A',
    subtitle: isDark ? '#94A3B8' : '#64748B',
    closeBg: isDark ? '#1E293B' : '#F1F5F9',
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: colors.modalBg,
              paddingBottom: Math.max(insets.bottom, 16) + 12,
            },
          ]}>
          {/* Sheet Handle */}
          <View style={[styles.handle, { backgroundColor: isDark ? '#475569' : '#CBD5E1' }]} />

          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: colors.title }]}>
                1-Minute Mindful Pause
              </Text>
              <Text style={[styles.subtitle, { color: colors.subtitle }]}>
                Calm your nervous system with rhythmic breathing
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: colors.closeBg }]}
              accessibilityRole="button"
              accessibilityLabel="Close breathing exercise">
              <Ionicons name="close" size={20} color={colors.title} />
            </TouchableOpacity>
          </View>

          {/* Breathing Exercise Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <BreathingTool
              defaultCycles={4}
              onSessionLogged={() => {}}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    height: '84%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
