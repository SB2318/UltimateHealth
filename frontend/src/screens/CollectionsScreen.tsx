import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  useColorScheme,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  ProfessionalColors,
  Spacing,
  BorderRadius,
  Typography,
} from "../styles/GlassStyles";
import { CollectionCard } from "../components/CollectionCard";
import {
  useGetCollections,
  useCreateCollection,
  useDeleteCollection,
} from "../hooks/useCollections";
import { BookmarkCollection } from "../type";
import { BaseEmptyState } from "../components/EmptyStates";

const CollectionsScreen = ({ navigation }: any) => {
  const isDark = useColorScheme() === "dark";
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const { data: collections, isLoading } = useGetCollections();
  const { mutate: createCollection, isPending: isCreating } =
    useCreateCollection();
  const { mutate: deleteCollection } = useDeleteCollection();

  const bgColor = isDark ? "#000" : "#F8FAFF";
  const textColor = isDark ? ProfessionalColors.white : ProfessionalColors.gray900;
  const mutedColor = isDark ? ProfessionalColors.gray400 : ProfessionalColors.gray500;

  const handleCreate = useCallback(() => {
    if (!newName.trim()) return;
    createCollection(
      { name: newName.trim(), description: newDescription.trim() },
      {
        onSuccess: () => {
          setNewName("");
          setNewDescription("");
          setModalVisible(false);
        },
      }
    );
  }, [newName, newDescription, createCollection]);

  const handleDelete = useCallback(
    (collection: BookmarkCollection) => {
      Alert.alert(
        "Delete Collection",
        `Are you sure you want to delete "${collection.name}"? Articles are not affected.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteCollection(collection._id),
          },
        ]
      );
    },
    [deleteCollection]
  );

  const handlePress = useCallback(
    (collection: BookmarkCollection) => {
      navigation.navigate("CollectionDetailScreen", {
        collectionId: collection._id,
        collectionName: collection.name,
      });
    },
    [navigation]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <FontAwesome6 name="arrow-left" size={20} color={ProfessionalColors.primary} />
      </TouchableOpacity>
      <Text style={[Typography.h4, { color: textColor, flex: 1 }]}>
        Collections
      </Text>
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: ProfessionalColors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome6 name="plus" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
        {renderHeader()}
        <ActivityIndicator
          color={ProfessionalColors.primary}
          size="large"
          style={{ marginTop: 100 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
      {renderHeader()}

      {!collections || collections.length === 0 ? (
        <BaseEmptyState
          iconComponent={
            <FontAwesome6 name="folder-open" size={44} color={ProfessionalColors.primary} />
          }
          title="No Collections Yet"
          description="Create collections to organize your saved articles by topic."
          actionText="Create Collection"
          onAction={() => setModalVisible(true)}
        />
      ) : (
        <FlatList
          data={collections}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <CollectionCard collection={item} onPress={handlePress} />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item)}
              >
                <FontAwesome6 name="trash-can" size={14} color={ProfessionalColors.error} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: isDark ? "#1C1C1E" : ProfessionalColors.white,
              },
            ]}
          >
            <Text style={[Typography.h5, { color: textColor, marginBottom: Spacing.lg }]}>
              New Collection
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: isDark
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.15)",
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.03)",
                },
              ]}
              placeholder="Collection name"
              placeholderTextColor={mutedColor}
              value={newName}
              onChangeText={setNewName}
              autoFocus
            />
            <TextInput
              style={[
                styles.input,
                {
                  color: textColor,
                  borderColor: isDark
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.15)",
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.03)",
                },
              ]}
              placeholder="Description (optional)"
              placeholderTextColor={mutedColor}
              value={newDescription}
              onChangeText={setNewDescription}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "transparent" }]}
                onPress={() => {
                  setModalVisible(false);
                  setNewName("");
                  setNewDescription("");
                }}
              >
                <Text style={{ color: mutedColor, fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalBtn,
                  {
                    backgroundColor: ProfessionalColors.primary,
                    opacity: !newName.trim() || isCreating ? 0.5 : 1,
                  },
                ]}
                onPress={handleCreate}
                disabled={!newName.trim() || isCreating}
              >
                {isCreating ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Create</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.huge,
  },
  row: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    position: "relative",
    width: "48%",
  },
  deleteBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(239,68,68,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: { elevation: 10 },
    }),
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 15,
    marginBottom: Spacing.md,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  modalBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
});

export default CollectionsScreen;
