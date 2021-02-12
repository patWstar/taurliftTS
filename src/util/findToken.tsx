import jwtDecode from "jwt-decode";
import store from "redux/store";
import { login, logout } from "redux/Slices/UserSlice";
import tokenHandler from "util/tokenHandler";
import refreshLocalToken from "util/refreshLocalToken";

interface DecodedToken {
  exp: number;
  email: string;
}
const findToken = (): void => {
  const token: string = localStorage.token;
  const refreshToken: string = localStorage.refreshToken;

  if (token && token !== undefined && token !== "undefined") {
    const decodedToken: DecodedToken = jwtDecode(token);
    if (decodedToken) {
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Token expired. Please log in again");
        store.dispatch(logout());
      } else {
        store.dispatch(login(decodedToken.email));
        tokenHandler({ token, refreshToken });
        refreshLocalToken();
      }
    }
  }
};

export default findToken;
