import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {StackScreenProps} from '@react-navigation/stack';
import {Dispatch, RefObject, SetStateAction} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet'; // Adjust this import based on your actual BottomSheetModal component

export type RootStackParamList = {
  navigate(arg0: string): unknown;
  SplashScreen: undefined;
  LoginScreen: undefined;
  TabNavigation: undefined;
  SignUpScreenFirst: undefined;
  SignUpScreenSecond: {user: UserDetail};
  OtpScreen: {email: string};
  NewPasswordScreen: {email: string};
  EditorScreen: {
    title: string;
    authorName: string;
    description: string;
    selectedGenres: Category[];
    imageUtils: string;
    articleData: ArticleData | null | undefined;
    requestId: string | undefined;
    htmlContent: string | undefined;
    pb_record_id: string | undefined;
  };
  ArticleDescriptionScreen: {
    article: ArticleData | null | undefined;
    htmlContent: string | undefined;
  };
  PreviewScreen: {
    article: string;
    title: string;
    authorName: string;
    description: string;
    image: string;
    selectedGenres: Category[];
    localImages: string[];
    htmlImages: string[];
    articleData: ArticleData | null | undefined;
    requestId: string | undefined;
    pb_record_id: string | undefined;
  };
  ArticleScreen: {
    articleId: number;
    authorId: string;
    recordId: string;
  };
  ReviewScreen: {
    articleId: number;
    authorId: string;
    recordId: string;
  };
  ImprovementReviewScreen: {
    requestId: string;
    authorId: string;
    recordId: string;
    articleRecordId: string;
  };
  OverviewScreen: undefined;
  ConversationScreen: undefined;
  SocialScreen: {
    type: number;
    articleId: number | undefined;
    social_user_id: string | undefined;
  };
  CommentScreen: {
    articleId: number;
    mentionedUsers: User[];
  };
  PodcastDiscussion:{
    podcastId: string;
    mentionedUsers: User[];
  }
  ReportScreen: {
    articleId: string;
    authorId: string;
    commentId: string | null;
    podcastId: string | null;
  };
  ReportConfirmationScreen: undefined;
  NotificationScreen: undefined;
  UserProfileScreen: {
    authorId: string | undefined;
    author_handle: string | undefined;
  };
  ProfileEditScreen: undefined;
  LogoutScreen: {profile_image: string; username: string};
  RenderSuggestion: {
    htmlContent: string;
  };
  PodcastDetail: {
    trackId: string;
  };
  OfflinePodcastList: undefined;
  OfflinePodcastDetail: {
    podcast: PodcastData
  };
  PodcastSearch: undefined
  //ChatbotScreen: undefined;
};

export type UserDetail = {
  user_name: string;
  user_handle: string;
  email: string;
  password: string;
  profile_image: string;
};
export type TabParamList = {
  Home: undefined;
  Podcasts: undefined;
  Profile: undefined;
  Chatbot: undefined;
};

export type SplashScreenProp =
  | StackScreenProps<RootStackParamList, 'SplashScreen'>
  | StackScreenProps<RootStackParamList, 'LoginScreen'>;

export type NewPasswordScreenProp = StackScreenProps<
  RootStackParamList,
  'NewPasswordScreen'
>;

export type UserProfileScreenProp =
  | StackScreenProps<RootStackParamList, 'UserProfileScreen'>
  | StackScreenProps<RootStackParamList, 'ArticleScreen'>
  | StackScreenProps<RootStackParamList, 'CommentScreen'>;

export type OtpScreenProp = StackScreenProps<RootStackParamList, 'OtpScreen'>;

export type SignUpScreenFirstProp = StackScreenProps<
  RootStackParamList,
  'SignUpScreenFirst'
>;

export type SignUpScreenSecondProp = StackScreenProps<
  RootStackParamList,
  'SignUpScreenSecond'
>;

export type ArticleDescriptionProp = StackScreenProps<
  RootStackParamList,
  'ArticleDescriptionScreen'
>;

export type LoginScreenProp = StackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type ArticleScreenProp = StackScreenProps<
  RootStackParamList,
  'ArticleScreen'
>;

export type PodcastDetailScreenProp = StackScreenProps<
  RootStackParamList,
  'PodcastDetail'
>;
export type ReviewScreenProp = StackScreenProps<
  RootStackParamList,
  'ReviewScreen'
>;

export type PodcastSearchProp = StackScreenProps<
 RootStackParamList,
 'PodcastSearch'
>;

export type OfflinePodcastListProp = StackScreenProps<
 RootStackParamList,
 'OfflinePodcastList'
>;

export type OfflinePodcastDetailProp = StackScreenProps<
 RootStackParamList,
 'OfflinePodcastDetail'
>;

export type ImpvReviewScreenProp = StackScreenProps<
  RootStackParamList,
  'ImprovementReviewScreen'
>;

export type CommentScreenProp = StackScreenProps<
  RootStackParamList,
  'CommentScreen'
>;
export type PodcastDiscussionProp = StackScreenProps<
  RootStackParamList,
  'PodcastDiscussion'
>;


export type ReportScreenProp = StackScreenProps<
  RootStackParamList,
  'ReportScreen'
>;

export type ReportConfirmationScreenProp = StackScreenProps<
  RootStackParamList,
  'ReportConfirmationScreen'
>;
export type NotificationScreenProp = StackScreenProps<
  RootStackParamList,
  'NotificationScreen'
>;
//StackScreenProps<RootStackParamList, 'UserProfileScreen'>;

export type EditorScreenProp = StackScreenProps<
  RootStackParamList,
  'EditorScreen'
>;

export type PreviewScreenProp = StackScreenProps<
  RootStackParamList,
  'PreviewScreen'
>;

export type RenderSuggestionProp = StackScreenProps<
  RootStackParamList,
  'RenderSuggestion'
>;

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  | StackScreenProps<RootStackParamList, 'ArticleScreen'>
  | StackScreenProps<RootStackParamList, 'CommentScreen'>
  | StackScreenProps<RootStackParamList, 'NotificationScreen'>
>;

export type ChatBotScreenProps = BottomTabScreenProps<TabParamList, 'Chatbot'>;
export type OverviewScreenProps = StackScreenProps<
  RootStackParamList,
  'OverviewScreen'
>;
export type ConversationScreenProps = StackScreenProps<
  RootStackParamList,
  'ConversationScreen'
>;

export type SocialScreenProps = StackScreenProps<
  RootStackParamList,
  'SocialScreen'
>;

export type PodcastScreenProps = CompositeScreenProps<
  | BottomTabScreenProps<TabParamList, 'Podcasts'>,
  | StackScreenProps<RootStackParamList, 'PodcastDetail'>
>;
export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  | StackScreenProps<RootStackParamList, 'ProfileEditScreen'>
  | StackScreenProps<RootStackParamList, 'ArticleScreen'>
>;

export type HomeScreenHeaderProps = {
  handlePresentModalPress: () => void;
  onTextInputChange: (textInput: string) => void;
  onNotificationClick: () => void;
  unreadCount: number;
};

export type ArticleCardProps = {
  item: ArticleData;
  navigation:
    | HomeScreenProps['navigation']
    | ProfileScreenProps['navigation']
    | UserProfileScreenProp['navigation'];
  success: () => void;
  isSelected: Boolean;
  setSelectedCardId: (id: string) => void;
  handleRepostAction: (item: ArticleData) => void;
  handleReportAction: (item: ArticleData) => void;
  handleEditRequestAction: (
    item: ArticleData,
    index: number,
    reason: string,
  ) => void;
};

export type ReviewCardProps = {
  item: ArticleData;
  onclick: (item: ArticleData) => void;
  isSelected: Boolean;
  setSelectedCardId: (id: string) => void;
};

export type Notification = {
  _id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
};

export type PocketBaseResponse = {
  message: string;
  recordId: string;
  html_file: string;
};
export type ProfileHeaderProps = {
  isDoctor: boolean;
  username: string;
  userhandle: string;
  profileImg: string;
  articlesPosted: number;
  articlesSaved: number;
  userPhoneNumber: string;
  userEmailID: string;
  specialization: string;
  experience: number;
  qualification: string;
  other: boolean;
  navigation:
    | ProfileScreenProps['navigation']
    | UserProfileScreenProp['navigation'];
  followers: number;
  followings: number;
  onFollowerPress: () => void;
  onFollowingPress: () => void;
  isFollowing: boolean | undefined;
  onFollowClick: () => void;
  onOverviewClick: () => void;
  improvementPublished: number;
};

export type HomeScreenFilterModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  categories: CategoryType[];
  handleCategorySelection: (category: CategoryType['name']) => void;
  selectCategoryList: CategoryType['name'][];
  handleFilterReset: () => void;
  handleFilterApply: () => void; // Replace `any` with the actual filter type if available
  setSortingType: (selectedType: string) => void;
  sortingType: string | '';
};

export type HomeScreenCategoriesFlatlistProps = {
  bottomSheetModalRef2: RefObject<BottomSheetModal>;
  categories: CategoryType[];
  handleCategorySelection: (category: CategoryType['name']) => void;
  selectCategoryList: CategoryType['name'][];
};

export type ProfileEditGeneralTab = {
  username: string;
  userhandle: string;
  email: string;
  about: string;
  imgUrl: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setUserHandle: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAbout: Dispatch<SetStateAction<string>>;
  handleSubmitGeneralDetails: () => void;
  selectImage: () => void;
};

export type ProfileEditProfessionalTab = {
  specialization: string;
  qualification: string;
  years_of_experience: string;
  setSpecialization: Dispatch<SetStateAction<string>>;
  setQualification: Dispatch<SetStateAction<string>>;
  setExperience: Dispatch<SetStateAction<string>>;
  handleSubmitProfessionalDetails: () => void;
};

export type ProfileEditContactTab = {
  phone_number: string;
  contact_email: string;
  setContactNumber: Dispatch<SetStateAction<string>>;
  setContactEmail: Dispatch<SetStateAction<string>>;
  handleSubmitContactDetails: () => void;
};

export type AddIconProp = {
  callback: () => void;
};

export type EmailInputModalProp = {
  visible: boolean;
  callback: (email: string) => void;
  backButtonClick: () => void;
  onDismiss: () => void;
  isRequestVerification: boolean;
};

export type Category = {
  __v: number;
  _id: string;
  id: number;
  name: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string[];
  author_name: string;
  lastUpdatedAt: string;
  imageUtils: string;
};

export type ArticleData = {
  _id: string;
  title: string;
  authorName: string;
  description: string;
  authorId: User | string;
  content: string;
  summary: string;
  tags: Category[];
  lastUpdated: string;
  imageUtils: string[];
  viewCount: number;
  viewUsers: User[];
  repostUsers: string[];
  likeCount: number;
  likedUsers: User[];
  savedUsers: string[];
  mentionedUsers: User[];
  assigned_date: string | null;
  discardReason: string;
  status: string;
  reviewer_id: string | null | undefined;
  contributors: User[];
  pb_recordId: string;
};

export type PodcastData = {
  _id: string;
  user_id: User;
  article_id: number;
  title: string;
  description: string;
  audio_url: string;
  cover_image: string;
  duration: number;
  tags: Category[];
  likedUsers: User[];
  savedUsers: User[];
  viewUsers: User[];
  discardReason: string;
  is_removed: boolean;
  mentionedUsers: User[];
  reportId: string | null;
  status: string;
  admin_id: string | null;
  updated_at: string;
  filePath: string | undefined,
  downloadAt: Date| null,
  commentCount: number|0,
};


export type UserStatus = {
  totalLikes: number;
  totalViews: number;
  likeProgress: number;
  viewProgress: number;
};

export type ReadStatus = {
  totalReads: number;
  progress: number;
};

export type MonthStatus = {
  date: string;
  value: number;
};

export type ReportReason = {
  _id: string;
  reason: string;
};

export type YearStatus = {
  month: string;
  value: number;
};

export type WriteStatus = {
  totalWrites: number;
  progress: number;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type User = {
  Profile_image: string;
  Years_of_experience: null;
  __v: number;
  _id: string;
  about: null;
  contact_detail: Contactdetail;
  created_at: string;
  email: string;
  followerCount: number;
  followers: any[];
  followingCount: number;
  followings: any[];
  isDoctor: boolean;
  isVerified: boolean;
  last_updated_at: string;
  likedArticles: any[];
  otp: null;
  otpExpires: null;
  password: string;
  qualification: null;
  readArticles: any[];
  savedArticles: ArticleData[];
  articles: ArticleData[];
  repostArticles: ArticleData[];
  specialization: string | null;
  user_handle: string;
  user_id: string;
  user_name: string;
  verificationToken: null;
  refreshToken: null;
  improvements: string[];
};

export type Contactdetail = {
  email_id: string;
  phone_no: string;
};

export type Podcast = {
  title: string;
  host: string;
  imageUri: string;
  likes: number;
  duration: number;
};

export type AuthData = {
  userId: string;
  token: string | null;
  user_handle: string | null;
};

export type Comment = {
  _id: string;
  id: string;
  articleId: number;
  userId: User;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentCommentId: string;
  replies: Comment[];
  likedUsers: string[];
  status: string;
  isEdited: Boolean;
  isReview: Boolean;
  isNote: Boolean;
};

export type EditRequest = {
  _id: string;
  user_id: string;
  article: ArticleData;
  edit_reason: string;
  status: string;
  reviewer_id: string | undefined;
  edited_content: string | undefined;
  editComments: Comment[];
  created_at: Date;
  discardReason: string;
  last_updated: Date;
  pb_recordId: string;
  article_recordId: string;
};

export type ImprovementCardProps = {
  item: EditRequest;
  onNavigate: (item: EditRequest) => void;
};

export type ContentSuggestionResponse = {
  full_html: string;
  suggestion: string;
};
