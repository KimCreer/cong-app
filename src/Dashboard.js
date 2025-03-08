import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import LawsScreen from "../src/screens/LawsScreen";
import ProjectsScreen from "../src/screens/ProjectsScreen";
import ConcernsScreen from "../src/screens/ConcernsScreen";
import UpdatesScreen from "../src/screens/UpdatesScreen";
import InfoScreen from "../src/screens/InfoScreen";
import ProfileScreen from "../src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function Dashboard() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Laws" component={LawsScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="balance-scale" size={size} color={color} />) }} />
            <Tab.Screen name="Projects" component={ProjectsScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="tasks" size={size} color={color} />) }} />
            <Tab.Screen name="Concerns" component={ConcernsScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="comments" size={size} color={color} />) }} />
            <Tab.Screen name="Updates" component={UpdatesScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="newspaper" size={size} color={color} />) }} />
            <Tab.Screen name="Info" component={InfoScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="info-circle" size={size} color={color} />) }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome5 name="user" size={size} color={color} />) }} />
        </Tab.Navigator>
    );
}

export default Dashboard;
