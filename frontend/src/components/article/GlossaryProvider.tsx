import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import type { GlossaryContextValue, GlossaryTerm } from './types';
import { ProfessionalColors, Spacing, Typography } from '../../styles/GlassStyles';

const GlossaryContext = createContext<GlossaryContextValue>({
  terms: [],
  selectedTerm: null,
  highlightTerm: () => {},
  dismissGlossary: () => {},
  isVisible: false,
});

export const useGlossary = () => useContext(GlossaryContext);

type GlossaryProviderProps = {
  children: React.ReactNode;
  // Pass the glossary terms relevant to this article.
  // Future: auto-derive from src/constants/glossary.ts by scanning article content.
  terms?: GlossaryTerm[];
};

/**
 * GlossaryProvider
 *
 * Wraps article content and exposes the `useGlossary()` hook so any descendant
 * can trigger a definition tooltip for a medical term.
 *
 * Integration hooks for future features:
 *  - Pass `terms` from src/constants/glossary.ts filtered to terms found in the article.
 *  - In ArticleContent, scan HTML for known terms and add `class="glossary-term"` + a
 *    `data-term` attribute, then call `highlightTerm()` from a WebView message event.
 *  - The floating tooltip below can be replaced with a BottomSheet (GlossaryBottomSheet).
 */
export const GlossaryProvider = ({
  children,
  terms = [],
}: GlossaryProviderProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const highlightTerm = useCallback(
    (termText: string) => {
      const found = terms.find(
        (t) => t.term.toLowerCase() === termText.toLowerCase(),
      );
      if (found) {
        setSelectedTerm(found);
        setIsVisible(true);
      }
    },
    [terms],
  );

  const dismissGlossary = useCallback(() => {
    setIsVisible(false);
    setSelectedTerm(null);
  }, []);

  const value = useMemo<GlossaryContextValue>(
    () => ({ terms, selectedTerm, highlightTerm, dismissGlossary, isVisible }),
    [terms, selectedTerm, highlightTerm, dismissGlossary, isVisible],
  );

  const bg = isDarkMode ? ProfessionalColors.gray800 : ProfessionalColors.white;
  const textColor = isDarkMode ? ProfessionalColors.gray100 : ProfessionalColors.gray900;
  const defColor = isDarkMode ? ProfessionalColors.gray300 : ProfessionalColors.gray600;
  const tagColor = isDarkMode ? ProfessionalColors.gray700 : ProfessionalColors.gray100;

  return (
    <GlossaryContext.Provider value={value}>
      {children}

      {/* Floating definition tooltip — rendered at GlossaryProvider level so it
          overlays all content regardless of scroll position */}
      <Modal
        visible={isVisible && selectedTerm !== null}
        transparent
        animationType="fade"
        onRequestClose={dismissGlossary}
        statusBarTranslucent
        accessibilityViewIsModal
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={dismissGlossary}
          accessibilityLabel="Close glossary definition"
          accessibilityRole="button"
        >
          <View
            style={[styles.tooltip, { backgroundColor: bg }]}
            // Stop propagation so tapping inside the card doesn't close it
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.tooltipHeader}>
              <View style={[styles.termTag, { backgroundColor: tagColor }]}>
                <Text style={styles.termTagText}>Medical Term</Text>
              </View>
              <TouchableOpacity
                onPress={dismissGlossary}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityLabel="Close"
                accessibilityRole="button"
              >
                <Text style={[styles.closeIcon, { color: defColor }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.termTitle, { color: textColor }]}>
              {selectedTerm?.term}
            </Text>

            <Text style={[styles.termDefinition, { color: defColor }]}>
              {selectedTerm?.definition}
            </Text>

            {selectedTerm?.category ? (
              <Text style={[styles.termCategory, { color: ProfessionalColors.primary }]}>
                {selectedTerm.category}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </Modal>
    </GlossaryContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ProfessionalColors.overlay,
    justifyContent: 'flex-end',
    padding: Spacing.lg,
  },
  tooltip: {
    borderRadius: 20,
    padding: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  termTag: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
  },
  termTagText: {
    ...Typography.caption,
    fontWeight: '600',
    color: ProfessionalColors.primary,
  },
  closeIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  termTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  termDefinition: {
    ...Typography.body,
    lineHeight: 26,
    marginBottom: Spacing.sm,
  },
  termCategory: {
    ...Typography.caption,
    fontWeight: '600',
  },
});
