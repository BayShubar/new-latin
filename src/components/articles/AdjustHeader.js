import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import {ACTIVE_MAIN_COLOR, 
        BACKGROUND_MAIN_COLOR,
        BACKGROUND_COLOR} from '../../constants'


class AdjustHeader extends React.Component{
    render(){
        return(
        <View style = { styles.adjustHolder } >
            <Icon
             name = {'add'}
             color = {ACTIVE_MAIN_COLOR}
             size = { 15 }
             raised
             containerStyle = {{ backgroundColor:  BACKGROUND_MAIN_COLOR}} 
             onPress = { ()=>{ this.props.toAdd() } }
             underlayColor = { BACKGROUND_COLOR }/>

             <Icon
             name = {'remove'}
             color = {ACTIVE_MAIN_COLOR}
             size = { 15 }
             raised
             containerStyle = {{ backgroundColor: BACKGROUND_MAIN_COLOR  }} 
             underlayColor = { BACKGROUND_COLOR   }
             onPress = { ()=>{ this.props.toRemove() } }/>
        </View>
        )
    }
}

export default AdjustHeader;

const styles = StyleSheet.create({
    adjustHolder: {
        flex: 2,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingRight: 10,
       },
})