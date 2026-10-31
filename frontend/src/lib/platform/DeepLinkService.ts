import * as ExpoLinking from 'expo-linking';

import {RootStackParamList} from '../../schemas/type';

type DeepLinkTarget = {
  name: keyof RootStackParamList;
  params?: Record<string, any>;
  requiresAuth?: boolean;
};

const prefixes = [
  ExpoLinking.createURL('/'),
  'ultimatehealth://',
  'https://ultimatehealth.blog',
];

let initialUrlHandled = false;

const restrictedRoutes = new Set([
  'EditorScreen',
  'PodcastForm',
  'ProfileEditScreen',
  'NotificationPreferencesScreen',
  'NotificationScreen',
  'LogoutScreen',
  'ReviewScreen',
  'ImprovementReviewScreen',
]);

const parseNumericParam = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const getPathSegments = (path?: string | null) => {
  return (path || '').replace(/^\/+/, '').split('/').filter(Boolean);
};

const resolveDeepLinkTarget = (url: string): DeepLinkTarget | null => {
  const parsed = ExpoLinking.parse(url);
  const segments = getPathSegments(parsed.path);
  const [firstSegment, secondSegment] = segments;
  const queryParams = parsed.queryParams ?? {};

  // New web/deep-link format:
  // https://ultimatehealth.blog/web/en/articles/{pb_recordId}
  // https://ultimatehealth.blog/web/{lang}/articles/{pb_recordId}
  // https://ultimatehealth.blog/web/articles/{pb_recordId}
  if (firstSegment === 'web') {
    const articlesIdx = segments.indexOf('articles');
    if (articlesIdx !== -1 && segments[articlesIdx + 1]) {
      const rawIdentifier = decodeURIComponent(segments[articlesIdx + 1]);
      if (!rawIdentifier) {
        return null;
      }
      const numericArticleId = parseNumericParam(
        queryParams.articleId ?? rawIdentifier,
      );
      const recordId =
        typeof queryParams.recordId === 'string' && queryParams.recordId
          ? queryParams.recordId
          : numericArticleId === undefined
            ? rawIdentifier
            : undefined;

      return {
        name: 'ArticleScreen',
        params: {
          articleId: numericArticleId ?? rawIdentifier,
          authorId: queryParams.authorId,
          recordId: recordId ?? rawIdentifier,
        },
      };
    }
  }

  if (firstSegment === 'api' && secondSegment === 'share') {
    const shareType = segments[2];

    if (shareType === 'article') {
      const articleId = parseNumericParam(queryParams.articleId);
      const recordId =
        typeof queryParams.recordId === 'string' && queryParams.recordId
          ? queryParams.recordId
          : undefined;

      if (articleId === undefined && !recordId) {
        return null;
      }

      return {
        name: 'ArticleScreen',
        params: {
          articleId: articleId ?? recordId,
          authorId: queryParams.authorId,
          recordId,
        },
      };
    }

    if (shareType === 'podcast') {
      const trackId =
        typeof queryParams.trackId === 'string'
          ? queryParams.trackId
          : undefined;

      if (!trackId) {
        return null;
      }

      return {
        name: 'PodcastDetail',
        params: {
          trackId,
        },
      };
    }
  }

  if (firstSegment === 'article' || firstSegment === 'articles') {
    const rawSegment = secondSegment
      ? decodeURIComponent(secondSegment)
      : undefined;
    const numericArticleId = parseNumericParam(
      rawSegment ?? queryParams.articleId,
    );
    const recordId =
      typeof queryParams.recordId === 'string' && queryParams.recordId
        ? queryParams.recordId
        : numericArticleId === undefined && rawSegment
          ? rawSegment
          : undefined;

    if (numericArticleId === undefined && !recordId) {
      return null;
    }

    return {
      name: 'ArticleScreen',
      params: {
        articleId: numericArticleId ?? recordId,
        authorId: queryParams.authorId,
        recordId,
      },
    };
  }

  if (firstSegment === 'podcast') {
    const trackId = secondSegment ?? queryParams.trackId;

    if (typeof trackId !== 'string' || !trackId) {
      return null;
    }

    return {
      name: 'PodcastDetail',
      params: {
        trackId,
      },
    };
  }

  if (firstSegment === 'profile') {
    const authorId = secondSegment ?? queryParams.authorId;

    if (typeof authorId !== 'string' || !authorId) {
      return null;
    }

    return {
      name: 'UserProfileScreen',
      params: {
        authorId,
        author_handle: queryParams.author_handle,
        userHandle: queryParams.user_handle,
        userId: queryParams.userId,
      },
    };
  }

  if (firstSegment === 'create-post') {
    return {
      name: 'ArticleDescriptionScreen',
      params: {
        article: undefined,
        htmlContent: undefined,
        translationSource: undefined,
      },
      requiresAuth: true,
    };
  }

  if (firstSegment === 'create-podcast') {
    return {
      name: 'PodcastForm',
      requiresAuth: true,
    };
  }

  if (firstSegment === 'settings' && secondSegment === 'profile') {
    return {
      name: 'ProfileEditScreen',
      requiresAuth: true,
    };
  }

  if (firstSegment === 'settings' && secondSegment === 'notifications') {
    return {
      name: 'NotificationPreferencesScreen',
      requiresAuth: true,
    };
  }

  return null;
};

export const resolveNotificationTarget = (
  data: Record<string, any> | null | undefined,
): DeepLinkTarget | null => {
  if (!data) {
    return null;
  }

  if (typeof data.url === 'string' && data.url.length > 0) {
    return resolveDeepLinkTarget(data.url);
  }

  if (
    typeof data.articleId !== 'undefined' ||
    (typeof data.recordId === 'string' && data.recordId.length > 0) ||
    (typeof data.articleRecordId === 'string' && data.articleRecordId.length > 0)
  ) {
    const resolvedRecordId = data.recordId || data.articleRecordId;
    const numericId = parseNumericParam(data.articleId);
    return {
      name: 'ArticleScreen',
      params: {
        articleId: numericId ?? resolvedRecordId,
        authorId: data.authorId,
        recordId: resolvedRecordId,
      },
    };
  }

  if (typeof data.trackId === 'string' && data.trackId.length > 0) {
    return {
      name: 'PodcastDetail',
      params: {
        trackId: data.trackId,
      },
    };
  }

  if (typeof data.userId === 'string' && data.userId.length > 0) {
    return {
      name: 'UserProfileScreen',
      params: {
        authorId: data.userId,
        userId: data.userId,
        author_handle: data.author_handle,
        userHandle: data.userHandle,
      },
    };
  }

  if (data.route === 'NotificationPreferencesScreen') {
    return {
      name: 'NotificationPreferencesScreen',
      requiresAuth: true,
    };
  }

  if (data.route === 'NotificationScreen') {
    return {
      name: 'NotificationScreen',
    };
  }

  return null;
};

export const navigateDeepLink = (
  navigation: any,
  target: DeepLinkTarget,
  isAuthenticated: boolean,
) => {
  if (target.requiresAuth && !isAuthenticated) {
    navigation.navigate('SignInScreen', {
      redirectTo: {
        name: target.name,
        params: target.params,
      },
    });
    return;
  }

  if (restrictedRoutes.has(target.name) && !isAuthenticated) {
    navigation.navigate('GuestPlaceholderScreen', {
      title: 'Sign In Required',
      description: 'Please sign in to continue to this part of the app.',
      iconName: 'user-lock',
    });
    return;
  }

  navigation.navigate(target.name as never, target.params as never);
};

export const initDeepLinking = (onUrl: (url: string) => void): (() => void) => {
  if (!initialUrlHandled) {
    initialUrlHandled = true;
    ExpoLinking.getInitialURL().then(url => {
      if (url) {
        onUrl(url);
      }
    });
  }

  const subscription = ExpoLinking.addEventListener('url', e => {
    onUrl(e.url);
  });

  return () => subscription.remove();
};

export {resolveDeepLinkTarget};
