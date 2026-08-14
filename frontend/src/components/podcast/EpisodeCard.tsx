import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {format} from 'date-fns';
import Ionicon from '@expo/vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../../lib/ui/Theme';

interface EpisodeCardProps {
  episode: {
    id: string;
    name: string;
    description: string;
    podcastsCount: number;
    createdAt: string;
    updatedAt: string;
  };
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onPress,
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

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

        <TouchableOpacity
          style={styles.moreButton}
          onPress={toggleMenu}
          accessibilityRole="button"
          accessibilityLabel={`More options for ${episode.name}`}
          accessibilityHint={
            menuVisible
              ? 'Closes episode options'
              : 'Opens episode options'
          }
          accessibilityState={{expanded: menuVisible}}>
          <Ionicon name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              onEdit();
            }}
            accessibilityRole="button"
            accessibilityLabel={`Edit ${episode.name}`}
            accessibilityHint="Opens the episode editor">
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              onDelete();
            }}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${episode.name}`}
            accessibilityHint="Deletes this episode">
            <Text style={[styles.menuText, {color: 'red'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.description} numberOfLines={3}>
        {episode.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.statContainer}>
          <Ionicon name="mic-outline" size={16} color={PRIMARY_COLOR} />
          <Text style={styles.statText}>
            {episode.podcastsCount} Podcasts
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Updated {format(new Date(episode.updatedAt), 'MMM d, yyyy')}
          </Text>
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
    shadowOffset: {width: 0, height: 4},
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
    fontWeight: 'bold',
    color: '#333',
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
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
});

export default EpisodeCard;