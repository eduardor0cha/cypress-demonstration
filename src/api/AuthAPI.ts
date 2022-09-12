import axios from "axios";
import User from "../domain/User";

const baseURL = "https://api-teste.com";
const api = axios.create({ baseURL: baseURL });

class AuthAPI {
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<JSON>(`${baseURL}/api/auth/login`, {
        email: email,
        password: password,
      });
      return User.fromJSON(response.data);
    } catch (e) {}
  }
}

export default AuthAPI;
