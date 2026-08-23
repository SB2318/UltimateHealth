export interface ApiTag {
  _id: string;
  id: number;
  name: string;
  __v?: number;
}

export interface ApiAuthor {
  _id: string;
  user_name: string;
  user_handle: string;
  Profile_image: string;
}

export interface ApiArticle {
  _id: number;
  pb_recordId: string;
  title: string;
  description: string;
  authorName: string;
  authorId: ApiAuthor;
  tags: ApiTag[];
  imageUtils: string[];
  viewCount: number;
  likeCount: number;
  language: string;
  status: string;
  publishedDate: string;
  lastUpdated: string;
}

export interface ApiArticlesResponse {
  articles: ApiArticle[];
  total?: number;
  totalPages?: number;
  currentPage?: number;
}
