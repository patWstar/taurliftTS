import axios from "axios";
import tokenHandler from "util/tokenHandler";

const refreshLocalToken = (): void => {
  const token: string = localStorage.token;
  const refreshToken: string = localStorage.refreshToken;

  axios
    .post("/refreshUserToken", {
      token,
      refreshToken,
    })
    .then(({ data }) => {
      const token: string = data.access_token;
      const refreshToken: string = data.refresh_token;
      tokenHandler({ token, refreshToken });
    })
    .then(() => {
      // console.log(
      //   new Date().toLocaleTimeString() + " token refreshed for the next hour"
      // );
    })
    .catch((err) => {
      console.error(err);
    });
};

export default refreshLocalToken;
