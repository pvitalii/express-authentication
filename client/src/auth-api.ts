import axios from "axios";
import { Credentials } from "./interfaces/credentials-interface";
import { User } from "./interfaces/user-interface";

const path = 'http://localhost:5000/api/auth'


class AuthApi {
    async registration(credentials: Credentials) {
        return axios.post(`${path}/registration`, credentials, { withCredentials: true })

    }

    async login(credentials: Credentials) {
        return axios.post(`${path}/login`, credentials, { withCredentials: true })
    }

    async getProfile(): Promise<User> {
        const { data } = await axios.get(`${path}/profile`, { withCredentials: true });
        return data
    }

    async logout() {
        return axios.delete(`${path}/logout`, { withCredentials: true })
    }
}

export default new AuthApi()