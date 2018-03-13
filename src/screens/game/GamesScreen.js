import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Games from '../../constants/Games'
import GameList from '../../components/games/GameList'

class GamesScreen extends React.Component{
    static navigationOptions = {
        title: 'Қызықты ойындар',
      };
    render(){
        return(
            <View style = { styles.holder }>
                <GameList
                gameData = {Games}
                onGamePress = { (id)=>{ this.props.navigation.navigate(id.modalName, id) } }/>
            </View>
        )
    }
}

export default GamesScreen;

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'white',
    }
})