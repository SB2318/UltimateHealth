import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {PRIMARY_COLOR} from '../helper/Theme';
import {useCollections, useCreateCollection, useDeleteCollection} from '../hooks/useCollections';
import CollectionCard from '../components/CollectionCard';
import Loader from '../components/Loader';
import {CollectionScreenProp} from '../type';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CollectionsScreen = ({navigation}: CollectionScreenProp) => {
  const {isGuest} = useSelector((state: any) => state.user);
  const {data: collections, isLoading} = useCollections();
  const {mutate: createCollection, isPending: createPending} = useCreateCollection();
  const {mutate: deleteCollection} = useDeleteCollection();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      Alert.alert('Error', 'Please enter a collection name');
      return;
    }
    createCollection({name: trimmed, description: newDescription.trim() || undefined}, {
      onSuccess: () => {
        setShowCreateModal(false);
        setNewName('');
        setNewDescription('');
      },
      onError: () => {
        Alert.alert('Error', 'Failed to create collection');
      },
    });
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Collection',
      `Are you sure you want to delete "${name}"? Articles in this collection will not be deleted.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCollection(id),
        },
      ],
    );
  };

  if (isGuest) {
    navigation.navigate('GuestPlaceholderScreen', {
      title: 'Sign In Required',
      description: 'Please sign in to manage your collections.',
      iconName: 'folder',
    });
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collections</Text>
        <TouchableOpacity onPress={() => setShowCreateModal(true)}>
          <FontAwesome name="plus" size={24} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={collections || []}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <CollectionCard
            name={item.name}
            articleCount={item.articleCount}
            onPress={() =>
              navigation.navigate('CollectionDetailScreen', {
                collectionId: item._id,
                collectionName: item.name,
              })
            }
            onLongPress={() => handleDelete(item._id, item.name)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="folder-open" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>No Collections Yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + button to create your first collection and start
              organizing your saved articles.
            </Text>
          </View>
        }
      />

      <Modal visible={showCreateModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Collection</Text>

            <TextInput
              style={styles.input}
              placeholder="Collection name"
              value={newName}
              onChangeText={setNewName}
              maxLength={100}
              autoFocus
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description (optional)"
              value={newDescription}
              onChangeText={setNewDescription}
              maxLength={300}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowCreateModal(false);
                  setNewName('');
                  setNewDescription('');
                }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createButton, createPending && {opacity: 0.6}]}
                onPress={handleCreate}
                disabled={createPending}>
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CollectionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  listContent: {
    padding: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6C6C6D',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
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
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
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
});
