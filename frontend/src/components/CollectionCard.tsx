import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {PRIMARY_COLOR} from '../helper/Theme';

type CollectionCardProps = {
  name: string;
  articleCount: number;
  onPress: () => void;
  onLongPress?: () => void;
};

const CollectionCard = ({name, articleCount, onPress, onLongPress}: CollectionCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${articleCount} articles`}>
      <View style={styles.iconContainer}>
        <FontAwesome name="folder" size={36} color={PRIMARY_COLOR} />
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.count}>
        {articleCount} {articleCount === 1 ? 'article' : 'articles'}
      </Text>
    </TouchableOpacity>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: '#6C6C6D',
    fontWeight: '500',
  },
});
