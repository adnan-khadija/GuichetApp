import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ListeGuichetScreen from "./screens/ListeGuichet";
import AjouterGuichetScreen from "./screens/AjouterGuichet";
import FavorisScreen from "./screens/FavorisScreen";
import CustomHeader from "./components/CustomHeader";

const Stack = createStackNavigator();

export default function App() {
  const [guichets, setGuichets] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Guichet">
        <Stack.Screen
          name="Guichet"
          options={({ navigation }) => ({
            // Personnalisation du header avec un composant custom
            headerTitle: () => (
              <CustomHeader navigation={navigation} guichets={guichets} />
            ),
          })}
        >
          {(props) => (
            <ListeGuichetScreen
              {...props}
              guichets={guichets}
              setGuichets={setGuichets}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="AjouterGuichet"
          component={AjouterGuichetScreen}
        />
         <Stack.Screen name="Favoris" component={FavorisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
