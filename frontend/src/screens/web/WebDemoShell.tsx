import React, {useMemo, useState} from 'react';
import {Platform, Pressable, ScrollView, Text, View} from 'react-native';
import WellnessDashboardScreen from '../wellness/WellnessDashboardScreen';
import {WebDemoHome} from '../home/HomeScreen';
import {demoArticles} from '../../lib/demo/demoContent';

type DemoRoute = 'home' | 'wellness' | 'article';

const WebDemoShell = () => {
  const [route, setRoute] = useState<DemoRoute>('home');
  const [articleId, setArticleId] = useState<string | null>(null);

  const navigation = useMemo(
    () => ({
      navigate: (name: string, params?: {recordId?: string}) => {
        if (name === 'WellnessDashboardScreen') setRoute('wellness');
        if (name === 'ArticleScreen') {
          setArticleId(params?.recordId ?? null);
          setRoute('article');
        }
      },
      replace: (name: string) => {
        if (name === 'WellnessDashboardScreen') setRoute('wellness');
      },
      goBack: () => setRoute('home'),
      reset: () => setRoute('home'),
      openArticle: (id: string) => {
        setArticleId(id);
        setRoute('article');
      },
    }),
    [],
  );

  if (Platform.OS !== 'web') return null;

  return (
    <View style={{flex: 1}}>
      {route === 'wellness' ? (
        <WellnessDashboardScreen navigation={navigation} />
      ) : route === 'article' ? (
        <WebDemoArticle article={demoArticles.find(article => article._id === articleId) ?? demoArticles[0]} onBack={navigation.goBack} />
      ) : (
        <WebDemoHome navigation={navigation} />
      )}
    </View>
  );
};

const WebDemoArticle = ({article, onBack}: {article: typeof demoArticles[number]; onBack: () => void}) => (
  <ScrollView contentContainerStyle={articleStyles.page}>
    <View style={articleStyles.header}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back to articles">
        <Text style={articleStyles.back}>← Back to articles</Text>
      </Pressable>
      <Text style={articleStyles.tag}>{article.tags[0].name}</Text>
      <Text style={articleStyles.title}>{article.title}</Text>
      <Text style={articleStyles.meta}>UltimateHealth Demo · 1 min read</Text>
    </View>
    <View style={articleStyles.content}>
      <Text style={articleStyles.summary}>{article.summary}</Text>
      <Text style={articleStyles.paragraph}>{article.description}</Text>
      <Text style={articleStyles.paragraph}>Small, consistent habits are easier to maintain than sudden changes. Choose one practical step, make it part of your routine, and review how you feel after a week.</Text>
      <Text style={articleStyles.paragraph}>This browser article is sample content for the local UltimateHealth showcase. The production mobile app continues to load live article content.</Text>
    </View>
  </ScrollView>
);

const articleStyles = {
  page: {backgroundColor: '#F5F7FB', padding: 24, paddingBottom: 64, minHeight: '100%' as const},
  header: {alignSelf: 'center' as const, maxWidth: 820, width: '100%' as const, paddingBottom: 24},
  back: {color: '#0F52BA', fontSize: 15, fontWeight: '700' as const, marginBottom: 28},
  tag: {color: '#0F52BA', fontSize: 12, fontWeight: '800' as const, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 10},
  title: {color: '#111827', fontSize: 34, lineHeight: 42, fontWeight: '800' as const, marginBottom: 10},
  meta: {color: '#64748B', fontSize: 14},
  content: {alignSelf: 'center' as const, maxWidth: 820, width: '100%' as const, backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 16, borderWidth: 1, padding: 28},
  summary: {color: '#1E3A8A', fontSize: 20, lineHeight: 30, fontWeight: '700' as const, marginBottom: 22},
  paragraph: {color: '#334155', fontSize: 17, lineHeight: 30, marginBottom: 20},
};

export default WebDemoShell;
