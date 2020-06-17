import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Platform, ActivityIndicator, StyleSheet } from 'react-native';

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
import * as Font from 'expo-font';

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
            fontFamily: 'OpenSans-Bold',
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
            fontFamily: 'OpenSans-Bold',
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
      title: 'Flashcards',
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
      headerBackTitle: 'Flashcards',
      headerBackTitleVisible: false,
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
      headerBackTitleVisible: false,
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
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    });
    this.setState({
      fontLoaded: true,
    });
    // setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {this.state.fontLoaded ? (
            <MainNav />
          ) : (
            <ActivityIndicator
              color='#292477'
              size='large'
              style={styles.activityIndicator}
            />
          )}
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
