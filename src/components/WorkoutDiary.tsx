//Fundamentals
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
//Components
import Spinner from "components/shared/components/Spinner";
import WorkoutDetailsModal from "components/WorkoutDetailsModal";
//Redux
import { selectUserID } from "redux/Slices/UserSlice";
import { useSelector } from "react-redux";
//Util
import refreshLocalToken from "util/refreshLocalToken";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type RowProps = {
  isOdd: boolean;
  index: number;
};

type ButtonProps = {
  erase: boolean;
};

interface FinishedWorkout {
  workoutName: string;
  createdAt: string;
  exercises: [
    {
      name: string;
      repsDoneCount: number;
      setNumber: number;
      weight: number | string;
    }
  ];
  userID: string;
}
//~~~~~~~~~~~~~~~~~~~Styled Components

const Wrapper = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.containerBackgroundPrimary};
  width: 55vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.textColor};

  gap: 3rem;
`;

const Header = styled.header`
  text-align: center;

  & > h1 {
    padding: 5rem 0;
    font-size: 6rem;
    font-weight: 400;
    letter-spacing: 4px;
  }
  & > h2 {
    font-size: 3rem;
    font-weight: 300;
  }
`;

const Content = styled.table`
  table-layout: fixed;
  width: 80%;
  text-align: left;

  & > thead {
    font-size: 3rem;
  }
`;

const Row = styled.tr<RowProps>`
  font-size: 2.4rem;
  background-color: ${({ theme, isOdd }) =>
    isOdd ? theme.containerBackgroundSecondary : "transparent"};
  & > td {
    padding: 1.5rem;
  }
`;

const ButtonTD = styled.td`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const OptionButton = styled.button<ButtonProps>`
  font-size: 2rem;
  font-weight: 600;
  transition: all 0.2s;
  color: ${({ theme, erase }) =>
    erase ? "lightCoral" : theme.secondaryColorLight};
  &:hover {
    transform: scale(1.05) translateY(-1px);
    filter: brightness(1.2);
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const WorkoutDiary = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [finishedWorkouts, setFinishedWorkouts] = useState<FinishedWorkout[]>(
    []
  );
  const [detailModal, setDetailModal] = useState<JSX.Element | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);

  const userID = useSelector(selectUserID);

  useEffect(() => {
    let source = axios.CancelToken.source();

    axios
      .get("/workouts", {
        headers: {
          userID: userID,
        },
      })
      .then(({ data }) => {
        setFinishedWorkouts(data);
        setIsLoading(false);
        refreshLocalToken();
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Couldn't get workouts.");
        source.cancel();
      });
    return () => {
      source.cancel();
    };
  }, []);

  const showDetailModal = (workout: FinishedWorkout, index: number): void => {
    setDetailModal(
      <WorkoutDetailsModal
        workoutData={workout}
        key={index}
        index={index}
        onClick={() => setDetailModalVisible(false)}
      />
    );
    setDetailModalVisible(true);
  };

  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <Header>
        <h1>Workout Diary</h1>
        <h2>Completed Workouts</h2>
      </Header>
      {isLoading ? (
        <Spinner height="10rem" width="8rem" />
      ) : (
        <Content>
          <thead>
            <tr>
              <th scope="col" colSpan={2}>
                Workout Name
              </th>
              <th scope="col" colSpan={2}>
                Date and Time
              </th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {finishedWorkouts.map((workout, index) => {
              return (
                <Row
                  index={index}
                  isOdd={!(index % 2) ? true : false}
                  key={index}
                >
                  <td colSpan={2}>{workout.workoutName}</td>
                  <td colSpan={2}>{workout.createdAt}</td>
                  <ButtonTD colSpan={1}>
                    <OptionButton
                      erase={false}
                      onClick={() => showDetailModal(workout, index)}
                    >
                      Details
                    </OptionButton>
                    <OptionButton erase={true}>Erase</OptionButton>
                  </ButtonTD>
                </Row>
              );
            })}
          </tbody>
          {detailModalVisible && detailModal}
        </Content>
      )}
    </Wrapper>
  );
};

export default WorkoutDiary;
