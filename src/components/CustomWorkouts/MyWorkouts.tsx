//Fundamentals
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
//Components
import SubmitButton from "components/shared/components/SubmitButton";
import Spinner from "components/shared/components/Spinner";
import ModalInformation from "components/shared/components/ModalInformation";
import ModalConfirmation from "components/shared/components/ModalConfirmation";
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
type SelectorProps = { disable: boolean };
interface Exercise {
  workoutName: string;
  exerciseName: string;
  setGoal: number;
}

interface Workout {
  exercises: Exercise[];
  name: string;
  createdAt: string;
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 8px;
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
`;

const SelectorsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: fit-content;
`;

const SelectorButton = styled.button<SelectorProps>`
  width: 30%;
  background-color: inherit;
  color: ${({ theme, disable }) =>
    disable ? "grey" : theme.secondaryColorLight};
  padding: 1rem;
  font-size: ${(props) => props.theme.fontMediumLarge};
  transition: 0.4s;
  &:hover {
    letter-spacing: 2px;
    font-weight: 600;
  }
`;

const WorkoutHeader = styled.header`
  text-align: center;
  & > h2 {
    font-size: ${(props) => props.theme.fontMediumLarge};
  }
`;
const TableWrapper = styled.span`
  flex: 1;
  align-items: stretch;
  width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1rem;
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
    padding: 1rem 0;
  }
`;
const TableContent = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: left;
  & th {
    font-size: ${(props) => props.theme.fontMedium};
  }
`;

const Row = styled.tr<RowProps>`
  background-color: ${({ theme, isOdd }) =>
    isOdd ? theme.containerBackgroundSecondary : "transparent"};
  & > td {
    padding: 1rem;
  }
`;
const Footer = styled.footer`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-top: 2px solid ${({ theme }) => theme.primaryColor};
`;
//~~~~~~~~~~~~~~~~~~~Component
const MyWorkouts = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const userID = useSelector(selectUserID);
  const [infoModalVisible, setInfoModalVisible] = React.useState<boolean>(
    false
  );
  const [
    confirmationModalVisible,
    setConfirmationModalVisible,
  ] = useState<boolean>(false);

  useEffect(() => {
    let source = axios.CancelToken.source();

    axios
      .get("/workouts/custom", {
        headers: {
          userID: userID,
        },
      })
      .then((res) => {
        const response =
          res && res.data
            ? res.data.exercises.map((exercise: any) => {
                return exercise;
              })
            : [];
        setWorkouts(response);
      })
      .then(() => {
        setIsLoading(false);
        refreshLocalToken();
      })
      .catch((err) => {
        setIsLoading(false);

        source.cancel();
      });
    return () => {
      source.cancel();
    };
  }, []);

  const handleSwipe = (action: string): void => {
    switch (action) {
      case "Previous": {
        currentIndex - 1 >= 0 && setCurrentIndex(currentIndex - 1);
        break;
      }
      case "Next": {
        currentIndex + 1 < workouts.length && setCurrentIndex(currentIndex + 1);
        break;
      }
      default:
        break;
    }
  };
  const handleDelete = (): void | null => {
    if (workouts.length === 0) return null;

    axios
      .delete("/workouts/custom", {
        headers: {
          workoutID: `${workouts[currentIndex].name}_${workouts[currentIndex].createdAt}`,
          userID: userID,
        },
      })
      .then(() => {
        setCurrentIndex(0);
        setWorkouts(
          workouts.filter(
            (workout) => workout.createdAt !== workouts[currentIndex].createdAt
          )
        );
      })
      .then(() => {
        setInfoModalVisible(true);
        setTimeout(() => setInfoModalVisible(false), 2000);
      })
      .catch((err) => console.error(err));
  };
  // //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      {isLoading ? (
        <Spinner width="10rem" height="12rem" />
      ) : workouts.length > 0 ? (
        <>
          <SelectorsWrapper>
            <SelectorButton
              onClick={() => handleSwipe("Previous")}
              disable={currentIndex === 0}
            >
              Previous
            </SelectorButton>
            <SelectorButton
              onClick={() => handleSwipe("Next")}
              disable={currentIndex === workouts.length - 1}
            >
              Next
            </SelectorButton>
          </SelectorsWrapper>
          <WorkoutHeader>
            <h2>{workouts[currentIndex].name}</h2>
          </WorkoutHeader>
          <TableWrapper>
            <TableContent>
              <thead>
                <tr>
                  <th scope="col" colSpan={2}>
                    Exercise Name
                  </th>

                  <th scope="col">Set Goal</th>
                </tr>
              </thead>
              <tbody>
                {workouts[currentIndex].exercises.map(
                  (exercise: Exercise, index: number) => {
                    return (
                      <>
                        <Row
                          index={index}
                          isOdd={!(index % 2) ? true : false}
                          key={index}
                        >
                          <td colSpan={2}>{exercise.exerciseName}</td>
                          <td>{exercise.setGoal}</td>
                        </Row>
                      </>
                    );
                  }
                )}
              </tbody>
            </TableContent>
          </TableWrapper>
          <Footer>
            {workouts.length > 0 && (
              <SubmitButton
                value="Delete"
                width="14rem"
                height="80%"
                fontSize="1.2rem"
                onClick={() => setConfirmationModalVisible(true)}
              />
            )}
          </Footer>
        </>
      ) : (
        <h2>
          No workouts created yet <br />
          Try our default workout in the workout buddy :)
        </h2>
      )}
      {confirmationModalVisible && (
        <ModalConfirmation
          text="Are you sure you want to delete this workout?"
          backGroundClick={() => setConfirmationModalVisible(false)}
          onAccept={handleDelete}
        />
      )}
      {infoModalVisible && <ModalInformation text="Custom Workout Deleted" />}
    </Wrapper>
  );
};

export default React.memo(MyWorkouts);
