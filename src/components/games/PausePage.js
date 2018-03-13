import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Animated, UIManager, LayoutAnimation } from 'react-native'
import { Button } from 'react-native-elements'
import { TEXT_COLOR, DEVICE_WIDTH, MAIN_COLOR, DEVICE_HEIGHT } from '../../constants'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class PausePage extends React.Component{

    componentWillMount(){
        LayoutAnimation.spring();
    }

    componentWillUnmount(){
        LayoutAnimation.spring();
    }
    render(){
        return(
            <View style = {styles.holder}>
                <View style = {styles.titleHolder}>
                    <Text style = {styles.title}>Пауза</Text>
                    <Text style = {styles.rule}> {this.props.data.longRule} </Text>
                </View>
                <View style = {styles.btnHolder}>
                    <Button
                    title = {'Оралу'}
                    color = { 'white' }
                    backgroundColor = {MAIN_COLOR}
                    onPress = {()=>{ this.props.onRequestToResume() }}
                    buttonStyle = { styles.btn }
                    fontSize = { 25 }
                    borderRadius = { 10 }
                    large
                    icon = {{name: 'cached'}}
                    />
                    <Button
                    title = {'Аяқтау'}
                    color = { 'white' }
                    backgroundColor = {MAIN_COLOR}
                    onPress = {()=>{ this.props.onRequestToFinish() }}
                    buttonStyle = { styles.btn }
                    fontSize = { 25 }
                    borderRadius = { 10 }
                    icon = {{name: 'home'}}
                    large
                    />
                    <Button
                    title = {'Шығу'}
                    color = { 'white' }
                    backgroundColor = {MAIN_COLOR}
                    onPress = {()=>{ this.props.onRequestToClose() }}
                    buttonStyle = { styles.btn }
                    borderRadius = { 10 }
                    fontSize = { 25 }
                    icon = {{name: 'close'}}
                    large
                    />
                </View>
            </View>
        )
    }
}

export default PausePage;

const styles = StyleSheet.create({
    holder: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.85)',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
        zIndex: 5,
    },
    titleHolder:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: TEXT_COLOR,
        fontSize: 60,
    },
    rule:{
        color: TEXT_COLOR,
        fontSize: 20,
        textAlign: 'center',
        padding: 10, 
    },
    btnHolder:{
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    btn: {
        width: DEVICE_WIDTH*0.8,
        margin: 10,
    }
})