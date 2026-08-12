import React, { useState } from 'react';
import {
  ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Input, useThemeName } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { glossaryTerms } from '../constants/glossary';
import { useTermComparison } from '../hooks/useTermComparison';
import ComparisonTable from '../components/article/ComparisonTable';
import { PRIMARY_COLOR } from '../lib/ui/Theme';

export default function HealthTermComparisonScreen({ navigation }: any) {
  const themeName = useThemeName();
  const isDark    = themeName === 'dark';

  const [termA, setTermA]         = useState('');
  const [termB, setTermB]         = useState('');
  const [queryA, setQueryA]       = useState('');
  const [queryB, setQueryB]       = useState('');
  const [showDropA, setShowDropA] = useState(false);
  const [showDropB, setShowDropB] = useState(false);

  const { fields, loading, error, compare } = useTermComparison();

  const termNames = glossaryTerms.map(t => t.term);

  const filteredA = termNames.filter(t =>
    t.toLowerCase().includes(queryA.toLowerCase()) && t !== termB
  );
  const filteredB = termNames.filter(t =>
    t.toLowerCase().includes(queryB.toLowerCase()) && t !== termA
  );

  const handleCompare = () => {
    if (!termA || !termB) {
      Alert.alert('Select both terms', 'Please select two health terms to compare.');
      return;
    }
    if (termA === termB) {
      Alert.alert('Same term', 'Please select two different health terms.');
      return;
    }
    compare(termA, termB);
  };

  const bg      = isDark ? '#0f0f23' : '#f8f9ff';
  const card    = isDark ? '#1a1a2e' : '#ffffff';
  const text    = isDark ? '#e0e0ff' : '#1a1a2e';
  const border  = isDark ? '#2a2a4a' : '#e0e0e0';

  const TermPicker = ({
    label, value, query, showDrop, filtered,
    onQueryChange, onSelect, onFocus,
  }: any) => (
    <YStack flex={1}>
      <Text fontSize={12} color={PRIMARY_COLOR} fontWeight="600" mb="$1">{label}</Text>
      <Input
        value={query || value}
        placeholder={`Search term...`}
        onChangeText={(q: string) => { onQueryChange(q); onFocus(); }}
        onFocus={onFocus}
        backgroundColor={card}
        borderColor={value ? PRIMARY_COLOR : border}
        color={text}
        borderRadius={10}
        height={44}
        fontSize={13}
      />
      {showDrop && filtered.length > 0 && (
        <YStack
          position="absolute" top={70} left={0} right={0} zIndex={999}
          backgroundColor={card} borderRadius={10}
          style={{ borderWidth: 1, borderColor: border, maxHeight: 160 }}
        >
          <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
            {filtered.slice(0, 8).map((t: string) => (
              <TouchableOpacity
                key={t}
                onPress={() => onSelect(t)}
                style={{ padding: 12, borderBottomWidth: 0.5, borderColor: border }}
              >
                <Text color={text} fontSize={13}>{t}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </YStack>
      )}
    </YStack>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <XStack alignItems="center" mb="$4">
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color={text} />
          </TouchableOpacity>
          <Text fontSize={20} fontWeight="700" color={text}>Health Term Comparison</Text>
        </XStack>

        {/* Term pickers */}
        <YStack
          backgroundColor={card} borderRadius={16} padding="$4"
          mb="$4" style={{ borderWidth: 1, borderColor: border }}
        >
          <XStack gap="$3" zIndex={10}>
            <TermPicker
              label="Term A"
              value={termA} query={queryA}
              showDrop={showDropA} filtered={filteredA}
              onQueryChange={setQueryA}
              onFocus={() => { setShowDropA(true); setShowDropB(false); }}
              onSelect={(t: string) => {
                setTermA(t); setQueryA(''); setShowDropA(false);
              }}
            />
            <YStack alignItems="center" justifyContent="flex-end" pb="$2">
              <Text fontWeight="700" color={PRIMARY_COLOR} fontSize={16}>VS</Text>
            </YStack>
            <TermPicker
              label="Term B"
              value={termB} query={queryB}
              showDrop={showDropB} filtered={filteredB}
              onQueryChange={setQueryB}
              onFocus={() => { setShowDropB(true); setShowDropA(false); }}
              onSelect={(t: string) => {
                setTermB(t); setQueryB(''); setShowDropB(false);
              }}
            />
          </XStack>

          {/* Compare button */}
          <TouchableOpacity
            onPress={handleCompare}
            style={[styles.btn, { backgroundColor: PRIMARY_COLOR, marginTop: 16 }]}
            disabled={loading}
          >
            <Ionicons name="git-compare-outline" size={18} color="white" />
            <Text color="white" fontWeight="700" ml="$2">Compare</Text>
          </TouchableOpacity>
        </YStack>

        {/* Loading */}
        {loading && (
          <YStack alignItems="center" py="$6">
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
            <Text color={text} mt="$3">Generating comparison with AI...</Text>
          </YStack>
        )}

        {/* Error */}
        {error && (
          <YStack backgroundColor="#fee2e2" borderRadius={12} padding="$4" mb="$4">
            <Text color="#dc2626">{error}</Text>
          </YStack>
        )}

        {/* Comparison Table */}
        {fields.length > 0 && (
          <YStack>
            <Text fontWeight="700" color={text} fontSize={16} mb="$3">
              📊 {termA}  vs  {termB}
            </Text>
            <ComparisonTable
              termA={termA} termB={termB}
              fields={fields} isDark={isDark}
            />
          </YStack>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: 46, borderRadius: 12,
  },
});
