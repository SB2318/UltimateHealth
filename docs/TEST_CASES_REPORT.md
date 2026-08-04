# Test Cases Report

This document details the conditions tested across all 456 test cases in the codebase.

## src/__tests__/components/academy/CourseCard.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| CourseCard | renders correctly |

## src/__tests__/components/article/GlossaryBottomSheet.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| GlossaryBottomSheet | renders glossary term details when visible |
| GlossaryBottomSheet | does not render content while hidden |
| GlossaryBottomSheet | calls onClose from the accessible close button |

## src/__tests__/components/article/ReadingDifficulty.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| getArticleDifficulty | returns null for undefined or null input |
| getArticleDifficulty | returns null if article content/body is missing or empty |
| getArticleDifficulty | returns predefined difficulty when valid |
| getArticleDifficulty | normalizes predefined difficulty casing and whitespace |
| getArticleDifficulty | ignores invalid predefined difficulty and returns null if no content exists |
| getArticleDifficulty | returns null if clean text is under 100 characters |
| getArticleDifficulty | correctly strips HTML tags before calculating difficulty |
| getArticleDifficulty | classifies as Beginner based on Automated Readability Index (ARI) score |
| getArticleDifficulty | classifies as Intermediate based on Automated Readability Index (ARI) score |
| getArticleDifficulty | classifies as Advanced based on Automated Readability Index (ARI) score |

## src/__tests__/components/article/ResearchSummaryCard.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ResearchSummaryCard | shows loading spinner when loading is true |
| ResearchSummaryCard | renders nothing when summary is null and not loading |
| ResearchSummaryCard | shows simplified explanation by default |
| ResearchSummaryCard | hides key findings before expanding |
| ResearchSummaryCard | expands to show all sections on tap |
| ResearchSummaryCard | collapses again on second tap |

## src/__tests__/components/common/BreathingTool.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| BreathingTool Component | renders correctly with default state |
| BreathingTool Component | handles start, pause, resume, and stop correctly |
| BreathingTool Component | transitions phases and cycles correctly |
| BreathingTool Component | logs data correctly for completed sessions |
| BreathingTool Component | logs data correctly when stopped manually |
| BreathingTool Component | does not log data for 0 second sessions |

## src/__tests__/components/common/EmptyStates.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| BaseEmptyState | renders emoji when iconEmoji is provided |
| BaseEmptyState | renders iconComponent when iconComponent is provided |
| BaseEmptyState | triggers action callback when action button is pressed |
| BaseEmptyState | renders infoText when provided |
| NoNotificationState | renders correctly with title, description, and bell icon |
| NoNotificationState | shows action button if onRefresh is provided |

## src/__tests__/components/common/GlassButton.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| GlassButton | renders correctly with title |
| GlassButton | calls onPress when pressed |
| GlassButton | shows loading spinner when loading is true and hides title |
| GlassButton | does not call onPress when disabled |

## src/__tests__/components/common/ImageFallback.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ImageFallback Component | renders primary image when source is valid |
| ImageFallback Component | renders fallback image immediately if primary source uri is empty |
| ImageFallback Component | swaps to fallback image when onError is triggered |

## src/__tests__/components/common/Loader.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| Loader | renders correctly with default props |

## src/__tests__/components/common/LoadingSpinner.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| LoadingSpinner | renders correctly with default props |
| LoadingSpinner | renders with custom text and subText |
| LoadingSpinner | applies fullScreen and overlay styles when props are true |

## src/__tests__/components/common/NetworkBanner.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| NetworkBanner | does not render anything when online initially |
| NetworkBanner | renders correctly when the app goes offline |
| NetworkBanner | shows "Back online" message when connectivity is restored |
| NetworkBanner | handles rapid changes in network status gracefully |

## src/__tests__/components/podcast/FloatingSpeedSelector.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| FloatingSpeedSelector | renders all playback speeds when visible |
| FloatingSpeedSelector | highlights the current speed and shows checkmark icon |
| FloatingSpeedSelector | calls onSpeedSelect and onClose when a speed option is tapped |
| FloatingSpeedSelector | calls onClose when the backdrop overlay is tapped |
| FloatingSpeedSelector | does not render anything when visible is false |
| FloatingSpeedSelector | subscribes to navigation blur event when visible and triggers onClose when blur fires |

## src/__tests__/components/profile/LanguagePreferenceSelector.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| LanguagePreferenceSelector - lost-update race condition (#1538) | keeps both chips selected when two different language chips are tapped in rapid succession |
| LanguagePreferenceSelector - lost-update race condition (#1538) | does not drop a selection when three chips are tapped back-to-back |

## src/__tests__/contexts/PreferencesContext.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| PreferencesContext - lost-update race condition (#1538) | keeps both languages when addLanguagePreference is fired twice without awaiting between calls |
| PreferencesContext - lost-update race condition (#1538) | does not drop an earlier toggle when three rapid adds interleave |
| PreferencesContext - lost-update race condition (#1538) | removeLanguagePreference fired concurrently with addLanguagePreference resolves against latest state |
| PreferencesContext - lost-update race condition (#1538) | persists writes in call order so a later-resolving I/O cannot overwrite a more recent state with a stale value |
| PreferencesContext - lost-update race condition (#1538) | setPreferredLanguages still accepts a plain array (non-functional callers) |

## src/__tests__/hooks/ai/useLoadAIChats.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useLoadAIConversations | executes mutation successfully and calls API |

## src/__tests__/hooks/ai/useRenderSuggestion.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useRenderSuggestion | executes mutation successfully and calls API |

## src/__tests__/hooks/ai/useSendMessageToGemini.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSendMessageToGemini | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetMonthlyReadReport.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAuthorMonthlyReadReport | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetMonthlyWriteReport.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAuthorMonthlyWriteReport | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetTotalLikeViewStatus.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetTotalLikeViewStatus | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetTotalReads.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetTotalReads | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetTotalWrites.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetTotalWrites | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetYearlyReadReport.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAuthorYearlyReadReport | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/useGetYearlyWriteReport.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAuthorYearlyWriteReport | executes mutation successfully and calls API |

## src/__tests__/hooks/analytics/writeAnalyticsHooks.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| write analytics hooks | fetches total writes for the signed-in user |
| write analytics hooks | does not run total writes query for guest users |
| write analytics hooks | returns an empty monthly report for invalid month without hitting the API |
| write analytics hooks | fetches monthly writes for another user when others mode is enabled |
| write analytics hooks | returns an empty yearly report for invalid year without hitting the API |
| write analytics hooks | fetches yearly writes for another user when others mode is enabled |

## src/__tests__/hooks/article/useArticleRepost.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useRepostArticle | reposts an article successfully when not guest |
| useRepostArticle | fails if user is a guest |
| useRepostArticle | posts to the correct endpoint |

## src/__tests__/hooks/article/useArticleRoom.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useArticleRoom | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useArticleShare.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useArticleShare | renders correctly |

## src/__tests__/hooks/article/useGetArticleContent.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetArticleContent | fetches article content successfully |
| useGetArticleContent | sets error state on network failure |
| useGetArticleContent | does not fetch if recordId is missing |

## src/__tests__/hooks/article/useGetArticleDetail.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetArticleDetails | fetches article details successfully |
| useGetArticleDetails | sets error state on network failure |
| useGetArticleDetails | calls the correct endpoint |

## src/__tests__/hooks/article/useGetArticleTags.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetCategories | fetches categories successfully |
| useGetCategories | sets error state on network failure |
| useGetCategories | does not fetch if not connected |

## src/__tests__/hooks/article/useGetArticleTranslations.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetArticleTranslations | fetches article translations successfully |
| useGetArticleTranslations | sets error state on network failure |
| useGetArticleTranslations | appends language param correctly if provided |

## src/__tests__/hooks/article/useGetLoadReviewComments.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetLoadReviewComments | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useGetMostViewedArticle.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAuthorMostViewedArticles | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useGetPaginatedArticles.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetPaginatedArticle | fetches paginated articles successfully |
| useGetPaginatedArticle | returns null on catch |
| useGetPaginatedArticle | does not fetch if not connected |

## src/__tests__/hooks/article/useGetUserAllArticles.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAllArticlesForUser | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useLazyGetArticleContent.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useLazyGetArticleContent | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useLikeArticle.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useLikeArticle | likes an article successfully when not guest |
| useLikeArticle | fails if user is a guest |
| useLikeArticle | posts to the correct endpoint |

## src/__tests__/hooks/article/usePostArticle.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| usePostArticleData | posts an article successfully |
| usePostArticleData | sets error state on network failure |

## src/__tests__/hooks/article/useRequestArticleEdit.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useRequestArticleEdit | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useSaveArticle.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSaveArticle | saves an article successfully |
| useSaveArticle | sets error state on network failure |
| useSaveArticle | posts to the correct endpoint |

## src/__tests__/hooks/article/useSubmitEditRequestMutation.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSubmitEditRequest | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useSubmitSuggestedChanges.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSubmitSuggestedChanges | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useUpdateReadEvent.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateReadEvent | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useUpdateViewCount.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateViewCount | executes mutation successfully and calls API |

## src/__tests__/hooks/article/useUploadArticlePocketbase.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUploadArticleToPocketbase | executes mutation successfully and calls API |

## src/__tests__/hooks/auth/useChangePassword.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useChangePasswordMutation | resolves on success |
| useChangePasswordMutation | sets error state on network failure |
| useChangePasswordMutation | posts to the correct endpoint |

## src/__tests__/hooks/auth/useCheckUserHandleAvailability.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useCheckUserHandleAvailability | executes mutation successfully and calls API |

## src/__tests__/hooks/auth/useGetTokenStatus.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useCheckTokenStatus | executes mutation successfully and calls API |

## src/__tests__/hooks/auth/useMailVerification.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useVerificationMailMutation | resolves with success message |
| useVerificationMailMutation | sets error state on network failure |
| useVerificationMailMutation | posts to the correct endpoint |

## src/__tests__/hooks/auth/useResendVerification.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useRequestVerification | resolves with success message |
| useRequestVerification | sets error state on network failure |
| useRequestVerification | posts to the correct endpoint |

## src/__tests__/hooks/auth/useSendOtp.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSendOtpMutation | does NOT return an otp field from the mutation result |
| useSendOtpMutation | resolves to void on a clean success response |
| useSendOtpMutation | propagates network errors via onError |
| useSendOtpMutation | posts to the correct endpoint with the provided email |

## src/__tests__/hooks/auth/useUpdatePassword.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdatePassword | resolves on success |
| useUpdatePassword | sets error state on network failure |
| useUpdatePassword | puts to the correct endpoint |

## src/__tests__/hooks/auth/useUserLogin.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useLoginMutation | returns user profile data on success |
| useLoginMutation | sets error state on network failure |
| useLoginMutation | posts to the correct endpoint with the provided credentials |

## src/__tests__/hooks/auth/useUserLogout.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUserLogout | resolves on success |
| useUserLogout | sets error state on network failure |
| useUserLogout | posts to the correct endpoint |

## src/__tests__/hooks/auth/useUserRegistration.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useRegdMutation | returns token on success |
| useRegdMutation | sets error state on network failure |
| useRegdMutation | posts to the correct endpoint |

## src/__tests__/hooks/auth/useVerifyOtp.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useVerifyOtpMutation | resolves with success message |
| useVerifyOtpMutation | sets error state on network failure |
| useVerifyOtpMutation | posts to the correct endpoint |

## src/__tests__/hooks/common/useDoubleTap.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useDoubleTap hook | triggers onSingleTap when tapped once after delay |
| useDoubleTap hook | triggers onDoubleTap when tapped twice within delay |
| useDoubleTap hook | handles rapid single taps spaced further than delay |
| useDoubleTap hook | clears a pending single-tap timer when unmounted |

## src/__tests__/hooks/common/useDyslexiaMode.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useDyslexiaMode hook | should initialize with false if nothing is in storage |
| useDyslexiaMode hook | should initialize with true if "true" is in storage |
| useDyslexiaMode hook | should toggle state and call storeItem |
| useDyslexiaMode hook | should revert state if storeItem fails (optimistic update fallback) |

## src/__tests__/hooks/improvement/useGetImprovementById.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetImprovementById | executes mutation successfully and calls API |

## src/__tests__/hooks/improvement/useGetImprovementContent.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetImprovementContent | executes mutation successfully and calls API |

## src/__tests__/hooks/improvement/useGetUserAllImprovements.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAllImprovementsForReview | executes mutation successfully and calls API |

## src/__tests__/hooks/improvement/useSubmitImprovement.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSubmitImprovement | executes mutation successfully and calls API |

## src/__tests__/hooks/improvement/useUploadImprovementToPocketbase.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUploadImprovementToPocketbase | executes mutation successfully and calls API |

## src/__tests__/hooks/moderation/useGetReportReasons.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetReasons | executes mutation successfully and calls API |

## src/__tests__/hooks/moderation/useSubmitReport.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useSubmitReport | executes mutation successfully and calls API |

## src/__tests__/hooks/notification/useDeleteNotification.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useDeleteNotification | executes mutation successfully and calls API |

## src/__tests__/hooks/notification/useGetAllNotifications.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAllNotifications | executes mutation successfully and calls API |

## src/__tests__/hooks/notification/useGetNotificationPreferences.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetNotificationPreferences | executes mutation successfully and calls API |

## src/__tests__/hooks/notification/useGetUnreadNotificationCount.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetUnreadNotificationCount | executes mutation successfully and calls API |

## src/__tests__/hooks/notification/useMarkNoticationAsRead.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useMarkNotificationAsRead | executes mutation successfully and calls API |

## src/__tests__/hooks/notification/useUpdateNotificationPreferences.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateNotificationPreferences | executes mutation successfully and calls API |

## src/__tests__/hooks/playlist/useCreatePlaylist.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useCreatePlaylist | creates playlist successfully |
| useCreatePlaylist | sets error state on network failure |

## src/__tests__/hooks/playlist/useGetPlaylists.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetPlaylists | fetches playlists successfully when not guest |
| useGetPlaylists | does not fetch if user is a guest |

## src/__tests__/hooks/playlist/useUpdatePlaylist.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdatePlaylist | adds podcast to playlist successfully |
| useUpdatePlaylist | sets error state on network failure |

## src/__tests__/hooks/podcast/useFilterPodcasts.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useFilterPodcasts | filters podcasts successfully |
| useFilterPodcasts | sets error state on network failure |

## src/__tests__/hooks/podcast/useGetAllPodcasts.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAllPodcasts | fetches all podcasts successfully |
| useGetAllPodcasts | sets error state on network failure |
| useGetAllPodcasts | does not fetch if not connected |

## src/__tests__/hooks/podcast/useGetDiscardedPodcast.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetDiscardedPodcasts | fetches discarded podcasts successfully |
| useGetDiscardedPodcasts | sets error state on network failure |

## src/__tests__/hooks/podcast/useGetPendingPodcasts.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetPendingPodcasts | fetches pending podcasts successfully |
| useGetPendingPodcasts | sets error state on network failure |

## src/__tests__/hooks/podcast/useGetSearchPodcasts.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetSearchPodcasts | fetches search podcasts successfully |
| useGetSearchPodcasts | sets error state on network failure |
| useGetSearchPodcasts | does not fetch if not connected |

## src/__tests__/hooks/podcast/useGetSinglePodcastDetails.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetSinglePodcastDetails | fetches podcast details successfully |
| useGetSinglePodcastDetails | returns null on error |

## src/__tests__/hooks/podcast/useGetUserPublishedPodcasts.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetUserPublishedPodcasts | fetches published podcasts successfully |
| useGetUserPublishedPodcasts | sets error state on network failure |

## src/__tests__/hooks/podcast/useLikePodcast.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useLikePodcast | likes a podcast successfully when not guest |
| useLikePodcast | fails if user is a guest |
| useLikePodcast | posts to the correct endpoint |

## src/__tests__/hooks/podcast/useUpdatePodcastPlaylist.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdatePodcastPlaylist | updates podcast playlist successfully |
| useUpdatePodcastPlaylist | sets error state on network failure |

## src/__tests__/hooks/podcast/useUpdatePodcastViewcount.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdatePodcastViewcount | executes mutation successfully and calls API |

## src/__tests__/hooks/podcast/useUploadPodcast.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUploadPodcast | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useGetAuthorProfile.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetAuthorProfile | executes query successfully and calls API |
| useGetAuthorProfile | returns undefined when isConnected is false (query disabled) |

## src/__tests__/hooks/profile/useGetProfile.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetProfile | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useGetProfileImageById.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetUserProfileImage | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useGetUserDetails.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetUserDetails | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useUpdateProfileImage.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateProfileImage | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useUpdateUserContactDetail.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateUserContactDetail | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useUpdateUserGeneralDetails.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateUserGeneralDetails | executes mutation successfully and calls API |

## src/__tests__/hooks/profile/useUpdateUserProfDetails.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateUserProfDetails | executes mutation successfully and calls API |

## src/__tests__/hooks/social/useGetUserSocialCircle.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useGetUserSocials | executes mutation successfully and calls API |

## src/__tests__/hooks/social/useUpdateFollowStatus.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| useUpdateFollowStatus | executes mutation successfully and calls API |

## src/__tests__/lib/api/ApiTimeout.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| fetchWithTimeout | resolves when fetch completes before the timeout |
| fetchWithTimeout | rejects with a clear timeout error for stalled requests |
| CallAPI helpers | uses the timeout-enabled fetch wrapper for authenticated POST calls |
| CallAPI helpers | uses the timeout-enabled fetch wrapper for simple GET calls |
| setupAxiosInterceptor | configures shared axios timeout defaults |
| setupAxiosInterceptor | does not stack interceptors when called multiple times (idempotency) |
| setupAxiosInterceptor | attaches authorization header if token exists in secure store |
| setupAxiosInterceptor | removes authorization header if token is missing in secure store |
| setupAxiosInterceptor | safely handles undefined headers object on request config |

## src/__tests__/lib/platform/DeepLinkService.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| resolveDeepLinkTarget | should correctly resolve the create-post deep link |

## src/__tests__/lib/platform/followNotification.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| emitFollowNotification | targets the user passed by the successful follow operation |
| emitFollowNotification | does not emit when the socket is unavailable |

## src/__tests__/lib/platform/notificationUtils.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| mergeNotificationsById | returns an empty list when both pages are empty |
| mergeNotificationsById | preserves the order of unique notifications |
| mergeNotificationsById | deduplicates IDs and keeps the latest server value |
| mergeNotificationsById | deduplicates repeated entries within the incoming page |

## src/__tests__/lib/services/ReadingHistoryService.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ReadingHistoryService | returns empty array when no history exists |
| ReadingHistoryService | returns parsed history successfully |
| ReadingHistoryService | handles corrupted JSON safely |
| ReadingHistoryService | records a new article view with timestamp |
| ReadingHistoryService | moves existing article to front when viewed again |
| ReadingHistoryService | skips duplicate view within debounce window |
| ReadingHistoryService | limits history to 50 items |
| ReadingHistoryService | clears reading history |

## src/__tests__/lib/services/ReadingProgressService.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ReadingProgressService | returns valid progress for the requested article |
| ReadingProgressService | removes malformed JSON and returns null |
| ReadingProgressService | rejects progress saved for another article |
| ReadingProgressService | clamps saved progress to the supported range |
| ReadingProgressService | clears the requested article progress |
| ReadingProgressService | returns null when no progress exists |
| ReadingProgressService | removes progress with scroll position greater than 100 |
| ReadingProgressService | removes progress with negative scroll position |
| ReadingProgressService | removes progress with invalid timestamp |
| ReadingProgressService | removes progress with non-numeric scroll position |
| ReadingProgressService | clamps negative progress to 0 |
| ReadingProgressService | stores the current timestamp when saving progress |
| ReadingProgressService | returns null even if cleanup of invalid progress fails |

## src/__tests__/lib/storage/MMKVUtils.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| MMKVUtils podcast cache | reads and writes via MMKV when healthy |
| MMKVUtils podcast cache | falls back to AsyncStorage and invalidates MMKV when write throws |
| MMKVUtils podcast cache | reads from AsyncStorage when MMKV returns empty but AsyncStorage has data |
| MMKVUtils podcast cache | falls back to AsyncStorage when MMKV read throws |
| MMKVUtils podcast cache | deletes from both stores |
| MMKVUtils reading progress | writes reading progress to MMKV when healthy |
| MMKVUtils reading progress | falls back to AsyncStorage under prefixed key when MMKV write throws |
| MMKVUtils reading progress | does not throw when MMKV set throws (previously uncaught) |
| MMKVUtils reading progress | deletes reading progress from both stores |
| MMKVUtils without MMKV module | uses AsyncStorage for podcasts when MMKV is unavailable |

## src/__tests__/lib/utils/calculators.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| calculateBMI | calculates BMI correctly for normal weight adult |
| calculateBMI | calculates BMI correctly for underweight person |
| calculateBMI | calculates BMI correctly for overweight person |
| calculateBMI | calculates BMI correctly for obese person |
| calculateBMI | returns rounded value to 1 decimal place |
| calculateBMI | throws error for zero weight |
| calculateBMI | throws error for negative weight |
| calculateBMI | throws error for zero height |
| calculateBMI | throws error for negative height |
| calculateBMI | handles very small values correctly |
| calculateBMI | handles very large values correctly |
| classifyBMI | classifies underweight (BMI < 18.5) |
| classifyBMI | classifies normal weight (18.5 <= BMI < 25) |
| classifyBMI | classifies overweight (25 <= BMI < 30) |
| classifyBMI | classifies obese class I (30 <= BMI < 35) |
| classifyBMI | classifies obese class II (35 <= BMI < 40) |
| classifyBMI | classifies obese class III (BMI >= 40) |
| calculateBMR | calculates BMR correctly for adult male |
| calculateBMR | calculates BMR correctly for adult female |
| calculateBMR | BMR is higher for males than females with same stats |
| calculateBMR | BMR increases with weight |
| calculateBMR | BMR increases with height |
| calculateBMR | BMR decreases with age |
| calculateBMR | returns integer value |
| calculateBMR | throws error for zero weight |
| calculateBMR | throws error for zero height |
| calculateBMR | throws error for zero age |
| calculateBMR | throws error for negative age |
| calculateBMR | throws error for age > 150 |
| calculateBMR | accepts age 1 (minimum valid age) |
| calculateBMR | accepts age 150 (maximum valid age) |
| calculateTDEE | calculates TDEE correctly for sedentary person |
| calculateTDEE | calculates TDEE correctly for lightly active person |
| calculateTDEE | calculates TDEE correctly for moderately active person |
| calculateTDEE | calculates TDEE correctly for very active person |
| calculateTDEE | calculates TDEE correctly for extremely active person |
| calculateTDEE | TDEE increases with activity level |
| calculateTDEE | returns integer value |
| calculateTDEE | throws error for invalid activity level |
| calculateTDEE | TDEE is always greater than BMR |
| calculateCaloricNeeds | calculates maintenance calories correctly |
| calculateCaloricNeeds | calculates weight loss calories correctly |
| calculateCaloricNeeds | calculates weight gain calories correctly |
| calculateCaloricNeeds | weight loss calories are less than maintenance |
| calculateCaloricNeeds | weight gain calories are greater than maintenance |
| calculateCaloricNeeds | returns integer value |
| calculateCaloricNeeds | throws error for invalid goal |
| calculateCaloricNeeds | loss goal creates significant caloric deficit |
| calculateCaloricNeeds | gain goal creates ~300 kcal surplus |
| getBMIAssessment | returns appropriate message for underweight |
| getBMIAssessment | returns appropriate message for normal weight |
| getBMIAssessment | returns appropriate message for overweight |
| getBMIAssessment | returns appropriate message for obese class I |
| getBMIAssessment | returns appropriate message for obese class II |
| getBMIAssessment | returns appropriate message for obese class III |
| getBMIAssessment | returns non-empty string |
| Integration tests: BMI → Classification → Assessment | full workflow for normal weight person |
| Integration tests: BMI → Classification → Assessment | full workflow for underweight person |
| Integration tests: BMI → Classification → Assessment | full workflow for obese person |
| Integration tests: Full health metrics workflow | complete health assessment for 30-year-old male |
| Integration tests: Full health metrics workflow | complete health assessment for 25-year-old female |

## src/__tests__/lib/utils/contactLinks.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| normalizePhoneNumberForLink | normalizes local Indian phone numbers for tel links |
| normalizePhoneNumberForLink | preserves explicit country codes while removing formatting characters |
| normalizePhoneNumberForLink | normalizes Indian numbers that already include the 91 country code |
| normalizePhoneNumberForLink | normalizes common international dialing prefixes without adding the Indian country code |
| normalizePhoneNumberForLink | normalizes local Indian numbers with a trunk prefix |
| normalizePhoneNumberForLink | returns null for empty or non-numeric phone values |
| buildPhoneLink | builds android tel links without whitespace |
| buildPhoneLink | builds non-android telprompt links without whitespace |
| buildMailLink | builds mailto links without a space after the scheme |
| buildMailLink | removes accidental whitespace inside email values |
| buildMailLink | does not URI-encode the normalized email address |
| buildMailLink | returns null for empty email values |

## src/__tests__/lib/utils/dateUtils.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| parseDbTimestamp | safely parses timestamps with missing timezone suffixes as local time |
| parseDbTimestamp | safely parses timestamps with existing Z |
| parseDbTimestamp | safely parses timestamps with explicit offset |
| parseDbTimestamp | returns null for invalid dates |
| formatting | formats formatDateWithTime correctly |
| formatting | formats formatTimeWithDate correctly |
| formatting | formats formatDateShortYear correctly |
| formatting | formats formatWithOrdinalAndDay correctly |
| formatting | formats formatDateShort correctly |
| timezone mock behavior | formats dates correctly in America/New_York |

## src/__tests__/lib/utils/SearchUtils.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| escapeRegexSpecialChars | should escape regex special characters |
| escapeRegexSpecialChars | should handle normal text |
| escapeRegexSpecialChars | should handle empty and null inputs |
| sanitizeSearchInput | should trim whitespace |
| sanitizeSearchInput | should remove control characters |
| sanitizeSearchInput | should limit length to 500 characters |
| sanitizeSearchInput | should handle normal input |
| sanitizeSearchInput | should handle null/empty input |
| isValidSearchInput | should validate correct input |
| isValidSearchInput | should reject empty input |
| isValidSearchInput | should reject input longer than 500 characters |
| isValidSearchInput | should reject null input |
| createSafeRegexPattern | should create valid regex for safe terms |
| createSafeRegexPattern | should escape special characters in pattern |
| createSafeRegexPattern | should be case insensitive |

## src/__tests__/redux/alertSlice.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| alertSlice reducers | should return the initial state |
| alertSlice reducers | should handle showAlert |
| alertSlice reducers | should handle showAlert without optional callbacks |
| alertSlice reducers | should handle hideAlert |

## src/__tests__/redux/dataSlice.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| dataSlice reducers | should return the initial state |
| dataSlice reducers | should handle setFilteredArticles |
| dataSlice reducers | should handle setSearchedArticles |
| dataSlice reducers | should handle setSelectedTags |
| dataSlice reducers | should handle setSortType |
| dataSlice reducers | should handle setSearchMode |
| dataSlice reducers | should handle setArticle |
| dataSlice reducers | should handle setTags |
| dataSlice reducers | should handle setSuggestion |
| dataSlice reducers | should handle setSuggestionAccepted |
| dataSlice reducers | should handle setSelectePodcastCategories |
| dataSlice reducers | should handle setPodcasts |
| dataSlice reducers | should handle appendPodcasts |
| dataSlice reducers | should handle setaddedPodcastId |
| dataSlice reducers | should handle setRemovePlaylistId |

## src/__tests__/redux/NetworkSlice.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| NetworkSlice reducers | should return the initial state |
| NetworkSlice reducers | should handle setConnected to false |
| NetworkSlice reducers | should handle setConnected to true |

## src/__tests__/redux/UserSlice.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| UserSlice reducers | should return the initial state |
| UserSlice reducers | should handle setUserId |
| UserSlice reducers | should handle setSocialUserId |
| UserSlice reducers | should handle setUserToken |
| UserSlice reducers | should handle setUserHandle |
| UserSlice reducers | should handle setGuestMode |
| UserSlice reducers | should handle resetUserState |

## src/__tests__/screens/ai/ChatbotScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ChatbotScreen | renders the chatbot title and the default welcome message |
| ChatbotScreen | shows the typing indicator and status when a message is pending |
| ChatbotScreen | appends an error message card if the AI request fails |
| ChatbotScreen | allows retrying a failed message |
| ChatbotScreen | shows an error bubble and snackbar if message sent when offline |

## src/__tests__/screens/article/ArticleDescriptionScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ArticleDescriptionScreen - Tag Selection and Deselection Tests | renders correctly with default tags |
| ArticleDescriptionScreen - Tag Selection and Deselection Tests | selects tags when clicked if under limit |
| ArticleDescriptionScreen - Tag Selection and Deselection Tests | does not select more than 5 tags |
| ArticleDescriptionScreen - Tag Selection and Deselection Tests | correctly deselects a tag and keeps others when tags use _id instead of id (Tag Deselection Bug Fix) |
| ArticleDescriptionScreen - Tag Selection and Deselection Tests | correctly deselects a tag and keeps others when tags use id instead of _id |

## src/__tests__/screens/article/ArticleScreen.readEvent.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ArticleScreen — read-event scroll guard | calls updateReadEvent exactly once on multiple rapid bottom-of-page events |
| ArticleScreen — read-event scroll guard | does not call updateReadEvent when isGuest is true |
| ArticleScreen — read-event scroll guard | does not call updateReadEvent when bottom has not been reached |
| ArticleScreen — read-event scroll guard | resets the ref on onError so a retry is possible |
| ArticleScreen — read-event scroll guard | resets the ref when articleId changes (simulated) |

## src/__tests__/screens/article/CommentScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| CommentScreen - edge case guards | renders without crashing when imageUtils is missing |
| CommentScreen - edge case guards | renders without crashing when imageUtils is an empty array |
| CommentScreen - edge case guards | renders without crashing when authorId is missing |
| CommentScreen - edge case guards | renders correctly when article has valid imageUtils and authorId |

## src/__tests__/screens/article/ContentListScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| ContentListScreen | renders tabs correctly |

## src/__tests__/screens/article/PreviewScreen.compensatingDelete.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| PreviewScreen compensating delete — new article path | calls deletePocketbaseRecord with the correct recordId when postMutation fails |
| PreviewScreen compensating delete — new article path | does NOT call deletePocketbaseRecord when postMutation succeeds |
| PreviewScreen compensating delete — new article path | does NOT call deletePocketbaseRecord when the PocketBase upload itself fails |
| PreviewScreen compensating delete — improvement path | calls deletePocketbaseRecord with correct recordId when improvementMutation fails |
| PreviewScreen compensating delete — improvement path | does NOT call deletePocketbaseRecord when improvementMutation succeeds |
| PreviewScreen compensating delete — edit/suggested-changes path | calls deletePocketbaseRecord with correct recordId when submitChangesMutation fails |

## src/__tests__/screens/auth/LoginScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| LoginScreen - Security Bypass and Validation Tests | renders email and password inputs and a login button |
| LoginScreen - Security Bypass and Validation Tests | does NOT redirect to main feed and displays error on 401 Unauthorized response (Critical Security Bypass Fix) |
| LoginScreen - Security Bypass and Validation Tests | redirects to main feed on successful authentication |

## src/__tests__/screens/auth/LogoutScreen.local.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| LogoutScreen local logout behavior | clears local session after confirmed server logout |
| LogoutScreen local logout behavior | clears local session when the server returns an error |
| LogoutScreen local logout behavior | clears local session when the device is offline |

## src/__tests__/screens/auth/SignUpScreenFirst.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| SignUpScreenFirst - Crash Prevention and Field Verification Tests | renders sign up form inputs correctly |
| SignUpScreenFirst - Crash Prevention and Field Verification Tests | watches the email field correctly and does NOT crash during handleVerifyModalCallback (Undeclared email Variable Crash Fix) |

## src/__tests__/screens/auth/SplashScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| SplashScreen - Offline Session and Auto-Login Tests | performs auto-login and redirects to TabNavigation when token is valid |
| SplashScreen - Offline Session and Auto-Login Tests | allows offline access and redirects to TabNavigation on network connectivity errors when local token is present (Offline Support Fix) |
| SplashScreen - Offline Session and Auto-Login Tests | clears session and redirects to LoginScreen when token is invalid and not a network error |

## src/__tests__/screens/home/HomeScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| HomeScreen - Early Return and State Rendering Tests | renders OfflineArticleState when there is no internet connection |
| HomeScreen - Early Return and State Rendering Tests | renders NoArticleState (ErrorState) when there is an API error |
| HomeScreen - Early Return and State Rendering Tests | renders LoadingState when loading is active, regardless of article empty status (Infinite Loop Fix) |
| HomeScreen - Early Return and State Rendering Tests | renders EmptyArticleState (NoArticleState) when loading has completed and no articles exist |

## src/__tests__/screens/notification/NotificationPreferencesScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| NotificationPreferencesScreen | renders loading spinner when loading data |
| NotificationPreferencesScreen | renders categories and pre-selected checkmark based on user preferences |
| NotificationPreferencesScreen | filters preferences dynamically based on search query (case-insensitive) |
| NotificationPreferencesScreen | displays empty state when no matching preferences are found |
| NotificationPreferencesScreen | shows clear button when text is typed and clears input when pressed |
| NotificationPreferencesScreen | preserves current preference toggle states during filtering |
| NotificationPreferencesScreen | performs select all and clear all operations correctly |
| NotificationPreferencesScreen | filters Select All to only visible items when search is active |
| NotificationPreferencesScreen | relabels to "Clear Visible" while filtering and preserves hidden selections on press |

## src/__tests__/screens/notification/NotificationScreen.markAsRead.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| NotificationScreen – mark-as-read guard | does not call markNotification when notification list is empty |
| NotificationScreen – mark-as-read guard | does not call markNotification when all notifications are already read |
| NotificationScreen – mark-as-read guard | calls markNotification when unread notifications exist |
| NotificationScreen – mark-as-read guard | does not call markNotification when not connected to internet |
| NotificationScreen – mark-as-read guard | calls markNotification exactly once even with multiple unread notifications |

## src/__tests__/screens/podcast/OfflinePodcastList.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| OfflinePodcastList | loads and renders cached offline podcasts |
| OfflinePodcastList | triggers focus effect callback to reload podcasts when screen comes into focus |
| OfflinePodcastList | removes podcast and reloads list on delete click |
| OfflinePodcastList | renders error state when reading downloaded podcasts throws an error |

## src/__tests__/screens/podcast/PodcastDetail.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| PodcastDetail | renders podcast metadata and player controls |
| PodcastDetail | renders loading state while podcast data is loading |
| PodcastDetail | renders an error fallback when podcast loading fails |
| PodcastDetail | switches play control state when the play button is pressed |
| PodcastDetail | renders accessible controls and slider labels |
| PodcastDetail | pauses playback and shows reconnect indicator when network disconnects during playback |
| PodcastDetail | automatically resumes playback after network reconnects once |
| PodcastDetail | does not attempt duplicate auto-resume when reconnect events repeat |
| PodcastDetail | truncates long description and toggles between Read More and Read Less |
| PodcastDetail | supports rendering a long title without errors |
| PodcastDetail | cycles playback speed correctly on speed button press in both playing and paused states |

## src/__tests__/screens/settings/SettingsScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| SettingsScreen | renders settings options |

## src/__tests__/screens/social/RespectGiverScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| RespectGiverScreen | renders without crashing |

## src/__tests__/screens/social/SocialScreen.test.tsx

| Describe Block | Test Condition (it/test) |
| --- | --- |
| SocialScreen - Follow Action and Notification Race Condition Tests | renders follower list correctly |
| SocialScreen - Follow Action and Notification Race Condition Tests | emits follow notification with correct follower ID directly, avoiding state race condition (Follow Notification Race Condition Fix) |

## src/__tests__/services/SummaryService.test.ts

| Describe Block | Test Condition (it/test) |
| --- | --- |
| generateArticleSummary | returns null when fetch throws a network error |
| generateArticleSummary | returns null when API returns non-OK status |
| generateArticleSummary | returns null when response JSON is malformed |

