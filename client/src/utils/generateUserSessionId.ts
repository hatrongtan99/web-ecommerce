export default function generateUserSessionId() {
    if (typeof window !== undefined) {
        const existId = window.localStorage.getItem(process.env.NEXT_PUBLIC_USER_SESSION_ID as string);
        if (existId) return;

        const generate = Math.floor(Math.random() * 1000000000000) + `${Date.now()}`;
        window.localStorage.setItem(process.env.NEXT_PUBLIC_USER_SESSION_ID as string, generate)
    }
}