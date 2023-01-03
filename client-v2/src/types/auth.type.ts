export interface AuthLogin {
    success: boolean;
    user: {
        _id: string;
        avatar: {
            public_id: string;
            url: string;
        };
        user_name: string;
        createAt: string;
        email: string;
    };
    token: string;
}

export interface UserLogout {
    success: boolean;
    message: string;
}
