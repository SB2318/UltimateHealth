import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HipaaBadge from '../../../components/common/HipaaBadge';
import HipaaComplianceModal from '../../../components/common/HipaaComplianceModal';

jest.mock('@expo/vector-icons/Ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: any) => React.createElement(Text, null, name);
});

describe('HIPAA Components', () => {
  describe('HipaaBadge', () => {
    it('renders compact variant with default label', () => {
      const { getByText } = render(<HipaaBadge variant="compact" />);
      expect(getByText('HIPAA Protected')).toBeTruthy();
    });

    it('renders standard variant with custom label', () => {
      const { getByText } = render(
        <HipaaBadge variant="standard" label="Custom HIPAA Shield" />
      );
      expect(getByText('Custom HIPAA Shield')).toBeTruthy();
    });

    it('calls onPress when badge is pressed', () => {
      const mockPress = jest.fn();
      const { getByRole } = render(
        <HipaaBadge variant="pill" onPress={mockPress} />
      );
      fireEvent.press(getByRole('button'));
      expect(mockPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('HipaaComplianceModal', () => {
    it('renders compliance standards, safeguards, and legal notices', () => {
      const mockClose = jest.fn();
      const { getByText } = render(
        <HipaaComplianceModal visible={true} onClose={mockClose} />
      );

      expect(getByText('HIPAA Privacy & Safeguards')).toBeTruthy();
      expect(getByText('Safe Harbor De-Identification (§ 164.514)')).toBeTruthy();
      expect(getByText('Technical Safeguards (§ 164.312)')).toBeTruthy();
      expect(getByText('Your Federal Patient Rights')).toBeTruthy();
      expect(getByText('Emergency & Non-Diagnostic Notice')).toBeTruthy();
    });

    it('calls onClose when Understood button is pressed', () => {
      const mockClose = jest.fn();
      const { getByText } = render(
        <HipaaComplianceModal visible={true} onClose={mockClose} />
      );

      fireEvent.press(getByText('Understood & Acknowledged'));
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('renders export buttons when showExportActions is true and calls handlers', () => {
      const mockExportChat = jest.fn();
      const mockExportWellness = jest.fn();

      const { getByText } = render(
        <HipaaComplianceModal
          visible={true}
          onClose={jest.fn()}
          showExportActions={true}
          onExportChat={mockExportChat}
          onExportWellness={mockExportWellness}
        />
      );

      expect(getByText('Export Chat (§ 164.524)')).toBeTruthy();
      expect(getByText('Export Records (§ 164.524)')).toBeTruthy();

      fireEvent.press(getByText('Export Chat (§ 164.524)'));
      expect(mockExportChat).toHaveBeenCalledTimes(1);

      fireEvent.press(getByText('Export Records (§ 164.524)'));
      expect(mockExportWellness).toHaveBeenCalledTimes(1);
    });
  });
});
