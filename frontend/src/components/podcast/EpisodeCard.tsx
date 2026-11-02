import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { format } from 'date-fns';
import Ionicon from '@expo/vector-icons/Ionicons';
import { PRIMARY_COLOR } from '../../lib/ui/Theme';
import { PodcastEpisode } from '../../schemas/type';

interface EpisodeCardProps {
  episode: PodcastEpisode | any;
  onPress: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onPress,
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const podcastCount =
    episode.podcasts_count ?? episode.podcastsCount ?? 0;

  const rawDate = episode.updated_at || episode.updatedAt || episode.created_at || episode.createdAt;
  let formattedDate = 'Recently';
  if (rawDate) {
    try {
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = `Updated ${format(parsedDate, 'MMM d, yyyy')}`;
      }
    } catch {
      formattedDate = 'Recently';
    }
  }

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open episode ${episode.name}`}
      accessibilityHint="Opens the episode details">
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {episode.name}
          </Text>
        </View>

        {(onEdit || onDelete) && (
          <TouchableOpacity
            style={styles.moreButton}
            onPress={toggleMenu}
            accessibilityRole="button"
            accessibilityLabel={`More options for ${episode.name}`}
            accessibilityHint={
              menuVisible ? 'Closes episode options' : 'Opens episode options'
            }
            accessibilityState={{ expanded: menuVisible }}>
            <Ionicon name="ellipsis-vertical" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {menuVisible && (
        <View style={styles.menuContainer}>
          {onEdit && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                onEdit();
              }}
              accessibilityRole="button"
              accessibilityLabel={`Edit ${episode.name}`}>
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                onDelete();
              }}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${episode.name}`}>
              <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {Boolean(episode.description) && (
        <Text style={styles.description} numberOfLines={3}>
          {episode.description}
        </Text>
      )}

      <View style={styles.footer}>
        <View style={styles.statContainer}>
          <Ionicon name="mic-outline" size={16} color={PRIMARY_COLOR} />
          <Text style={styles.statText}>
            {podcastCount} {podcastCount === 1 ? 'Podcast' : 'Podcasts'}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  moreButton: {
    padding: 4,
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#eee',
    minWidth: 100,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
    paddingTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 6,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
});

export default EpisodeCard;
