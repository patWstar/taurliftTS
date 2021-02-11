import axios from "axios";

interface tokenHandlerProps {
  token: string;
  refreshToken: string;
}

const tokenHandler = ({ token, refreshToken }: tokenHandlerProps): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  axios.defaults.headers.common["Authorization"] = token;
};
export default tokenHandler;
