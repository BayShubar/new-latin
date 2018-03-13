import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Texts from '../../constants/Texts'
import ArticleItem from '../../components/articles/ArticleItem'
import {BACKGROUND_COLOR,
        BACKGROUND_MAIN_COLOR,
        ACTIVE_MAIN_COLOR} from '../../constants'
import {Icon} from 'react-native-elements'

class ArticlesScreen extends React.Component{
    static navigationOptions = {
            title: 'Қызықты әңгімелер',
        }

    render(){
        const articles = []
        Texts.map((article, id)=>{
            articles.push(<ArticleItem
                        key = {id} 
                        data = {article}
                        onPress = {()=>{ this.props.navigation.navigate('ArticleScreen', article) }}/>)
        })
        return(
            <View style = {styles.holder}>
                <ScrollView>
                    {articles}
                </ScrollView>
            </View>
        )
    }
}

export default ArticlesScreen;

const styles = StyleSheet.create({
    holder:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:BACKGROUND_COLOR,
    },
})