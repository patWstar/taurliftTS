//Fundamentals
import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import styled from "styled-components";
//Components
import CalculatorCalories from "components/CalculatorPage/CalculatorCalories";
import CalculatorMacros from "components/CalculatorPage/CalculatorMacros";
import CalculatorBMI from "components/CalculatorPage/CalculatorBMI";
import FeatureFlexWrapper from "components/shared/components/FeatureFlexWrapper";
//Redux
//Util
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface MacroResult {
  kcalFromProtein: number;
  kcalFromCarbs: number;
  kcalFromFats: number;
}
type SelectorButtonProps = {
  activeClassName: string;
};
//~~~~~~~~~~~~~~~~~~~Styled Components

const NavRow = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
  & > :nth-child(2) {
    border-left: 1px solid #444040;
    border-right: 1px solid #444040;
  }
  @media only screen and (max-width: 37.5em) {
    height: 5rem;
  }
`;

const SelectorButton = styled(NavLink)<SelectorButtonProps>`
  background-color: rgba(107, 107, 93, 0.3);
  width: calc(100% / 3);
  align-self: stretch;
  font-size: ${(props) => props.theme.fontMediumLarge};
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  transition: 0.4s;

  &:hover {
    color: ${({ theme }) => theme.secondaryColorLight};
    letter-spacing: 2px;
  }
  &.${({ activeClassName }) => activeClassName} {
    background-color: transparent;
    color: ${({ theme }) => theme.secondaryColorLight};
  }
`;
const ContentWrapper = styled.main`
  flex: 1;
  align-self: stretch;
  display: flex;
  padding: 1rem 0;
`;
const Footer = styled.footer`
  height: 3rem;
  display: flex;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme.primaryColor};
  & > :nth-child(2) {
    border-left: 1px solid ${({ theme }) => theme.primaryColor};
    border-right: 1px solid ${({ theme }) => theme.primaryColor};
    justify-content: space-between;
    padding: 0 2vw;
  }
  @media only screen and (max-width: 37.5em) {
    height: 5rem;
  }
`;

const FooterResult = styled.div`
  display: flex;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontMediumLarge};
  width: calc(100% / 3);
  height: 100%;
`;
//~~~~~~~~~~~~~~~~~~~Component
const Calculators = (): JSX.Element => {
  const [calorieResult, setCalorieResult] = useState<number | null>(null);
  const [macroResult, setMacroResult] = useState<MacroResult | null>(null);
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const shareCalorieResult = (calorieResult: number): void => {
    setCalorieResult(calorieResult);
  };

  const shareMacroResult = (macroResult: {
    kcalFromProtein: number;
    kcalFromCarbs: number;
    kcalFromFats: number;
  }): void => {
    setMacroResult(macroResult);
  };

  const shareBMIResult = (BMIResult: number): void => {
    setBmiResult(BMIResult);
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <FeatureFlexWrapper
      props={React.Children}
      padding="0px 0px"
      justifyContent="center"
    >
      <NavRow>
        <SelectorButton
          to="/calculators/CalorieCalculator"
          activeClassName="active"
        >
          Calories
        </SelectorButton>
        <SelectorButton
          to="/calculators/MacroCalculator"
          activeClassName="active"
        >
          Macros
        </SelectorButton>
        <SelectorButton
          to="/calculators/BMICalculator"
          activeClassName="active"
        >
          BMI
        </SelectorButton>
      </NavRow>
      <ContentWrapper>
        <Route
          path="/calculators/CalorieCalculator"
          exact
          component={() => (
            <CalculatorCalories shareCalorieResult={shareCalorieResult} />
          )}
        />
        <Route
          path="/calculators/MacroCalculator"
          exact
          component={() => (
            <CalculatorMacros shareMacroResult={shareMacroResult} />
          )}
        />
        <Route
          path="/calculators/BMICalculator"
          exact
          component={() => <CalculatorBMI shareBMIResult={shareBMIResult} />}
        />
      </ContentWrapper>
      <Footer>
        <FooterResult>{calorieResult && `${calorieResult}kcal`}</FooterResult>
        <FooterResult>
          {macroResult && (
            <>
              <h5>P: {macroResult.kcalFromProtein}g</h5>
              <h5>C: {macroResult.kcalFromCarbs}g</h5>
              <h5>F: {macroResult.kcalFromFats}g</h5>
            </>
          )}
        </FooterResult>
        <FooterResult>{bmiResult && `${bmiResult}`}</FooterResult>
      </Footer>
    </FeatureFlexWrapper>
  );
};

export default Calculators;
