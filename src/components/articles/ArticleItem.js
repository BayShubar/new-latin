import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {DEVICE_WIDTH,
        ACTIVE_MAIN_COLOR,
        BACKGROUND_MAIN_COLOR} from '../../constants'
import ImageHandler from '../util/ImageHandler'

class ArticleItem extends React.Component{
    render(){
        return(
            <TouchableOpacity
            onPress = {()=>{ this.props.onPress() }}
            >
            <View style = {styles.holder}>
                <View style = {styles.imageHolder}>
                    <ImageHandler 
                    source = {this.props.data.image}
                    width = {this.props.data.width}
                    height = {this.props.data.height}
                    ratio = { 1 }/>
                </View>

                <View style = {styles.titleHolder}>
                    <Text style = {styles.title}> {this.props.data.title} </Text>
                </View>

                <View style = {styles.textHolder}>
                    <Text style = {styles.text}> { this.props.data.content.substring(0, 70) + '...' } </Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}
export default ArticleItem;

let ratio = (DEVICE_WIDTH * 0.95 )/940;
const styles = StyleSheet.create({
    holder:{
        minHeight: 100,
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#DADFE2',
        backgroundColor:BACKGROUND_MAIN_COLOR,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
    },
    imageHolder: {
        width: DEVICE_WIDTH,
        borderRadius: 5,
        minHeight: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    titleHolder: {
        padding: 10,
        justifyContent: 'flex-start',
        width: DEVICE_WIDTH*0.95,
        flexDirection: 'row',
    },
    textHolder: {
        padding: 10,
        paddingTop: 0,
        justifyContent: 'flex-start',
        width: DEVICE_WIDTH*0.95,
    },
    title: {
        color: ACTIVE_MAIN_COLOR,
        fontSize: 16,
    },
    text: {
        color: '#8A8A8A',
        fontSize: 14,
        marginBottom: 15,
    }
})