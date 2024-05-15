import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TextInput, Dimensions, Animated } from "react-native";
import { Button, List, Checkbox, useTheme, Dialog, IconButton } from "react-native-paper";
import CustomData from "../../to-do.json";
import { useDialogStore } from "../state/DialogState";
import { SwipeListView } from "react-native-swipe-list-view";

const ToDoListItem = ({ title, description, completed }) => {
  const theme = useTheme();
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
  };
  return (
    <Animated.View>
    <List.Item
      style={{ backgroundColor: theme.colors.surface }}
      key={title}
      title={title}
      description={description}
      onPress={handleToggle}
      right={(props) => (
        <Checkbox
          {...props}
          theme={theme}
          status={isCompleted ? "checked" : "unchecked"}
          onPress={handleToggle}
        />
      )}
    />
    </Animated.View>
  );
};

const rowTranslateAnimatedValues = {};
Array(20)
    .fill('')
    .forEach((_, i) => {
        rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

const ToDoList = () => {
  const theme = useTheme();
  const setShowDialog = useDialogStore((state) => state.setShowDialog);
  const toDoList = useDialogStore((state) => state.toDoList);
  const deleteToDo = useDialogStore((state) => state.deleteToDo);

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    console.log(swipeData);
    if (
        value < (-Dimensions.get('window').width) &&
        !animationIsRunning.current
    ) {
        animationIsRunning.current = true;
        Animated.timing(new Animated.Value(1), {
            toValue: 0,
            duration: 2,
            useNativeDriver: false,
        }).start(() => {
            deleteToDo({ name: key })
            animationIsRunning.current = false;
        });
    }
};

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}
    >
      <SwipeListView
        style={styles.list}
        data={toDoList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <ToDoListItem
              key={item.name}
              title={item.name}
              description={item.description}
              isCompleted={item.completed}
            />
          );
        }}
        renderHiddenItem={(data) => {
          return (
            <View style={{...styles.hiddenElement, backgroundColor: 'red', height: 'auto'}}>
              <IconButton
                icon="delete"
                iconColor="white"
              >
              </IconButton>
            </View>
          );
        }}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
      <View style={styles.button}>
        <Button
          style={{
            backgroundColor: theme.colors.primary,
            width: "fit-content",
          }}
          icon="plus"
          mode="contained"
          onPress={setShowDialog}
        >
          Add a new task
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 16,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 16,
  },
  hiddenElement: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  }
});

export default ToDoList;
