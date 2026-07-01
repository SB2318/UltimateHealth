import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import Badge from '../Badge';

describe('Badge Component', () => {

  // ── String label ─────────────────────────────────────────────────────────────

  it('renders a plain string label', () => {
    const { getByTestId } = render(<Badge label="new" />);
    expect(getByTestId('badge')).toBeTruthy();
    expect(getByTestId('badge-text')).toBeTruthy();
  });

  it('uppercases a string label automatically', () => {
    const { getByText } = render(<Badge label="featured" />);
    expect(getByText('FEATURED')).toBeTruthy();
  });

  it('does not crash with an empty string label', () => {
    const { getByTestId } = render(<Badge label="" />);
    expect(getByTestId('badge')).toBeTruthy();
  });

  // ── ReactNode label ───────────────────────────────────────────────────────────

  it('renders a ReactNode label without throwing', () => {
    const node = <Text>⭐ Featured</Text>;
    const { getByTestId } = render(<Badge label={node} />);
    expect(getByTestId('badge-node')).toBeTruthy();
  });

  it('renders rich ReactNode content inside the badge', () => {
    const { getByText } = render(
      <Badge label={<Text>🏷 Premium</Text>} />,
    );
    expect(getByText('🏷 Premium')).toBeTruthy();
  });

  it('does not apply toUpperCase to a ReactNode label', () => {
    const node = <Text>mixed Case</Text>;
    expect(() => render(<Badge label={node} />)).not.toThrow();
  });

  // ── Variants ──────────────────────────────────────────────────────────────────

  it.each<[string]>([
    ['default'],
    ['primary'],
    ['success'],
    ['warning'],
    ['danger'],
    ['outline'],
  ])('renders variant "%s" without error', (variant) => {
    const { getByTestId } = render(
      <Badge
        label="status"
        variant={variant as 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline'}
      />,
    );
    expect(getByTestId('badge')).toBeTruthy();
  });

  // ── Sizes ─────────────────────────────────────────────────────────────────────

  it.each<[string]>([['sm'], ['md'], ['lg']])(
    'renders size "%s" without error',
    (size) => {
      const { getByTestId } = render(
        <Badge label="tag" size={size as 'sm' | 'md' | 'lg'} />,
      );
      expect(getByTestId('badge')).toBeTruthy();
    },
  );

  // ── testID prop ───────────────────────────────────────────────────────────────

  it('uses a custom testID when provided', () => {
    const { getByTestId } = render(
      <Badge label="custom" testID="my-badge" />,
    );
    expect(getByTestId('my-badge')).toBeTruthy();
    expect(getByTestId('my-badge-text')).toBeTruthy();
  });
});
