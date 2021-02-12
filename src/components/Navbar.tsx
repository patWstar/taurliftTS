//Fundamentals
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
//Components
import ModalConfirmation from "components/shared/components/ModalConfirmation";
//Redux
import { logout, selectAuthenticated } from "redux/Slices/UserSlice";
import { useSelector, useDispatch } from "react-redux";
//Util
import loggedInByczq from "assets/icons/gotowy2.svg";
import loggedOutByczq from "assets/icons/gotowy1.svg";
import Icons from "assets/sprites.svg";
//~~~~~~~~~~~~~~~~~~~Interfaces & types
type NavsProps = {
  logged: boolean;
};
type NavProps = {
  activeClassName?: string;
  danger?: string;
};
//~~~~~~~~~~~~~~~~~~~Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7rem;
  background-color: ${({ theme }) => theme.navBarColor};
  padding: 0 5%;
  color: ${({ theme }) => theme.textColor};
`;
const Logo = styled(NavLink)`
  & > img {
    width: 6rem;
    height: 6rem;
  }
`;
const Navs = styled.nav<NavsProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  & > * {
    width: ${({ logged }) => (logged ? "calc(100% / 5)" : "calc(100% / 3)")};
  }
`;
const activeLinkBackground = keyframes`
  from {
    background-size: 0% 100%;
  }

  to {
    background-size: 100% 100%;
  }
`;
const Nav = styled(NavLink)<NavProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: inherit;
  font-weight: 700;
  transition: 0.4s;
  height: 100%;
  font-size: 2rem;
  & > svg {
    height: 2.5rem;
    width: 2.5rem;
    fill: ${({ theme }) => theme.textColor};
  }
  &:hover {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.secondaryColorDark};
  }

  &.${({ activeClassName }) => activeClassName} {
    background: linear-gradient(to right, #2ecc71, #1b914c);
    background-repeat: no-repeat;
    animation: ${activeLinkBackground} 0.4s ease-out 1;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: inherit;
  font-weight: 700;
  transition: 0.4s;
  height: 100%;
  font-size: 2rem;

  &:hover {
    letter-spacing: 1px;
    color: red;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const Navbar = (): JSX.Element => {
  const [
    confirmationModalVisible,
    setConfirmationModalVisible,
  ] = useState<boolean>(false);
  const dispatch = useDispatch();
  const authenticated: boolean = useSelector(selectAuthenticated);

  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());

    history.push("/");
  };

  return (
    <Container>
      {authenticated ? (
        <>
          <Logo to="/" exact>
            <img src={loggedInByczq} alt="taurlift logo" />
          </Logo>
          <Navs logged={true}>
            <Nav to="/" exact activeClassName="active">
              <svg>
                <use xlinkHref={`${Icons}#icon-home`} />
              </svg>
              Home
            </Nav>
            <Nav to="/diary" exact activeClassName="active">
              <svg className="nav__icon">
                <use xlinkHref={`${Icons}#icon-paste`} />
              </svg>
              Diary
            </Nav>
            <Nav to="/calculators" exact activeClassName="active">
              <svg className="nav__icon">
                <use xlinkHref={`${Icons}#icon-stats-dots`} />
              </svg>
              Calculate
            </Nav>
            <Nav to="/workouts" exact activeClassName="active">
              <svg className="nav__icon">
                <use xlinkHref={`${Icons}#icon-fire`} />
              </svg>
              Workouts
            </Nav>
            <LogoutButton onClick={() => setConfirmationModalVisible(true)}>
              Logout
            </LogoutButton>
          </Navs>
        </>
      ) : (
        <>
          <Logo to="/" exact>
            <img src={loggedOutByczq} alt="taurlift logo" />
          </Logo>
          <Navs logged={false}>
            <Nav to="/" exact activeClassName="active">
              <svg>
                <use xlinkHref={`${Icons}#icon-home`} />
              </svg>
              Home
            </Nav>
            <Nav to="/login" activeClassName="active">
              <svg>
                <use xlinkHref={`${Icons}#icon-user`} />
              </svg>
              Login
            </Nav>
            <Nav to="/signup" activeClassName="active">
              <svg>
                <use xlinkHref={`${Icons}#icon-user-plus`} />
              </svg>
              Sign Up
            </Nav>
          </Navs>
        </>
      )}
      {confirmationModalVisible && (
        <ModalConfirmation
          text="Are you sure you want to logout?"
          backGroundClick={() => setConfirmationModalVisible(false)}
          onAccept={logoutHandler}
        />
      )}
    </Container>
  );
};

export default Navbar;
