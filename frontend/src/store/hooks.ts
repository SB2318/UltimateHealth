import {useDispatch, useSelector} from '../store/hooks';
import type {AppDispatch, RootState} from './ReduxStore';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();