export interface ListFeedback {
    feedbacks: {
        user: string;
        rating: number;
        content: string;
        phoneNumber: string;
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
