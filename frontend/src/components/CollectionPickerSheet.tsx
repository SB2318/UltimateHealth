import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  ProfessionalColors,
  Spacing,
  BorderRadius,
  Typography,
} from "../styles/GlassStyles";
import { BookmarkCollection } from "../type";
import {
  useGetCollections,
  useCreateCollection,
  useAddArticleToCollection,
} from "../hooks/useCollections";

interface CollectionPickerSheetProps {
  articleId: number;
  onArticleSaved?: () => void;
  children: (handlePresent: () => void) => React.ReactNode;
}

export const CollectionPickerSheet: React.FC<CollectionPickerSheetProps> = ({
  articleId,
  onArticleSaved,
  children,
}) => {
  const isDark = useColorScheme() === "dark";
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const { data: collections, isLoading } = useGetCollections();
  const { mutate: createCollection, isPending: isCreating } =
    useCreateCollection();
  const { mutate: addArticle } = useAddArticleToCollection();

  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const handlePresent = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleSaveToCollection = useCallback(
    (collectionId: string) => {
      addArticle(
        { collectionId, articleId },
        {
          onSuccess: () => {
            bottomSheetRef.current?.dismiss();
            onArticleSaved?.();
          },
        }
      );
    },
    [articleId, addArticle, onArticleSaved]
  );

  const handleCreateAndSave = useCallback(() => {
    if (!newName.trim()) return;
    createCollection(
      { name: newName.trim(), description: newDescription.trim() },
      {
        onSuccess: (collection) => {
          setNewName("");
          setNewDescription("");
          setShowCreate(false);
          addArticle(
            { collectionId: collection._id, articleId },
            {
              onSuccess: () => {
                bottomSheetRef.current?.dismiss();
                onArticleSaved?.();
              },
            }
          );
        },
      }
    );
  }, [newName, newDescription, createCollection, addArticle, articleId, onArticleSaved]);

  const textColor = isDark ? ProfessionalColors.white : ProfessionalColors.gray900;
  const mutedColor = isDark ? ProfessionalColors.gray400 : ProfessionalColors.gray500;

  return (
    <>
      {children(handlePresent)}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        )}
        backgroundStyle={{
          backgroundColor: isDark ? "#1C1C1E" : ProfessionalColors.white,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? ProfessionalColors.gray500 : ProfessionalColors.gray300,
        }}
      >
        <View style={styles.container}>
          <Text
            style={[Typography.h5, { color: textColor, marginBottom: Spacing.lg }]}
          >
            Save to Collection
          </Text>

          {isLoading ? (
            <ActivityIndicator color={ProfessionalColors.primary} size="large" />
          ) : showCreate ? (
            <View style={styles.createForm}>
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
              <View style={styles.createActions}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnCancel]}
                  onPress={() => {
                    setShowCreate(false);
                    setNewName("");
                    setNewDescription("");
                  }}
                >
                  <Text style={{ color: mutedColor, fontWeight: "600" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      backgroundColor: ProfessionalColors.primary,
                      opacity: !newName.trim() || isCreating ? 0.5 : 1,
                    },
                  ]}
                  onPress={handleCreateAndSave}
                  disabled={!newName.trim() || isCreating}
                >
                  {isCreating ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      Create & Save
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.createRow}
                onPress={() => setShowCreate(true)}
              >
                <FontAwesome6
                  name="plus"
                  size={16}
                  color={ProfessionalColors.primary}
                />
                <Text
                  style={{
                    color: ProfessionalColors.primary,
                    fontWeight: "600",
                    marginLeft: Spacing.sm,
                  }}
                >
                  Create New Collection
                </Text>
              </TouchableOpacity>

              <View style={styles.list}>
                {collections?.map((col) => (
                  <TouchableOpacity
                    key={col._id}
                    style={[
                      styles.collectionItem,
                      {
                        borderBottomColor: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)",
                      },
                    ]}
                    onPress={() => handleSaveToCollection(col._id)}
                  >
                    <FontAwesome6
                      name="folder"
                      size={18}
                      color={ProfessionalColors.primary}
                    />
                    <View style={styles.collectionInfo}>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight: "500",
                          fontSize: 15,
                        }}
                      >
                        {col.name}
                      </Text>
                      <Text
                        style={{
                          color: mutedColor,
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        {col.articleCount} articles
                      </Text>
                    </View>
                    <FontAwesome6
                      name="chevron-right"
                      size={14}
                      color={mutedColor}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  createForm: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 15,
    marginBottom: Spacing.md,
  },
  createActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  btn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  btnCancel: {
    backgroundColor: "transparent",
  },
  createRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },
  list: {
    flex: 1,
  },
  collectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  collectionInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
});
