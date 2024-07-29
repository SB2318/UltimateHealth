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

export type Category = {
  __v: number;
  _id: string;
  id: number;
  name: string;
};

export type User = {
  Profile_image: string;
  Years_of_experience: null;
  __v: number;
  _id: string;
  about: null;
  articles: any[];
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
  savedArticles: any[];
  specialization: null;
  user_handle: string;
  user_id: string;
  user_name: string;
  verificationToken: null;
};

interface Contactdetail {
  email_id: string;
  phone_no: string;
}
