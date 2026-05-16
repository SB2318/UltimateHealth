/**
 * Web stub for react-native-collapsible-tab-view.
 * Provides simple passthrough React components so the web build doesn't crash.
 * Full tab functionality is native-only.
 */
import React from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';

const Container = ({ children, renderHeader, renderTabBar }) => {
  return (
    <View style={{ flex: 1 }}>
      {renderHeader && renderHeader()}
      {children}
    </View>
  );
};

const Tab = ({ children }) => <View style={{ flex: 1 }}>{children}</View>;
Tab.displayName = 'Tab';

const TabScrollView = ({ children, contentContainerStyle }) => (
  <ScrollView contentContainerStyle={contentContainerStyle}>{children}</ScrollView>
);

const TabFlatList = (props) => <FlatList {...props} />;

// Attach sub-components
Container.Tab = Tab;

const Tabs = {
  Container,
  Tab,
  ScrollView: TabScrollView,
  FlatList: TabFlatList,
};

const MaterialTabBar = () => null;

export { Tabs, MaterialTabBar };
export default Tabs;
