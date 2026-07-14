import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { ArticleCardProps, ArticleData } from '../type';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PRIMARY_COLOR } from '../helper/Theme';

const { width } = Dimensions.get('window');

const UserArticleCard = ({
  item,
  navigation,
  isSelected,
  setSelectedCardId,
}: ArticleCardProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Safe extraction of author info based on previous fixes
  const authorName = typeof item.authorId === 'object' && item.authorId !== null 
    ? (item.authorId as any).user_name 
    : item.authorName || 'Unknown Author';
    
  const authorImage = typeof item.authorId === 'object' && item.authorId !== null 
    ? (item.authorId as any).Profile_image 
    : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

  const handlePress = () => {
    setSelectedCardId(String(item._id));
    const finalAuthorId = typeof item.authorId === 'object' && item.authorId !== null 
      ? (item.authorId as any)._id 
      : String(item.authorId);

    const nav = navigation as any;
    nav.navigate('ArticleScreen', {
      articleId: Number(item._id),
      authorId: finalAuthorId,
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.cardContainer,
        {
          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          borderColor: isDarkMode ? '#374151' : '#F1F5F9',
          transform: [{ scale: pressed ? 0.98 : 1 }],
          shadowColor: isDarkMode ? '#000' : '#8A9DB0',
        },
      ]}>
      
      {/* Top Section: Author & Meta */}
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: authorImage }}
            style={[
              styles.avatar,
              { backgroundColor: isDarkMode ? '#374151' : '#E5E7EB' },
            ]}
          />
          <View>
            <Text style={[styles.authorName, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
              {authorName}
            </Text>
            <Text style={[styles.metaText, { color: isDarkMode ? '#9CA3AF' : '#6B7280' }]}>
              {item.status === 'published' ? 'Published' : 'Draft'} • {item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : 'Recent'}
            </Text>
          </View>
        </View>
        
        {/* Simple interactions */}
        <View
          style={[
            styles.actions,
            {
              backgroundColor: isDarkMode
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.03)',
            },
          ]}>
          <FontAwesome6 name="bookmark" size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        <Text style={[styles.title, { color: isDarkMode ? '#F3F4F6' : '#1F2937' }]} numberOfLines={2}>
          {item.title}
        </Text>
        {item.description ? (
          <Text style={[styles.description, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
      </View>

      {/* Tags Section */}
      <View style={styles.footer}>
        {item.tags && Array.isArray(item.tags) && item.tags.slice(0, 3).map((tag: any, index: number) => {
          const tagName = typeof tag === 'object' ? tag.name : tag;
          return tagName ? (
            <View key={index} style={[styles.tagPill, { backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }]}>
              <Text style={[styles.tagText, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]}>
                #{tagName}
              </Text>
            </View>
          ) : null;
        })}
        {item.tags && item.tags.length > 3 && (
          <Text style={[styles.moreTags, { color: PRIMARY_COLOR }]}>+{item.tags.length - 3}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default UserArticleCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 32,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  actions: {
    padding: 8,
    borderRadius: 20,
  },
  body: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreTags: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
});
