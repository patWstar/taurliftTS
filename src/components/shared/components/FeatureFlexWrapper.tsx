//Fundamentals
import styled from "styled-components";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface FeatureFlexWrapperProps {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  height?: string;
  width?: string;
  props: any;
  children: any;
  backgroundColor?: string;
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.section<FeatureFlexWrapperProps>`
  display: flex;
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.flexDirection || "column"};
  justify-content: ${(props) => props.justifyContent || "space-between"};

  display: flex;
  width: 60vw;
  min-height: 400px;
  height: 100%;
  max-width: 1180px;
  padding: 2rem;
  background: ${(props) =>
    props.backgroundColor || props.theme.containerBackgroundPrimary};
  margin: 0 auto;
  color: ${({ theme }) => theme.textColor};

  @media only screen and (max-width: 107em) {
    width: 100%;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 3rem 0;
  }
`;

//~~~~~~~~~~~~~~~~~~~Component
const FeatureFlexWrapper = ({
  flexDirection,
  alignItems,
  height,
  justifyContent,
  padding,
  width,
  ...props
}: FeatureFlexWrapperProps): JSX.Element => {
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper
      flexDirection={flexDirection}
      alignItems={alignItems}
      height={height}
      justifyContent={justifyContent}
      padding={padding}
      width={width}
      {...props}
    />
  );
};

export default FeatureFlexWrapper;
