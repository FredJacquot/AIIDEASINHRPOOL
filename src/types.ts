export interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}