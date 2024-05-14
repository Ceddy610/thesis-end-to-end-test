import React, { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useDialogStore } from "../state/DialogState";

export default function ToDoDialog({ visible, onDismiss, onTaskAdded }) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const setToDoInList = useDialogStore((state) => state.setToDoInList);

    const handleTaskNameChange = () => {
      onDismiss();
      setToDoInList({ name: taskName, description: taskDescription, isCompleted: false });
    };

    return (
      <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Add a new task</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Task name" onChangeText={setTaskName} />
          <TextInput label="Task description" onChangeText={setTaskDescription} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleTaskNameChange}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
      </Portal>
    );
};