import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {BACKGROUND_MAIN_COLOR} from '../../constants'
import ImageHandler from '../../components/util/ImageHandler'

class ArticlesScreen extends React.Component{
    static navigationOptions = {
        title: 'Әліппе',
      };
    render(){
        return(
            <View style={ styles.container }>
                <ScrollView>
                    <View style = {{height: 25}} />
                    <ImageHandler
                    source = {require('../../images/alphabet.png')}
                    width = {1091}
                    height = {1400}
                    ratio = { 1 }
                    />
                </ScrollView>
            </View>
        )
    }
}

export default ArticlesScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: BACKGROUND_MAIN_COLOR
    },
    row:{
        height: 40,
        flexDirection: 'row',
    },
    col:{
        flex: 1,
    },
    text:{
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})