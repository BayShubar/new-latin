import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Letters from '../../constants/Letters'
import MainTranslator from '../../components/translator/MainTranslator'

class TranslationScreen extends React.Component{
    static navigationOptions = {
        title: 'Аудармашы',
      };
    render(){
        return(
            <View  style = { styles.holder }>
                <ScrollView>
                    <MainTranslator
                    Letters = { Letters }/>
                    <View style = {{ height: 200 }}/> 
                </ScrollView>
            </View>
        )
    }
}

export default TranslationScreen;

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'white',
    },
})