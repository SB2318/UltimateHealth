import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import GlossaryBottomSheet from '../GlossaryBottomSheet';
import { testGlossaryTerms } from '../../constants/glossary';

jest.mock('@tamagui/sheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Sheet = ({ open, children }: { open: boolean; children: React.ReactNode }) =>
    open ? <View>{children}</View> : null;
  Sheet.displayName = 'Sheet';

  const Overlay = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
  Overlay.displayName = 'Sheet.Overlay';
  Sheet.Overlay = Overlay;

  const Handle = () => <View />;
  Handle.displayName = 'Sheet.Handle';
  Sheet.Handle = Handle;

  const Frame = ({ children, ...props }: { children: React.ReactNode }) => (
    <View {...props}>{children}</View>
  );
  Frame.displayName = 'Sheet.Frame';
  Sheet.Frame = Frame;

  return { Sheet };
});

jest.mock('tamagui', () => {
  const React = require('react');
  const {
    Text: RNText,
    View: RNView,
    ScrollView: RNScrollView,
    Pressable,
  } = require('react-native');

  return {
    Theme: ({children}: any) => React.createElement(React.Fragment, null, children),
    XStack: ({children, ...props}: any) => React.createElement(RNView, props, children),
    YStack: ({children, ...props}: any) => React.createElement(RNView, props, children),
    Text: ({children, ...props}: any) => React.createElement(RNText, props, children),
    Button: ({children, onPress, ...props}: any) =>
      React.createElement(Pressable, {onPress, ...props}, children),
    Card: ({children, ...props}: any) => React.createElement(RNView, props, children),
    Paragraph: ({children, ...props}: any) => React.createElement(RNText, props, children),
    ScrollView: ({children, ...props}: any) =>
      React.createElement(RNScrollView, props, children),
  };
});

describe('GlossaryBottomSheet', () => {
  const glossaryTerm = testGlossaryTerms[0];

  it('includes medically relevant terms across multiple alphabet categories', () => {
    const firstLetters = new Set(testGlossaryTerms.map(({ term }) => term[0].toUpperCase()));

    expect(firstLetters.has('A')).toBeTruthy();
    expect(firstLetters.has('Q')).toBeTruthy();
    expect(firstLetters.has('Z')).toBeTruthy();

    const selectedTerms = testGlossaryTerms.filter(({ term }) =>
      ['Anemia', 'Hypertension', 'Q fever', 'Zika virus'].includes(term)
    );

    expect(selectedTerms).toHaveLength(4);
    expect(selectedTerms.every(({ definition, category, relatedTerms }) => !!definition && !!category && (relatedTerms?.length ?? 0) > 0)).toBeTruthy();
  });

  it('renders glossary term details when visible', () => {
    const { getByText } = render(
      <GlossaryBottomSheet
        visible
        term={glossaryTerm.term}
        definition={glossaryTerm.definition}
        category={glossaryTerm.category}
        relatedTerms={glossaryTerm.relatedTerms}
        onClose={jest.fn()}
      />
    );

    expect(getByText('Hypertension')).toBeTruthy();
    expect(getByText('Cardiology')).toBeTruthy();
    expect(getByText(glossaryTerm.definition)).toBeTruthy();
    expect(getByText('Blood pressure')).toBeTruthy();
    expect(getByText('#heart')).toBeTruthy();
  });

  it('does not render content while hidden', () => {
    const { queryByText } = render(
      <GlossaryBottomSheet
        visible={false}
        term={glossaryTerm.term}
        definition={glossaryTerm.definition}
        onClose={jest.fn()}
      />
    );

    expect(queryByText('Hypertension')).toBeNull();
  });

  it('calls onClose from the accessible close button', () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <GlossaryBottomSheet
        visible
        term={glossaryTerm.term}
        definition={glossaryTerm.definition}
        onClose={onClose}
      />
    );

    fireEvent.press(getByLabelText('Close glossary definition for Hypertension'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
