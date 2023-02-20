export interface CommentList {
    comments: {
        user: string;
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
    user: string;
    email: string;
    content: string;
}
