import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Detail from './src/Detail';
import Dashboard from './src/Dashboard';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen'; // Import the screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Detail" 
          component={Detail} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Projects" 
          component={ProjectsScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProjectDetails" 
          component={ProjectDetailsScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
