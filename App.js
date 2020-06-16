import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Platform } from 'react-native';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import reducer from './reducers';
import middleware from './middleware';
import { setLocalNotification } from './utils/api';

// Navigations
import { HeaderBackButton } from '@react-navigation/stack';

// Components
import DeckList from './components/Decks';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import Score from './components/Score';

// Colors and icons
import { purple, white } from './utils/colors';

import { AppLoading } from 'expo';

//Fonts
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const RouteConfigs = {
  DeckList: {
    name: 'DeckList',
    component: DeckList,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-bookmarks'
          size={25}
          color={tintColor}
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            fontFamily: 'Poppins_400Regular',
          }}
        />
      ),
      title: 'Decks',
    },
  },
  AddDeck: {
    name: 'AddDeck',
    component: AddDeck,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name='plus-square'
          size={25}
          color={tintColor}
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            fontFamily: 'Poppins_400Regular',
          }}
        />
      ),
      title: 'Add Deck',
    },
  },
};

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: Platform.OS === 'ios' ? 86 : 50,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs.DeckList} />
    <Tab.Screen {...RouteConfigs.AddDeck} />
  </Tab.Navigator>
);

// Config for StackNavigator
const StackNavigatorConfig = {
  headerMode: 'screen',
};

const StackConfig = {
  TabNav: {
    name: 'TabNav',
    component: TabNav,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleAlign: 'center',
      title: 'Mobile Flashcards',
    },
  },
  DeckDetail: {
    name: 'DeckDetail',
    component: DeckDetail,
    options: ({ navigation, route }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleAlign: 'center',
      title: 'DeckDetail',
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.navigate('TabNav', { screen: 'DeckList' });
          }}
        />
      ),
    }),
  },
  AddCard: {
    name: 'AddCard',
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleAlign: 'center',
      title: 'Add Card',
    },
  },
  Quiz: {
    name: 'Quiz',
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleAlign: 'center',
      title: 'Quiz',
    },
  },
  Score: {
    name: 'Score',
    component: Score,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      headerTitleAlign: 'center',
      title: 'Score',
    },
  },
};

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig.TabNav} />
    <Stack.Screen {...StackConfig.DeckDetail} />
    <Stack.Screen {...StackConfig.AddCard} />
    <Stack.Screen {...StackConfig.Quiz} />
    <Stack.Screen {...StackConfig.Score} />
  </Stack.Navigator>
);

const store = createStore(reducer, middleware);

class App extends Component {
  componentDidMount() {
    console.log('CDM');
    // setLocalNotification();
  }

  // let [fontsLoaded] = useFonts({
  //   Poppins_400Regular,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;