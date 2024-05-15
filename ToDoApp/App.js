import { StyleSheet, SafeAreaView } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import ButtonNavigationBar from './app/navigation/ButtonNavigationBar';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ButtonNavigationBar />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
