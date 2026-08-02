import React from 'react';
import {
  Modal,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;

  showAcademyCard: boolean;
  setShowAcademyCard: React.Dispatch<React.SetStateAction<boolean>>;

  showCategoryFilters: boolean;
  setShowCategoryFilters: React.Dispatch<React.SetStateAction<boolean>>;

  showSavedFilter: boolean;
  setShowSavedFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomizeHomepageModal = ({
  visible,
  onClose,
  onSave,
  onReset,
  showAcademyCard,
  setShowAcademyCard,
  showCategoryFilters,
  setShowCategoryFilters,
  showSavedFilter,
  setShowSavedFilter,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Customize Homepage</Text>

          <View style={styles.row}>
            <Text>Show Academy Card</Text>
            <Switch
              value={showAcademyCard}
              onValueChange={setShowAcademyCard}
            />
          </View>

          <View style={styles.row}>
            <Text>Show Category Filters</Text>
            <Switch
              value={showCategoryFilters}
              onValueChange={setShowCategoryFilters}
            />
          </View>

          <View style={styles.row}>
            <Text>Show Saved Filter</Text>
            <Switch
              value={showSavedFilter}
              onValueChange={setShowSavedFilter}
            />
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={onReset}
          >
            <Text style={styles.resetText}>Reset to Default</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={onSave}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomizeHomepageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  saveButton: {
    backgroundColor: '#000A60',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  resetButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  resetText: {
    color: '#000A60',
    fontWeight: 'bold',
  },

  cancel: {
    marginTop: 15,
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});