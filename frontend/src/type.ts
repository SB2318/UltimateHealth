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
