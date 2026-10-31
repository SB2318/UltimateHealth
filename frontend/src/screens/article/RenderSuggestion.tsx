/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {RenderSuggestionProp} from '../../schemas/type';
import {useAppDispatch} from '../../store/hooks';
import {setSuggestionAccepted} from '../../store/dataSlice';
import AutoHeightWebView from '@brown-bear/react-native-autoheight-webview';
import {createHTMLStructure, handleExternalClick} from '../../lib/utils/Utils';

export default function RenderSuggestion({
  navigation,
  route,
}: RenderSuggestionProp) {
  const {htmlContent, readability_score, reading_time, isFallback} =
    route.params;
  const dispatch = useAppDispatch();

  const handleAccept = () => {
    dispatch(setSuggestionAccepted({selection: true}));
    navigation.goBack();
  };

  const handleCancel = () => {
    dispatch(setSuggestionAccepted({selection: false}));
    navigation.goBack();
  };

  const formatReadingTime = (time: string | undefined | null): string => {
    if (!time) {
      return 'Estimated 2-3 min read';
    }
    const minutes = parseInt(time, 10);
    if (isNaN(minutes)) {
      return time;
    }
    return `${minutes} min read`;
  };

  const formattedHtml = createHTMLStructure(
    '',
    htmlContent || '<p>No suggestions available.</p>',
    [],
    '',
    '',
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000A60" />

      {isFallback && (
        <View style={styles.fallbackBanner}>
          <Text style={styles.fallbackBannerTitle}>
            Built-in Content & Grammar Checker Active
          </Text>
          <Text style={styles.fallbackBannerSubtext}>
            AI server was unavailable — showing local readability analysis and
            grammar suggestions. Yellow highlights indicate long or complex
            sentences (&gt;25 words).
          </Text>
        </View>
      )}

      {/* Display Readability Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.scoreTitle}>Readability Score</Text>
        <Text
          style={[
            styles.scoreNumber,
            {
              color: (readability_score ?? 0) >= 60 ? '#059669' : '#dc2626',
            },
          ]}>
          {readability_score ?? '--'}/100
        </Text>
        <Text style={styles.readingTime}>
          ⏱ {formatReadingTime(reading_time)}
        </Text>
      </View>

      {!reading_time && __DEV__ && (
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>
            ⚠️ Debug: reading_time missing from API response
          </Text>
        </View>
      )}

      {/* Render Highlighted Complex Sentences Safely */}
      <AutoHeightWebView
        style={styles.webView}
        customStyle={`
          * { font-family: -apple-system, Roboto, sans-serif; font-size: 16px; line-height: 1.5; color: #1e293b; }
          .complex-sentence { background-color: #fef08a; padding: 2px; border-radius: 4px; border-bottom: 2px solid #ca8a04; }
        `}
        source={{html: formattedHtml}}
        originWhitelist={['http://*', 'https://*']}
        scalesPageToFit={false}
        viewportContent={'width=device-width, user-scalable=no'}
        onShouldStartLoadWithRequest={handleExternalClick}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          accessibilityRole="button"
          accessibilityLabel="Dismiss suggestions"
          accessibilityHint="Dismisses the suggestions and returns to the previous screen">
          <Text style={styles.cancelText}>Dismiss</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAccept}
          accessibilityRole="button"
          accessibilityLabel="Apply suggestions"
          accessibilityHint="Applies the suggestions and returns to the previous screen">
          <Text style={styles.acceptText}>Apply Suggestions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff', padding: 16},
  fallbackBanner: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  fallbackBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 2,
  },
  fallbackBannerSubtext: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
  },
  metricsContainer: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  scoreTitle: {fontSize: 14, color: '#64748b', fontWeight: '600'},
  scoreNumber: {fontSize: 36, fontWeight: 'bold', marginVertical: 4},
  readingTime: {fontSize: 14, color: '#475569'},
  webView: {width: '100%', flex: 1, marginBottom: 16},
  buttonRow: {flexDirection: 'row', justifyContent: 'space-between'},
  cancelButton: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    flex: 0.48,
    alignItems: 'center',
  },
  cancelText: {color: '#475569', fontWeight: '600'},
  acceptButton: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#0f172a',
    flex: 0.48,
    alignItems: 'center',
  },
  acceptText: {color: '#ffffff', fontWeight: '600'},
  debugContainer: {
    backgroundColor: '#fef3c7',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  debugText: {
    color: '#92400e',
    fontSize: 12,
  },
});
