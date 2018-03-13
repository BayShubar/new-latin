import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { 
    DEVICE_HEIGHT, 
    DEVICE_WIDTH, 
    ACTIVE_MAIN_COLOR, 
    INACTIVE_MAIN_COLOR } from '../../constants'
import { Icon } from 'react-native-elements'


class GameInfo extends React.Component{
    render(){
        return(
            <TouchableOpacity style = {styles.holder}
            onPress = {()=>{ this.props.onGamePress(this.props.data) }}>
                <View style = {styles.iconHolder}>
                    <Icon
                    name = {this.props.data.iconName}
                    color = {'white'}
                    raised
                    containerStyle = {{backgroundColor: this.props.data.color}}
                    size = {28}/>
                </View>
                <View style = {styles.textHolder}>
                    <Text style = {styles.nameText}>
                        { this.props.data.name }
                    </Text>
                    <Text style = {styles.descriptionText}>
                        { this.props.data.rule }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}
export default GameInfo;

let gamesNumber = 5;
let constHeight = ( DEVICE_HEIGHT * 0.7 ) / gamesNumber;


const styles = StyleSheet.create({
    holder:{
        height: constHeight,
        width: DEVICE_WIDTH,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginTop: 10,
    },
    iconHolder:{
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHolder:{
        flex: 3,
        justifyContent: 'flex-start',
    },
    nameText:{
        color: ACTIVE_MAIN_COLOR,
        fontSize: 17,
        textAlign: 'left',
    },
    descriptionText:{
        color: INACTIVE_MAIN_COLOR,
        fontSize: 14,
        textAlign: 'left',
    }
})