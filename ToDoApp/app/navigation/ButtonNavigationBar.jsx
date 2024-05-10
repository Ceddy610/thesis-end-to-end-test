import { BottomNavigation, Text } from 'react-native-paper';
import ToDoList from '../components/ToDoList';

const ToDoRoute = () => <ToDoList />;

const AlbumsRoute = () => <Text>Albums</Text>;

export default NavigationBar = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'todo', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
      { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      todo: ToDoRoute,
      albums: AlbumsRoute,
    });
  
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    );
  };