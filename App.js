import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import ProfileScreen from "./containers/ProfileScreen";
// import SettingsScreen from "./containers/SettingsScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import SplashScreen from "./containers/SplashScreen";

import LogoInHeader from "./components/LogoInHeader";
import ArrowBack from "./components/ArrowBack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } else {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn" options={{
                headerShown: false,
              }}>
              {(props) => <SignInScreen {...props} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp" options={{
                headerShown: false,
              }}>
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator 
                    screenOptions={{
                      // Personnalisation du header pour tous les écrans de ce Navigator ------------------
                      headerTitle: () => <LogoInHeader />,
                      headerTitleAlign: "center",
                    }}
                    >
                      <Stack.Screen name="Home" >
                         {() => <HomeScreen setToken={setToken}/>} 
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room" options={{ 
                          headerBackTitleVisible: false,
                          headerLeft: () => <ArrowBack />,
                           }}>
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* ----------------------------------------- */}
                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <Foundation name="marker" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        // Personnalisation du header pour tous les écrans de ce Navigator ------------------
                        headerTitle: () => <LogoInHeader />,
                        headerTitleAlign: "center",
                      }}
                    >
                      <Stack.Screen name="AroundMe">
                        {(props) => <AroundMeScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen name="Room">
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "My Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                        }}
                      >
                        {() => <ProfileScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
