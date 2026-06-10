import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  ProfessionalColors,
  Spacing,
  BorderRadius,
  Typography,
} from "../styles/GlassStyles";
import { useGetCollectionDetail } from "../hooks/useCollectionDetail";
import { useRemoveArticleFromCollection } from "../hooks/useCollections";
import { BaseEmptyState } from "../components/EmptyStates";
import ArticleCard from "../components/ArticleCard";
import { ArticleData } from "../type";

const CollectionDetailScreen = ({ route, navigation }: any) => {
  const { collectionId, collectionName } = route.params;
  const isDark = useColorScheme() === "dark";
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCollectionDetail(collectionId, page);
  const { mutate: removeArticle } = useRemoveArticleFromCollection();

  const bgColor = isDark ? "#000" : "#F8FAFF";
  const textColor = isDark ? ProfessionalColors.white : ProfessionalColors.gray900;
  const mutedColor = isDark ? ProfessionalColors.gray400 : ProfessionalColors.gray500;

  const handleRemoveArticle = useCallback(
    (articleId: number) => {
      Alert.alert(
        "Remove Article",
        "Remove this article from the collection?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => removeArticle({ collectionId, articleId }),
          },
        ]
      );
    },
    [collectionId, removeArticle]
  );

  const handleArticlePress = useCallback(
    (article: ArticleData) => {
      navigation.navigate("ArticleScreen", {
        articleId: article._id,
        authorId: typeof article.authorId === "string" ? article.authorId : article.authorId?._id,
        recordId: article.pb_recordId,
      });
    },
    [navigation]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <FontAwesome6 name="arrow-left" size={20} color={ProfessionalColors.primary} />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <Text style={[Typography.h5, { color: textColor }]} numberOfLines={1}>
          {collectionName}
        </Text>
        {data && (
          <Text style={[Typography.caption, { color: mutedColor, marginTop: 2 }]}>
            {data.totalArticles} {data.totalArticles === 1 ? "article" : "articles"}
          </Text>
        )}
      </View>
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

  const dummyArticles: ArticleData[] = (data?.articleIds || []).map((id, idx) => ({
    _id: String(id),
    title: `Article ${id}`,
    authorName: "",
    description: "",
    authorId: "",
    content: "",
    summary: "",
    tags: [],
    lastUpdated: "",
    imageUtils: [],
    viewCount: 0,
    viewUsers: [],
    repostUsers: [],
    likeCount: 0,
    likedUsers: [],
    savedUsers: [],
    mentionedUsers: [],
    language: "",
    assigned_date: null,
    discardReason: "",
    status: "",
    reviewer_id: null,
    contributors: [],
    pb_recordId: "",
  }));

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
      {renderHeader()}

      {!data || data.articleIds.length === 0 ? (
        <BaseEmptyState
          iconComponent={
            <FontAwesome6 name="bookmark" size={44} color={ProfessionalColors.primary} />
          }
          title="Collection is Empty"
          description="Save articles to this collection to see them here."
        />
      ) : (
        <>
          <FlatList
            data={dummyArticles}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.articleRow}>
                <TouchableOpacity
                  style={styles.articleContent}
                  onPress={() => handleArticlePress(item)}
                >
                  <Text style={[Typography.body, { color: textColor }]}>
                    {item._id}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveArticle(parseInt(item._id))}
                >
                  <FontAwesome6
                    name="xmark"
                    size={14}
                    color={ProfessionalColors.error}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {data && data.totalPages > 1 && (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[
                  styles.pageBtn,
                  { opacity: page <= 1 ? 0.4 : 1 },
                ]}
                disabled={page <= 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <FontAwesome6
                  name="chevron-left"
                  size={16}
                  color={ProfessionalColors.primary}
                />
              </TouchableOpacity>
              <Text style={[Typography.bodySmall, { color: mutedColor }]}>
                {page} / {data.totalPages}
              </Text>
              <TouchableOpacity
                style={[
                  styles.pageBtn,
                  { opacity: page >= data.totalPages ? 0.4 : 1 },
                ]}
                disabled={page >= data.totalPages}
                onPress={() => setPage((p) => p + 1)}
              >
                <FontAwesome6
                  name="chevron-right"
                  size={16}
                  color={ProfessionalColors.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
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
  headerInfo: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.huge,
  },
  articleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  articleContent: {
    flex: 1,
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(239,68,68,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.lg,
    gap: Spacing.lg,
  },
  pageBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,191,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CollectionDetailScreen;
