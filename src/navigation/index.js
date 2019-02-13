import React from 'react'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import { Button, Text, View } from 'react-native';
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
const ArticleStack = StackNavigator(
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
)

//=================GameStack===================
const GameStack = StackNavigator(
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
)

//=================TranslationStack===================
const TranslationStack = StackNavigator(
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
)

//=================AlphabetStack===================
const AlphabetStack = StackNavigator(
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
)

//================TabBar===============================


const TabBar = TabNavigator(
    {
        GameStack: { screen: GameStack,},
        ArticleStack: { screen: ArticleStack, },
        TranslationStack: { screen: TranslationStack,},
        AlphabetStack:{ screen: AlphabetStack, }
    },
    {
        navigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'ArticleStack') {
                iconName = `ios-contact`;
            } 
            else if (routeName === 'TranslationStack') {
                iconName = `ios-contact`;
            }
            else if (routeName === 'GameStack') {
                iconName = `ios-contact`;
            }
            else if(routeName ==='AlphabetStack'){
                iconName = `ios-contact`;
            }
    
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <IconComponent name={iconName} size={25} color={tintColor} />;
          },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: ACTIVE_MAIN_COLOR,
            inactiveTintColor: INACTIVE_MAIN_COLOR,
            inactiveBackgroundColor: BACKGROUND_MAIN_COLOR,
            activeBackgroundColor: BACKGROUND_MAIN_COLOR,
        },
        animationEnabled: false,
        swipeEnabled: false,
    } 
)


//========================Root===========================
export default StackNavigator(
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
)

