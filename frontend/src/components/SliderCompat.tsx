/* eslint-disable react-hooks/immutability, react-hooks/refs, react-hooks/static-components, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars */
// Type patch for @react-native-community/slider v5 with React 19
// The library typings use class-based component types that are incompatible with React 19's JSX types.
// This patch re-exports the component as a functional component wrapper.
import React from 'react';
import type {SliderProps} from '@react-native-community/slider';
import OriginalSlider from '@react-native-community/slider';

// Re-export as a function component to fix JSX type incompatibility with React 19
const Slider: React.FC<SliderProps> = (props) => React.createElement(OriginalSlider as any, props);

export default Slider;
export type {SliderProps};
