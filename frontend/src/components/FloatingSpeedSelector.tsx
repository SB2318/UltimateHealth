import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

interface FloatingSpeedSelectorProps {
  visible: boolean;
  currentSpeed: number;
  onSelect: (speed: number) => void;
  onClose: () => void;
}

const FloatingSpeedSelector: React.FC<FloatingSpeedSelectorProps> = ({
  visible,
  currentSpeed,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Playback Speed</Text>
          {SPEEDS.map(speed => (
            <TouchableOpacity
              key={speed}
              style={[
                styles.speedItem,
                currentSpeed === speed && styles.selectedItem,
              ]}
              onPress={() => {
                onSelect(speed);
                onClose();
              }}>
              <Text
                style={[
                  styles.speedText,
                  currentSpeed === speed && styles.selectedText,
                ]}>
                {Number.isInteger(speed) ? `${speed}x` : `${speed}x`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 180,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  speedItem: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  selectedItem: {
    backgroundColor: '#3B82F6',
  },
  speedText: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});

export default FloatingSpeedSelector;
