import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, SetModalIsVisible] = useState(false);
  const [coursegoals, setCourseGoals] = useState([
    {
      id: 1,
      value: "Learning React Native",
    },
  ]);

  const StartAddGoalHandler = () => {
    SetModalIsVisible(true);
  };

  const onCancelAddGoalHandler = () => {
    SetModalIsVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((prevState) => [
      ...prevState,
      {
        id: prevState.length === 0 ? 0 : prevState[prevState.length - 1].id + 1,
        value: enteredGoalText,
      },
    ]);
    SetModalIsVisible(false);
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((prevState) => {
      const filteredGoalItems = prevState.filter((goal) => goal.id !== id);
      return filteredGoalItems;
    });
  };

  const renderItem = ({ item }) => {
    return (
      <GoalItem onDelete={deleteGoalHandler.bind(null, item.id)}>
        {item.value}
      </GoalItem>
    );
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e08cc"
          onPress={StartAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onPress={addGoalHandler}
          onCancel={onCancelAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={coursegoals}
            renderItem={renderItem}
            alwaysBounceVertical={false}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 4,
  },
});
