import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  loaded: boolean;
}

const STORAGE_KEY = 'themeMode';

export const loadThemeMode = createAsyncThunk<ThemeMode>(
  'theme/loadThemeMode',
  async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  },
);

export const persistThemeMode = createAsyncThunk<ThemeMode, ThemeMode>(
  'theme/persistThemeMode',
  async (mode: ThemeMode) => {
    await AsyncStorage.setItem(STORAGE_KEY, mode);
    return mode;
  },
);

const initialState: ThemeState = {
  mode: 'system',
  loaded: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      state.loaded = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadThemeMode.fulfilled, (state, action) => {
      state.mode = action.payload;
      state.loaded = true;
    });
    builder.addCase(persistThemeMode.fulfilled, (state, action) => {
      state.mode = action.payload;
      state.loaded = true;
    });
  },
});

export const {setThemeMode} = themeSlice.actions;
export default themeSlice.reducer;
