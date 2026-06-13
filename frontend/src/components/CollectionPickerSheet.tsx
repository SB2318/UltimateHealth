import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {PRIMARY_COLOR} from '../helper/Theme';
import {Collection} from '../type';

type CollectionPickerSheetProps = {
  visible: boolean;
  collections: Collection[];
  isLoading: boolean;
  onSelectCollection: (collectionId: string) => void;
  onCreateCollection: (name: string) => void;
  onClose: () => void;
};

const CollectionPickerSheet = ({
  visible,
  collections,
  isLoading,
  onSelectCollection,
  onCreateCollection,
  onClose,
}: CollectionPickerSheetProps) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      Alert.alert('Error', 'Please enter a collection name');
      return;
    }
    onCreateCollection(trimmed);
    setNewName('');
    setShowCreate(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Save to Collection</Text>

          {showCreate ? (
            <View style={styles.createContainer}>
              <TextInput
                style={styles.input}
                placeholder="Collection name"
                value={newName}
                onChangeText={setNewName}
                autoFocus
                maxLength={100}
              />
              <View style={styles.createActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowCreate(false);
                    setNewName('');
                  }}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreate}>
                  <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              {isLoading ? (
                <Text style={styles.loadingText}>Loading collections...</Text>
              ) : collections.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <FontAwesome name="folder-open" size={40} color="#ccc" />
                  <Text style={styles.emptyText}>No collections yet</Text>
                  <TouchableOpacity
                    style={styles.createFirstButton}
                    onPress={() => setShowCreate(true)}>
                    <Text style={styles.createFirstText}>
                      Create your first collection
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <FlatList
                  data={collections}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.collectionItem}
                      onPress={() => onSelectCollection(item._id)}>
                      <FontAwesome
                        name="folder"
                        size={24}
                        color={PRIMARY_COLOR}
                      />
                      <View style={styles.collectionInfo}>
                        <Text style={styles.collectionName}>{item.name}</Text>
                        <Text style={styles.collectionCount}>
                          {item.articleCount}{' '}
                          {item.articleCount === 1 ? 'article' : 'articles'}
                        </Text>
                      </View>
                      <FontAwesome
                        name="chevron-right"
                        size={16}
                        color="#ccc"
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
              <TouchableOpacity
                style={styles.newCollectionButton}
                onPress={() => setShowCreate(true)}>
                <FontAwesome name="plus-circle" size={20} color={PRIMARY_COLOR} />
                <Text style={styles.newCollectionText}>
                  Create New Collection
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CollectionPickerSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    maxHeight: '70%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  createContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  createActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C6C6D',
  },
  createButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loadingText: {
    textAlign: 'center',
    color: '#6C6C6D',
    fontSize: 14,
    paddingVertical: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#6C6C6D',
    marginTop: 8,
    marginBottom: 16,
  },
  createFirstButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
  },
  createFirstText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  collectionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  collectionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  collectionCount: {
    fontSize: 12,
    color: '#6C6C6D',
    marginTop: 2,
  },
  newCollectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 8,
  },
  newCollectionText: {
    fontSize: 15,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
});
