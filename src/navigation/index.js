import React from 'react'
import {    
    createStackNavigator, 
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
import { ACTIVE_MAIN_COLOR,
        INACTIVE_MAIN_COLOR,
        BACKGROUND_MAIN_COLOR } from '../constants'

import ArticlesScreen from '../screens/article/ArticlesScreen'
import ArticleScreen from '../screens/article/ArticleScreen'
import AlphabetScreen from '../screens/article/AlphabetScreen'

import TranslationScreen from '../screens/translation/TranslationScreen'

import GamesScreen from '../screens/game/GamesScreen'

import TestPlay from '../modals/TestPlay'
import ObserverPlay from '../modals/ObserverPlay'
import LetterPlay from '../modals/LetterPlay'
import ConstructPlay from '../modals/ConstructPlay'

//==================ArticleStack======================
const ArticleStack = createAppContainer(createStackNavigator(
    {
        ArticlesScreen:{screen: ArticlesScreen,},
        ArticleScreen:{ screen: ArticleScreen, },
    },
    {
        headerMode :'float',
        initialRouteName: 'ArticlesScreen',
        navigationOptions:{
            headerStyle: {
                backgroundColor: BACKGROUND_MAIN_COLOR,
            },
            headerTintColor: ACTIVE_MAIN_COLOR,
            headerTitleStyle:{
                fontWeight: '300',
            }
        }
    },    
))

//=================GameStack===================
const GameStack = createAppContainer(createStackNavigator(
    {
        GamesScreen: { screen: GamesScreen, }
    },
    {
        initialRouteName: 'GamesScreen',
        navigationOptions:{
            headerStyle: {
                backgroundColor: BACKGROUND_MAIN_COLOR,
            },
            headerTintColor: ACTIVE_MAIN_COLOR,
            headerTitleStyle:{
                fontWeight: '300',
            }
        }
    }
))

//=================TranslationStack===================
const TranslationStack = createAppContainer(createStackNavigator(
    {
        TranslationScreen: { screen: TranslationScreen, }
    },
    {
        initialRouteName: 'TranslationScreen',
        navigationOptions:{
            headerStyle: {
                backgroundColor: BACKGROUND_MAIN_COLOR,
            },
            headerTintColor: ACTIVE_MAIN_COLOR,
            headerTitleStyle:{
                fontWeight: '300',
            }
        }
    }
))

//=================AlphabetStack===================
const AlphabetStack = createAppContainer(createStackNavigator(
    {
        AlphabetScreen:{ screen: AlphabetScreen, }
    },
    {
        initialRouteName: 'AlphabetScreen',
        navigationOptions:{
            headerStyle: {
                backgroundColor: BACKGROUND_MAIN_COLOR,
            },
            headerTintColor: ACTIVE_MAIN_COLOR,
            headerTitleStyle:{
                fontWeight: '300',
            }
        }
    }
))

//================TabBar===============================


const TabBar = createAppContainer(createBottomTabNavigator(
    {
        GameStack: { screen: GameStack,},
        ArticleStack: { screen: ArticleStack, },
        TranslationStack: { screen: TranslationStack,},
        AlphabetStack:{ screen: AlphabetStack, }
    },
    {
        initialRouteName: 'GameStack',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let IconComponent = Ionicons;
              let iconName;
                if (routeName === 'ArticleStack') {
                    iconName = `ios-paper`;
                } 
                else if (routeName === 'TranslationStack') {
                    iconName = `ios-globe`;
                }
                else if (routeName === 'GameStack') {
                    iconName = `ios-jet`;
                }
                else if(routeName ==='AlphabetStack'){
                    iconName = `ios-bulb`;
                }
              return <IconComponent name={iconName} size={30} color={tintColor} />;
            },
          }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: ACTIVE_MAIN_COLOR,
            inactiveTintColor: INACTIVE_MAIN_COLOR,
            inactiveBackgroundColor: BACKGROUND_MAIN_COLOR,
            activeBackgroundColor: BACKGROUND_MAIN_COLOR,
        },
    }
))


//========================Root===========================
export default createAppContainer(createStackNavigator(
    {
        TabBar: { screen: TabBar },
        TestPlay: {screen: TestPlay},
        ObserverPlay: {screen: ObserverPlay},
        LetterPlay:{screen: LetterPlay},
        ConstructPlay:{screen: ConstructPlay},
    },
    {
        mode: 'Modal',
        headerMode: 'none',
    }
))

