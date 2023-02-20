export interface UserInfoRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    avatar: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserProfile {
    success: boolean;
    user: {
        avatar: {
            public_id: string;
            url: string;
        };
    };
    _id: string;
    user_name: string;
    email: string | null;
    provider: "facebook" | "google" | "email";
    facebookId: string;
    googleId: string;
    role: string;
    createAt: string;
    updateAt: string;
}
