import { StyleSheet,  View,} from 'react-native';
import {Home} from './src/views/Home';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (

    <SafeAreaProvider>

    
    <SafeAreaView style={styles.container}>
        <Home />
    </SafeAreaView >
    
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
