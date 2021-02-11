interface tokenHandlerProps {
  token: string;
  refreshToken: string;
}

const tokenHandler = ({ token, refreshToken }: tokenHandlerProps): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};
export default tokenHandler;
