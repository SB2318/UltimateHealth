import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ArticleData} from '../schemas/type';

/**
 * Session-scoped cache of the articles opened during this app run.
 *
 * Opening an article deliberately writes nothing to the device: the copy kept
 * here lives in memory only, so browsing cannot accumulate storage. It is
 * dropped when the app unmounts. Only articles the reader actually finishes
 * are persisted — see `ArticleCacheUtils`.
 *
 * It exists so an article stays readable if connectivity drops mid-session,
 * which is the common case: the reader is already on the article when the
 * train enters the tunnel.
 */

/** How many opened articles are held in memory at once. */
export const MAX_SESSION_ARTICLES = 20;

export type SessionArticle = {
  articleId: number;
  article: ArticleData;
};

export type SessionArticleContent = {
  /** PocketBase record id — the body is fetched by record, not article id. */
  recordId: string;
  htmlContent: string;
};

export type OfflineState = {
  articles: SessionArticle[];
  contents: SessionArticleContent[];
};

const initialState: OfflineState = {
  articles: [],
  contents: [],
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    /** Records an opened article, newest first, bounded to the session cap. */
    cacheSessionArticle(
      state,
      action: PayloadAction<{articleId: number; article: ArticleData}>,
    ) {
      const {articleId, article} = action.payload;
      if (!articleId || !article) {
        return;
      }

      state.articles = [
        {articleId, article},
        ...state.articles.filter(entry => entry.articleId !== articleId),
      ].slice(0, MAX_SESSION_ARTICLES);
    },

    /** Records an opened article's body, keyed by its PocketBase record id. */
    cacheSessionContent(
      state,
      action: PayloadAction<{recordId: string; htmlContent: string}>,
    ) {
      const {recordId, htmlContent} = action.payload;
      if (!recordId || typeof htmlContent !== 'string') {
        return;
      }

      state.contents = [
        {recordId, htmlContent},
        ...state.contents.filter(entry => entry.recordId !== recordId),
      ].slice(0, MAX_SESSION_ARTICLES);
    },

    /** Drops the whole session cache. Dispatched when the app unmounts. */
    clearSessionArticles() {
      return initialState;
    },
  },
});

export const {cacheSessionArticle, cacheSessionContent, clearSessionArticles} =
  offlineSlice.actions;

export default offlineSlice.reducer;
