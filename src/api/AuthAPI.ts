import axios from "axios";
import User from "../domain/User";

const baseURL = "https://api-teste.com";

class AuthAPI {
  async login(email: string, password: string): Promise<User> {
    const response = await axios.post<JSON>(`${baseURL}/api/auth/login`, {
      email: email,
      password: password,
    });
    return User.fromJSON(response.data);
  }
}

export default AuthAPI;
