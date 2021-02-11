//Fundamentals
import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";
//Components
import Spinner from "components/shared/components/Spinner";
import fadeInAnimation from "components/shared/animations/fadeIn";
import TextInput from "components/shared/components/FormTextInput";
import SubmitButton from "components/shared/components/SubmitButton";
import ErrorList from "components/shared/components/ErrorList";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAuthenticated, login } from "redux/Slices/UserSlice";
//Utils
import { validateLogin } from "util/validators";
import tokenHandler from "util/tokenHandler";

//~~~~~~~~~~~~~~~~~~~Interfaces & types
interface UserCredentials {
  email: string;
  password: string;
}
//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  width: 60vw;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.containerBackgroundPrimary};
`;
const Content = styled.main`
  background-color: ${({ theme }) => theme.containerBackgroundPrimary};
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.2);
  width: 70rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  border-radius: 12px;
  padding-bottom: 4rem;
`;

const Header = styled.header`
  animation: ${fadeInAnimation} 2s linear 0s 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3vh;
  gap: 2rem;
  & > h2 {
    font-size: 3rem;
    font-weight: 600;
  }

  & > h1 {
    font-size: 3.2rem;
    letter-spacing: 2px;
  }
`;

const Form = styled.form`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const BottomTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SmallText = styled.aside`
  display: inline-block;
  font-size: 1.6rem;
  padding: 1rem;
`;

const LinkElement = styled(Link)`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.primaryColor};
  transition: 0.4s;
  &:hover {
    color: ${({ theme }) => theme.secondaryColorLight};
    letter-spacing: 2px;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const Login = (): JSX.Element => {
  //state
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //utils
  const isErrorsEmpty: boolean = errors.length === 0 ? true : false;
  const authenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  //~~~~~~~~~~~~~~~~~~~Methods
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Check for nulls or else typescript will scream at me
    const email: string =
      emailRef.current !== null ? emailRef.current.value : "";
    const password: string =
      passwordRef.current !== null ? passwordRef.current.value : "";

    //~~~~~~~~~~~~~~~~~~~Validate
    const userCredentials: UserCredentials = {
      email,
      password,
    };

    const validationErrors: string[] = validateLogin(userCredentials);

    if (validationErrors.length !== 0) {
      setErrors(validationErrors);
    } else if (validationErrors.length === 0) {
      setErrors([]);
      setIsLoading(true);
      axios
        .post("/login", userCredentials)
        .then(({ data }) => {
          const token: string = data.token;
          const refreshToken: string = data.refreshToken;

          tokenHandler({ token, refreshToken });
        })
        .then(() => {
          dispatch(login(userCredentials.email));
          setIsLoading(false);
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          setErrors([err.response.data]);
          setIsLoading(false);
        });
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      {authenticated ? (
        <Redirect to="/" />
      ) : (
        <Content>
          <Header>
            <h2>Welcome back!</h2>
            <h1>LOG IN</h1>
          </Header>
          {isLoading ? (
            <Spinner height="6.5rem" width="5rem" />
          ) : (
            <Form onSubmit={submitHandler}>
              <label htmlFor="email" />
              <TextInput
                name="Email"
                placeholder="E-mail"
                width="20rem"
                reactRef={emailRef}
              />
              <label htmlFor="password" />
              <TextInput
                name="password"
                placeholder="Password"
                width="20rem"
                type="password"
                reactRef={passwordRef}
              />
              <label htmlFor="confirmPassword" />

              <SubmitButton value="Log In" width="15rem" />
              {!isErrorsEmpty && <ErrorList width="90%" errors={errors} />}
            </Form>
          )}
          <BottomTextWrapper>
            <SmallText>Don't have an account?</SmallText>
            <LinkElement to="/signup">SIGN UP</LinkElement>
          </BottomTextWrapper>
        </Content>
      )}
    </Wrapper>
  );
};

export default Login;
