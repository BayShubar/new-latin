import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import {DEVICE_WIDTH, DEVICE_HEIGHT} from '../../constants'

class BackgroundImage extends React.Component{
    render(){
        return(
                    <ImageBackground 
                    resizeMode='cover'
                    style = { styles.holder }
                    source = { this.props.source }
                    >
                        <View style = {styles.container}>
                          {this.props.children}
                        </View>
                    </ImageBackground>
        )
    }
}
export default BackgroundImage;

const styles = StyleSheet.create({
    holder:{
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
})