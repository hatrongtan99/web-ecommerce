export interface ListFeedback {
  feedbacks: {
    feedbackId: number;
    user: string;
    rating: number;
    content: string;
    created: string;
    _id: string;
  }[];
  meta: {
    count: number;
    page: number;
    totals: number;
    detail: {
      sum: number;
      star: number;
    }[];
  };
}
