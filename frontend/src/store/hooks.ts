import {useAppDispatch, useAppSelector} from 'react-redux';
import type {AppDispatch, RootState} from './ReduxStore';

export const useAppDispatch = useAppDispatch.withTypes<AppDispatch>();
export const useAppSelector = useAppSelector.withTypes<RootState>();