import jwtDecode from "jwt-decode";
import store from "redux/store";

import { login, logout } from "redux/Slices/UserSlice";
import tokenHandler from "util/tokenHandler";
interface DecodedToken {
  exp: number;
  email: string;
}
const findToken = (): void => {
  const token = localStorage.token;
  const refreshToken = localStorage.refreshToken;

  if (token) {
    const decodedToken: DecodedToken = jwtDecode(token);
    if (decodedToken) {
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Token expired. Please log in again");
        store.dispatch(logout());
      } else {
        store.dispatch(login(decodedToken.email));
        tokenHandler({ token, refreshToken });
      }
    }
  }
};

export default findToken;
