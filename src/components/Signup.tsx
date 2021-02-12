//Fundamentals
import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";
//Components
import fadeInAnimation from "components/shared/animations/fadeIn";
import TextInput from "components/shared/components/FormTextInput";
import SubmitButton from "components/shared/components/SubmitButton";
import ErrorList from "components/shared/components/ErrorList";
import Spinner from "components/shared/components/Spinner";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectAuthenticated, login } from "redux/Slices/UserSlice";
//Utils
import tokenHandler from "util/tokenHandler";
import { validateSignupCredentials } from "util/validators";

//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface NewUserCredentials {
  email: string;
  password: string;
  confirmPassword: string;
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
    font-size: 3vmin;
    font-weight: 600;
  }

  & > h1 {
    font-size: 3.2vmin;
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
  gap: 1vh;
  font-size: 2vmin;
`;

const BottomTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SmallText = styled.aside`
  display: inline-block;
  font-size: 1.6vmin;
  padding: 0.5vh 1vw;
`;

const LinkElement = styled(Link)`
  font-size: 2.4vmin;
  color: ${({ theme }) => theme.primaryColor};
  transition: 0.4s;
  &:hover {
    color: ${({ theme }) => theme.secondaryColorLight};
    letter-spacing: 2px;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const Signup = (): JSX.Element => {
  //state
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  //utils
  const isErrorsEmpty: boolean = errors.length === 0 ? true : false;
  const authenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    //~~~~~~~~~~~~~~~~~~~Check for nulls or else typescript will scream at me
    if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
      const email: string = emailRef.current.value;
      const password: string = passwordRef.current.value;
      const confirmPassword: string = confirmPasswordRef.current.value;

      //~~~~~~~~~~~~~~~~~~~Validate
      const newUserCredentials: NewUserCredentials = {
        email,
        password,
        confirmPassword,
      };

      const validationErrors: string[] = validateSignupCredentials(
        newUserCredentials
      );

      if (validationErrors.length !== 0) {
        setErrors(validationErrors);
      } else if (validationErrors.length === 0) {
        setErrors([]);
        setIsLoading(true);
        axios
          .post("/signup", newUserCredentials)
          .then(({ data }) => {
            const token: string = data.token;
            const refreshToken: string = data.refreshToken;

            tokenHandler({ token, refreshToken });
          })
          .then(() => {
            dispatch(login(newUserCredentials.email));
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
    }
  };
  return (
    <Wrapper>
      {authenticated ? (
        <Redirect to="/" />
      ) : (
        <Content>
          <Header>
            <h2>Hello, nice to meet you!</h2>
            <h1>SIGN UP</h1>
          </Header>
          {isLoading ? (
            <Spinner height="6.5rem" width="5rem" />
          ) : (
            <Form autoComplete="off" onSubmit={submitHandler}>
              <label htmlFor="email">Email</label>
              <TextInput
                name="Email"
                placeholder="E-mail"
                width="40%"
                reactRef={emailRef}
              />
              <label htmlFor="password">Password</label>
              <TextInput
                name="password"
                placeholder="Password"
                width="40%"
                type="password"
                reactRef={passwordRef}
              />
              <label htmlFor="confirmPassword">Confirm</label>
              <TextInput
                name="confirmPassword"
                placeholder="Confirm Password"
                width="40%"
                type="password"
                reactRef={confirmPasswordRef}
              />
              <br />
              <SubmitButton value="Sign Up" width="30%" />
              {!isErrorsEmpty && <ErrorList width="90%" errors={errors} />}
            </Form>
          )}
          <BottomTextWrapper>
            <SmallText>Alreay have an account?</SmallText>
            <LinkElement to="/login">LOG IN</LinkElement>
          </BottomTextWrapper>
        </Content>
      )}
    </Wrapper>
  );
};

export default Signup;
