//Fundamentals
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
//Components
import Spinner from "components/shared/components/Spinner";
import WorkoutDetailsModal from "components/WorkoutDiary/WorkoutDetailsModal";
import ModalInformation from "components/shared/components/ModalInformation";
import ModalConfirmation from "components/shared/components/ModalConfirmation";
import FeatureFlexWrapper from "components/shared/components/FeatureFlexWrapper";
//Redux
import { selectUserID, selectAuthenticated } from "redux/Slices/UserSlice";
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

const Header = styled.header`
  text-align: center;

  & > h1 {
    padding: 2rem 0;
    font-size: ${(props) => props.theme.fontExtraLarge};
    font-weight: 400;
    letter-spacing: 4px;
  }
  & > h2 {
    font-size: ${(props) => props.theme.fontMediumLarge};
    font-weight: 300;
  }
`;

const Content = styled.table`
  table-layout: fixed;
  width: 80%;
  text-align: left;
  & > thead {
    font-size: ${(props) => props.theme.fontMediumLarge};
  }

  @media only screen and (max-width: 37.5em) {
    width: 100%;
  }
`;

const Row = styled.tr<RowProps>`
  background-color: ${({ theme, isOdd }) =>
    isOdd ? theme.containerBackgroundSecondary : "transparent"};
  & > td {
    padding: 1.5rem;
    font-size: ${(props) => props.theme.fontMedium};

    &:first-child {
      transition: 0.2s;
      color: ${({ theme }) => theme.secondaryColorLight};
      cursor: pointer;
      &:hover {
        font-weight: 700;
      }
    }
  }
`;

const ButtonTD = styled.td`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
    justify-content: space-between;
  }
`;
const OptionButton = styled.button<ButtonProps>`
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
  const [deletionIndex, setDeletionIndex] = useState<number>(0);
  const [detailModal, setDetailModal] = useState<JSX.Element | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [infoModalVisible, setInfoModalVisible] = React.useState<boolean>(
    false
  );
  const [
    confirmationModalVisible,
    setConfirmationModalVisible,
  ] = useState<boolean>(false);

  const userID = useSelector(selectUserID);
  const authenticated = useSelector(selectAuthenticated);
  useEffect(() => {
    let source = axios.CancelToken.source();
    if (authenticated) {
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
          source.cancel();
        });
    }

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

  const handleDelete = (index: number): void => {
    axios
      .delete("/workouts", {
        headers: {
          workoutID: finishedWorkouts[index].createdAt,
          userID: userID,
        },
      })
      .then(() => {
        setFinishedWorkouts(
          finishedWorkouts.filter(
            (workout) => workout.createdAt !== finishedWorkouts[index].createdAt
          )
        );
      })
      .then(() => {
        setInfoModalVisible(true);
        setTimeout(() => setInfoModalVisible(false), 2000);
      })
      .catch((err) => console.error(err));
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <FeatureFlexWrapper props={React.Children} justifyContent="flex-start">
      {authenticated ? (
        <>
          <Header>
            <h1>Workout Diary</h1>
            <h2>Completed Workouts</h2>
          </Header>
          {isLoading ? (
            <Spinner height="10rem" width="8rem" data-testid="diarySpinner" />
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
                {finishedWorkouts.length > 0 ? (
                  finishedWorkouts.map((workout, index) => {
                    return (
                      <Row
                        index={index}
                        isOdd={!(index % 2) ? true : false}
                        key={index}
                      >
                        <td
                          colSpan={2}
                          onClick={() => showDetailModal(workout, index)}
                        >
                          {workout.workoutName}
                        </td>
                        <td colSpan={2}>{workout.createdAt}</td>
                        <ButtonTD colSpan={1}>
                          <OptionButton
                            erase={true}
                            onClick={() => {
                              setDeletionIndex(index);
                              setConfirmationModalVisible(true);
                            }}
                          >
                            Erase
                          </OptionButton>
                        </ButtonTD>
                      </Row>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <h2>You don't have any workouts completed</h2>
                    </td>
                  </tr>
                )}
              </tbody>
              {detailModalVisible && detailModal}
            </Content>
          )}
          {infoModalVisible && <ModalInformation text="Workout Entry Erased" />}
          {confirmationModalVisible && (
            <ModalConfirmation
              text="Are you sure you want to delete this entry?"
              backGroundClick={() => setConfirmationModalVisible(false)}
              onAccept={() => handleDelete(deletionIndex)}
            />
          )}
        </>
      ) : (
        <ModalInformation text="The Diary Feature is only available for users who are logged in" />
      )}
    </FeatureFlexWrapper>
  );
};

export default WorkoutDiary;
