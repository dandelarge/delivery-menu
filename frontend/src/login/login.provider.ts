import { client, setAccessTokenInLocalStorage } from "../api-client";

export interface UserInfo {
  name: string;
  role: string;
  id: string;
};

export function saveUserInfoInLocalStorage(userInfo: UserInfo) {
  localStorage.setItem('user_info', JSON.stringify(userInfo));
}

export function getUserInfoFromLocalStorage() {
  const json = localStorage.getItem('user_info') || '{}';
  return JSON.parse(json);
}

class Login {
  async login(username: string, password: string){
    const { data: {
      name, id, role, access_token
    } } = await client.post('login', {username, password});
    if (access_token) {
      setAccessTokenInLocalStorage(access_token);
      saveUserInfoInLocalStorage({id, name, role});
    }
    return {id, name, role, access_token};
  }

  async logout() {
    setAccessTokenInLocalStorage('');
  }
}

export const authorization = new Login();