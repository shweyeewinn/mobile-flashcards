import 'react-native-gesture-handler';
import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';

//Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware';

//Navigations
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import DeckList from './components/Decks'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck';

//Colors and icons
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()


const RouteConfigs = {
  DeckList: {
    name: "Decks",
    component: DeckList,
    options: { tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={25} color={tintColor} style={{ paddingTop: 5, paddingBottom: 5 }} />, title: 'Decks' }
  },
  AddDeck: {
    name: "Add Deck",
    component: AddDeck,
    options: { tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={25} color={tintColor} style={{ paddingTop: 5, paddingBottom: 5 }} />, title: 'Add Deck' }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 86,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['DeckList']} />
    <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
)

//Config for StackNavigator
const StackNavigatorConfig = {
  headerMode: "screen"
}

const StackConfig = {
  TabNav: {
    name: "Decks",
    component: TabNav,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      title: "Decks"
    }
  },
  AddDeck: {
    name: "Add Deck",
    component: AddDeck,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      title: "Add Deck"
    }
  }
}

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['AddDeck']} />
  </Stack.Navigator>
)

const store = createStore(reducer, middleware);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer >
          <MainNav />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
