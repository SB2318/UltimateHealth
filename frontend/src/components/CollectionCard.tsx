import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Platform,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ProfessionalColors, Spacing, BorderRadius } from "../styles/GlassStyles";
import { BookmarkCollection } from "../type";

interface CollectionCardProps {
  collection: BookmarkCollection;
  onPress: (collection: BookmarkCollection) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onPress,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(collection)}
      style={[
        styles.card,
        {
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(15, 82, 186, 0.04)",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.06)",
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark
              ? "rgba(0, 191, 255, 0.15)"
              : "rgba(0, 191, 255, 0.1)",
          },
        ]}
      >
        <FontAwesome6
          name="folder"
          size={24}
          color={ProfessionalColors.primary}
        />
      </View>
      <Text
        style={[
          styles.name,
          { color: isDark ? ProfessionalColors.white : ProfessionalColors.gray900 },
        ]}
        numberOfLines={1}
      >
        {collection.name}
      </Text>
      <Text
        style={[
          styles.count,
          { color: isDark ? ProfessionalColors.gray400 : ProfessionalColors.gray500 },
        ]}
      >
        {collection.articleCount} {collection.articleCount === 1 ? "article" : "articles"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  count: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
  },
});
