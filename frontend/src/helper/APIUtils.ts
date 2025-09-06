import Config from 'react-native-config';
const LOGIN_API = `${Config.PROD_URL}/user/login`;
const REGISTRATION_API = `${Config.PROD_URL}/user/register`;
const ARTICLE_TAGS_API = '/articles/tags';
const GET_PROFILE_API = `${Config.PROD_URL}/user/getprofile`;
const VERIFICATION_MAIL_API = `${Config.PROD_URL}/user/verifyEmail`;
const RESEND_VERIFICATION = `${Config.PROD_URL}/user/resend-verification-mail`;
const SEND_OTP = `${Config.PROD_URL}/user/forgotpassword`;
const CHECK_OTP = `${Config.PROD_URL}/user/verifyOtp`;
const CHANGE_PASSWORD_API = `${Config.PROD_URL}/user/verifypassword`;
const REFRESH_TOKEN_API = `${Config.PROD_URL}/user/refreshToken`;
const FOLLOW_USER = `${Config.PROD_URL}/user/follow`;
const UPDATE_VIEW_COUNT = `${Config.PROD_URL}/articles/updateViewCount`;
const SAVE_ARTICLE = `${Config.PROD_URL}/articles/saveArticle`;
const LIKE_ARTICLE = `${Config.PROD_URL}/articles/likeArticle`;
const POST_ARTICLE = `${Config.PROD_URL}/articles`;
const GET_ARTICLE_BY_ID = `${Config.PROD_URL}/articles`;
const GET_USER_DETAILS_API = `${Config.PROD_URL}/user/getdetails`;
const UPDATE_USER_GENERAL_DETAILS = `${Config.PROD_URL}/user/update-general-details`;
const UPDATE_READ_EVENT = `${Config.PROD_URL}/article/readEvent`;
const UPDATE_USER_PASSWORD = `${Config.PROD_URL}/user/update-password`;
const UPDATE_USER_CONTACT_DETAILS = `${Config.PROD_URL}/user/update-contact-details`;
const UPDATE_USER_PROFESSIONAL_DETAILS = `${Config.PROD_URL}/user/update-professional-details`;
const UPLOAD_STORAGE = `${Config.PROD_URL}/upload-storage`;
const GET_STORAGE_DATA = `${Config.PROD_URL}/getFile`;
const UPDATE_PROFILE_IMAGE = `${Config.PROD_URL}/user/update-profile-image`;
const GET_PROFILE_IMAGE_BY_ID = `${Config.PROD_URL}/user/getprofileimage`;
const GET_IMAGE = `${Config.PROD_URL}/getfile`;
const USER_LOGOUT = `${Config.PROD_URL}/user/logout`;
/** Analytics Part */
const GET_TOTAL_LIKES_VIEWS = `${Config.PROD_URL}/analytics/user-stats/`;
const GET_TOTAL_READS = `${Config.PROD_URL}/analytics/total-reads/`;
const GET_TOTAL_WRITES = `${Config.PROD_URL}/analytics/total-writes/`;
const GET_MOSTLY_VIEWED = `${Config.PROD_URL}/analytics/mostly-viewed/`;
const GET_MONTHLY_READ_REPORT = `${Config.PROD_URL}/analytics/monthly-reads/`;
const GET_YEARLY_READ_REPORT = `${Config.PROD_URL}/analytics/yearly-reads/`;
const GET_MONTHLY_WRITES_REPORT = `${Config.PROD_URL}/analytics/monthly-writes/`;
const GET_YEARLY_WRITES_REPORT = `${Config.PROD_URL}/analytics/yearly-writes/`;

const VULTR_CHAT_URL = 'https://api.vultrinference.com/v1/chat/completions';
const GET_ARTICLE_CONTENT = `${Config.PROD_URL}/articles/get-article-content`;
const GET_IMPROVEMENT_CONTENT = `${Config.PROD_URL}/article/get-improve-content`;

const REPOST_ARTICLE = `${Config.PROD_URL}/article/repost`;
const CHECK_USER_HANDLE = `${Config.PROD_URL}/user/check-user-handle`;
const GET_REPORT_REASONS = `${Config.PROD_URL}/report/reasons`;
const SUBMIT_REPORT = `${Config.PROD_URL}/report/submit`;
const SUBMIT_SUGGESTED_CHANGES = `${Config.PROD_URL}/admin/submit-suggested-changes`;
const REQUEST_EDIT = `${Config.PROD_URL}/article/submit-edit-request`;
const GET_ALL_ARTICLES_FOR_USER = `${Config.PROD_URL}/user-articles`;
const GET_ALL_IMPROVEMENTS_FOR_USER = `${Config.PROD_URL}/article/improvements`;
const GET_FOLLOWERS = `${Config.PROD_URL}/user/followers`;
const GET_FOLLOWINGS = `${Config.PROD_URL}/user/followings`;
const GET_SOCIALS = `${Config.PROD_URL}/user/socials`;
const GET_IMPROVEMENT_BY_ID = `${Config.PROD_URL}/get-improvement`;
const SUBMIT_IMPROVEMENT = `${Config.PROD_URL}/article/submit-improvement`;
const UPLOAD_ARTICLE_TO_POCKETBASE = `${Config.PROD_URL}/upload-pocketbase/article`;
const UPLOAD_IMPROVEMENT_TO_POCKETBASE = `${Config.PROD_URL}/upload-pocketbase/improvement`;

/** Content Checker */
const RENDER_SUGGESTION = `${Config.CONTENT_CHECKER_PROD}/grammar/render-suggestions`;

/** PODCAST RELATED */
const GET_ALL_PODCASTS = `${Config.PROD_URL}/podcast/published-podcasts`;
const GET_PODCAST_DETAILS = `${Config.PROD_URL}/podcast/details`;
const UPDATE_PODCAST_VIEW_COUNT = `${Config.PROD_URL}/podcast/update-view-count`;
const LIKE_PODCAST = `${Config.PROD_URL}/podcast/like`;
const SEARCH_PODCAST = `${Config.PROD_URL}/podcast/search`;
const FILTER_PODCAST = `${Config.PROD_URL}/podcast/filter`;
const UPLOAD_PODCAST = `${Config.PROD_URL}/podcast/create`;
const GET_PLAYLIST = `${Config.PROD_URL}/podcast/get-my-playlists`;
const CREATE_PLAYLIST = `${Config.PROD_URL}/podcast/create-playlist`;
const ADD_TO_PLAYLIST = `${Config.PROD_URL}/podcast/add-podcast-form-playlist`;
const UPDATE_PODCAST_PLAYLIST = `${Config.PROD_URL}/podcast/update-playlist`;
/** Podcast workspace */
const DISCARDED_PODCASTS = `${Config.PROD_URL}/podcast/discarded`;
const PENDING_PODCASTS = `${Config.PROD_URL}/podcast/user-pending`;
const USER_PUBLISHED_PODCASTS = `${Config.PROD_URL}/podcast/user-published`;


export {
  LOGIN_API,
  REGISTRATION_API,
  ARTICLE_TAGS_API,
  GET_PROFILE_API,
  VERIFICATION_MAIL_API,
  RESEND_VERIFICATION,
  SEND_OTP,
  CHECK_OTP,
  CHANGE_PASSWORD_API,
  REFRESH_TOKEN_API,
  FOLLOW_USER,
  UPDATE_VIEW_COUNT,
  SAVE_ARTICLE,
  LIKE_ARTICLE,
  POST_ARTICLE,
  GET_ARTICLE_BY_ID,
  GET_USER_DETAILS_API,
  UPDATE_USER_GENERAL_DETAILS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_CONTACT_DETAILS,
  UPDATE_USER_PROFESSIONAL_DETAILS,
  UPLOAD_STORAGE,
  GET_STORAGE_DATA,
  UPDATE_PROFILE_IMAGE,
  GET_PROFILE_IMAGE_BY_ID,
  GET_IMAGE,
  USER_LOGOUT,
  UPDATE_READ_EVENT,
  GET_TOTAL_LIKES_VIEWS,
  GET_TOTAL_READS,
  GET_TOTAL_WRITES,
  GET_MOSTLY_VIEWED,
  GET_MONTHLY_READ_REPORT,
  GET_MONTHLY_WRITES_REPORT,
  GET_YEARLY_READ_REPORT,
  GET_YEARLY_WRITES_REPORT,
  VULTR_CHAT_URL,
  REPOST_ARTICLE,
  CHECK_USER_HANDLE,
  GET_REPORT_REASONS,
  SUBMIT_REPORT,
  SUBMIT_SUGGESTED_CHANGES,
  REQUEST_EDIT,
  GET_ALL_ARTICLES_FOR_USER,
  GET_ALL_IMPROVEMENTS_FOR_USER,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_IMPROVEMENT_BY_ID,
  SUBMIT_IMPROVEMENT,
  GET_SOCIALS,
  GET_ARTICLE_CONTENT,
  GET_IMPROVEMENT_CONTENT,
  UPLOAD_ARTICLE_TO_POCKETBASE,
  UPLOAD_IMPROVEMENT_TO_POCKETBASE,
  RENDER_SUGGESTION,
  // PODCAST
  GET_ALL_PODCASTS,
  GET_PODCAST_DETAILS,
  UPDATE_PODCAST_VIEW_COUNT,
  LIKE_PODCAST,
  SEARCH_PODCAST,
  FILTER_PODCAST,
  GET_PLAYLIST,
  CREATE_PLAYLIST,
  ADD_TO_PLAYLIST,
  UPDATE_PODCAST_PLAYLIST,
  UPLOAD_PODCAST,
  DISCARDED_PODCASTS,
  PENDING_PODCASTS,
  USER_PUBLISHED_PODCASTS
};
