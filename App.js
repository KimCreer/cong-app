// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Detail from './src/Detail';
import Dashboard from './src/Dashboard';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}  
      />
      <Stack.Screen
        name='Detail'
        component={Detail}
        options={{headerShown: false }}
      />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{headerShown: false}}
       />
      </Stack.Navigator>
     </NavigationContainer>
  );
}
          