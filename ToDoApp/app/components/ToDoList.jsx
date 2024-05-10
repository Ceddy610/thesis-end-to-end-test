import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button, List, Checkbox, useTheme, Dialog } from "react-native-paper";
import CustomData from "../../to-do.json";

const ToDoListItem = ({ title, description, completed }) => {
  const theme = useTheme();
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleToggle = () => {
    setIsCompleted(!isCompleted);
  };
  return (
    <List.Item
      key={title}
      title={title}
      description={description}
      right={(props) => (
        <Checkbox
          {...props}
          theme={theme}
          status={isCompleted ? "checked" : "unchecked"}
          onPress={handleToggle}
        />
      )}
    />
  );
};

const ToDoDialog = ({ onDismiss }) => {
  return (
    <Dialog visible={false} onDismiss={onDismiss}>
      <Dialog.Title>Add a new task</Dialog.Title>
      <Dialog.Content>
        <TextInput label="Task name" onChangeText={setTaskName} />
        <TextInput label="Task description" onChangeText={setTaskDescription} />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={() => console.log("Nice")}>Confirm</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const ToDoList = () => {
  const theme = useTheme();
  const [dialogVisible, setDialogVisible] = useState(false);

  const toDoListItems = CustomData.map((item) => {
    return (
      <ToDoListItem
        styles={styles.button}
        key={item.name}
        title={item.name}
        description={item.description}
        isCompleted={item.completed}
      />
    );
  });

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}
    >
      <List.Section style={styles.list}>{toDoListItems}</List.Section>
      <View style={styles.button}>
        <Button
          style={{
            backgroundColor: theme.colors.primary,
            width: "fit-content",
          }}
          icon="plus"
          mode="contained"
          onPress={() => setDialogVisible(true)}
        >
          Add a new task
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
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
});

export default ToDoList;
