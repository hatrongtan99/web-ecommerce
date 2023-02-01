export interface CommentList {
  comments: {
    commentId: number;
    name: string;
    email: string;
    content: string;
    created: string;
    _id: string;
    reply: [];
  }[];
  meta: {
    count: number;
    totals: number;
    page: number;
  };
}

export interface NewComment {
  commentId: number;
  name: string;
  email: string;
  content: string;
}
