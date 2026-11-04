import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BUTTON_COLOR } from '../../lib/ui/Theme';

interface HipaaComplianceModalProps {
  visible: boolean;
  onClose: () => void;
  onExportChat?: () => void;
  onExportWellness?: () => void;
  showExportActions?: boolean;
}

const useSafeInsets = () => {
  try {
    return useSafeAreaInsets();
  } catch {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
};

export const HipaaComplianceModal: React.FC<HipaaComplianceModalProps> = ({
  visible,
  onClose,
  onExportChat,
  onExportWellness,
  showExportActions = false,
}) => {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeInsets();

  const colors = {
    overlay: 'rgba(0, 0, 0, 0.65)',
    modalBg: isDark ? '#0F172A' : '#FFFFFF',
    border: isDark ? '#334155' : '#E2E8F0',
    title: isDark ? '#F8FAFC' : '#0F172A',
    subtitle: isDark ? '#94A3B8' : '#64748B',
    bodyText: isDark ? '#CBD5E1' : '#334155',
    sectionBg: isDark ? '#1E293B' : '#F8FAFC',
    badgeBg: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5',
    badgeBorder: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0',
    badgeText: isDark ? '#34D399' : '#065F46',
    warningBg: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
    warningBorder: isDark ? 'rgba(239, 68, 68, 0.25)' : '#FECACA',
    warningText: isDark ? '#FCA5A5' : '#991B1B',
    closeBg: isDark ? '#1E293B' : '#F1F5F9',
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View
          style={[
            styles.sheetContainer,
            {
              backgroundColor: colors.modalBg,
              paddingBottom: Math.max(insets.bottom, 16) + 12,
            },
          ]}>
          {/* Handle */}
          <View style={[styles.handle, { backgroundColor: isDark ? '#475569' : '#CBD5E1' }]} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleWrap}>
              <View style={[styles.shieldCircle, { backgroundColor: colors.badgeBg, borderColor: colors.badgeBorder }]}>
                <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: colors.title }]}>
                  HIPAA Privacy & Safeguards
                </Text>
                <Text style={[styles.subtitle, { color: colors.subtitle }]}>
                  45 CFR Parts 160 & 164 Compliance Standards
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: colors.closeBg }]}
              accessibilityRole="button"
              accessibilityLabel="Close HIPAA info dialog">
              <Ionicons name="close" size={20} color={isDark ? '#E2E8F0' : '#475569'} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Status Chip */}
            <View style={[styles.compliancePill, { backgroundColor: colors.badgeBg, borderColor: colors.badgeBorder }]}>
              <Ionicons name="lock-closed" size={14} color="#10B981" />
              <Text style={[styles.compliancePillText, { color: colors.badgeText }]}>
                Protected Health Information (ePHI) Active Encryption
              </Text>
            </View>

            {/* Section 1: Safe Harbor */}
            <View style={[styles.card, { backgroundColor: colors.sectionBg, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="filter-circle-outline" size={20} color="#0284C7" />
                <Text style={[styles.cardTitle, { color: colors.title }]}>
                  Safe Harbor De-Identification (§ 164.514)
                </Text>
              </View>
              <Text style={[styles.cardBody, { color: colors.bodyText }]}>
                Before your health questions or chat prompts are processed by AI models, our automated Safe Harbor engine redacts 18 direct personal identifiers, including names, SSNs, medical record numbers, phone numbers, email addresses, and network identifiers.
              </Text>
            </View>

            {/* Section 2: Technical Safeguards */}
            <View style={[styles.card, { backgroundColor: colors.sectionBg, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="key-outline" size={20} color="#8B5CF6" />
                <Text style={[styles.cardTitle, { color: colors.title }]}>
                  Technical Safeguards (§ 164.312)
                </Text>
              </View>
              <Text style={[styles.cardBody, { color: colors.bodyText }]}>
                • In-Transit: All mobile communications are secured via TLS 1.3 encryption.{"\n"}
                • At-Rest: Wellness logs and telemetry are secured using AES-256 database volume encryption.{"\n"}
                • Access Control: Role-based permissions ensure only authorized care teams access clinical records.
              </Text>
            </View>

            {/* Section 3: Patient Rights */}
            <View style={[styles.card, { backgroundColor: colors.sectionBg, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="document-text-outline" size={20} color="#10B981" />
                <Text style={[styles.cardTitle, { color: colors.title }]}>
                  Your Federal Patient Rights
                </Text>
              </View>
              <Text style={[styles.cardBody, { color: colors.bodyText }]}>
                • Right of Access (§ 164.524): Export your complete health telemetry and AI transcripts at any time.{"\n"}
                • Right to Amend & Clear (§ 164.526): Permanently delete your AI chat sessions or request record corrections.{"\n"}
                • Accounting of Disclosures (§ 164.528): Request audit records of any external disclosures or clinical interactions.
              </Text>
            </View>

            {/* Section 4: Emergency Disclaimer */}
            <View style={[styles.warningCard, { backgroundColor: colors.warningBg, borderColor: colors.warningBorder }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
                <Text style={[styles.cardTitle, { color: colors.warningText }]}>
                  Emergency & Non-Diagnostic Notice
                </Text>
              </View>
              <Text style={[styles.cardBody, { color: colors.warningText }]}>
                UltimateHealth AI assistants are educational wellness guides, not licensed medical doctors. They do not formulate clinical diagnoses or prescribe treatment plans. For acute medical emergencies or crisis support, call 911 or the Suicide & Crisis Lifeline at 988 immediately.
              </Text>
            </View>

            {/* Optional Export Actions */}
            {showExportActions && (
              <View style={styles.actionRow}>
                {onExportChat && (
                  <TouchableOpacity
                    onPress={onExportChat}
                    style={[styles.actionBtn, { borderColor: BUTTON_COLOR }]}
                    accessibilityRole="button"
                    accessibilityLabel="Export chat transcript">
                    <Ionicons name="chatbubbles-outline" size={16} color={BUTTON_COLOR} />
                    <Text style={[styles.actionBtnText, { color: BUTTON_COLOR }]}>
                      Export Chat (§ 164.524)
                    </Text>
                  </TouchableOpacity>
                )}
                {onExportWellness && (
                  <TouchableOpacity
                    onPress={onExportWellness}
                    style={[styles.actionBtn, { borderColor: '#10B981' }]}
                    accessibilityRole="button"
                    accessibilityLabel="Export wellness records">
                    <Ionicons name="pulse-outline" size={16} color="#10B981" />
                    <Text style={[styles.actionBtnText, { color: '#10B981' }]}>
                      Export Records (§ 164.524)
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </ScrollView>

          {/* Primary Dismiss Button */}
          <TouchableOpacity
            onPress={onClose}
            style={[styles.primaryBtn, { backgroundColor: BUTTON_COLOR }]}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Acknowledge and close HIPAA notice">
            <Text style={styles.primaryBtnText}>Understood & Acknowledged</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: '88%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  shieldCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 12,
  },
  compliancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  compliancePillText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  card: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  warningCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  cardBody: {
    fontSize: 13,
    lineHeight: 19,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  actionBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  primaryBtn: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default HipaaComplianceModal;
