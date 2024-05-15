import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import ToDoList from "../components/ToDoList";
import { View } from "react-native";
import ToDoDialog from "../components/ToDoDialog";
import { useDialogStore } from "../state/DialogState";
import Drawing from "../components/Drawing";

const ToDoRoute = () => {
  const { showDialog, setShowDialog } = useDialogStore();
  
  return (
  <View style={{ width: "100%", height: "100%" }}>
    <ToDoDialog visible={showDialog} onDismiss={setShowDialog} />
    <ToDoList />
  </View>
  )
};

const AlbumsRoute = () => <Drawing />;

export default () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "todo",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home",
    },
    { key: "drawing", title: "Drawing", focusedIcon: "draw" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    todo: ToDoRoute,
    drawing: AlbumsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
