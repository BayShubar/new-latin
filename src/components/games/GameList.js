import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import GameInfo from './GameInfo'

class GameList extends React.Component{
    render(){
        const gameItems = [];
        this.props.gameData.map((game, id)=>{
            gameItems.push(
                <GameInfo
                data = { game }
                key = { id }
                onGamePress = {(id)=>{ this.props.onGamePress(id) }}/>
            )
        })
        return(
            <View style = {styles.holder}>
                <ScrollView
                onScroll={this.onScroll}
                >
                    { gameItems }
                </ScrollView>
            </View>
        )
    }
}
export default GameList;

const styles = StyleSheet.create({
    holder:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
})