import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, Checkbox } from 'react-native-paper';
import CustomData from '../../to-do.json';

const ToDoListItem = ({title, description, completed}) => {
    const [isCompleted, setIsCompleted] = useState(completed);

    const handleToggle = () => {
        setIsCompleted(!isCompleted);
    };
        return (
            <List.Item
                key={title}
                title={title}
                description={description}
                right={props => <Checkbox {...props} status={isCompleted ? 'checked' : 'unchecked'} onPress={handleToggle}/>}
            />
        );

}

const ToDoList = () => {
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
        <List.Section style={styles.list}>
        {toDoListItems}
        </List.Section>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
})

export default ToDoList;