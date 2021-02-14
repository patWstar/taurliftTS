import React from "react";
import styled from "styled-components";
import DarkBackground from "components/shared/components/DarkBackground";
type RowProps = {
  isOdd: boolean;
  key: number;
};
interface Exercise {
  name: string;
  repsDoneCount: number;
  setNumber: number;
  weight: number | string;
}

interface WorkoutDetailsModalProps {
  workoutData: {
    workoutName: string;
    createdAt: string;
    exercises: Exercise[];
    userID: string;
  };
  index: number;
  onClick: React.SetStateAction<number | void>;
}
//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 50vw;
  border: ${({ theme }) => theme.primaryColor} 1px solid;
  border-radius: 30px;
  padding: 2.5vmin;
  background-color: rgb(0, 0, 0);
  z-index: 4;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1vmin;
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar-track {
    background: #555;
  }

  &::-webkit-scrollbar-thumb {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #f1f1f1;
  }
  @media only screen and (max-width: 56.25em) {
    width: 90%;
  }
`;

const Header = styled.header`
  height: 15%;
  & > h1 {
    font-size: 5vmin;
    letter-spacing: 4px;
    text-align: left;
    font-weight: 400;
  }
`;

const Content = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 70%;
  text-align: left;

  & th {
    font-size: 2vmin;
  }
`;

const Row = styled.tr<RowProps>`
  font-size: 2.4vmin;
  background-color: ${({ theme, isOdd }) =>
    isOdd ? theme.containerBackgroundSecondary : "transparent"};

  & td {
    padding: 1vmin;
  }
`;

const WorkoutDetailsModal = ({
  workoutData,
  index,
  onClick,
}: WorkoutDetailsModalProps): JSX.Element => {
  return (
    <>
      <DarkBackground onClick={onClick} />
      <Wrapper>
        <Header>
          <h1>{workoutData.workoutName}</h1>
        </Header>
        <Content>
          <thead>
            <tr>
              <th scope="col" colSpan={2}>
                Exercise Name
              </th>
              <th scope="col">Set</th>
              <th scope="col">Reps</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          <tbody>
            {workoutData.exercises.map((exercise, index) => {
              return (
                <Row key={index} isOdd={!(index % 2) ? true : false}>
                  <td colSpan={2}>{exercise.name}</td>
                  <td>{exercise.setNumber}</td>
                  <td>{exercise.repsDoneCount}</td>
                  <td>
                    {exercise.weight !== 0 && !!exercise.weight
                      ? `${exercise.weight}  kg`
                      : "N/A"}
                  </td>
                </Row>
              );
            })}
          </tbody>
        </Content>
      </Wrapper>
    </>
  );
};

export default WorkoutDetailsModal;
