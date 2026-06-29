import {useAppDispatch, useAppSelector} from '../store/hooks';
import type {AppDispatch, RootState} from './ReduxStore';

export const useAppDispatch = useAppDispatch.withTypes<AppDispatch>();
export const useAppSelector = useAppSelector.withTypes<RootState>();