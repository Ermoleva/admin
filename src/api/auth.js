import api from "./api";
import tokens from "./tokens";

const auth = {
    async refresh() {
        const refresh_token = tokens.getRefreshToken()
        if (!refresh_token) return;
        const result = (await api.post('/auth/refresh', { refresh_token })).data;
        if (!result.tokens) throw new Error("No tokens getted from /auth/refresh");
        tokens.setTokens(result);
        return result;
    },
    async login(email, password) {
        const result = (await api.post('/auth/login', { email, password })).data;
        if (!result.tokens) throw new Error("No tokens getted from /auth/login");
        tokens.setTokens(result.tokens);
        return result;
    },
    async register(data) {
        const result = (await api.post('/auth/register', data)).data;
        if (!result.tokens) throw new Error("No tokens getted from /auth/register");
        tokens.setTokens(result.tokens);
        return result;
    },
    async logout() {
        tokens.setTokens(null);
    }
}

export default auth;