import { StyleSheet,  View,} from 'react-native';
import {Home} from './src/views/Home';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Home />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
