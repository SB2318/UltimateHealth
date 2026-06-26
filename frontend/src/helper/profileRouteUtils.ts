import type {User} from '../type';

type ProfileRouteParams = {
  authorId?: User | string;
  userId?: string;
  author_handle?: string;
  userHandle?: string;
};

export type ProfileTarget = {
  authorId: string;
  userHandle?: string;
  hasExternalTarget: boolean;
};

export const resolveProfileTarget = (
  params: ProfileRouteParams | undefined,
  currentUserId: string,
): ProfileTarget => {
  const routeAuthorId =
    typeof params?.authorId === 'string'
      ? params.authorId
      : params?.authorId?._id;
  const userHandle = params?.userHandle || params?.author_handle;
  const hasExternalTarget = Boolean(
    routeAuthorId || params?.userId || userHandle,
  );

  return {
    authorId:
      routeAuthorId ||
      params?.userId ||
      (hasExternalTarget ? '' : currentUserId),
    userHandle,
    hasExternalTarget,
  };
};
